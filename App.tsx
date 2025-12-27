
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import AITutor from './components/AITutor';
import Quiz from './components/Quiz';
import VideoPlayer from './components/VideoPlayer';
import { Course, Lesson, QuizQuestion } from './types';
import { COURSES } from './constants';
import { generateQuiz } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'courses' | 'learning'>(() => {
    return (localStorage.getItem('orvionar_view') as any) || 'home';
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(() => {
    const saved = localStorage.getItem('orvionar_course');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(() => {
    const saved = localStorage.getItem('orvionar_lesson');
    return saved ? JSON.parse(saved) : null;
  });
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobileAIDrawerOpen, setIsMobileAIDrawerOpen] = useState(false);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('orvionar_view', view);
    if (selectedCourse) localStorage.setItem('orvionar_course', JSON.stringify(selectedCourse));
    if (activeLesson) localStorage.setItem('orvionar_lesson', JSON.stringify(activeLesson));
  }, [view, selectedCourse, activeLesson]);

  const categories = useMemo(() => {
    return ['All', ...new Set(COURSES.map(c => c.category))];
  }, []);

  const filteredCourses = useMemo(() => {
    if (activeCategory === 'All') return COURSES;
    return COURSES.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const navigateToCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveLesson(course.lessons[0]);
    setView('learning');
    setIsQuizMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLessonChange = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setIsQuizMode(false);
    if (window.innerWidth < 1024) {
      // Close sidebar or scroll on mobile if needed
    }
  };

  const startQuiz = async () => {
    if (!activeLesson) return;
    setIsGeneratingQuiz(true);
    try {
      const q = await generateQuiz(activeLesson.title, activeLesson.content);
      setQuizQuestions(q);
      setIsQuizMode(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-600 bg-[#fbfcfe]">
      <Header 
        onNavigate={(v) => {
          setView(v);
          if (v === 'home') {
            setSelectedCourse(null);
            localStorage.removeItem('orvionar_course');
            localStorage.removeItem('orvionar_lesson');
          }
        }} 
        activeView={view} 
      />

      <main className="flex-1">
        {view === 'home' && (
          <div className="relative overflow-hidden">
            <div className="hero-glow top-[-200px] right-[-200px] opacity-40"></div>
            <div className="hero-glow bottom-[-300px] left-[-200px] opacity-20" style={{background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)'}}></div>

            <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                <div className="lg:w-[55%] space-y-10 text-center lg:text-left">
                  <div className="inline-flex items-center space-x-3 bg-white border border-slate-100 px-5 py-2.5 rounded-2xl shadow-sm text-indigo-600 text-sm font-black tracking-widest uppercase animate-in slide-in-from-top-4 duration-1000">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
                    <span>Experience Orvionar Pro</span>
                  </div>
                  
                  <h1 className="text-7xl lg:text-[7.5rem] font-black text-slate-900 tracking-tighter leading-[0.85] animate-in slide-in-from-left-8 duration-700">
                    Evolve Your <br/>
                    <span className="gradient-text italic">Engineering.</span>
                  </h1>
                  
                  <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium animate-in fade-in duration-1000 delay-300">
                    The world's most advanced AI-integrated learning ecosystem. Master elite tech stacks with personalized 1-on-1 machine guidance.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4 animate-in fade-in duration-1000 delay-500">
                    <button 
                      onClick={() => setView('courses')}
                      className="group bg-indigo-600 text-white px-12 py-6 rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center gap-4 active:scale-95"
                    >
                      Start Free Trial
                      <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                    </button>
                    <button className="px-12 py-6 rounded-[2rem] font-black text-slate-600 hover:bg-white hover:shadow-lg transition-all border-2 border-transparent hover:border-slate-50">
                      View Curriculum
                    </button>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-12 pt-12 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
                    <div className="text-center lg:text-left">
                      <div className="text-4xl font-black text-slate-900">13+</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Specialized Paths</div>
                    </div>
                    <div className="w-px h-12 bg-slate-200"></div>
                    <div className="text-center lg:text-left">
                      <div className="text-4xl font-black text-slate-900">24/7</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">AI Mentorship</div>
                    </div>
                    <div className="w-px h-12 bg-slate-200"></div>
                    <div className="text-center lg:text-left">
                      <div className="text-4xl font-black text-slate-900">100k+</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Active Minds</div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[45%] relative animate-in zoom-in duration-1000">
                  <div className="animate-float relative z-10">
                    <div className="bg-white rounded-[4rem] shadow-[0_80px_160px_-30px_rgba(0,0,0,0.2)] overflow-hidden border-[12px] border-white p-2">
                      <img 
                        src="https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=1200" 
                        alt="Hero" 
                        className="rounded-[3rem] w-full object-cover aspect-[4/5] brightness-90 grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </div>
                  <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
                </div>
              </div>

              <section className="mt-40">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                  <div className="space-y-4">
                    <div className="w-12 h-1.5 bg-indigo-600 rounded-full"></div>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">The Academy <br/>Selection.</h2>
                    <p className="text-slate-500 font-medium text-lg">Rigorous programs designed for the top 1% of tech talent.</p>
                  </div>
                  <button 
                    onClick={() => setView('courses')}
                    className="text-indigo-600 font-black text-sm uppercase tracking-widest flex items-center gap-3 group hover:gap-5 transition-all"
                  >
                    Explore All Paths <i className="fas fa-arrow-right text-lg"></i>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {COURSES.slice(0, 3).map(c => (
                    <CourseCard key={c.id} course={c} onClick={navigateToCourse} />
                  ))}
                </div>
              </section>
            </div>
            
            <footer className="bg-slate-950 py-24 mt-24 text-white">
              <div className="max-w-7xl mx-auto px-4 text-center">
                 <div className="text-4xl font-black tracking-tighter mb-8">ORVION<span className="text-indigo-500">AR</span></div>
                 <div className="flex justify-center gap-12 mb-12">
                   {['Twitter', 'Discord', 'LinkedIn', 'Github'].map(s => <a key={s} href="#" className="text-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">{s}</a>)}
                 </div>
                 <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest">© 2025 Orvionar Elite Academy. All Rights Reserved.</div>
              </div>
            </footer>
          </div>
        )}

        {view === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
               <div className="space-y-4">
                  <h1 className="text-6xl font-black text-slate-900 tracking-tighter">The Ecosystem</h1>
                  <p className="text-slate-500 text-lg font-medium max-w-lg">Select your specialization and start your journey to engineering excellence.</p>
               </div>
               <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar max-w-full">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={`px-8 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all border-2 ${
                        activeCategory === cat 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100' 
                          : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredCourses.map(c => (
                <CourseCard key={c.id} course={c} onClick={navigateToCourse} />
              ))}
            </div>
          </div>
        )}

        {view === 'learning' && selectedCourse && activeLesson && (
          <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-white animate-in fade-in duration-500">
            {/* Sidebar */}
            <div className="w-85 bg-slate-50 border-r border-slate-200 flex flex-col hidden lg:flex">
              <div className="p-10 border-b border-slate-200 bg-white">
                <div className="flex items-center justify-between mb-6">
                   <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Track Progress</div>
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">33% Done</div>
                </div>
                <h3 className="font-black text-slate-900 text-xl leading-tight mb-6 line-clamp-2">{selectedCourse.title}</h3>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                   <div className="bg-indigo-600 h-2 rounded-full shadow-sm shadow-indigo-200" style={{ width: '33%' }}></div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                {selectedCourse.lessons.map(l => (
                  <button 
                    key={l.id} 
                    onClick={() => handleLessonChange(l)}
                    className={`w-full text-left p-6 rounded-[2rem] transition-all group relative ${
                      activeLesson.id === l.id 
                        ? 'bg-indigo-600 text-white shadow-[0_20px_40px_-10px_rgba(99,102,241,0.4)]' 
                        : 'hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ${
                        activeLesson.id === l.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }`}>
                        {l.order}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-black leading-tight mb-1 ${activeLesson.id === l.id ? 'text-white' : 'text-slate-900'}`}>{l.title}</div>
                        <div className={`text-[10px] font-bold flex items-center gap-2 ${activeLesson.id === l.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                          <i className="far fa-play-circle"></i> {l.duration}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-y-auto relative bg-white">
              {!isQuizMode ? (
                <div className="p-8 lg:p-20 max-w-6xl mx-auto w-full animate-in slide-in-from-right-8 duration-700">
                  <VideoPlayer 
                    videoUrl={activeLesson.videoUrl} 
                    thumbnail={selectedCourse.thumbnail} 
                  />
                  
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-10">
                    <div className="flex-1 space-y-5">
                      <div className="flex items-center gap-4">
                         <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">
                           {selectedCourse.category}
                         </span>
                         <div className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                           <i className="fas fa-layer-group"></i> Module {activeLesson.order}
                         </div>
                      </div>
                      <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{activeLesson.title}</h2>
                      <div className="flex items-center gap-4">
                         <img src={`https://i.pravatar.cc/150?u=${selectedCourse.instructor}`} className="w-12 h-12 rounded-2xl border-2 border-indigo-100" alt="Inst" />
                         <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Strategist</div>
                            <div className="text-sm font-black text-slate-900 uppercase tracking-tighter">{selectedCourse.instructor}</div>
                         </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={startQuiz}
                      disabled={isGeneratingQuiz}
                      className="group bg-indigo-600 text-white px-12 py-6 rounded-[2.5rem] font-black hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 disabled:opacity-50 shrink-0 flex items-center gap-5 active:scale-95"
                    >
                      {isGeneratingQuiz ? (
                        <>
                          <i className="fas fa-cog animate-spin"></i>
                          <span className="uppercase tracking-widest text-xs ml-2">Generating...</span>
                        </>
                      ) : (
                        <>
                          <div className="bg-white/20 w-10 h-10 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                             <i className="fas fa-bolt"></i>
                          </div>
                          <span className="uppercase tracking-widest text-xs">Certify Module</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="prose prose-slate max-w-none">
                    <div className="bg-indigo-900 rounded-[3rem] p-12 mb-16 relative overflow-hidden text-white shadow-2xl">
                      <div className="absolute -top-10 -right-10 text-white/5 text-9xl">
                         <i className="fas fa-terminal"></i>
                      </div>
                      <p className="text-2xl font-bold leading-relaxed relative z-10 italic">
                        "{activeLesson.content}"
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-10 not-prose">
                      {[
                        { icon: 'fa-microchip', title: 'Architecture', desc: 'Understanding the low-level orchestration.' },
                        { icon: 'fa-shield-halved', title: 'Hardening', desc: 'Applying OWASP standards and advanced crypto.' },
                        { icon: 'fa-infinity', title: 'Scaling', desc: 'Architecting for zero-downtime execution.' },
                        { icon: 'fa-rocket', title: 'Velocity', desc: 'Accelerating dev workflows with AI.' }
                      ].map((m, i) => (
                        <div key={i} className="group bg-slate-50 border border-slate-100 p-10 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-500">
                           <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-indigo-600 text-2xl shadow-sm mb-8 group-hover:scale-110 transition-transform">
                              <i className={`fas ${m.icon}`}></i>
                           </div>
                           <h4 className="text-2xl font-black mb-3 tracking-tight">{m.title}</h4>
                           <p className="text-slate-500 font-medium leading-relaxed">{m.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
                   <div className="w-full max-w-4xl">
                     <Quiz 
                       questions={quizQuestions} 
                       onComplete={() => setIsQuizMode(false)} 
                     />
                   </div>
                </div>
              )}
            </div>

            {/* AI Assistant Desktop Sidebar */}
            <div className="w-96 hidden xl:block z-20 shadow-[-30px_0_60px_-15px_rgba(0,0,0,0.05)]">
              <AITutor lessonTitle={activeLesson.title} />
            </div>

            {/* Mobile AI Drawer Overlay */}
            {isMobileAIDrawerOpen && (
              <div className="xl:hidden fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
                  <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="font-black text-slate-900 tracking-tight">AI Mentor Drawer</h3>
                    <button onClick={() => setIsMobileAIDrawerOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="flex-1">
                    <AITutor lessonTitle={activeLesson.title} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating AI Trigger for Mobile */}
      {view === 'learning' && (
        <button 
          onClick={() => setIsMobileAIDrawerOpen(true)}
          className="xl:hidden fixed bottom-10 right-10 w-20 h-20 bg-indigo-600 text-white rounded-full shadow-[0_25px_50px_-12px_rgba(99,102,241,0.5)] flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 animate-bounce"
        >
          <i className="fas fa-robot text-3xl"></i>
        </button>
      )}
    </div>
  );
};

export default App;
