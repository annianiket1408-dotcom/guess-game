import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, ArrowRight, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

const questions = [
  { emoji: "🍕❤️", answer: "love pizza", hint: "food + feeling" },
  { emoji: "🎬🍿", answer: "movie night", hint: "cinema + snack" },
  { emoji: "🌧️☔", answer: "rainy day", hint: "weather + protection" },
  { emoji: "🐱📦", answer: "cat in the box", hint: "animal + container" },
  { emoji: "🚗💨", answer: "fast car", hint: "vehicle + speed" },
  { emoji: "📚☕", answer: "study time", hint: "books + drink" },
  { emoji: "🕒😎", answer: "sunny day", hint: "bright weather" },
  { emoji: "🍔🍟🥤", answer: "fast food", hint: "junk meal combo" },
  { emoji: "💤😴", answer: "sleeping", hint: "rest mode" },
  { emoji: "🏃‍♂️💨", answer: "running fast", hint: "movement + speed" },
  { emoji: "🎧🎶", answer: "listening to music", hint: "audio activity" },
  { emoji: "✈️🌍", answer: "travel the world", hint: "journey abroad" },
  { emoji: "🧠💡", answer: "bright idea", hint: "thinking + solution" },
  { emoji: "📱🔋", answer: "low battery", hint: "phone problem" },
  { emoji: "🎉🥳", answer: "celebration", hint: "party mood" },
  { emoji: "🔥💪", answer: "strong motivation", hint: "energy + strength" },
  { emoji: "🌙😴", answer: "sleep at night", hint: "night rest" },
  { emoji: "🍎📚", answer: "school time", hint: "learning place" },
  { emoji: "🕒⏰", answer: "time is up", hint: "deadline" },
  { emoji: "💻☕", answer: "coding session", hint: "developer life" }
];

export default function App() {
  const [shuffledIndices, setShuffledIndices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, isCorrect: false });
  const [gameEnded, setGameEnded] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Initialize and shuffle game
  const initGame = () => {
    const indices = Array.from({ length: questions.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
    setCurrentIndex(0);
    setScore(0);
    setUserInput('');
    setFeedback({ show: false, isCorrect: false });
    setGameEnded(false);
    setShowHint(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (feedback.show || gameEnded) return;

    const currentQuestion = questions[shuffledIndices[currentIndex]];
    const isCorrect = userInput.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setFeedback({ show: true, isCorrect });
  };

  const handleNext = () => {
    if (currentIndex < shuffledIndices.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
      setFeedback({ show: false, isCorrect: false });
      setShowHint(false);
    } else {
      setGameEnded(true);
    }
  };

  if (shuffledIndices.length === 0) return null;

  const currentQuestion = questions[shuffledIndices[currentIndex]];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      {/* User Name Tag */}
      <div className="absolute top-6 right-8 z-20">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          Aniket kumar
        </span>
      </div>

      {/* Mesh Blobs Background */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-purple-600/40 blur-[80px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-blue-600/40 blur-[80px] rounded-full z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/30 blur-[80px] rounded-full z-0 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase mb-1">Guess The Emoji</h1>
            <p className="text-xl font-bold tracking-tight">Level {currentIndex + 1} <span className="text-zinc-600 text-lg">/ {questions.length}</span></p>
          </div>
          <div className="text-right">
            <span className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 uppercase block mb-1">Score</span>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-2xl font-bold font-mono tracking-tighter text-indigo-400">{score.toString().padStart(4, '0')}</span>
            </div>
          </div>
        </div>

        {/* Game Stage */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!gameEnded ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card bg-white/5 backdrop-blur-[20px] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-[40px] p-10 flex flex-col items-center"
              >
                {/* Emoji Display */}
                <div className="mb-6 relative group text-center">
                  <div className="text-[100px] leading-tight md:text-[120px] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10 select-none">
                    {currentQuestion.emoji}
                  </div>
                </div>
                
                <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase font-bold mb-8">Guess the phrase</p>

                {/* Input Section */}
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      autoFocus
                      disabled={feedback.show}
                      placeholder={feedback.show ? "" : "Type your answer..."}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-xl text-center font-medium focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/30 disabled:opacity-50"
                    />
                    
                    {feedback.show && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`absolute -bottom-8 left-0 w-full text-center flex items-center justify-center gap-2 font-bold tracking-wide text-sm ${feedback.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}
                      >
                        {feedback.isCorrect ? (
                          <><CheckCircle2 className="w-4 h-4" /> CORRECT! WELL DONE</>
                        ) : (
                          <><XCircle className="w-4 h-4" /> WRONG ANSWER</>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Hint Section */}
                  {!gameEnded && !feedback.show && (
                    <div className="flex flex-col items-center gap-2">
                       <AnimatePresence>
                        {showHint && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-center overflow-hidden"
                          >
                            <span className="text-[11px] font-bold text-indigo-300 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                              Hint: {currentQuestion.hint}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {!showHint && (
                        <button
                          type="button"
                          onClick={() => setShowHint(true)}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 hover:text-indigo-400 uppercase tracking-widest transition-colors py-2"
                        >
                          <Lightbulb className="w-3 h-3" /> Need a hint?
                        </button>
                      )}
                    </div>
                  )}

                  <div className="w-full pt-2">
                    {!feedback.show ? (
                      <button
                        type="submit"
                        disabled={!userInput.trim()}
                        className="w-full accent-glow bg-gradient-to-br from-[#6366f1] to-[#a855f7] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:bg-white/5 disabled:from-zinc-800 disabled:to-zinc-900 disabled:text-zinc-600 disabled:scale-100 disabled:shadow-none text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] text-sm tracking-[0.2em] uppercase"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <div className="space-y-4 pt-4">
                        {!feedback.isCorrect && (
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                            <span className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase block mb-1">Correct answer</span>
                            <span className="text-lg font-bold text-white tracking-wide uppercase">{currentQuestion.answer}</span>
                          </div>
                        )}
                        
                        <button
                          type="button"
                          onClick={handleNext}
                          autoFocus
                          className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-[0.2em] uppercase border border-white/10"
                        >
                          {currentIndex < shuffledIndices.length - 1 ? 'Next Question' : 'Finish Game'} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card bg-white/5 backdrop-blur-[20px] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-[40px] p-10 text-center"
              >
                <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.3)]" />
                </div>
                <h2 className="text-3xl font-bold mb-2 tracking-tight">Game Completed!</h2>
                <p className="text-zinc-400 mb-8 font-medium">You mastered the emoji puzzles.</p>
                
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">Final Score</div>
                  <div className="text-6xl font-bold text-indigo-400 tracking-tighter">
                    {score.toString().padStart(4, '0')} 
                    <span className="text-2xl text-zinc-700 ml-2">/ {questions.length}</span>
                  </div>
                </div>

                <button
                  onClick={initGame}
                  className="w-full bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-[0.2em] uppercase"
                >
                  <RotateCcw className="w-5 h-5" /> Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer / Reset */}
        <footer className="mt-12 flex flex-col items-center gap-6">
          {!gameEnded && (
            <button
              onClick={initGame}
              className="text-gray-500 hover:text-white text-[11px] font-bold tracking-[0.3em] uppercase transition-colors"
            >
              Reset Game Session
            </button>
          )}
          <div className="flex gap-2 text-[9px] text-gray-600 font-bold tracking-widest uppercase">
            <span className="px-2 py-1 border border-gray-800 rounded">ESC to quit</span>
            <span className="px-2 py-1 border border-gray-800 rounded">ENTER to submit</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
