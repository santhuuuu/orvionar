
import React from 'react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'courses' | 'learning') => void;
  activeView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activeView }) => {
  return (
    <header className="glass sticky top-0 z-[60] h-20 flex items-center border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="bg-indigo-600 text-white w-11 h-11 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-indigo-200 group-hover:rotate-12 transition-transform">
              <i className="fas fa-atom text-xl"></i>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
              ORVION<span className="gradient-text">AR</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-10">
            {['home', 'courses'].map((view) => (
              <button 
                key={view}
                onClick={() => onNavigate(view as any)}
                className={`text-sm font-extrabold uppercase tracking-widest transition-all relative py-2 ${
                  activeView === view ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {view === 'home' ? 'Dashboard' : 'Ecosystem'}
                {activeView === view && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full animate-in fade-in slide-in-from-bottom-2"></span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <div className="relative hidden lg:block group">
              <input 
                type="text" 
                placeholder="Search Skills..." 
                className="bg-slate-100 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl py-2.5 pl-12 pr-6 text-sm font-bold focus:ring-0 w-72 transition-all outline-none"
              />
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600"></i>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors relative">
                <i className="far fa-bell"></i>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 p-0.5 shadow-lg shadow-indigo-100 cursor-pointer">
                <img src="https://i.pravatar.cc/100?u=JD" className="w-full h-full object-cover rounded-[14px]" alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
