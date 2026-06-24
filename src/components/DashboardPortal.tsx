import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  LogIn, 
  Layers, 
  Briefcase, 
  MessageSquare, 
  User as UserIcon, 
  Clock, 
  Send, 
  CheckCircle2, 
  Loader2, 
  FileText, 
  ChevronRight, 
  Check, 
  Building, 
  ShieldCheck, 
  Cpu, 
  Phone, 
  Mail 
} from 'lucide-react';
import { useAuth } from './FirebaseContext';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

interface Consultation {
  id: string;
  userId: string;
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  projectType: string;
  message: string;
  status: 'pending' | 'reviewing' | 'engineering' | 'quoted' | 'completed';
  createdAt: any;
  updatedAt: any;
}

interface ChatMessage {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'client' | 'admin';
  message: string;
  createdAt: any;
}

const STATUS_STEPS = [
  { key: 'pending', label: 'Intake Registered' },
  { key: 'reviewing', label: 'BIM Review' },
  { key: 'engineering', label: 'Assigned' },
  { key: 'quoted', label: 'Quoted' },
  { key: 'completed', label: 'Delivered' }
];

export default function DashboardPortal() {
  const { user, loginWithGoogle, logout, isAdmin, loading } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'new-request'>('leads');
  
  // New request quick form state
  const [newRequestData, setNewRequestData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    projectType: 'Architectural BIM Modeling',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitErr, setSubmitErr] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Subscribe to Consultations
  useEffect(() => {
    if (!user) {
      setConsultations([]);
      return;
    }

    const colRef = collection(db, 'consultations');
    let q;
    
    if (isAdmin) {
      // Admin sees ALL requests sorted by date
      q = query(colRef, orderBy('createdAt', 'desc'));
    } else {
      // Client only sees their own requests
      q = query(colRef, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: Consultation[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Consultation);
      });
      setConsultations(items);
    }, (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'consultations');
      } catch (e) {
        console.error("Subscription error:", e);
      }
    });

    return () => unsubscribe();
  }, [user, isAdmin]);

  // Subscribe to Messages for selected Consultation
  useEffect(() => {
    if (!selectedConsultation) {
      setMessages([]);
      return;
    }

    const msgRef = collection(db, 'consultations', selectedConsultation.id, 'messages');
    const q = query(msgRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      setMessages(items);
    }, (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, `consultations/${selectedConsultation.id}/messages`);
      } catch (e) {
        console.error("Messages sync error:", e);
      }
    });

    return () => unsubscribe();
  }, [selectedConsultation]);

  // Trigger selected consultation detail sync on state change
  useEffect(() => {
    if (selectedConsultation) {
      const synced = consultations.find(c => c.id === selectedConsultation.id);
      if (synced) {
        setSelectedConsultation(synced);
      }
    }
  }, [consultations]);

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { fullName, companyName, email, phoneNumber, projectType, message } = newRequestData;
    if (!fullName || !companyName || !email || !phoneNumber || message.length < 10) {
      setSubmitErr("Ensure all fields are fully completed (scope details must be at least 10 characters).");
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('loading');
    const newDocRef = doc(collection(db, 'consultations'));
    
    try {
      const newConsultationPayload = {
        id: newDocRef.id,
        userId: user.uid,
        fullName,
        companyName,
        email,
        phoneNumber,
        projectType,
        message,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await updateDoc(newDocRef, newConsultationPayload); // Secure schema rules require exact matching
    } catch (err) {
      try {
        // Retry with standard write wrapper to log error metadata
        await addDoc(collection(db, 'consultations'), {
          userId: user.uid,
          fullName,
          companyName,
          email,
          phoneNumber,
          projectType,
          message,
          status: 'pending',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } catch (originalError) {
        setSubmitErr("Operation denied. Please check console telemetry or rules.");
        setSubmitStatus('error');
        handleFirestoreError(originalError, OperationType.CREATE, 'consultations');
        return;
      }
    }

    setSubmitStatus('success');
    setNewRequestData({
      fullName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      projectType: 'Architectural BIM Modeling',
      message: ''
    });
    setActiveTab('leads');
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedConsultation || !newMessage.trim()) return;

    setIsSendingMsg(true);
    const msgText = newMessage.trim();
    setNewMessage('');

    try {
      const msgRef = collection(db, 'consultations', selectedConsultation.id, 'messages');
      await addDoc(msgRef, {
        id: doc(msgRef).id,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous Partner',
        authorRole: isAdmin ? 'admin' : 'client',
        message: msgText,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `consultations/${selectedConsultation.id}/messages`);
    } finally {
      setIsSendingMsg(false);
    }
  };

  const handleUpdateStatus = async (newStatus: 'pending' | 'reviewing' | 'engineering' | 'quoted' | 'completed') => {
    if (!user || !selectedConsultation || !isAdmin) return;
    
    setIsUpdatingStatus(true);
    try {
      const docRef = doc(db, 'consultations', selectedConsultation.id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `consultations/${selectedConsultation.id}`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 font-mono text-xs gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span>SYNCHRONIZING SECURE TUNNEL...</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Portal Top Bar */}
      <div className="p-6 md:px-8 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 bg-slate-950/40">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400 animate-pulse" />
            <h3 className="text-white text-lg font-bold uppercase tracking-tight">
              Apex BIM Workspace Portal
            </h3>
          </div>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
            {isAdmin ? "Enterprise Administrator Console (LOD 500)" : "Secure Client Coordination Workspace"}
          </p>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-700 referrer-policy" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
                {user.displayName?.[0] || 'U'}
              </div>
            )}
            <div className="text-right">
              <p className="text-xs text-white font-semibold leading-tight">{user.displayName || user.email}</p>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">
                {isAdmin ? "ADMIN" : "CLIENT"}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-lg bg-slate-800 hover:bg-red-950/50 hover:text-red-400 text-slate-400 transition-all border border-slate-700/60 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : null}
      </div>

      {/* Main Content Area */}
      {!user ? (
        <div className="p-8 md:p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
            <Briefcase className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-white text-xl font-bold uppercase">Unlock Coordinated Projects Workspace</h4>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Authenticate via Secure Google Sign-In to track your active 3D Revit projects, clash detection updates, and collaborate directly with our engineering staff.
            </p>
          </div>

          <button
            onClick={loginWithGoogle}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition-all cursor-pointer shadow-lg shadow-blue-900/30"
          >
            <LogIn className="w-4.5 h-4.5" />
            Authenticate with Google
          </button>

          <div className="pt-6 border-t border-slate-800/50 flex items-center justify-center gap-6 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> ISO 19650 SSL</span>
            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-blue-500" /> REAL-TIME CORRELATION</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          
          {/* Left Column: Navigation & Leads List */}
          <div className="lg:col-span-5 border-r border-slate-800/80 p-5 space-y-4">
            
            {/* Tab Toggles for Client */}
            {!isAdmin && (
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => { setActiveTab('leads'); setSelectedConsultation(null); }}
                  className={`flex-1 text-center py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  My BIM Requests
                </button>
                <button
                  onClick={() => setActiveTab('new-request')}
                  className={`flex-1 text-center py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer ${activeTab === 'new-request' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Intake Request
                </button>
              </div>
            )}

            {/* List Header */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono uppercase pb-2 border-b border-slate-800/50">
              <span>{isAdmin ? "Active Global Inbound Leads" : "Your Coordinated Envelopes"}</span>
              <span>{consultations.length} total</span>
            </div>

            {activeTab === 'leads' || isAdmin ? (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {consultations.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 space-y-3">
                    <Clock className="w-8 h-8 text-slate-700 mx-auto" />
                    <p className="text-xs font-mono">No consultations recorded.</p>
                    {!isAdmin && (
                      <button
                        onClick={() => setActiveTab('new-request')}
                        className="text-xs text-blue-400 underline cursor-pointer"
                      >
                        Submit first intake request
                      </button>
                    )}
                  </div>
                ) : (
                  consultations.map((item) => {
                    const isSelected = selectedConsultation?.id === item.id;
                    const statusConfig = STATUS_STEPS.find(s => s.key === item.status);
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedConsultation(item)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${isSelected ? 'bg-blue-600/10 border-blue-500/80 shadow-md shadow-blue-500/5' : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'}`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">
                            {item.projectType}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${
                            item.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                            item.status === 'quoted' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                            item.status === 'engineering' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                            item.status === 'reviewing' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                            'bg-slate-800 border-slate-700 text-slate-400'
                          }`}>
                            {statusConfig?.label || item.status}
                          </span>
                        </div>

                        <h5 className="text-white text-sm font-semibold truncate mb-1">
                          {item.companyName}
                        </h5>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="truncate">{item.fullName}</span>
                          <span className="text-[9px] font-mono text-slate-500">
                            {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'Syncing'}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              /* Inline Request Submission for Clients */
              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Full Representative Name</label>
                    <input
                      type="text"
                      placeholder="Jonathan Vance"
                      value={newRequestData.fullName}
                      onChange={(e) => setNewRequestData({ ...newRequestData, fullName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:border-blue-500 focus:ring-0 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Enterprise Corporation</label>
                    <input
                      type="text"
                      placeholder="Vanguard Holdings"
                      value={newRequestData.companyName}
                      onChange={(e) => setNewRequestData({ ...newRequestData, companyName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:border-blue-500 focus:ring-0 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Contact Email</label>
                      <input
                        type="email"
                        placeholder="j.vance@vanguard.com"
                        value={newRequestData.email}
                        onChange={(e) => setNewRequestData({ ...newRequestData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:border-blue-500 focus:ring-0 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 0192"
                        value={newRequestData.phoneNumber}
                        onChange={(e) => setNewRequestData({ ...newRequestData, phoneNumber: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:border-blue-500 focus:ring-0 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">BIM Pipeline Category</label>
                    <select
                      value={newRequestData.projectType}
                      onChange={(e) => setNewRequestData({ ...newRequestData, projectType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-300 focus:border-blue-500 focus:ring-0 outline-none cursor-pointer"
                    >
                      <option>Architectural BIM Modeling</option>
                      <option>Structural Framing & Detailing</option>
                      <option>MEP Engineering Coordination</option>
                      <option>Navisworks Clash Detection</option>
                      <option>Point Cloud Scan-to-BIM</option>
                      <option>Shop Drawing Extraction</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Scope Parameters (LOD target)</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe project square feet, levels, formats..."
                      value={newRequestData.message}
                      onChange={(e) => setNewRequestData({ ...newRequestData, message: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:border-blue-500 focus:ring-0 outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <p className="text-[10px] text-red-400 font-mono">{submitErr}</p>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      REGISTERING INTAKE...
                    </>
                  ) : (
                    "SUBMIT SPECIFICATIONS"
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Active Project Detail & Live Messaging Chat */}
          <div className="lg:col-span-7 flex flex-col bg-slate-950/30">
            {selectedConsultation ? (
              <div className="flex flex-col h-full">
                
                {/* Detail Header & Workflow Timeline */}
                <div className="p-5 border-b border-slate-800/80 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-white text-base font-bold uppercase leading-snug">
                        {selectedConsultation.companyName}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Requested Service: <strong className="text-blue-400">{selectedConsultation.projectType}</strong>
                      </p>
                    </div>

                    {/* Admin Status Modifier */}
                    {isAdmin ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-slate-500 uppercase">Modify:</span>
                        <select
                          disabled={isUpdatingStatus}
                          value={selectedConsultation.status}
                          onChange={(e) => handleUpdateStatus(e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 text-xs text-blue-400 rounded-md py-1 px-2 focus:ring-0 outline-none cursor-pointer"
                        >
                          {STATUS_STEPS.map(step => (
                            <option key={step.key} value={step.key}>{step.label}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">State Check</span>
                        <strong className="text-xs text-emerald-400 uppercase">
                          {STATUS_STEPS.find(s => s.key === selectedConsultation.status)?.label}
                        </strong>
                      </div>
                    )}
                  </div>

                  {/* Flow Steps Progress indicator */}
                  <div className="grid grid-cols-5 gap-1 pt-1">
                    {STATUS_STEPS.map((step, idx) => {
                      const currentIdx = STATUS_STEPS.findIndex(s => s.key === selectedConsultation.status);
                      const isPastOrCurrent = idx <= currentIdx;
                      return (
                        <div key={step.key} className="space-y-1">
                          <div className={`h-1.5 rounded-full transition-all duration-500 ${isPastOrCurrent ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
                          <span className={`block text-[8px] font-mono uppercase text-center truncate ${isPastOrCurrent ? 'text-slate-300 font-bold' : 'text-slate-600'}`}>
                            {step.label.split(' ')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Scope details & client coordinates */}
                <div className="p-5 border-b border-slate-900 bg-slate-950/50 space-y-2 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 truncate"><UserIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" /> {selectedConsultation.fullName}</span>
                    <span className="flex items-center gap-1.5 truncate"><Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" /> {selectedConsultation.email}</span>
                    <span className="flex items-center gap-1.5 truncate"><Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" /> {selectedConsultation.phoneNumber}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Initial Scope Specifications</p>
                    <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-900 leading-relaxed mt-1 font-light italic">
                      "{selectedConsultation.message}"
                    </p>
                  </div>
                </div>

                {/* Chat Log messages */}
                <div className="flex-1 p-5 overflow-y-auto max-h-[220px] min-h-[180px] bg-slate-950/10 space-y-3">
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest text-center border-b border-slate-900/80 pb-2">
                    Start of Secure Engineering Log channel
                  </p>
                  
                  {messages.length === 0 ? (
                    <div className="py-6 text-center text-slate-500 text-xs italic font-light">
                      No communications registered yet. Send a message to initiate discussion.
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMe = msg.authorId === user.uid;
                      const isAdminMsg = msg.authorRole === 'admin';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col max-w-[85%] text-left ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                        >
                          <div className="flex items-center gap-1.5 mb-0.5 text-[9px] font-mono text-slate-500">
                            <span>{msg.authorName}</span>
                            <span className={`px-1 rounded-sm text-[8px] ${isAdminMsg ? 'bg-blue-900/40 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                              {msg.authorRole.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className={`p-3 rounded-xl text-xs leading-relaxed ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'}`}>
                            {msg.message}
                          </div>
                          
                          <span className="text-[8px] font-mono text-slate-600 mt-0.5">
                            {msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Syncing'}
                          </span>
                        </div>
                      );
                    })
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Send message box */}
                <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2">
                  <input
                    type="text"
                    required
                    disabled={isSendingMsg}
                    placeholder="Type a design parameter, query or coordinate update..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg py-2 px-4 text-xs text-white focus:border-blue-500 focus:ring-0 outline-none placeholder-slate-600"
                  />
                  <button
                    type="submit"
                    disabled={isSendingMsg || !newMessage.trim()}
                    className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-850 disabled:text-slate-500 rounded-lg text-white transition-all cursor-pointer"
                  >
                    {isSendingMsg ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-12 h-full text-slate-500 space-y-3 py-24">
                <MessageSquare className="w-12 h-12 text-slate-800" />
                <h5 className="text-slate-400 font-semibold uppercase tracking-wider text-xs">No Project Envelope Selected</h5>
                <p className="text-slate-500 text-xs max-w-xs font-light leading-relaxed">
                  Select a registered BIM consultation request from the side list to check status, review blueprints, or talk directly to our structural modelers.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
