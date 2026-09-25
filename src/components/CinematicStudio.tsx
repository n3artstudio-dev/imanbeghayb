'use client';

import React, { useState } from 'react';
import { Film, Play, Sparkles, Volume2, BookOpen, Heart, Eye, ArrowLeft, Layers, Compass } from 'lucide-react';

export interface CinematicStory {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  quranAyah: string;
  quranSurah: string;
  quranTranslation: string;
  synopsis: string;
  screenplayScene: string;
  directorNotes: string;
  durationMinutes: number;
  visualTags: string[];
  bgGradient: string;
  soundscapePrompt: string;
  likesCount: number;
}

interface Props {
  stories: CinematicStory[];
}

export default function CinematicStudio({ stories }: Props) {
  const [selectedStory, setSelectedStory] = useState<CinematicStory | null>(stories[0] || null);
  const [isPlayingScene, setIsPlayingScene] = useState(false);
  const [likes, setLikes] = useState<{ [id: number]: number }>(
    stories.reduce((acc, s) => ({ ...acc, [s.id]: s.likesCount }), {})
  );
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredStories =
    activeFilter === 'all'
      ? stories
      : stories.filter((s) => s.category === activeFilter);

  const handleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="space-y-10">
      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            همه سناریوهای سینمایی
          </button>
          <button
            onClick={() => setActiveFilter('creation')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeFilter === 'creation'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            خلقت انسان و عالم ذر
          </button>
          <button
            onClick={() => setActiveFilter('unseen_realms')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeFilter === 'unseen_realms'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            حقایق نادیدنی غیب
          </button>
          <button
            onClick={() => setActiveFilter('soul_journey')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeFilter === 'soul_journey'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            سفر روح و برزخ
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>سینمای ماورایی قرآن: تجسم هنری عوالم هستی</span>
        </div>
      </div>

      {/* Featured / Selected Screenplay Theater */}
      {selectedStory && (
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-slate-900/90 to-black p-6 md:p-10 shadow-2xl backdrop-blur-2xl">
          {/* Ambient visual overlay */}
          <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-black pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Header tags */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" />
                  پرده سینمایی قرآن
                </span>
                <span className="text-xs text-slate-400">
                  مدت زمان تخمینی پلان: {selectedStory.durationMinutes} دقیقه
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLike(selectedStory.id)}
                  className="flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-rose-400 border border-slate-700 transition cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-rose-500/20" />
                  <span>{likes[selectedStory.id] || selectedStory.likesCount} تأثر قلبی</span>
                </button>
                <button
                  onClick={() => setIsPlayingScene(!isPlayingScene)}
                  className="flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isPlayingScene ? 'توقف حالت سینما' : 'اجرای حالت سینمایی'}</span>
                </button>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-100 tracking-tight leading-tight">
                {selectedStory.title}
              </h2>
              <p className="text-amber-400/90 text-sm md:text-base mt-2 font-medium">
                {selectedStory.subtitle}
              </p>
            </div>

            {/* Quran Ayah Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-amber-950/40 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  متن وحی
                </span>
                <span>{selectedStory.quranSurah}</span>
              </div>
              <p className="font-quran text-xl md:text-2xl text-amber-200 leading-loose text-center py-2">
                ﴿ {selectedStory.quranAyah} ﴾
              </p>
              <p className="text-xs md:text-sm text-slate-300 text-center leading-relaxed font-light">
                {selectedStory.quranTranslation}
              </p>
            </div>

            {/* Synopsis and Screenplay split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Screenplay & Decoupage */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    دکوپاژ و فیلم‌نامه صحنه (Visual Script)
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    مناسب برای موشن‌گرافی و تولید سینمایی قرآن
                  </span>
                </div>

                <div
                  className={`p-6 rounded-2xl border transition-all duration-500 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                    isPlayingScene
                      ? 'bg-black text-amber-200 border-amber-500 shadow-2xl shadow-amber-500/10 scale-[1.01]'
                      : 'bg-slate-950/80 text-slate-300 border-slate-800'
                  }`}
                >
                  {selectedStory.screenplayScene}
                </div>

                {/* Director's Vision */}
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    دیدگاه کارگردان و بار فلسفی صحنه:
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedStory.directorNotes}
                  </p>
                </div>
              </div>

              {/* Sidebar: Synopsis, Soundscape, Tags */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-400" />
                    خلاصه درام تصویری
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedStory.synopsis}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    طراحی صدا و اتمسفر ماورایی:
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans italic">
                    «{selectedStory.soundscapePrompt}»
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-2">
                  <span className="text-[11px] text-slate-500 font-semibold block">
                    کلیدواژه‌های معرفتی:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStory.visualTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Cinematic Scenes */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
          <Film className="w-5 h-5 text-amber-400" />
          فهرست سکانس‌های سینمایی خلقت و غیب
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredStories.map((story) => {
            const isCurrent = selectedStory?.id === story.id;

            return (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-amber-950/20 border-amber-500/80 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span>{story.quranSurah}</span>
                    <span className="text-amber-400/90 font-medium">{story.durationMinutes} دقیقه</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition line-clamp-1 mb-1">
                    {story.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] text-amber-500/90 flex items-center gap-1">
                    مشاهده دکوپاژ <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition" />
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Heart className="w-3.5 h-3.5 text-rose-400/70" />
                    {likes[story.id] || story.likesCount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
