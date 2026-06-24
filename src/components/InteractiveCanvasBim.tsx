import { useEffect, useRef, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  label?: string;
}

interface Edge {
  a: number;
  b: number;
  color?: string;
}

export default function InteractiveCanvasBim() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Handle Resize using ResizeObserver as requested
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.max(width, 300),
          height: Math.max(height, 350)
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Set up mouse move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      // Normalize mouse coordinates from -1 to 1
      const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const my = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = mx * 0.4;
      mouseRef.current.targetY = my * 0.4;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleY = 0;
    let angleX = 0.2; // slight tilt

    // Construct a premium 3D building structure:
    // It has multiple floor levels (e.g. 5 floors), structured as nested frames with elevator core.
    const vertices: Point3D[] = [];
    const edges: Edge[] = [];

    const numFloors = 6;
    const floorHeight = 45;
    const size = 90;

    // Generate skyscraper floors
    for (let f = 0; f < numFloors; f++) {
      const y = -120 + f * floorHeight;
      const isTop = f === numFloors - 1;
      const currentSize = isTop ? size * 0.6 : size * (1 - f * 0.05); // tapered building

      // Create 4 outer corners for each floor
      const startIdx = vertices.length;
      vertices.push({ x: -currentSize, y, z: -currentSize, label: f === 0 ? undefined : `LVL 0${f}` });
      vertices.push({ x: currentSize, y, z: -currentSize });
      vertices.push({ x: currentSize, y, z: currentSize });
      vertices.push({ x: -currentSize, y, z: currentSize });

      // Connect outer corners of this floor (square)
      edges.push({ a: startIdx, b: startIdx + 1 });
      edges.push({ a: startIdx + 1, b: startIdx + 2 });
      edges.push({ a: startIdx + 2, b: startIdx + 3 });
      edges.push({ a: startIdx + 3, b: startIdx });

      // Create 4 inner elevator core corners for structural look
      const coreSize = currentSize * 0.35;
      const coreStartIdx = vertices.length;
      vertices.push({ x: -coreSize, y, z: -coreSize });
      vertices.push({ x: coreSize, y, z: -coreSize });
      vertices.push({ x: coreSize, y, z: coreSize });
      vertices.push({ x: -coreSize, y, z: coreSize });

      // Connect elevator core corners
      edges.push({ a: coreStartIdx, b: coreStartIdx + 1, color: '#60A5FA' });
      edges.push({ a: coreStartIdx + 1, b: coreStartIdx + 2, color: '#60A5FA' });
      edges.push({ a: coreStartIdx + 2, b: coreStartIdx + 3, color: '#60A5FA' });
      edges.push({ a: coreStartIdx + 3, b: coreStartIdx, color: '#60A5FA' });

      // Connect inner core to outer floor via structural diagonal beams
      edges.push({ a: startIdx, b: coreStartIdx, color: 'rgba(59, 130, 246, 0.3)' });
      edges.push({ a: startIdx + 1, b: coreStartIdx + 1, color: 'rgba(59, 130, 246, 0.3)' });
      edges.push({ a: startIdx + 2, b: coreStartIdx + 2, color: 'rgba(59, 130, 246, 0.3)' });
      edges.push({ a: startIdx + 3, b: coreStartIdx + 3, color: 'rgba(59, 130, 246, 0.3)' });

      // Connect to the floor below
      if (f > 0) {
        const prevStartIdx = startIdx - 8;
        // Connect 4 outer columns
        edges.push({ a: startIdx, b: prevStartIdx });
        edges.push({ a: startIdx + 1, b: prevStartIdx + 1 });
        edges.push({ a: startIdx + 2, b: prevStartIdx + 2 });
        edges.push({ a: startIdx + 3, b: prevStartIdx + 3 });

        // Connect 4 core columns
        edges.push({ a: coreStartIdx, b: prevStartIdx + 4, color: '#3B82F6' });
        edges.push({ a: coreStartIdx + 1, b: prevStartIdx + 5, color: '#3B82F6' });
        edges.push({ a: coreStartIdx + 2, b: prevStartIdx + 6, color: '#3B82F6' });
        edges.push({ a: coreStartIdx + 3, b: prevStartIdx + 7, color: '#3B82F6' });

        // Add criss-cross cross bracing structural trusses on the outer frames for high-tech aesthetic
        if (f % 2 === 0) {
          edges.push({ a: startIdx, b: prevStartIdx + 1, color: 'rgba(239, 68, 68, 0.15)' });
          edges.push({ a: startIdx + 1, b: prevStartIdx, color: 'rgba(239, 68, 68, 0.15)' });
          edges.push({ a: startIdx + 2, b: prevStartIdx + 3, color: 'rgba(239, 68, 68, 0.15)' });
          edges.push({ a: startIdx + 3, b: prevStartIdx + 2, color: 'rgba(239, 68, 68, 0.15)' });
        }
      }
    }

    // Add roof architectural pinnacle antenna structure
    const topFloorIdx = (numFloors - 1) * 8;
    const antennaTipIdx = vertices.length;
    vertices.push({ x: 0, y: -180, z: 0, label: 'ANTENNA [H: 142.5m]' });
    // Connect antenna tip to top floor corners
    edges.push({ a: antennaTipIdx, b: topFloorIdx, color: '#EF4444' });
    edges.push({ a: antennaTipIdx, b: topFloorIdx + 1, color: '#EF4444' });
    edges.push({ a: antennaTipIdx, b: topFloorIdx + 2, color: '#EF4444' });
    edges.push({ a: antennaTipIdx, b: topFloorIdx + 3, color: '#EF4444' });

    // Floating particles (structural nodes)
    const particles: { x: number; y: number; z: number; size: number; speed: number; angle: number }[] = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 350,
        y: (Math.random() - 0.5) * 350,
        z: (Math.random() - 0.5) * 350,
        size: Math.random() * 2 + 1,
        speed: 0.2 + Math.random() * 0.5,
        angle: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      // Clear canvas with premium semi-transparent dark backdrop
      ctx.fillStyle = '#0B0F19';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Update base angles of rotation
      angleY += 0.003;
      const finalAngleY = angleY + mouseRef.current.x;
      const finalAngleX = angleX + mouseRef.current.y;

      const cosY = Math.cos(finalAngleY);
      const sinY = Math.sin(finalAngleY);
      const cosX = Math.cos(finalAngleX);
      const sinX = Math.sin(finalAngleX);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const perspective = 400;

      // Perspective projection helper
      const project = (pt: Point3D) => {
        // Rotate around Y axis
        let x1 = pt.x * cosY - pt.z * sinY;
        let z1 = pt.x * sinY + pt.z * cosY;

        // Rotate around X axis
        let y2 = pt.y * cosX - z1 * sinX;
        let z2 = pt.y * sinX + z1 * cosX;

        // Apply distance scaling
        const dist = 320;
        const scale = perspective / (perspective + z2 + dist);
        const projX = centerX + x1 * scale * 1.5;
        const projY = centerY + y2 * scale * 1.5;

        return { x: projX, y: projY, scale, zDepth: z2 };
      };

      // 1. Draw structural blueprint floor-grid plane at the base
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.06)';
      ctx.lineWidth = 1;
      const gridCount = 8;
      const gridSpacing = 50;
      for (let i = -gridCount; i <= gridCount; i++) {
        const p1 = project({ x: i * gridSpacing, y: 160, z: -gridCount * gridSpacing });
        const p2 = project({ x: i * gridSpacing, y: 160, z: gridCount * gridSpacing });
        const p3 = project({ x: -gridCount * gridSpacing, y: 160, z: i * gridSpacing });
        const p4 = project({ x: gridCount * gridSpacing, y: 160, z: i * gridSpacing });

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      // 2. Draw rotating construction particles
      particles.forEach((p) => {
        p.angle += 0.005;
        // Float upwards and wrap
        p.y -= p.speed;
        if (p.y < -220) p.y = 220;

        const projected = project({
          x: p.x + Math.sin(p.angle) * 15,
          y: p.y,
          z: p.z + Math.cos(p.angle) * 15
        });

        if (projected.scale > 0) {
          ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(0.8, projected.scale * 0.6)})`;
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, p.size * projected.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Project all vertices of the building
      const projectedPoints = vertices.map((v) => project(v));

      // 3. Draw building skeleton lines
      edges.forEach((edge) => {
        const pt1 = projectedPoints[edge.a];
        const pt2 = projectedPoints[edge.b];

        if (pt1.scale > 0 && pt2.scale > 0) {
          // Fade based on structural z-depth
          const avgScale = (pt1.scale + pt2.scale) / 2;
          ctx.strokeStyle = edge.color || `rgba(59, 130, 246, ${Math.max(0.12, avgScale * 0.45)})`;
          ctx.lineWidth = edge.color ? 1.5 : 1.0;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        }
      });

      // 4. Draw glowing nodal connection points & BIM metadata labels
      projectedPoints.forEach((p, idx) => {
        if (p.scale > 0) {
          const originPt = vertices[idx];

          // Draw node circles
          ctx.fillStyle = originPt.label ? '#EF4444' : '#3B82F6';
          ctx.beginPath();
          ctx.arc(p.x, p.y, (originPt.label ? 4 : 2.5) * p.scale, 0, Math.PI * 2);
          ctx.fill();

          // Outer glowing ring for landmark labels
          if (originPt.label) {
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 8 * p.scale, 0, Math.PI * 2);
            ctx.stroke();

            // Metadata UI drawing
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = '9px monospace';
            ctx.textAlign = 'left';
            
            // Draw neat holographic technical UI tag
            const labelX = p.x + 12;
            const labelY = p.y - 4;
            
            // Text box background
            const txtWidth = ctx.measureText(originPt.label).width;
            ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
            ctx.fillRect(labelX - 4, labelY - 10, txtWidth + 8, 14);
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
            ctx.strokeRect(labelX - 4, labelY - 10, txtWidth + 8, 14);

            ctx.fillStyle = '#60A5FA';
            ctx.fillText(originPt.label, labelX, labelY);

            // Tech line pointer
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(labelX - 4, p.y);
            ctx.stroke();
          }
        }
      });

      // 5. Drawing an active laser scanning sweep bar
      const scanY = 160 - ((Date.now() / 15) % 320); // cycle laser scanning plane
      const laserProjLeft = project({ x: -140, y: scanY, z: 0 });
      const laserProjRight = project({ x: 140, y: scanY, z: 0 });
      
      if (laserProjLeft.scale > 0 && laserProjRight.scale > 0) {
        const gradient = ctx.createLinearGradient(laserProjLeft.x, laserProjLeft.y, laserProjRight.x, laserProjRight.y);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.0)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.45)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(laserProjLeft.x, laserProjLeft.y);
        ctx.lineTo(laserProjRight.x, laserProjRight.y);
        ctx.stroke();

        // Technical sweep tag
        ctx.fillStyle = 'rgba(59, 130, 246, 0.7)';
        ctx.font = '8px monospace';
        ctx.fillText(`LASER RADAR SCAN ACTIVE... Z:${Math.abs(Math.round(scanY))}mm`, laserProjRight.x + 10, laserProjRight.y + 2);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="bim-interactive-3d"
      className="relative w-full h-[380px] md:h-[500px] flex items-center justify-center bg-[#0B0F19] rounded-2xl border border-slate-800/60 overflow-hidden shadow-2xl group"
    >
      {/* Background Tech HUD Details */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-500 flex flex-col gap-1 pointer-events-none z-10 select-none">
        <span className="text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          SYS_ONLINE // APEX_CORE_MODEL_V2
        </span>
        <span>ENGINE: BIM_PROJECTION_V1.12</span>
        <span>LOD_TARGET: LEVEL_500_AS_BUILT</span>
        <span>VERTICES: 49 // STRUCT_EDGES: 114</span>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-500 pointer-events-none z-10 select-none flex flex-col items-end">
        <span>ROT_Y: {(mouseRef.current.targetX * 180 / Math.PI).toFixed(1)}°</span>
        <span>ROT_X: {(mouseRef.current.targetY * 180 / Math.PI).toFixed(1)}°</span>
        <span className="text-blue-400 text-[9px] mt-1">DRAG OR HOVER MOUSE TO ROTATE</span>
      </div>

      {/* Decorative technical grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent)] pointer-events-none"></div>

      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block transition-opacity duration-300 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
