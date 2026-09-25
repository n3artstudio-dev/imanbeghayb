'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Feather, Heart, Send, Sparkles } from 'lucide-react';

interface SilentVowItem {
  id: number;
  anonymousName: string;
  vowText: string;
  category: string;
  quranReply: string;
  lightCount: number;
  createdAt: string;
}

export default function SilentVows() {
  const [vows, setVows] = useState<SilentVowItem[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('hope');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentReply, setSentReply] = useState<string | null>(null);

  const fetchVows = async () => {
    try {
      const res = await fetch('/api/vows');
      const data = await res.json();
      if (data.success && data.vows) {
        setVows(data.vows);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchVows();
  }, []);

  const handleCreateVow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/vows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anonymousName: name || 'بنده‌ای در خلوت غیب',
          vowText: text,
          category,
        }),
      });
      const data = await res.json();
      if (data.success && data.vow) {
        setSentReply(data.vow.quranReply);
        setText('');
        setName('');
        await fetchVows();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLightCandle = async (vowId: number) => {
    try {
      setVows((prev) =>
        prev.map((v) => (v.id === vowId ? { ...v, lightCount: v.lightCount + 1 } : v))
      );
      await fetch('/api/vows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'light',
          vowId,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Registering a secret vow */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-black/80 border border-amber-500/20 backdrop-blur-xl shadow-2xl space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">
                خلوت و عهد با پروردگار
              </h3>
              <p className="text-xs text-slate-400">
                در تاریکی غیب، نجوایت را با خدای شنوا و دانا در میان بگذار
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateVow} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                نام مستعار یا صفت دلخواه
              </label>
              <input
                type="text"
                placeholder="مثلاً: دل‌خسته، مسافر نور، یا نام دلخواه"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                حالت نجوا
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500/50 transition"
              >
                <option value="hope">عهد و اشتیاق (تجدید پیمان)</option>
                <option value="repentance">توبه و بازگشت (استغفار در خلوت)</option>
                <option value="gratitude">شکرگزاری و حس حضور حق</option>
                <option value="petition">التماس دعا و یاری غیبی</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                متن عهد / نجوای دل (تنها خدا از نیت باطنی آگاه است)
              </label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="خدایا، با تو عهد می‌بندم که در این گرفتاری به غیب و حکمت تو تکیه کنم..."
                className="w-full p-3.5 text-sm rounded-xl bg-slate-950/90 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition leading-relaxed resize-none"
              />
            </div>

            {sentReply && (
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                <span className="font-semibold block text-amber-400">
                  ✨ ندای رحمت الهی به دل شما:
                </span>
                <p className="font-quran leading-relaxed">{sentReply}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm transition shadow-lg shadow-amber-950/40 disabled:opacity-50 cursor-pointer"
            >
              <Feather className="w-4 h-4" />
              سپردن نجوا به خلوت پروردگار
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Wall of collective silent prayers & vows */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between pb-2">
          <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            دیوار روشنایی: نجوای بندگان در آستان غیب
          </h4>
          <span className="text-xs text-slate-500">
            {vows.length} شمع دعا روشن است
          </span>
        </div>

        <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
          {vows.map((vow) => (
            <div
              key={vow.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition-all duration-300 backdrop-blur-md space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300">{vow.anonymousName}</span>
                <span className="text-slate-500 text-[11px]">
                  {new Date(vow.createdAt).toLocaleDateString('fa-IR')}
                </span>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed italic">
                «{vow.vowText}»
              </p>

              <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800 text-xs font-quran text-amber-300/90 leading-relaxed">
                ﴿ {vow.quranReply} ﴾
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60">
                <span className="text-[11px] text-slate-500">
                  آمین گویی و پیوند قلبی با این عهد
                </span>
                <button
                  onClick={() => handleLightCandle(vow.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>{vow.lightCount} شمع صلوات</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
