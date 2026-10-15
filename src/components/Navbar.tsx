import React from 'react';
import { 
  Sparkles, 
  Brain, 
  Search, 
  Eye, 
  Layers, 
  FileCode, 
  HelpCircle, 
  Download, 
  CheckCircle2, 
  Bot
} from 'lucide-react';

export type TabType = 
  | 'overview' 
  | 'zeroshot' 
  | 'retrieval' 
  | 'llava' 
  | 'comparison' 
  | 'miniproject' 
  | 'questions' 
  | 'notebook';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onDownloadNotebook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onDownloadNotebook,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview & Statement', icon: <Layers className="w-4 h-4" /> },
    { id: 'zeroshot', label: 'CLIP Zero-Shot', icon: <Brain className="w-4 h-4" />, badge: 'Ex 1-6' },
    { id: 'retrieval', label: 'Image Retrieval', icon: <Search className="w-4 h-4" />, badge: 'Ex 7-8' },
    { id: 'llava', label: 'LLaVA & VQA', icon: <Eye className="w-4 h-4" />, badge: 'Ex 9-12' },
    { id: 'comparison', label: 'CLIP vs LLaVA', icon: <Layers className="w-4 h-4" />, badge: 'Ex 13' },
    { id: 'miniproject', label: 'Multimodal Assistant', icon: <Bot className="w-4 h-4" />, badge: 'Project & Bonus' },
    { id: 'questions', label: 'All 36 Q&A Solutions', icon: <HelpCircle className="w-4 h-4" />, badge: 'Q1-Q36' },
    { id: 'notebook', label: 'Jupyter .ipynb', icon: <FileCode className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  CLIP & LLaVA Lab
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  PhD / GenAI Lab
                </span>
              </div>
              <p className="text-xs text-slate-400">Complete Results, Solved Experiments & Multimodal Mini-Project</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onDownloadNotebook}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
              title="Download fully executed .ipynb Jupyter Notebook"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download .ipynb</span>
            </button>
            <div className="hidden lg:flex items-center space-x-1 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>9/9 Deliverables Solved</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/80">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 text-[9px] rounded-full font-mono ${
                      isActive
                        ? 'bg-indigo-800/80 text-indigo-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
