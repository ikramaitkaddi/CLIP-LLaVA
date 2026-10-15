import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { OverviewTab } from './components/OverviewTab';
import { ZeroShotTab } from './components/ZeroShotTab';
import { RetrievalTab } from './components/RetrievalTab';
import { LlavaVqaTab } from './components/LlavaVqaTab';
import { ComparisonTab } from './components/ComparisonTab';
import { MiniProjectAssistantTab } from './components/MiniProjectAssistantTab';
import { QuestionsTab } from './components/QuestionsTab';
import { NotebookViewerTab } from './components/NotebookViewerTab';
import { generateCompleteJupyterNotebook } from './data/notebookExport';
import { Sparkles, Brain, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleDownloadNotebook = () => {
    try {
      const notebookJson = generateCompleteJupyterNotebook();
      const blob = new Blob([notebookJson], { type: 'application/x-ipynb+json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CLIP_and_LLaVA_Lab_Complete.ipynb';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading notebook:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar with sticky tab switching */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadNotebook={handleDownloadNotebook}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'overview' && (
          <OverviewTab
            onNavigate={(tab) => setActiveTab(tab)}
            onDownloadNotebook={handleDownloadNotebook}
          />
        )}

        {activeTab === 'zeroshot' && <ZeroShotTab />}

        {activeTab === 'retrieval' && <RetrievalTab />}

        {activeTab === 'llava' && <LlavaVqaTab />}

        {activeTab === 'comparison' && <ComparisonTab />}

        {activeTab === 'miniproject' && <MiniProjectAssistantTab />}

        {activeTab === 'questions' && <QuestionsTab />}

        {activeTab === 'notebook' && (
          <NotebookViewerTab onDownloadNotebook={handleDownloadNotebook} />
        )}
      </main>

      {/* Academic Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 text-xs text-slate-400 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-200">Vision-Language Models Lab (CLIP &amp; LLaVA)</span>
            <span>&bull;</span>
            <span>PhD / Generative AI Specialization</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('questions')}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              All 36 Solutions (Q1 - Q36)
            </button>
            <button
              onClick={handleDownloadNotebook}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
            >
              Download Complete .ipynb
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
