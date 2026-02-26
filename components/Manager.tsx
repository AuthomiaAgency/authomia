import React, { useState, useEffect } from 'react';
import { 
  Lock, Save, Trash2, Plus, LogOut, FileText, Users, BarChart2, 
  ExternalLink, Link, Image as ImageIcon, Send, ArrowRight, Palette, 
  X, LayoutGrid, Settings, Search, ChevronRight, MoreVertical, 
  Code, Quote, Video, Type, Minus, GripVertical, CheckCircle2,
  Menu, Activity, Eye, Clock, TrendingUp, Edit2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// --- TYPES ---
interface Partner {
  id: string;
  companyName: string;
  personName: string;
  quote: string;
  image: string;
  website: string;
  bio: string;
  borderColor?: 'white' | 'red' | 'blue' | 'green' | 'gold';
  socialLinks: string[];
  customButtons?: { label: string; url: string; color?: string }[];
}

interface PublicationBlock {
  id: string; // Added ID for drag/drop stability
  type: 'text' | 'image' | 'button' | 'heading' | 'h2' | 'h3' | 'h4' | 'quote' | 'video' | 'divider' | 'code' | 'rich_link';
  content: string;
  extra?: string;
  buttonColor?: string;
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
}

interface PublicationGroup {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

interface Publication {
  id: string;
  title: string;
  titleAlign?: 'left' | 'center' | 'right' | 'justify';
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  groupId?: string;
  coverPosition?: string;
  relatedPosts?: string[];
  authorId?: string;
  date: string;
  updatedDate?: string;
  coverImage: string;
  excerpt: string;
  blocks: PublicationBlock[];
  status: 'published' | 'draft';
}

interface JobApplication {
  id: string;
  name: string;
  email: string;
  specialty: string;
  pastProjects: string;
  cvUrl?: string;
  date: string;
}

interface SurveyQuestion {
  id: string;
  type: 'text' | 'choice' | 'email' | 'info' | 'button' | 'rating' | 'date' | 'dropdown' | 'checkbox';
  question: string;
  options?: string[];
  url?: string;
}

interface SurveyResponse {
  date: string;
  answers: Record<string, string>;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  introTitle?: string;
  introDescription?: string;
  introButtonLabel?: string;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  ctaLabel?: string;
  ctaLink?: string;
}

interface MaterialLead {
  email: string;
  date: string;
}

interface Material {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  type: string;
  leads: MaterialLead[];
}

interface TeamMember {
  id: string;
  email: string;
  password?: string; // Stored in plain text for simplicity in this prototype
  role: 'admin' | 'socio' | 'writer';
}

interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  profileUrl: string;
  teamMemberId?: string;
}

interface ActionLog {
  id: string;
  user: string;
  action: string;
  target: string;
  date: string;
}

// --- COMPONENT ---
const Manager: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSocio, setIsSocio] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'publications' | 'analytics' | 'partners' | 'surveys' | 'materials' | 'applications' | 'team'>('publications');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // DATA STATES
  const [partners, setPartners] = useState<Partner[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [publicationGroups, setPublicationGroups] = useState<PublicationGroup[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [currentUser, setCurrentUser] = useState<TeamMember | null>(null);

  // EDITING STATES
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [editingGroup, setEditingGroup] = useState<PublicationGroup | null>(null);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [editorTab, setEditorTab] = useState<'content' | 'analytics'>('content');
  const [pubTab, setPubTab] = useState<'posts' | 'groups'>('posts');
  const [searchQuery, setSearchQuery] = useState('');

  // LOAD DATA
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setIsAuthenticated(true);
      else setIsAuthenticated(false);
    });

    const loadData = async () => {
      try {
        const pDoc = await getDoc(doc(db, 'appData', 'partners'));
        if (pDoc.exists()) setPartners(pDoc.data().items || []);

        const pubDoc = await getDoc(doc(db, 'appData', 'publications'));
        if (pubDoc.exists()) setPublications(pubDoc.data().items || []);

        const pubGroupDoc = await getDoc(doc(db, 'appData', 'publicationGroups'));
        if (pubGroupDoc.exists()) setPublicationGroups(pubGroupDoc.data().items || []);

        const sDoc = await getDoc(doc(db, 'appData', 'surveys'));
        if (sDoc.exists()) setSurveys(sDoc.data().items || []);

        const mDoc = await getDoc(doc(db, 'appData', 'materials'));
        if (mDoc.exists()) setMaterials(mDoc.data().items || []);

        const appDoc = await getDoc(doc(db, 'appData', 'applications'));
        if (appDoc.exists()) setApplications(appDoc.data().items || []);

        const teamDoc = await getDoc(doc(db, 'appData', 'team'));
        if (teamDoc.exists()) setTeamMembers(teamDoc.data().items || []);

        const authorsDoc = await getDoc(doc(db, 'appData', 'authors'));
        if (authorsDoc.exists()) setAuthors(authorsDoc.data().items || []);

        const logsDoc = await getDoc(doc(db, 'appData', 'actionLogs'));
        if (logsDoc.exists()) setActionLogs(logsDoc.data().items || []);
      } catch (e) {
        console.error("Error loading data", e);
      }
    };
    loadData();
    return () => unsubscribe();
  }, []);

  // SAVE HELPERS
  const saveToStorage = async (collection: string, data: any[], setter: any) => {
    if (!auth.currentUser && !isSocio) return;
    setter(data);
    await setDoc(doc(db, 'appData', collection), { items: data });
  };

  const logAction = async (action: string, target: string) => {
    const user = currentUser ? currentUser.email : (auth.currentUser?.email || 'Admin');
    const newLog: ActionLog = {
      id: Date.now().toString(),
      user,
      action,
      target,
      date: new Date().toISOString()
    };
    const newLogs = [newLog, ...actionLogs].slice(0, 100); // Keep last 100
    await saveToStorage('actionLogs', newLogs, setActionLogs);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // --- SMART PASTE ENGINE ---
  const handleSmartPaste = async (mode: 'split' | 'single' = 'split') => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;

      const newBlocks: PublicationBlock[] = [];

      if (mode === 'single') {
         newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'text', content: text });
      } else {
         const lines = text.split('\n');
         let inCodeBlock = false;
         let codeContent = '';
         let currentTextBlock = '';

         for (const line of lines) {
           const trimmed = line.trim();
           
           // Code Block Detection
           if (trimmed.startsWith('```')) {
             if (currentTextBlock) {
                newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'text', content: currentTextBlock });
                currentTextBlock = '';
             }
             if (inCodeBlock) {
               // End of code block
               newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'code', content: codeContent });
               codeContent = '';
               inCodeBlock = false;
             } else {
               // Start of code block
               inCodeBlock = true;
             }
             continue;
           }

           if (inCodeBlock) {
             codeContent += line + '\n';
             continue;
           }

           if (!trimmed) {
              if (currentTextBlock) {
                 newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'text', content: currentTextBlock });
                 currentTextBlock = '';
              }
              continue;
           }

           // Markdown Detection
           if (trimmed.startsWith('# ') || trimmed.startsWith('## ') || trimmed.startsWith('### ') || trimmed.startsWith('#### ') || trimmed.startsWith('> ') || trimmed.startsWith('---')) {
              if (currentTextBlock) {
                 newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'text', content: currentTextBlock });
                 currentTextBlock = '';
              }
              
              if (trimmed.startsWith('# ')) newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'heading', content: trimmed.replace('# ', '') });
              else if (trimmed.startsWith('## ')) newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'h2', content: trimmed.replace('## ', '') });
              else if (trimmed.startsWith('### ')) newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'h3', content: trimmed.replace('### ', '') });
              else if (trimmed.startsWith('#### ')) newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'h4', content: trimmed.replace('#### ', '') });
              else if (trimmed.startsWith('> ')) newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'quote', content: trimmed.replace('> ', '') });
              else if (trimmed.startsWith('---')) newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'divider', content: '' });
           } else {
              currentTextBlock += (currentTextBlock ? '\n' : '') + line;
           }
         }
         if (currentTextBlock) {
            newBlocks.push({ id: Date.now() + Math.random().toString(), type: 'text', content: currentTextBlock });
         }
      }

      if (editingPub) {
        setEditingPub({ ...editingPub, blocks: [...editingPub.blocks, ...newBlocks] });
      }
    } catch (err) {
      alert('Clipboard access denied. Please allow permissions.');
    }
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
       <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,16,158,0.1)_0%,transparent_50%)] pointer-events-none" />
        <div className="w-full max-w-md bg-[#050505]/80 backdrop-blur-xl border border-white/10 p-12 rounded-2xl shadow-2xl relative z-10">
          <div className="flex justify-center mb-10">
             <div className="p-5 rounded-full bg-white/5 border border-white/10 animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <Lock className="w-8 h-8 text-authomia-blueLight" />
             </div>
          </div>
          <h1 className="text-2xl font-light text-center text-white mb-2 tracking-tight">Authomia Manager</h1>
          <p className="text-xs text-center text-white/40 font-mono mb-10 uppercase tracking-widest">System Access v2.0</p>
          
          <form onSubmit={async (e) => { 
            e.preventDefault(); 
            try { 
              await signInWithEmailAndPassword(auth, email, password);
              const adminUser = teamMembers.find(m => m.email === email) || { id: 'admin', email, role: 'admin' } as TeamMember;
              setCurrentUser(adminUser);
            } catch(err) { 
              // Fallback to Team Members (Socios)
              const socio = teamMembers.find(m => m.email === email && m.password === password);
              if (socio) {
                setIsAuthenticated(true);
                setIsSocio(true);
                setCurrentUser(socio);
              } else {
                setError('Invalid Credentials'); 
              }
            } 
          }} className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">Identity</label>
               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-mono text-sm focus:border-authomia-blueLight focus:bg-white/10 outline-none transition-all" placeholder="admin@authomia.com" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">Key</label>
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-mono text-sm focus:border-authomia-blueLight focus:bg-white/10 outline-none transition-all" placeholder="••••••••" />
            </div>
            {error && <p className="text-red-400 text-xs text-center font-mono bg-red-500/10 py-2 rounded border border-red-500/20">{error}</p>}
            <button type="submit" className="w-full bg-white text-black py-4 rounded-lg font-mono text-xs uppercase tracking-widest hover:bg-authomia-blueLight hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-authomia-blue/20">
               Authenticate <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN LAYOUT ---
  return (
    <div className="flex h-screen bg-[#020202] text-white font-sans overflow-hidden selection:bg-authomia-blue selection:text-white">
      
      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-[#050505] border-r border-white/5 flex flex-col transition-all duration-300 relative z-50`}>
        <div className="p-6 flex items-center gap-4 border-b border-white/5 h-20">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0 cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <div className="w-3 h-3 bg-authomia-blueLight rounded-full shadow-[0_0_10px_#4F46E5]" />
          </div>
          {sidebarOpen && <span className="font-mono text-sm tracking-widest font-bold text-white/90">AUTHOMIA</span>}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'publications', icon: FileText, label: 'Publicaciones' },
            { id: 'partners', icon: Users, label: 'Partners' },
            { id: 'surveys', icon: LayoutGrid, label: 'Encuestas' },
            { id: 'materials', icon: BarChart2, label: 'Materiales' },
            { id: 'applications', icon: Send, label: 'Postulantes' },
            { id: 'team', icon: Lock, label: 'Equipo / Socios' },
            { id: 'authors', icon: Edit2, label: 'Autores' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all group ${activeTab === item.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-authomia-blueLight' : 'group-hover:text-white transition-colors'} />
              {sidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              {activeTab === item.id && sidebarOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-authomia-blueLight" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => signOut(auth)} className="w-full flex items-center gap-4 p-3 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-mono uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#020202] relative">
        {/* TOP BAR */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#020202]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-light text-white capitalize">{activeTab}</h2>
            <div className="h-4 w-[1px] bg-white/10" />
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Workspace</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white focus:border-authomia-blueLight outline-none w-64 transition-all"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-authomia-blue to-purple-600 border border-white/20 shadow-[0_0_15px_rgba(79,70,229,0.3)]" />
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          
          {/* --- PUBLICATIONS TAB --- */}
          {activeTab === 'publications' && (
            <div className="h-full flex flex-col">
              {!editingPub && !editingGroup ? (
                <div className="space-y-8">
                  <div className="flex gap-4 border-b border-white/10 pb-4">
                    <button onClick={() => setPubTab('posts')} className={`text-xs font-mono uppercase tracking-widest px-6 py-2 rounded-full transition-all ${pubTab === 'posts' ? 'bg-white text-black' : 'text-white/40 hover:text-white border border-white/10'}`}>Posts</button>
                    <button onClick={() => setPubTab('groups')} className={`text-xs font-mono uppercase tracking-widest px-6 py-2 rounded-full transition-all ${pubTab === 'groups' ? 'bg-white text-black' : 'text-white/40 hover:text-white border border-white/10'}`}>Groups</button>
                  </div>

                  {pubTab === 'posts' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {/* New Post Card */}
                      <button 
                        onClick={() => setEditingPub({ id: Date.now().toString(), title: 'Untitled Draft', date: new Date().toISOString().split('T')[0], coverImage: '', excerpt: '', blocks: [], status: 'draft' })}
                        className="group relative aspect-[4/5] rounded-xl border border-dashed border-white/10 hover:border-authomia-blueLight/50 hover:bg-authomia-blueLight/5 transition-all flex flex-col items-center justify-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plus className="text-white/50 group-hover:text-authomia-blueLight" />
                        </div>
                        <span className="font-mono text-xs uppercase tracking-widest text-white/40 group-hover:text-white">Create New</span>
                      </button>

                      {/* Post Cards */}
                      {publications.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                        <div key={p.id} onClick={() => {
                          if (currentUser?.role === 'writer' && p.authorId !== currentUser.id) {
                            alert('No tienes permiso para editar esta publicación.');
                            return;
                          }
                          setEditingPub(p);
                        }} className="group relative aspect-[4/5] bg-[#0A0A0A] rounded-xl border border-white/5 hover:border-white/20 overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-2xl">
                          <div className="h-1/2 w-full bg-white/5 relative overflow-hidden">
                            {p.coverImage ? (
                              <img src={p.coverImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" alt="" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-white/10 w-12 h-12" /></div>
                            )}
                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-mono uppercase tracking-widest border border-white/10">
                              {p.status || 'Draft'}
                            </div>
                          </div>
                          <div className="p-6 flex flex-col justify-between h-1/2">
                            <div>
                              <h3 className="text-lg font-medium text-white leading-tight mb-2 line-clamp-2 group-hover:text-authomia-blueLight transition-colors">{p.title}</h3>
                              <p className="text-xs text-white/40 line-clamp-3 leading-relaxed">{p.excerpt || 'No excerpt provided...'}</p>
                            </div>
                            <div className="flex justify-between items-end border-t border-white/5 pt-4">
                              <span className="text-[10px] font-mono text-white/30">{p.date}</span>
                              <button onClick={(e) => { 
                                e.stopPropagation(); 
                                if (currentUser?.role === 'writer' && p.authorId !== currentUser.id) {
                                  alert('No tienes permiso para eliminar esta publicación.');
                                  return;
                                }
                                if(confirm('Delete post?')) {
                                  saveToStorage('publications', publications.filter(x => x.id !== p.id), setPublications); 
                                  logAction('eliminó publicación', p.title);
                                }
                              }} className="text-white/20 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Groups Grid
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <button 
                        onClick={() => setEditingGroup({ id: Date.now().toString(), title: 'New Group', slug: '', description: '', coverImage: '' })}
                        className="h-40 rounded-xl border border-dashed border-white/10 hover:border-authomia-blueLight/50 hover:bg-authomia-blueLight/5 transition-all flex items-center justify-center gap-2 font-mono text-xs uppercase text-white/40 hover:text-white"
                      >
                        <Plus size={16} /> New Group
                      </button>
                      {publicationGroups.map(g => (
                        <div key={g.id} onClick={() => setEditingGroup(g)} className="h-40 bg-[#0A0A0A] rounded-xl border border-white/5 p-6 flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all">
                          <h3 className="font-bold text-lg">{g.title}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-white/40">/{g.slug}</span>
                            <button onClick={(e) => { e.stopPropagation(); saveToStorage('publicationGroups', publicationGroups.filter(x => x.id !== g.id), setPublicationGroups); }} className="text-white/20 hover:text-red-500"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : editingPub ? (
                // --- EDITOR INTERFACE ---
                <div className="flex flex-col h-full max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between mb-8 bg-[#020202]/90 backdrop-blur-xl z-30 py-4 border-b border-white/5">
                    <button onClick={() => setEditingPub(null)} className="text-xs font-mono text-white/40 hover:text-white flex items-center gap-2 transition-colors">
                      <ArrowRight className="rotate-180" size={14} /> BACK TO DASHBOARD
                    </button>

                    <div className="flex items-center gap-4">
                      <span className="text-xs text-white/30 font-mono">{editingPub.blocks.length} blocks</span>
                      <button 
                        onClick={() => {
                           // Slug validation
                           if (editingPub.slug && !/^[a-z0-9-]+$/.test(editingPub.slug)) {
                              alert("El slug solo puede contener letras minúsculas, números y guiones (-).");
                              return;
                           }
                           const exists = publications.find(p => p.id === editingPub.id);
                           const updatedPub = { ...editingPub, updatedDate: new Date().toISOString().split('T')[0] };
                           const newPubs = exists ? publications.map(p => p.id === editingPub.id ? updatedPub : p) : [...publications, updatedPub];
                           saveToStorage('publications', newPubs, setPublications);
                           logAction(exists ? 'editó publicación' : 'creó publicación', editingPub.title);
                           setEditingPub(null);
                        }}
                        className="bg-white text-black px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-authomia-blueLight hover:text-white transition-all flex items-center gap-2"
                      >
                        <Save size={14} /> Save & Close
                      </button>
                    </div>
                  </div>

                  {/* Document Canvas */}
                  <div className="flex-1 space-y-8 pb-32">
                      <>
                        {/* Meta Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                          <div className="md:col-span-2 space-y-6">
                            <div className="flex gap-2 mb-2">
                               {['left', 'center', 'right', 'justify'].map((align) => (
                                  <button 
                                     key={align}
                                     onClick={() => setEditingPub({...editingPub, titleAlign: align as any})}
                                     className={`p-2 rounded border border-white/10 ${editingPub.titleAlign === align ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                                     title={`Align Title ${align}`}
                                  >
                                     {align === 'left' && <AlignLeft size={14} />}
                                     {align === 'center' && <AlignCenter size={14} />}
                                     {align === 'right' && <AlignRight size={14} />}
                                     {align === 'justify' && <AlignJustify size={14} />}
                                  </button>
                               ))}
                            </div>
                            <input 
                              className={`w-full bg-transparent text-4xl md:text-5xl font-bold text-white placeholder-white/20 outline-none leading-tight text-${editingPub.titleAlign || 'left'}`} 
                              placeholder="Untitled Publication" 
                              value={editingPub.title} 
                              onChange={e => setEditingPub({...editingPub, title: e.target.value})} 
                            />
                            <textarea 
                              className="w-full bg-transparent text-lg text-white/60 placeholder-white/20 outline-none resize-none h-24 leading-relaxed" 
                              placeholder="Add a short excerpt or summary..." 
                              value={editingPub.excerpt} 
                              onChange={e => setEditingPub({...editingPub, excerpt: e.target.value})} 
                            />
                          </div>
                          <div className="space-y-4 bg-[#0A0A0A] p-6 rounded-xl border border-white/5">
                            <div className="aspect-video bg-white/5 rounded-lg overflow-hidden relative group cursor-pointer border border-white/5 hover:border-white/20 transition-all">
                              {editingPub.coverImage ? (
                                <img src={editingPub.coverImage} className="w-full h-full object-cover" alt="Cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20"><ImageIcon /></div>
                              )}
                              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, (base64) => setEditingPub({...editingPub, coverImage: base64}))} />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-xs font-mono text-white">CHANGE COVER</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <input type="date" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none" value={editingPub.date} onChange={e => setEditingPub({...editingPub, date: e.target.value})} />
                              <select className="bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none" value={editingPub.groupId || ''} onChange={e => setEditingPub({...editingPub, groupId: e.target.value})}>
                                <option value="">No Group</option>
                                {publicationGroups.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
                              </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Banner Position</label>
                                 <input className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none" placeholder="e.g. center, 50% 20%" value={editingPub.coverPosition || ''} onChange={e => setEditingPub({...editingPub, coverPosition: e.target.value})} />
                              </div>
                              <div className="space-y-1">
                                 <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Author Profile</label>
                                 <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none" value={editingPub.authorId || ''} onChange={e => setEditingPub({...editingPub, authorId: e.target.value})}>
                                    <option value="">Authomia AI (Default)</option>
                                    {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                 </select>
                              </div>
                            </div>
                            <div className="space-y-1">
                               <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Related Posts (Max 3)</label>
                               <div className="flex flex-wrap gap-2 mb-2">
                                  {(editingPub.relatedPosts || []).map(rpId => {
                                     const p = publications.find(x => x.id === rpId);
                                     return p ? (
                                        <div key={rpId} className="bg-white/10 text-xs px-2 py-1 rounded flex items-center gap-1">
                                           <span className="truncate max-w-[100px]">{p.title}</span>
                                           <button onClick={() => setEditingPub({...editingPub, relatedPosts: editingPub.relatedPosts?.filter(id => id !== rpId)})} className="text-white/50 hover:text-red-400"><X size={10}/></button>
                                        </div>
                                     ) : null;
                                  })}
                               </div>
                               <select 
                                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none" 
                                  onChange={e => {
                                     const val = e.target.value;
                                     if (val && !(editingPub.relatedPosts || []).includes(val) && (editingPub.relatedPosts || []).length < 3) {
                                        setEditingPub({...editingPub, relatedPosts: [...(editingPub.relatedPosts || []), val]});
                                     }
                                     e.target.value = "";
                                  }}
                               >
                                  <option value="">Add related post...</option>
                                  {publications.filter(p => p.id !== editingPub.id && !(editingPub.relatedPosts || []).includes(p.id)).map(p => (
                                     <option key={p.id} value={p.id}>{p.title}</option>
                                  ))}
                               </select>
                            </div>
                            <div className="pt-4 border-t border-white/5">
                               <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">SEO Preview</h4>
                               <input className="w-full bg-transparent border-b border-white/10 py-1 text-xs text-white mb-2 focus:border-authomia-blueLight outline-none" placeholder="URL Slug" value={editingPub.slug || ''} onChange={e => setEditingPub({...editingPub, slug: e.target.value})} />
                               <input className="w-full bg-transparent border-b border-white/10 py-1 text-xs text-white focus:border-authomia-blueLight outline-none" placeholder="Meta Title" value={editingPub.seoTitle || ''} onChange={e => setEditingPub({...editingPub, seoTitle: e.target.value})} />
                            </div>
                          </div>
                        </div>

                        {/* Blocks Area */}
                        <div className="space-y-2 relative min-h-[500px]">
                          {editingPub.blocks.map((block, idx) => (
                            <div key={block.id || idx} className="group relative pl-12 pr-4 py-2 hover:bg-white/[0.02] rounded-lg transition-colors">
                              {/* Block Controls */}
                              <div className="absolute left-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                <button className="text-white/20 hover:text-white cursor-grab active:cursor-grabbing"><GripVertical size={14} /></button>
                                <button onClick={() => { const newBlocks = [...editingPub.blocks]; newBlocks.splice(idx, 1); setEditingPub({...editingPub, blocks: newBlocks}); }} className="text-white/20 hover:text-red-500"><Trash2 size={14} /></button>
                              </div>

                              {/* Block Content Renderers */}
                              {block.type === 'heading' && <input className="w-full bg-transparent text-3xl font-bold text-white outline-none placeholder-white/20" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Heading 1" autoFocus />}
                              {block.type === 'h2' && <input className="w-full bg-transparent text-2xl font-semibold text-white outline-none placeholder-white/20" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Heading 2" autoFocus />}
                              {block.type === 'h3' && <input className="w-full bg-transparent text-xl font-medium text-white outline-none placeholder-white/20" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Heading 3" autoFocus />}
                              {block.type === 'h4' && <input className="w-full bg-transparent text-lg font-medium text-white outline-none placeholder-white/20" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Heading 4" autoFocus />}
                              
                              {block.type === 'text' && (
                                <textarea 
                                  className="w-full bg-transparent text-base text-white/80 leading-relaxed outline-none resize-none overflow-hidden text-justify" 
                                  value={block.content} 
                                  onChange={e => { 
                                    const newBlocks = [...editingPub.blocks]; 
                                    newBlocks[idx].content = e.target.value; 
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                    setEditingPub({...editingPub, blocks: newBlocks}); 
                                  }} 
                                  placeholder="Type something..." 
                                  rows={1}
                                  style={{ height: 'auto' }}
                                />
                              )}

                              {block.type === 'quote' && (
                                <div className="flex gap-4 border-l-2 border-authomia-blueLight pl-4 py-2">
                                  <Quote className="text-authomia-blueLight shrink-0" size={20} />
                                  <div className="w-full space-y-2">
                                    <textarea className="w-full bg-transparent text-lg italic text-white/90 outline-none resize-none" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Quote text..." rows={1} />
                                    <input className="w-full bg-transparent text-xs text-white/50 outline-none" value={block.extra || ''} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].extra = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Author (Optional)" />
                                  </div>
                                </div>
                              )}

                              {block.type === 'code' && (
                                <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 font-mono text-sm relative group/code">
                                  <div className="absolute top-2 right-2 text-xs text-white/30 uppercase">Code</div>
                                  <textarea 
                                    className="w-full bg-transparent text-authomia-blueLight outline-none resize-none" 
                                    value={block.content} 
                                    onChange={e => { 
                                      const newBlocks = [...editingPub.blocks]; 
                                      newBlocks[idx].content = e.target.value; 
                                      e.target.style.height = 'auto';
                                      e.target.style.height = e.target.scrollHeight + 'px';
                                      setEditingPub({...editingPub, blocks: newBlocks}); 
                                    }} 
                                    placeholder="Paste code here..." 
                                    rows={3}
                                  />
                                </div>
                              )}

                              {block.type === 'image' && (
                                <div className="relative group/img">
                                  {block.content ? (
                                    <img src={block.content} className="w-full rounded-lg border border-white/10" alt="Block" />
                                  ) : (
                                    <div className="w-full h-32 bg-white/5 border border-dashed border-white/10 rounded-lg flex items-center justify-center text-white/30">
                                      Image Placeholder
                                    </div>
                                  )}
                                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                    <input className="w-64 bg-black/80 text-white text-xs p-2 rounded border border-white/20 outline-none" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Image URL..." />
                                    <label className="p-2 bg-authomia-blue text-white rounded cursor-pointer hover:bg-authomia-blueLight"><ImageIcon size={14} /><input type="file" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = base64; setEditingPub({...editingPub, blocks: newBlocks}); })} /></label>
                                  </div>
                                </div>
                              )}

                              {block.type === 'video' && (
                                <div className="relative group/vid bg-[#0A0A0A] border border-white/10 rounded-lg p-4">
                                   <div className="absolute top-2 right-2 text-xs text-white/30 uppercase">YouTube Video</div>
                                   <input className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none mb-2" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="YouTube Embed URL (e.g. https://www.youtube.com/embed/dQw4w9WgXcQ)" />
                                   {block.content && (
                                      <div className="aspect-video rounded overflow-hidden border border-white/10">
                                         <iframe src={block.content} className="w-full h-full" allowFullScreen />
                                      </div>
                                   )}
                                </div>
                              )}

                              {block.type === 'button' && (
                                <div className="relative group/btn bg-[#0A0A0A] border border-white/10 rounded-lg p-4">
                                   <div className="absolute top-2 right-2 text-xs text-white/30 uppercase">Custom Button</div>
                                   <div className="grid grid-cols-2 gap-4 mb-4">
                                      <input className="bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Button Label" />
                                      <input className="bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none" value={block.extra || ''} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].extra = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Button URL" />
                                      <input className="bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none" value={block.buttonColor || ''} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].buttonColor = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Color Hex (e.g. #0A109E)" />
                                      <select className="bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none" value={block.icon || ''} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].icon = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }}>
                                         <option value="">No Icon</option>
                                         <option value="ArrowRight">Arrow Right</option>
                                         <option value="Lock">Lock</option>
                                         <option value="Calendar">Calendar</option>
                                      </select>
                                   </div>
                                   <div className="flex justify-center">
                                      <button className="px-8 py-3 rounded-full text-sm font-mono flex items-center gap-2" style={{ backgroundColor: block.buttonColor || '#0A109E', color: '#fff' }}>
                                         {block.content || 'Button Preview'}
                                      </button>
                                   </div>
                                </div>
                              )}

                              {block.type === 'rich_link' && (
                                <div className="relative group/rich bg-[#0A0A0A] border border-white/10 rounded-lg p-4">
                                   <div className="absolute top-2 right-2 text-xs text-white/30 uppercase">Rich Link / Bookmark</div>
                                   <div className="grid grid-cols-1 gap-4 mb-4">
                                      <input className="bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none" value={block.extra || ''} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].extra = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Target URL (e.g. https://example.com)" />
                                      <input className="bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none" value={block.title || ''} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].title = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Link Title (Optional)" />
                                      <input className="bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none" value={block.description || ''} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].description = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Link Description (Optional)" />
                                      <div className="flex gap-2">
                                        <input className="flex-1 bg-white/5 border border-white/10 rounded p-2 text-xs text-white outline-none" value={block.image || ''} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].image = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Preview Image URL (Optional)" />
                                        <label className="p-2 bg-white/10 rounded cursor-pointer hover:bg-white/20 flex items-center justify-center"><ImageIcon size={16} /><input type="file" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].image = base64; setEditingPub({...editingPub, blocks: newBlocks}); })} /></label>
                                      </div>
                                   </div>
                                   <div className="border border-white/10 rounded-xl overflow-hidden flex flex-col sm:flex-row bg-white/5">
                                      {block.image && <img src={block.image} className="w-full sm:w-48 h-32 object-cover" alt="Preview" />}
                                      <div className="p-4 flex flex-col justify-center">
                                         <h4 className="font-bold text-white mb-1">{block.title || 'Link Title Preview'}</h4>
                                         <p className="text-xs text-white/60 line-clamp-2 mb-2">{block.description || 'Link description preview will appear here...'}</p>
                                         <span className="text-[10px] font-mono text-authomia-blueLight truncate">{block.extra || 'https://example.com'}</span>
                                      </div>
                                   </div>
                                </div>
                              )}

                              {block.type === 'divider' && <div className="w-full h-px bg-white/10 my-4" />}
                            </div>
                          ))}

                          {/* Add Block Bar */}
                          <div className="sticky bottom-8 flex justify-center mt-8">
                            <div className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center gap-2 shadow-2xl">
                              <button onClick={handleSmartPaste} className="px-4 py-2 rounded-full bg-authomia-blue/10 text-authomia-blueLight hover:bg-authomia-blue hover:text-white transition-all text-xs font-mono uppercase flex items-center gap-2">
                                <Code size={14} /> Smart Paste
                              </button>
                              <div className="w-[1px] h-6 bg-white/10 mx-2" />
                              <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { id: Date.now().toString(), type: 'text', content: '' }]})} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Text"><Type size={18} /></button>
                              <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { id: Date.now().toString(), type: 'heading', content: '' }]})} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Heading"><span className="font-bold text-sm">H1</span></button>
                              <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { id: Date.now().toString(), type: 'image', content: '' }]})} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Image"><ImageIcon size={18} /></button>
                              <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { id: Date.now().toString(), type: 'video', content: '' }]})} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Video"><Video size={18} /></button>
                              <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { id: Date.now().toString(), type: 'button', content: 'Click Here' }]})} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Button"><Link size={18} /></button>
                              <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { id: Date.now().toString(), type: 'rich_link', content: '' }]})} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Rich Link"><ExternalLink size={18} /></button>
                              <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { id: Date.now().toString(), type: 'code', content: '' }]})} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Code"><Code size={18} /></button>
                              <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { id: Date.now().toString(), type: 'quote', content: '' }]})} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Quote"><Quote size={18} /></button>
                              <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { id: Date.now().toString(), type: 'divider', content: '' }]})} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Divider"><Minus size={18} /></button>
                            </div>
                          </div>
                        </div>
                      </>
                  </div>
                </div>
              ) : editingGroup ? (
                // Group Editor
                <div className="max-w-2xl mx-auto w-full pt-12">
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-light">Editing Group</h2>
                      <button onClick={() => setEditingGroup(null)} className="text-white/40 hover:text-white"><X /></button>
                   </div>
                   <div className="space-y-6 bg-[#0A0A0A] p-8 rounded-xl border border-white/5">
                      <input className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="Title" value={editingGroup.title} onChange={e => setEditingGroup({...editingGroup, title: e.target.value})} />
                      <input className="w-full bg-white/5 border border-white/10 p-3 rounded text-white font-mono text-sm" placeholder="Slug" value={editingGroup.slug} onChange={e => setEditingGroup({...editingGroup, slug: e.target.value})} />
                      <textarea className="w-full bg-white/5 border border-white/10 p-3 rounded text-white h-32" placeholder="Description" value={editingGroup.description} onChange={e => setEditingGroup({...editingGroup, description: e.target.value})} />
                      <div className="space-y-2">
                         <label className="text-xs text-white/50 uppercase">Cover Image</label>
                         <div className="flex gap-2">
                            <input className="flex-1 bg-white/5 border border-white/10 p-2 rounded text-white text-xs" value={editingGroup.coverImage} onChange={e => setEditingGroup({...editingGroup, coverImage: e.target.value})} />
                            <label className="p-2 bg-white/10 rounded cursor-pointer hover:bg-white/20"><ImageIcon size={16} /><input type="file" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => setEditingGroup({...editingGroup, coverImage: base64}))} /></label>
                         </div>
                         {editingGroup.coverImage && <img src={editingGroup.coverImage} className="w-full h-32 object-cover rounded mt-2 border border-white/10" />}
                      </div>
                      <button onClick={() => { 
                         const exists = publicationGroups.find(g => g.id === editingGroup.id);
                         const newGroups = exists ? publicationGroups.map(g => g.id === editingGroup.id ? editingGroup : g) : [...publicationGroups, editingGroup];
                         saveToStorage('publicationGroups', newGroups, setPublicationGroups); setEditingGroup(null);
                      }} className="w-full bg-authomia-blue py-3 rounded font-mono uppercase tracking-widest hover:bg-authomia-blueLight transition-all">Save Group</button>
                   </div>
                </div>
              ) : null}
            </div>
          )}

          {/* --- PARTNERS TAB --- */}
          {activeTab === 'partners' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <button 
                  onClick={() => setEditingPartner({ id: Date.now().toString(), companyName: 'New Partner', personName: '', quote: '', image: '', website: '', bio: '', borderColor: 'white', socialLinks: [], customButtons: [] })}
                  className="h-64 rounded-xl border border-dashed border-white/10 hover:border-authomia-blueLight/50 hover:bg-authomia-blueLight/5 transition-all flex flex-col items-center justify-center gap-4 text-white/40 hover:text-white"
               >
                  <Plus size={24} />
                  <span className="font-mono text-xs uppercase tracking-widest">Add Partner</span>
               </button>
               {partners.map(p => (
                  <div key={p.id} onClick={() => setEditingPartner(p)} className="h-64 bg-[#0A0A0A] rounded-xl border border-white/5 p-6 flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all group relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: p.borderColor === 'red' ? '#B30A0A' : p.borderColor === 'blue' ? '#0A109E' : p.borderColor === 'gold' ? '#FFD700' : 'white' }} />
                     <div className="flex items-center gap-4">
                        <img src={p.image || 'https://via.placeholder.com/50'} className="w-12 h-12 rounded-full object-cover border border-white/10" alt="" />
                        <div>
                           <h3 className="font-bold text-white">{p.companyName}</h3>
                           <p className="text-xs text-white/50">{p.personName}</p>
                        </div>
                     </div>
                     <p className="text-sm text-white/60 line-clamp-3 italic">"{p.quote}"</p>
                     <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <span className="text-[10px] font-mono text-white/30 truncate max-w-[150px]">{p.website}</span>
                        <button onClick={(e) => { e.stopPropagation(); saveToStorage('partners', partners.filter(x => x.id !== p.id), setPartners); }} className="text-white/20 hover:text-red-500"><Trash2 size={14} /></button>
                     </div>
                  </div>
               ))}
               
               {/* Partner Editor Modal */}
               {editingPartner && (
                  <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
                     <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl max-h-full overflow-y-auto rounded-xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                           <h2 className="text-xl font-light">Edit Partner</h2>
                           <button onClick={() => setEditingPartner(null)}><X /></button>
                        </div>
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input className="bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="Company" value={editingPartner.companyName} onChange={e => setEditingPartner({...editingPartner, companyName: e.target.value})} />
                              <input className="bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="Person" value={editingPartner.personName} onChange={e => setEditingPartner({...editingPartner, personName: e.target.value})} />
                           </div>
                           <textarea className="w-full bg-white/5 border border-white/10 p-3 rounded text-white h-24" placeholder="Quote" value={editingPartner.quote} onChange={e => setEditingPartner({...editingPartner, quote: e.target.value})} />
                           <textarea className="w-full bg-white/5 border border-white/10 p-3 rounded text-white h-32" placeholder="Full Bio" value={editingPartner.bio} onChange={e => setEditingPartner({...editingPartner, bio: e.target.value})} />
                           
                           <div className="space-y-2">
                              <label className="text-xs text-white/50 uppercase">Image</label>
                              <div className="flex gap-2">
                                 <input className="flex-1 bg-white/5 border border-white/10 p-2 rounded text-white text-xs" value={editingPartner.image} onChange={e => setEditingPartner({...editingPartner, image: e.target.value})} />
                                 <label className="p-2 bg-white/10 rounded cursor-pointer hover:bg-white/20"><ImageIcon size={16} /><input type="file" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => setEditingPartner({...editingPartner, image: base64}))} /></label>
                              </div>
                           </div>

                           <div className="flex gap-2">
                              {['white', 'red', 'blue', 'green', 'gold'].map(color => (
                                 <button key={color} onClick={() => setEditingPartner({...editingPartner, borderColor: color as any})} className={`w-8 h-8 rounded-full border-2 ${editingPartner.borderColor === color ? 'border-white scale-110' : 'border-transparent opacity-50'}`} style={{ backgroundColor: color === 'white' ? '#fff' : color === 'red' ? '#B30A0A' : color === 'blue' ? '#0A109E' : color === 'green' ? '#10B981' : '#FFD700' }} />
                              ))}
                           </div>

                           <div className="space-y-4 pt-4 border-t border-white/10">
                              <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest">Social Links</h3>
                              {editingPartner.socialLinks.map((link, idx) => (
                                 <div key={idx} className="flex gap-2">
                                    <input className="flex-1 bg-white/5 border border-white/10 p-2 rounded text-white text-xs" value={link} onChange={e => { const newLinks = [...editingPartner.socialLinks]; newLinks[idx] = e.target.value; setEditingPartner({...editingPartner, socialLinks: newLinks}); }} placeholder="https://linkedin.com/..." />
                                    <button onClick={() => { const newLinks = [...editingPartner.socialLinks]; newLinks.splice(idx, 1); setEditingPartner({...editingPartner, socialLinks: newLinks}); }} className="p-2 text-white/30 hover:text-red-500"><Trash2 size={14}/></button>
                                 </div>
                              ))}
                              <button onClick={() => setEditingPartner({...editingPartner, socialLinks: [...editingPartner.socialLinks, '']})} className="text-xs font-mono text-authomia-blueLight hover:underline">+ Add Social Link</button>
                           </div>

                           <div className="space-y-4 pt-4 border-t border-white/10">
                              <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest">Custom Buttons</h3>
                              {(editingPartner.customButtons || []).map((btn, idx) => (
                                 <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded space-y-2 relative">
                                    <button onClick={() => { const newBtns = [...(editingPartner.customButtons || [])]; newBtns.splice(idx, 1); setEditingPartner({...editingPartner, customButtons: newBtns}); }} className="absolute top-2 right-2 text-white/30 hover:text-red-500"><Trash2 size={14}/></button>
                                    <input className="w-full bg-transparent border-b border-white/10 p-1 text-white text-xs outline-none" value={btn.label} onChange={e => { const newBtns = [...(editingPartner.customButtons || [])]; newBtns[idx].label = e.target.value; setEditingPartner({...editingPartner, customButtons: newBtns}); }} placeholder="Button Label" />
                                    <input className="w-full bg-transparent border-b border-white/10 p-1 text-white text-xs outline-none" value={btn.url} onChange={e => { const newBtns = [...(editingPartner.customButtons || [])]; newBtns[idx].url = e.target.value; setEditingPartner({...editingPartner, customButtons: newBtns}); }} placeholder="URL" />
                                    <input className="w-full bg-transparent border-b border-white/10 p-1 text-white text-xs outline-none" value={btn.color || ''} onChange={e => { const newBtns = [...(editingPartner.customButtons || [])]; newBtns[idx].color = e.target.value; setEditingPartner({...editingPartner, customButtons: newBtns}); }} placeholder="Color Hex (e.g. #0A109E)" />
                                 </div>
                              ))}
                              <button onClick={() => setEditingPartner({...editingPartner, customButtons: [...(editingPartner.customButtons || []), { label: 'New Button', url: '' }]})} className="text-xs font-mono text-authomia-blueLight hover:underline">+ Add Custom Button</button>
                           </div>

                           <button onClick={() => { 
                              const exists = partners.find(p => p.id === editingPartner.id);
                              const newPartners = exists ? partners.map(p => p.id === editingPartner.id ? editingPartner : p) : [...partners, editingPartner];
                              saveToStorage('partners', newPartners, setPartners); setEditingPartner(null);
                           }} className="w-full bg-authomia-blue py-3 rounded font-mono uppercase tracking-widest hover:bg-authomia-blueLight transition-all mt-4">Save Partner</button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
          )}

          {/* --- SURVEYS TAB --- */}
          {activeTab === 'surveys' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button 
                   onClick={() => setEditingSurvey({ id: Date.now().toString(), title: 'New Survey', description: '', questions: [], responses: [] })}
                   className="h-40 rounded-xl border border-dashed border-white/10 hover:border-authomia-blueLight/50 hover:bg-authomia-blueLight/5 transition-all flex flex-col items-center justify-center gap-4 text-white/40 hover:text-white"
                >
                   <Plus size={24} />
                   <span className="font-mono text-xs uppercase tracking-widest">Create Survey</span>
                </button>
                {surveys.map(s => (
                   <div key={s.id} onClick={() => setEditingSurvey(s)} className="h-40 bg-[#0A0A0A] rounded-xl border border-white/5 p-6 flex flex-col justify-between cursor-pointer hover:border-white/20 transition-all">
                      <div>
                         <h3 className="font-bold text-white mb-1">{s.title}</h3>
                         <p className="text-xs text-white/50">{s.responses?.length || 0} Responses</p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                         <a href={`/encuesta?id=${s.id}`} target="_blank" onClick={e => e.stopPropagation()} className="text-xs text-authomia-blueLight hover:underline flex items-center gap-1">View Live <ExternalLink size={10} /></a>
                         <button onClick={(e) => { e.stopPropagation(); saveToStorage('surveys', surveys.filter(x => x.id !== s.id), setSurveys); }} className="text-white/20 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                   </div>
                ))}

                {/* Survey Editor Modal */}
                {editingSurvey && (
                   <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
                      <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-4xl h-[90vh] flex flex-col rounded-xl shadow-2xl overflow-hidden">
                         <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#020202]">
                            <h2 className="text-xl font-light">Survey Config</h2>
                            <div className="flex gap-4">
                               <button onClick={() => {
                                  const exists = surveys.find(s => s.id === editingSurvey.id);
                                  const newSurveys = exists ? surveys.map(s => s.id === editingSurvey.id ? editingSurvey : s) : [...surveys, editingSurvey];
                                  saveToStorage('surveys', newSurveys, setSurveys); setEditingSurvey(null);
                               }} className="bg-authomia-blue px-4 py-2 rounded text-xs font-mono uppercase tracking-widest hover:bg-authomia-blueLight">Save</button>
                               <button onClick={() => setEditingSurvey(null)}><X /></button>
                            </div>
                         </div>
                         <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="space-y-4">
                               <input className="w-full bg-white/5 border border-white/10 p-3 rounded text-white text-lg font-bold" placeholder="Survey Title" value={editingSurvey.title} onChange={e => setEditingSurvey({...editingSurvey, title: e.target.value})} />
                               <textarea className="w-full bg-white/5 border border-white/10 p-3 rounded text-white h-20" placeholder="Description" value={editingSurvey.description} onChange={e => setEditingSurvey({...editingSurvey, description: e.target.value})} />
                            </div>
                            
                            <div className="space-y-4">
                               <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Questions</h3>
                               {editingSurvey.questions.map((q, idx) => (
                                  <div key={idx} className="p-4 border border-white/10 bg-white/[0.02] rounded relative group">
                                     <button onClick={() => { const newQ = [...editingSurvey.questions]; newQ.splice(idx, 1); setEditingSurvey({...editingSurvey, questions: newQ}); }} className="absolute top-2 right-2 text-white/20 hover:text-red-500"><X size={14} /></button>
                                     <div className="flex gap-4 mb-2">
                                        <select className="bg-black border border-white/10 text-white text-xs uppercase p-1 rounded" value={q.type} onChange={(e) => { const newQ = [...editingSurvey.questions]; newQ[idx].type = e.target.value as any; setEditingSurvey({...editingSurvey, questions: newQ}); }}>
                                           <option value="text">Text Input</option>
                                           <option value="email">Email Input</option>
                                           <option value="choice">Multiple Choice</option>
                                           <option value="info">Info Text</option>
                                           <option value="rating">Rating (1-5)</option>
                                           <option value="date">Date Picker</option>
                                           <option value="dropdown">Dropdown</option>
                                           <option value="checkbox">Checkboxes</option>
                                        </select>
                                     </div>
                                     <input className="w-full bg-transparent border-b border-white/10 outline-none text-white mb-2 pb-1" value={q.question} onChange={e => { const newQ = [...editingSurvey.questions]; newQ[idx].question = e.target.value; setEditingSurvey({...editingSurvey, questions: newQ}); }} placeholder="Question text..." />
                                     {(q.type === 'choice' || q.type === 'dropdown' || q.type === 'checkbox') && (
                                        <input className="w-full bg-white/5 p-2 text-xs text-white/70 rounded" value={q.options?.join(',') || ''} onChange={e => { const newQ = [...editingSurvey.questions]; newQ[idx].options = e.target.value.split(','); setEditingSurvey({...editingSurvey, questions: newQ}); }} placeholder="Options (comma separated)" />
                                     )}
                                  </div>
                               ))}
                               <button onClick={() => setEditingSurvey({...editingSurvey, questions: [...editingSurvey.questions, { id: Date.now().toString(), type: 'text', question: '' }]})} className="w-full py-3 border border-dashed border-white/10 text-white/40 hover:text-white hover:bg-white/5 rounded transition-all text-xs font-mono uppercase">+ Add Question</button>
                            </div>
                         </div>
                      </div>
                   </div>
                )}
             </div>
          )}

          {/* --- MATERIALS TAB --- */}
          {activeTab === 'materials' && (
             <div className="space-y-8">
                <div className="flex justify-between items-center mb-8">
                   <h2 className="text-2xl font-light text-white">Materiales</h2>
                   <button onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," 
                         + "Email,Fecha,Material\n"
                         + materials.flatMap(m => m.leads.map(l => `${l.email},${new Date(l.date).toLocaleDateString()},${m.title}`)).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", "leads_materiales.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                   }} className="bg-authomia-blue px-4 py-2 rounded text-xs font-mono uppercase tracking-widest hover:bg-authomia-blueLight transition-all">
                      Exportar CSV
                   </button>
                </div>
                
                <div className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="border-b border-white/10 bg-white/5">
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Email del Lead</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Fecha de Descarga</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Material</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal text-right">Acciones</th>
                         </tr>
                      </thead>
                      <tbody>
                         {materials.flatMap(m => m.leads.map((l, i) => (
                            <tr key={`${m.id}-${i}`} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                               <td className="p-4 text-sm text-white">{l.email}</td>
                               <td className="p-4 text-sm text-white/60">{new Date(l.date).toLocaleDateString()}</td>
                               <td className="p-4 text-sm text-white/60">{m.title}</td>
                               <td className="p-4 text-right">
                                  <button className="text-xs font-mono text-authomia-blueLight hover:underline">Ver Detalles</button>
                               </td>
                            </tr>
                         )))}
                         {materials.length === 0 && (
                            <tr>
                               <td colSpan={4} className="p-8 text-center text-white/40 font-mono text-xs">No hay leads registrados aún.</td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          )}

          {/* --- APPLICATIONS TAB --- */}
          {activeTab === 'applications' && (
             <div className="space-y-8">
                <div className="flex justify-between items-center mb-8">
                   <div>
                      <h2 className="text-2xl font-light text-white">Postulantes (Join the Team)</h2>
                      <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-1">Solicitudes de ingreso al equipo técnico</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {applications.map(app => (
                      <div key={app.id} className="bg-[#0A0A0A] border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                         <div className="absolute top-0 left-0 w-full h-1 bg-authomia-blueLight" />
                         <h3 className="font-bold text-lg text-white mb-1">{app.name}</h3>
                         <a href={`mailto:${app.email}`} className="text-xs font-mono text-authomia-blueLight hover:underline mb-4 block">{app.email}</a>
                         
                         <div className="space-y-4">
                            <div>
                               <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">Especialidad</span>
                               <p className="text-sm text-white/80">{app.specialty}</p>
                            </div>
                            <div>
                               <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block mb-1">Proyectos Previos</span>
                               <p className="text-sm text-white/60 line-clamp-3">{app.pastProjects}</p>
                            </div>
                            {app.cvUrl && (
                               <a href={app.cvUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-white bg-white/10 px-3 py-2 rounded hover:bg-white/20 transition-colors">
                                  <ExternalLink size={12} /> Ver CV
                               </a>
                            )}
                         </div>
                         <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-mono text-white/30">{new Date(app.date).toLocaleDateString()}</span>
                            <button onClick={() => {
                               if(confirm('¿Eliminar postulación?')) {
                                  const newApps = applications.filter(a => a.id !== app.id);
                                  saveToStorage('applications', newApps, setApplications);
                               }
                            }} className="text-white/20 hover:text-red-500"><Trash2 size={14}/></button>
                         </div>
                      </div>
                   ))}
                   {applications.length === 0 && (
                      <div className="col-span-full text-center py-20 text-white/40 font-mono text-sm">
                         No hay postulaciones pendientes.
                      </div>
                   )}
                </div>
             </div>
          )}

          {/* --- TEAM TAB --- */}
          {activeTab === 'team' && (
             <div className="space-y-8">
                <div className="flex justify-between items-center mb-8">
                   <div>
                      <h2 className="text-2xl font-light text-white">Equipo y Socios</h2>
                      <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-1">Gestión de accesos al CMS</p>
                   </div>
                   <button 
                      onClick={() => setEditingTeamMember({ id: Date.now().toString(), email: '', password: '', role: 'socio' })}
                      className="bg-white text-black px-6 py-2 rounded font-mono text-xs uppercase tracking-widest hover:bg-authomia-blueLight hover:text-white transition-all flex items-center gap-2"
                   >
                      <Plus size={14} /> Añadir Miembro
                   </button>
                </div>

                <div className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="border-b border-white/10 bg-white/5">
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Email</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal">Rol</th>
                            <th className="p-4 text-xs font-mono text-white/50 uppercase tracking-widest font-normal text-right">Acciones</th>
                         </tr>
                      </thead>
                      <tbody>
                         {teamMembers.map(member => (
                            <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                               <td className="p-4 text-sm text-white">{member.email}</td>
                               <td className="p-4">
                                  <span className={`px-2 py-1 rounded text-xs font-mono uppercase tracking-widest ${member.role === 'admin' ? 'bg-authomia-red/20 text-authomia-redLight' : 'bg-authomia-blue/20 text-authomia-blueLight'}`}>
                                     {member.role}
                                  </span>
                               </td>
                               <td className="p-4 text-right">
                                  <button onClick={() => setEditingTeamMember(member)} className="text-white/40 hover:text-white mr-4"><Edit2 size={14}/></button>
                                  <button onClick={() => {
                                     if(confirm('¿Eliminar miembro?')) {
                                        const newMembers = teamMembers.filter(m => m.id !== member.id);
                                        saveToStorage('team', newMembers, setTeamMembers);
                                     }
                                  }} className="text-white/40 hover:text-red-500"><Trash2 size={14}/></button>
                               </td>
                            </tr>
                         ))}
                         {teamMembers.length === 0 && (
                            <tr>
                               <td colSpan={3} className="p-8 text-center text-white/40 font-mono text-xs">No hay miembros registrados.</td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>

                {/* Team Member Editor Modal */}
                {editingTeamMember && (
                   <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
                      <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-md rounded-xl p-8 shadow-2xl">
                         <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-light">{editingTeamMember.email ? 'Editar Miembro' : 'Nuevo Miembro'}</h2>
                            <button onClick={() => setEditingTeamMember(null)}><X /></button>
                         </div>
                         <div className="space-y-4">
                            <div className="space-y-2">
                               <label className="text-xs text-white/50 uppercase">Email</label>
                               <input className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="socio@ejemplo.com" value={editingTeamMember.email} onChange={e => setEditingTeamMember({...editingTeamMember, email: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs text-white/50 uppercase">Contraseña</label>
                               <input className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="Clave de acceso" value={editingTeamMember.password || ''} onChange={e => setEditingTeamMember({...editingTeamMember, password: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs text-white/50 uppercase">Rol</label>
                               <select className="w-full bg-white/5 border border-white/10 p-3 rounded text-white outline-none" value={editingTeamMember.role} onChange={e => setEditingTeamMember({...editingTeamMember, role: e.target.value as 'admin' | 'socio' | 'writer'})}>
                                  <option value="socio">Socio (Acceso Limitado)</option>
                                  <option value="writer">Escritor (Solo Publicaciones)</option>
                                  <option value="admin">Administrador (Acceso Total)</option>
                               </select>
                            </div>

                            <button onClick={() => { 
                               const exists = teamMembers.find(m => m.id === editingTeamMember.id);
                               const newMembers = exists ? teamMembers.map(m => m.id === editingTeamMember.id ? editingTeamMember : m) : [...teamMembers, editingTeamMember];
                               saveToStorage('team', newMembers, setTeamMembers); setEditingTeamMember(null);
                            }} className="w-full bg-authomia-blue py-3 rounded font-mono uppercase tracking-widest hover:bg-authomia-blueLight transition-all mt-4">Guardar Miembro</button>
                         </div>
                      </div>
                   </div>
                )}

                {/* Action Logs */}
                {currentUser?.role === 'admin' && (
                  <div className="mt-12 bg-[#0A0A0A] border border-white/5 rounded-xl p-6">
                     <h3 className="text-lg font-light mb-6 flex items-center gap-2"><Activity size={18} className="text-white/40"/> Historial de Acciones</h3>
                     <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                        {actionLogs.map(log => (
                           <div key={log.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                              <div className="flex items-center gap-4">
                                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono text-white/50">{log.user.substring(0,2).toUpperCase()}</div>
                                 <div>
                                    <p className="text-sm text-white"><span className="text-authomia-blueLight">{log.user}</span> {log.action} <span className="text-white/50">{log.target}</span></p>
                                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">{new Date(log.date).toLocaleString()}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                        {actionLogs.length === 0 && <p className="text-xs font-mono text-white/40 text-center py-4">No hay acciones registradas.</p>}
                     </div>
                  </div>
                )}
             </div>
          )}

          {/* --- AUTHORS TAB --- */}
          {activeTab === 'authors' && (
             <div className="space-y-8 animate-in fade-in">
                <div className="flex justify-between items-center mb-8">
                   <div>
                      <h2 className="text-2xl font-light text-white">Autores</h2>
                      <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-1">Gestión de Perfiles de Escritores</p>
                   </div>
                   <button onClick={() => setEditingAuthor({ id: Date.now().toString(), name: '', role: '', avatar: '', profileUrl: '' })} className="bg-white text-black px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-authomia-blueLight hover:text-white transition-all flex items-center gap-2">
                      <Plus size={14} /> Nuevo Autor
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {authors.map(author => (
                      <div key={author.id} className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 flex items-center gap-4 relative group">
                         <img src={author.avatar || 'https://via.placeholder.com/150'} className="w-16 h-16 rounded-full object-cover border border-white/10" alt={author.name} />
                         <div>
                            <h3 className="font-bold text-white">{author.name}</h3>
                            <p className="text-xs text-white/50">{author.role}</p>
                            {author.teamMemberId && <p className="text-[10px] font-mono text-authomia-blueLight mt-1">Vinculado a Equipo</p>}
                         </div>
                         <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button onClick={() => setEditingAuthor(author)} className="text-white/40 hover:text-white"><Edit2 size={14}/></button>
                            <button onClick={() => {
                               if(confirm('¿Eliminar autor?')) {
                                  saveToStorage('authors', authors.filter(a => a.id !== author.id), setAuthors);
                               }
                            }} className="text-white/40 hover:text-red-500"><Trash2 size={14}/></button>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Author Editor Modal */}
                {editingAuthor && (
                   <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
                      <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-md rounded-xl p-8 shadow-2xl">
                         <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-light">{editingAuthor.name ? 'Editar Autor' : 'Nuevo Autor'}</h2>
                            <button onClick={() => setEditingAuthor(null)}><X /></button>
                         </div>
                         <div className="space-y-4">
                            <div className="space-y-2">
                               <label className="text-xs text-white/50 uppercase">Nombre Completo</label>
                               <input className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="Ej. John Doe" value={editingAuthor.name} onChange={e => setEditingAuthor({...editingAuthor, name: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs text-white/50 uppercase">Cargo / Rol</label>
                               <input className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="Ej. AI Specialist" value={editingAuthor.role} onChange={e => setEditingAuthor({...editingAuthor, role: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs text-white/50 uppercase">URL de Perfil (LinkedIn, etc.)</label>
                               <input className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="https://..." value={editingAuthor.profileUrl} onChange={e => setEditingAuthor({...editingAuthor, profileUrl: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs text-white/50 uppercase">Avatar</label>
                               <div className="flex gap-2">
                                  <input className="flex-1 bg-white/5 border border-white/10 p-3 rounded text-white text-xs" placeholder="URL de imagen" value={editingAuthor.avatar} onChange={e => setEditingAuthor({...editingAuthor, avatar: e.target.value})} />
                                  <label className="p-3 bg-white/10 rounded cursor-pointer hover:bg-white/20 flex items-center justify-center"><ImageIcon size={16} /><input type="file" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => setEditingAuthor({...editingAuthor, avatar: base64}))} /></label>
                               </div>
                               {editingAuthor.avatar && <img src={editingAuthor.avatar} className="w-16 h-16 rounded-full object-cover mt-2 border border-white/10" />}
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs text-white/50 uppercase">Vincular a Miembro del Equipo (Opcional)</label>
                               <select className="w-full bg-white/5 border border-white/10 p-3 rounded text-white outline-none" value={editingAuthor.teamMemberId || ''} onChange={e => setEditingAuthor({...editingAuthor, teamMemberId: e.target.value})}>
                                  <option value="">Sin vincular</option>
                                  {teamMembers.map(m => <option key={m.id} value={m.id}>{m.email}</option>)}
                               </select>
                            </div>

                            <button onClick={() => { 
                               const exists = authors.find(a => a.id === editingAuthor.id);
                               const newAuthors = exists ? authors.map(a => a.id === editingAuthor.id ? editingAuthor : a) : [...authors, editingAuthor];
                               saveToStorage('authors', newAuthors, setAuthors); setEditingAuthor(null);
                            }} className="w-full bg-authomia-blue py-3 rounded font-mono uppercase tracking-widest hover:bg-authomia-blueLight transition-all mt-4">Guardar Autor</button>
                         </div>
                      </div>
                   </div>
                )}
             </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Manager;
