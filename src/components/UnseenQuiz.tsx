'use client';

import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, Sparkles, BookOpen, RotateCcw, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestionItem {
  id: number;
  questionText: string;
  ayahReference: string;
  options: QuizOption[];
  difficulty: string;
  theme: string;
  wisdomNote: string;
}

interface Props {
  questions: QuizQuestionItem[];
}

export default function UnseenQuiz({ questions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showWisdom, setShowWisdom] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    setShowWisdom(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 20);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#fbbf24', '#f59e0b', '#d97706', '#10b981'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowWisdom(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowWisdom(false);
    setScore(0);
    setIsFinished(false);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400">
        در حال بارگذاری سوالات معرفتی...
      </div>
    );
  }

  if (isFinished) {
    const maxScore = questions.length * 20;
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-black border border-amber-500/30 text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
          <Award className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-100">کارنامه معرفتی ایمان به غیب</h3>
          <p className="text-sm text-slate-400 mt-2">
            تدبر شما در ابعاد ماورایی قرآن به پایان رسید.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="text-4xl font-black text-amber-400">
            {score} <span className="text-lg text-slate-400 font-normal">/ {maxScore} امتیاز</span>
          </div>
          <div className="text-xs text-slate-400">
            درصد فهم نشانه‌های غیب: {percentage}٪
          </div>
          <p className="text-xs text-amber-300 pt-2 font-medium">
            {percentage >= 80
              ? '✨ چشم دل شما به نشانه‌های غیب و حضور حق بیناست؛ گوارایتان باد.'
              : '🌱 آفرین بر این گام معرفتی؛ هر بار تدبر در آیات، پرده‌ای از غیب را کنار می‌زند.'}
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          شروع مجدد آزمون
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="font-semibold text-slate-300">
            پرسش {currentIndex + 1} از {questions.length}
          </span>
          <span className="text-slate-500 hidden sm:inline">| حوزه: {currentQ.theme}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">امتیاز تجمیعی:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
            {score}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-black/90 border border-slate-800 shadow-2xl space-y-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-amber-400 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            استناد قرآنی: {currentQ.ayahReference}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 leading-relaxed">
            {currentQ.questionText}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isChosen = selectedOption === idx;
            let btnStyle =
              'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-200';

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle =
                  'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 shadow-lg shadow-emerald-950/20';
              } else if (isChosen && !opt.isCorrect) {
                btnStyle =
                  'border-rose-500/80 bg-rose-950/40 text-rose-200 shadow-lg shadow-rose-950/20';
              } else {
                btnStyle = 'opacity-40 border-slate-800 bg-slate-950/30 text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-right transition-all duration-200 flex items-start gap-3 text-sm cursor-pointer ${btnStyle}`}
              >
                <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-xs text-slate-400">
                  {idx + 1}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="font-medium">{opt.text}</div>
                  {isAnswered && (opt.isCorrect || isChosen) && (
                    <div className="text-xs pt-1 opacity-90 leading-relaxed">
                      {opt.explanation}
                    </div>
                  )}
                </div>
                {isAnswered && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isChosen && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Wisdom Reflection note after answer */}
        {showWisdom && (
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2 animate-in fade-in-50">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              تأمل و حکمت قرآنی در این آیه:
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentQ.wisdomNote}
            </p>
          </div>
        )}

        {/* Next Question action */}
        {isAnswered && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              {currentIndex + 1 < questions.length ? 'پرسش بعدی' : 'مشاهده نتیجه نهایی'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
