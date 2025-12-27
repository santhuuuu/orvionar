
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (selectedOption === questions[currentStep].correctAnswerIndex) {
      setScore(s => s + 1);
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(c => c + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const passed = score >= questions.length * 0.7;
    return (
      <div className="text-center py-16 px-8 bg-white rounded-[3rem] shadow-2xl border border-slate-100 max-w-xl mx-auto animate-in fade-in zoom-in duration-500">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${passed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
          <i className={`fas ${passed ? 'fa-award' : 'fa-redo'} text-5xl`}></i>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4">{passed ? 'Skill Unlocked!' : 'Keep Practicing'}</h2>
        <p className="text-slate-500 text-lg mb-10 font-medium">
          You achieved a score of <span className="text-indigo-600 font-black">{score}</span> out of <span className="font-bold">{questions.length}</span>.
          {passed ? " You've demonstrated a strong grasp of these concepts." : " Review the material and try again to master this module."}
        </p>
        <button 
          onClick={onComplete}
          className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
        >
          {passed ? 'Back to Curriculum' : 'Retry Module'}
        </button>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-8 duration-700">
      <div className="bg-slate-900 px-10 py-6 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">Assessment Phase</span>
          <span className="text-white font-bold">Challenge {currentStep + 1} of {questions.length}</span>
        </div>
        <div className="flex gap-2">
          {questions.map((_, idx) => (
            <div key={idx} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
          ))}
        </div>
      </div>
      
      <div className="p-12">
        <h3 className="text-2xl font-black text-slate-900 mb-10 leading-tight">{q.question}</h3>
        
        <div className="space-y-4 mb-10">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => !showResult && setSelectedOption(idx)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all group flex items-center ${
                selectedOption === idx 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md' 
                  : 'border-slate-50 hover:border-indigo-100 hover:bg-slate-50 text-slate-600'
              } ${
                showResult && idx === q.correctAnswerIndex ? 'border-green-500 bg-green-50 !text-green-900' : ''
              } ${
                showResult && selectedOption === idx && idx !== q.correctAnswerIndex ? 'border-red-500 bg-red-50 !text-red-900' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mr-4 text-xs font-black transition-colors ${
                selectedOption === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
              }`}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="font-bold">{opt}</span>
              {showResult && idx === q.correctAnswerIndex && (
                <i className="fas fa-check-circle ml-auto text-green-500 text-xl animate-in zoom-in"></i>
              )}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`p-6 rounded-2xl mb-10 text-sm animate-in fade-in slide-in-from-top-4 duration-500 ${
            selectedOption === q.correctAnswerIndex ? 'bg-green-50 border border-green-100 text-green-800' : 'bg-red-50 border border-red-100 text-red-800'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <i className={`fas ${selectedOption === q.correctAnswerIndex ? 'fa-check-circle' : 'fa-times-circle'} text-lg`}></i>
              <span className="font-black uppercase tracking-widest">{selectedOption === q.correctAnswerIndex ? 'Excellent Insight' : 'Not Quite Right'}</span>
            </div>
            <p className="font-medium leading-relaxed opacity-90">{q.explanation}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-info-circle"></i> Multiple Choice
          </div>
          {!showResult ? (
            <button
              disabled={selectedOption === null}
              onClick={() => setShowResult(true)}
              className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-100 active:scale-95"
            >
              Validate Choice
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
            >
              {currentStep < questions.length - 1 ? 'Next Challenge' : 'Finalize Module'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
