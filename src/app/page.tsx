import React from 'react';
import { db } from '@/db';
import { cinematicStories, quizQuestions } from '@/db/schema';
import { seedInitialData } from '@/db/seed';
import CinematicStudio from '@/components/CinematicStudio';
import ConscienceMessenger from '@/components/ConscienceMessenger';
import UnseenQuiz from '@/components/UnseenQuiz';
import SilentVows from '@/components/SilentVows';
import { Film, MessageSquare, HelpCircle, Heart, Sparkles, Compass } from 'lucide-react';

export const revalidate = 0;

export default async function HomePage() {
  await seedInitialData();

  const stories = await db.select().from(cinematicStories);
  const rawQuestions = await db.select().from(quizQuestions);

  // Cast JSON options to match component structure
  const questions = rawQuestions.map((q) => ({
    ...q,
    options: q.options as { text: string; isCorrect: boolean; explanation: string }[],
  }));

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background celestial light ambiance */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-600/10 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-950/15 blur-3xl pointer-events-none -z-10" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-xl text-slate-100 flex items-center gap-2">
                مشکات غیب
                <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  قرآن به زبان سینما
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                سامانه تعاملی ایمان به غیب و تجسم عوالم نورانی کلام وحی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/qurancinematic/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/30 hover:to-purple-600/30 text-pink-300 border border-pink-500/30 transition shadow-sm"
            >
              <svg className="w-4 h-4 text-pink-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="hidden sm:inline">پیج سازنده:</span>
              <span className="font-mono dir-ltr font-semibold">@qurancinematic</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium backdrop-blur-md">
          <Compass className="w-3.5 h-3.5" />
          <span>الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ — فراتر از مرزهای خاک و ماده</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-100 leading-tight">
          سامانه تجسم <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">ایمان به غیب</span> و حضور پروردگار
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          ترکیبی جامع و نوآورانه از سینمای ماورایی قرآن (دکوپاژ خلقت انسان، عوالم ذر و برزخ)، پیام‌رسان با نظارت وجدان و آگاهی از فرشتگان کاتب (بوی خدا در کلام)، آزمون معرفتی ایمان به غیب و خلوتگاه عهد با خالق هستی.
        </p>

        {/* Quick jump anchor tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#cinematic-vod"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 font-medium transition"
          >
            <Film className="w-4 h-4 text-amber-400" />
            ۱. پرده سینمایی آیات (VOD)
          </a>
          <a
            href="#conscience-chat"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 font-medium transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            ۲. پیام‌رسان با بوی خدا (آینه ضمیر)
          </a>
          <a
            href="#unseen-quiz"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 font-medium transition"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
            ۳. کوییز معرفتی غیب (QuizUp)
          </a>
          <a
            href="#silent-vows"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 font-medium transition"
          >
            <Heart className="w-4 h-4 text-rose-400" />
            ۴. خلوت و عهد با معبود
          </a>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* SECTION 1: Cinematic Studio & Screenplays */}
        <section id="cinematic-vod" className="scroll-mt-24 space-y-6">
          <div className="border-r-4 border-amber-500 pr-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-3">
              <Film className="w-6 h-6 text-amber-400" />
              استودیو سینمایی غیب و خلقت انسان (قرآن به تصویر)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              سناریوهای دکوپاژ شده از سفر روح، خلقت خاک و دمیدن نفخه الهی، حضور نامرئی ملائک و گذار به برزخ
            </p>
          </div>

          <CinematicStudio stories={stories} />
        </section>

        {/* SECTION 2: Conscience Messenger (Chat with the fragrance of God) */}
        <section id="conscience-chat" className="scroll-mt-24 space-y-6">
          <div className="border-r-4 border-emerald-500 pr-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
              آینه‌ی ضمیر و کلام: سامانه چت با بوی خدا
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              هنگامی که می‌نویسید، سامانه حضور پروردگار و فرشتگان رقیب و عتید را یادآور می‌شود؛ اگر خشم یا تلخی باشد تذکر می‌دهد و اگر نیکی باشد برکت می‌بخشد.
            </p>
          </div>

          <ConscienceMessenger />
        </section>

        {/* SECTION 3: Knowledge Quiz about Unseen */}
        <section id="unseen-quiz" className="scroll-mt-24 space-y-6">
          <div className="border-r-4 border-sky-500 pr-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-sky-400" />
              کوییز معرفتی ایمان به غیب (سبک QuizUp قرآنی)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              پرسش و پاسخ تعاملی همراه با تحلیل آیات، حکمت باطنی و ارزیابی عمق درک شما از حقایق نادیدنی
            </p>
          </div>

          <UnseenQuiz questions={questions} />
        </section>

        {/* SECTION 4: Silent Vows & Heart Connection */}
        <section id="silent-vows" className="scroll-mt-24 space-y-6">
          <div className="border-r-4 border-rose-500 pr-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-3">
              <Heart className="w-6 h-6 text-rose-400" />
              خلوتگاه غیب: عهد با خدا و نجوای دل
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              ثبت عهدنامه باطنی و دریافت پاسخ آینه‌وار از دل آیات نورانی قرآن کریم
            </p>
          </div>

          <SilentVows />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-28 border-t border-slate-900/90 pt-10 pb-8 text-center text-xs text-slate-500 space-y-3">
        <p>
          طراحی شده بر مبنای اندیشه قرآنی و سینمایی صفحه{' '}
          <a
            href="https://www.instagram.com/qurancinematic/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline font-mono"
          >
            @qurancinematic
          </a>{' '}
          | برای گسترش معرفت حق و ایمان به غیب
        </p>
        <p className="text-slate-600 font-quran text-sm">
          ﴿ وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ ﴾
        </p>
      </footer>
    </div>
  );
}
