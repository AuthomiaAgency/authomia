import React, { useState, useEffect } from 'react';
import { Lock, Save, Trash2, Plus, LogOut, FileText, Users, BarChart2, ExternalLink, Link, Image as ImageIcon, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
interface Partner {
  id: string;
  companyName: string;
  personName: string;
  quote: string;
  image: string;
  website: string;
  bio: string;
  socials: { linkedin?: string; twitter?: string; instagram?: string; };
}

interface PublicationBlock {
  type: 'text' | 'image' | 'button';
  content: string; // text content, image url, or button label
  extra?: string; // button url
}

interface Publication {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  blocks: PublicationBlock[];
}

interface SurveyQuestion {
  id: string;
  type: 'text' | 'choice' | 'email';
  question: string;
  options?: string[]; // comma separated for editing
}

interface SurveyResponse {
  date: string;
  answers: Record<string, string>;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  ctaLabel?: string;
  ctaLink?: string;
}

// --- COMPONENT ---
const Manager: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'partners' | 'publications' | 'surveys'>('partners');

  // DATA STATES
  const [partners, setPartners] = useState<Partner[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  // EDITING STATES
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);

  // LOAD DATA
  useEffect(() => {
    const auth = sessionStorage.getItem('authomia_manager_auth');
    if (auth === 'true') setIsAuthenticated(true);

    const savedPartners = localStorage.getItem('authomia_partners');
    if (savedPartners) setPartners(JSON.parse(savedPartners));

    const savedPubs = localStorage.getItem('authomia_publications');
    if (savedPubs) setPublications(JSON.parse(savedPubs));

    const savedSurveys = localStorage.getItem('authomia_surveys');
    if (savedSurveys) setSurveys(JSON.parse(savedSurveys));
  }, []);

  // SAVE HELPERS
  const savePartnersToStorage = (data: Partner[]) => {
    setPartners(data);
    localStorage.setItem('authomia_partners', JSON.stringify(data));
  };
  const savePubsToStorage = (data: Publication[]) => {
    setPublications(data);
    localStorage.setItem('authomia_publications', JSON.stringify(data));
  };
  const saveSurveysToStorage = (data: Survey[]) => {
    setSurveys(data);
    localStorage.setItem('authomia_surveys', JSON.stringify(data));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'M@xCB_2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('authomia_manager_auth', 'true');
    } else {
      setError('Access Denied.');
    }
  };

  if (!isAuthenticated) {
    return (
       <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#050505] border border-white/10 p-8 rounded-sm shadow-2xl">
          <div className="flex justify-center mb-8"><Lock className="w-8 h-8 text-authomia-blue" /></div>
          <h1 className="text-xl font-mono text-center text-white mb-8">AUTHOMIA MANAGER</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Security Key" className="w-full bg-white/5 border border-white/10 p-3 text-white font-mono focus:border-authomia-blue outline-none" />
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button type="submit" className="w-full bg-authomia-blue text-white py-3 font-mono text-sm tracking-widest hover:bg-authomia-blueLight transition-colors">AUTHENTICATE</button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDERERS ---

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/10 pb-6 gap-6">
          <h1 className="text-2xl font-light tracking-tight">System Control</h1>
          
          <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
             <button onClick={() => setActiveTab('partners')} className={`px-4 py-2 text-xs font-mono uppercase rounded-md transition-all ${activeTab === 'partners' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>Partners</button>
             <button onClick={() => setActiveTab('publications')} className={`px-4 py-2 text-xs font-mono uppercase rounded-md transition-all ${activeTab === 'publications' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>Publicaciones</button>
             <button onClick={() => setActiveTab('surveys')} className={`px-4 py-2 text-xs font-mono uppercase rounded-md transition-all ${activeTab === 'surveys' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>Encuestas</button>
          </div>

          <button onClick={() => { setIsAuthenticated(false); sessionStorage.removeItem('authomia_manager_auth'); }} className="text-red-400 text-xs font-mono flex items-center gap-2"><LogOut className="w-4 h-4" /> EXIT</button>
        </header>

        {/* --- PARTNERS TAB --- */}
        {activeTab === 'partners' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* List */}
             <div className="space-y-4">
                <button 
                  onClick={() => setEditingPartner({ id: Date.now().toString(), companyName: 'New Company', personName: '', quote: '', image: '', website: '', bio: '', socials: {} })}
                  className="w-full py-4 border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/50 flex items-center justify-center gap-2 font-mono text-xs uppercase"
                >
                  <Plus className="w-4 h-4" /> Add Partner
                </button>
                {partners.map(p => (
                   <div key={p.id} onClick={() => setEditingPartner(p)} className="p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer flex justify-between items-center group">
                      <div><h3 className="font-bold text-sm">{p.companyName}</h3><p className="text-xs text-white/50">{p.personName}</p></div>
                      <button onClick={(e) => { e.stopPropagation(); savePartnersToStorage(partners.filter(x => x.id !== p.id)); if(editingPartner?.id === p.id) setEditingPartner(null); }} className="text-white/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                   </div>
                ))}
             </div>
             {/* Editor */}
             <div className="col-span-2 bg-[#08090B] border border-white/10 p-8 rounded-sm">
                {editingPartner ? (
                   <div className="space-y-4">
                      <div className="flex justify-between"><h2 className="text-authomia-blueLight font-mono">Editing Partner</h2><span className="text-xs text-white/30">{editingPartner.id}</span></div>
                      <input className="w-full bg-white/5 border border-white/10 p-2 text-white" placeholder="Company Name" value={editingPartner.companyName} onChange={e => setEditingPartner({...editingPartner, companyName: e.target.value})} />
                      <input className="w-full bg-white/5 border border-white/10 p-2 text-white" placeholder="Person Name" value={editingPartner.personName} onChange={e => setEditingPartner({...editingPartner, personName: e.target.value})} />
                      <textarea className="w-full bg-white/5 border border-white/10 p-2 text-white h-20" placeholder="Short Quote" value={editingPartner.quote} onChange={e => setEditingPartner({...editingPartner, quote: e.target.value})} />
                      <input className="w-full bg-white/5 border border-white/10 p-2 text-white" placeholder="Image URL" value={editingPartner.image} onChange={e => setEditingPartner({...editingPartner, image: e.target.value})} />
                      <textarea className="w-full bg-white/5 border border-white/10 p-2 text-white h-32" placeholder="Full Bio / Story" value={editingPartner.bio} onChange={e => setEditingPartner({...editingPartner, bio: e.target.value})} />
                      <input className="w-full bg-white/5 border border-white/10 p-2 text-white" placeholder="Website" value={editingPartner.website} onChange={e => setEditingPartner({...editingPartner, website: e.target.value})} />
                      <button onClick={() => { 
                         const exists = partners.find(p => p.id === editingPartner.id);
                         const newPartners = exists ? partners.map(p => p.id === editingPartner.id ? editingPartner : p) : [...partners, editingPartner];
                         savePartnersToStorage(newPartners); setEditingPartner(null);
                      }} className="w-full bg-authomia-blue py-2 text-sm font-mono tracking-widest hover:bg-authomia-blueLight">SAVE PARTNER</button>
                   </div>
                ) : <div className="h-full flex items-center justify-center opacity-30 text-sm font-mono">Select or Create Partner</div>}
             </div>
          </div>
        )}

        {/* --- PUBLICATIONS TAB --- */}
        {activeTab === 'publications' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-4">
                <button 
                  onClick={() => setEditingPub({ id: Date.now().toString(), title: 'New Article', date: new Date().toISOString().split('T')[0], coverImage: '', excerpt: '', blocks: [] })}
                  className="w-full py-4 border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/50 flex items-center justify-center gap-2 font-mono text-xs uppercase"
                >
                  <Plus className="w-4 h-4" /> New Post
                </button>
                {publications.map(p => (
                   <div key={p.id} onClick={() => setEditingPub(p)} className="p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer flex justify-between items-center group">
                      <div><h3 className="font-bold text-sm truncate w-32">{p.title}</h3><p className="text-xs text-white/50">{p.date}</p></div>
                      <button onClick={(e) => { e.stopPropagation(); savePubsToStorage(publications.filter(x => x.id !== p.id)); if(editingPub?.id === p.id) setEditingPub(null); }} className="text-white/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                   </div>
                ))}
             </div>
             <div className="col-span-2 bg-[#08090B] border border-white/10 p-8 rounded-sm h-[80vh] overflow-y-auto">
                {editingPub ? (
                   <div className="space-y-6">
                      <div className="flex justify-between"><h2 className="text-authomia-blueLight font-mono">Editing Post</h2><span className="text-xs text-white/30">{editingPub.id}</span></div>
                      <input className="w-full bg-white/5 border border-white/10 p-2 text-white font-bold text-lg" placeholder="Title" value={editingPub.title} onChange={e => setEditingPub({...editingPub, title: e.target.value})} />
                      <input className="w-full bg-white/5 border border-white/10 p-2 text-white" type="date" value={editingPub.date} onChange={e => setEditingPub({...editingPub, date: e.target.value})} />
                      <input className="w-full bg-white/5 border border-white/10 p-2 text-white" placeholder="Cover Image URL" value={editingPub.coverImage} onChange={e => setEditingPub({...editingPub, coverImage: e.target.value})} />
                      <textarea className="w-full bg-white/5 border border-white/10 p-2 text-white h-20" placeholder="Short Excerpt" value={editingPub.excerpt} onChange={e => setEditingPub({...editingPub, excerpt: e.target.value})} />
                      
                      <div className="border-t border-white/10 pt-4">
                         <h3 className="text-xs font-mono text-white/50 mb-4">CONTENT BLOCKS</h3>
                         <div className="space-y-4 mb-4">
                            {editingPub.blocks.map((block, idx) => (
                               <div key={idx} className="p-4 border border-white/5 bg-white/[0.02] relative group">
                                  <button onClick={() => { const newBlocks = [...editingPub.blocks]; newBlocks.splice(idx, 1); setEditingPub({...editingPub, blocks: newBlocks}); }} className="absolute top-2 right-2 text-white/20 hover:text-red-500"><XIcon /></button>
                                  <div className="text-[10px] uppercase text-white/30 mb-2">{block.type}</div>
                                  {block.type === 'text' && <textarea className="w-full bg-transparent border-none outline-none text-white h-24 resize-none" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Type text content..." />}
                                  {block.type === 'image' && <input className="w-full bg-transparent border-b border-white/10 outline-none text-white" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Image URL..." />}
                                  {block.type === 'button' && (
                                     <div className="grid grid-cols-2 gap-2">
                                        <input className="bg-transparent border-b border-white/10 outline-none text-white" value={block.content} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].content = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Button Label" />
                                        <input className="bg-transparent border-b border-white/10 outline-none text-white" value={block.extra || ''} onChange={e => { const newBlocks = [...editingPub.blocks]; newBlocks[idx].extra = e.target.value; setEditingPub({...editingPub, blocks: newBlocks}); }} placeholder="Target URL" />
                                     </div>
                                  )}
                               </div>
                            ))}
                         </div>
                         <div className="flex gap-2">
                            <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { type: 'text', content: '' }]})} className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-mono flex items-center gap-2"><FileText size={12}/> Text</button>
                            <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { type: 'image', content: '' }]})} className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-mono flex items-center gap-2"><ImageIcon size={12}/> Image</button>
                            <button onClick={() => setEditingPub({...editingPub, blocks: [...editingPub.blocks, { type: 'button', content: '', extra: '' }]})} className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-mono flex items-center gap-2"><Link size={12}/> Button</button>
                         </div>
                      </div>

                      <button onClick={() => { 
                         const exists = publications.find(p => p.id === editingPub.id);
                         const newPubs = exists ? publications.map(p => p.id === editingPub.id ? editingPub : p) : [...publications, editingPub];
                         savePubsToStorage(newPubs); setEditingPub(null);
                      }} className="w-full bg-authomia-blue py-3 text-sm font-mono tracking-widest hover:bg-authomia-blueLight sticky bottom-0">PUBLISH POST</button>
                   </div>
                ) : <div className="h-full flex items-center justify-center opacity-30 text-sm font-mono">Select or Create Publication</div>}
             </div>
          </div>
        )}

        {/* --- SURVEYS TAB --- */}
        {activeTab === 'surveys' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-4">
                <button 
                  onClick={() => setEditingSurvey({ id: Date.now().toString(), title: 'New Survey', description: '', questions: [], responses: [] })}
                  className="w-full py-4 border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/50 flex items-center justify-center gap-2 font-mono text-xs uppercase"
                >
                  <Plus className="w-4 h-4" /> New Survey
                </button>
                {surveys.map(s => (
                   <div key={s.id} onClick={() => setEditingSurvey(s)} className="p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer flex justify-between items-center group">
                      <div><h3 className="font-bold text-sm truncate w-32">{s.title}</h3><p className="text-xs text-white/50">{s.responses?.length || 0} Responses</p></div>
                      <button onClick={(e) => { e.stopPropagation(); saveSurveysToStorage(surveys.filter(x => x.id !== s.id)); if(editingSurvey?.id === s.id) setEditingSurvey(null); }} className="text-white/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                   </div>
                ))}
             </div>
             
             {/* Editor & Analytics Split */}
             <div className="col-span-2 bg-[#08090B] border border-white/10 p-8 rounded-sm h-[80vh] overflow-y-auto">
                {editingSurvey ? (
                   <div className="space-y-8">
                      {/* Top Bar with Link */}
                      <div className="flex justify-between items-center bg-white/5 p-4 rounded-sm">
                         <span className="text-xs font-mono text-white/50">SHARE URL:</span>
                         <a href={`/encuesta?id=${editingSurvey.id}`} target="_blank" className="text-authomia-blueLight text-xs font-mono hover:underline flex items-center gap-2">
                           {window.location.origin}/encuesta?id={editingSurvey.id} <ExternalLink size={12} />
                         </a>
                      </div>

                      {/* Config */}
                      <div className="space-y-4">
                         <input className="w-full bg-white/5 border border-white/10 p-2 text-white font-bold text-lg" placeholder="Survey Title" value={editingSurvey.title} onChange={e => setEditingSurvey({...editingSurvey, title: e.target.value})} />
                         <textarea className="w-full bg-white/5 border border-white/10 p-2 text-white h-20" placeholder="Description" value={editingSurvey.description} onChange={e => setEditingSurvey({...editingSurvey, description: e.target.value})} />
                         <div className="grid grid-cols-2 gap-4">
                            <input className="bg-white/5 border border-white/10 p-2 text-white text-sm" placeholder="Final Button Label (Optional)" value={editingSurvey.ctaLabel || ''} onChange={e => setEditingSurvey({...editingSurvey, ctaLabel: e.target.value})} />
                            <input className="bg-white/5 border border-white/10 p-2 text-white text-sm" placeholder="Final Redirect URL (Optional)" value={editingSurvey.ctaLink || ''} onChange={e => setEditingSurvey({...editingSurvey, ctaLink: e.target.value})} />
                         </div>
                      </div>

                      {/* Questions Builder */}
                      <div className="border-t border-white/10 pt-4">
                         <h3 className="text-xs font-mono text-white/50 mb-4">QUESTIONS</h3>
                         <div className="space-y-6 mb-6">
                            {editingSurvey.questions.map((q, idx) => (
                               <div key={idx} className="p-4 border border-white/10 bg-white/[0.02] relative group">
                                  <button onClick={() => { const newQ = [...editingSurvey.questions]; newQ.splice(idx, 1); setEditingSurvey({...editingSurvey, questions: newQ}); }} className="absolute top-2 right-2 text-white/20 hover:text-red-500"><XIcon /></button>
                                  <div className="flex gap-4 mb-2">
                                     <select className="bg-black border border-white/10 text-white text-xs uppercase p-1" value={q.type} onChange={(e) => { const newQ = [...editingSurvey.questions]; newQ[idx].type = e.target.value as any; setEditingSurvey({...editingSurvey, questions: newQ}); }}>
                                        <option value="text">Text Input</option>
                                        <option value="email">Email Input</option>
                                        <option value="choice">Multiple Choice</option>
                                     </select>
                                  </div>
                                  <input className="w-full bg-transparent border-b border-white/10 outline-none text-white mb-2" value={q.question} onChange={e => { const newQ = [...editingSurvey.questions]; newQ[idx].question = e.target.value; setEditingSurvey({...editingSurvey, questions: newQ}); }} placeholder="Question text..." />
                                  {q.type === 'choice' && (
                                     <input className="w-full bg-white/5 p-2 text-xs text-white/70" value={q.options?.join(',') || ''} onChange={e => { const newQ = [...editingSurvey.questions]; newQ[idx].options = e.target.value.split(','); setEditingSurvey({...editingSurvey, questions: newQ}); }} placeholder="Option 1, Option 2, Option 3 (comma separated)" />
                                  )}
                               </div>
                            ))}
                         </div>
                         <button onClick={() => setEditingSurvey({...editingSurvey, questions: [...editingSurvey.questions, { id: Date.now().toString(), type: 'text', question: '' }]})} className="px-4 py-2 bg-white/10 text-xs font-mono uppercase hover:bg-white/20">+ Add Question</button>
                      </div>

                      <button onClick={() => { 
                         const exists = surveys.find(s => s.id === editingSurvey.id);
                         const newSurveys = exists ? surveys.map(s => s.id === editingSurvey.id ? editingSurvey : s) : [...surveys, editingSurvey];
                         saveSurveysToStorage(newSurveys); 
                         alert('Survey Saved!');
                      }} className="w-full bg-authomia-blue py-3 text-sm font-mono tracking-widest hover:bg-authomia-blueLight">SAVE SURVEY CONFIG</button>

                      {/* ANALYTICS SECTION */}
                      <div className="border-t border-white/10 pt-8 mt-8">
                         <h3 className="text-sm font-mono text-authomia-blueLight mb-6 flex items-center gap-2"><BarChart2 size={16}/> LIVE ANALYTICS</h3>
                         <div className="grid grid-cols-1 gap-6">
                            <div className="p-4 bg-white/[0.02]">
                               <h4 className="text-2xl font-bold text-white mb-1">{editingSurvey.responses?.length || 0}</h4>
                               <p className="text-xs text-white/40 uppercase tracking-widest">Total Responses</p>
                            </div>
                            
                            {editingSurvey.questions.map((q, idx) => (
                               <div key={idx} className="p-4 border border-white/5 rounded-sm">
                                  <h5 className="text-sm font-bold text-white mb-4">{q.question}</h5>
                                  {q.type === 'choice' && q.options ? (
                                     <div className="space-y-2">
                                        {q.options.map((opt, oIdx) => {
                                           const count = editingSurvey.responses?.filter(r => r.answers[q.id] === opt).length || 0;
                                           const total = editingSurvey.responses?.length || 1;
                                           const percent = (count / total) * 100;
                                           return (
                                              <div key={oIdx} className="relative h-8 bg-white/5 flex items-center px-2">
                                                 <div className="absolute top-0 left-0 h-full bg-authomia-blue/30" style={{ width: `${percent}%` }} />
                                                 <span className="relative z-10 text-xs text-white flex justify-between w-full">
                                                    <span>{opt}</span>
                                                    <span>{count} ({Math.round(percent)}%)</span>
                                                 </span>
                                              </div>
                                           )
                                        })}
                                     </div>
                                  ) : (
                                     <div className="max-h-32 overflow-y-auto space-y-1">
                                        {editingSurvey.responses?.slice(0, 5).map((r, rIdx) => (
                                           <div key={rIdx} className="text-xs text-white/50 border-b border-white/5 py-1">{r.answers[q.id] || '-'}</div>
                                        ))}
                                        {editingSurvey.responses?.length > 5 && <div className="text-xs text-white/30 italic">...and {editingSurvey.responses.length - 5} more</div>}
                                     </div>
                                  )}
                               </div>
                            ))}
                         </div>
                      </div>

                   </div>
                ) : <div className="h-full flex items-center justify-center opacity-30 text-sm font-mono">Select or Create Survey</div>}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

const XIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

export default Manager;