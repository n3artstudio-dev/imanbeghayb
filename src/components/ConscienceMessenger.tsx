'use client';

import React, { useState, useEffect } from 'react';
import { Send, Sparkles, ShieldAlert, HeartHandshake, Eye, RefreshCw, Feather } from 'lucide-react';

interface MessageItem {
  id: number;
  senderName: string;
  recipientName: string;
  content: string;
  spiritualVibe: string;
  divineReminder: string | null;
  gentleNudge: string | null;
  wasRevised: boolean;
  createdAt: string;
}

interface AnalysisResult {
  spiritualVibe: 'pure' | 'caution' | 'blessed' | 'reminded';
  divineReminder: string;
  gentleNudge: string;
  suggestedRewrite?: string;
  hasHarshWords: boolean;
}

export default function ConscienceMessenger() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [revisedFlag, setRevisedFlag] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (data.success && data.messages) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Live conscience watcher as user types
  useEffect(() => {
    if (!inputContent.trim()) {
      setAnalysis(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsAnalyzing(true);
      try {
        const res = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: inputContent,
            previewOnly: true
          }),
        });
        const data = await res.json();
        if (data.success && data.analysis) {
          setAnalysis(data.analysis);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsAnalyzing(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [inputContent]);

  const handleApplySuggested = (suggested: string) => {
    setInputContent(suggested);
    setRevisedFlag(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: sender || 'بنده مؤمن',
          recipientName: recipient || 'مخاطب',
          content: inputContent,
          wasRevised: revisedFlag,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setInputContent('');
        setAnalysis(null);
        setRevisedFlag(false);
        setNotification('پیام شما با یاد حضور پروردگار و نظارت ملائک در سامانه ثبت شد.');
        setTimeout(() => setNotification(null), 4000);
        await fetchMessages();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left / Input form & Conscience Eye */}
      <div className="lg:col-span-5 space-y-6">
        <div className="relative p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-black/80 border border-amber-500/20 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Spiritual Ambient Ring */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Eye className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                  آینه ضمیر و حس‌گر غیب
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    رقیب و عتید
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  «أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَى» — آراستن کلام به خشنودی خدا
                </p>
              </div>
            </div>
            {isAnalyzing && (
              <span className="text-xs text-amber-400/80 flex items-center gap-1 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> در حال تدبر...
              </span>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">فرستنده</label>
                <input
                  type="text"
                  placeholder="نام شما یا 'بنده خدا'"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">گیرنده کلام</label>
                <input
                  type="text"
                  placeholder="مخاطب (دوست، همکار، برادر...)"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-slate-400">
                  متن پیام (قبل از ارسال در محضر حق سنجیده می‌شود)
                </label>
                <span className="text-[11px] text-slate-500">
                  امتحان کنید: جملات تند یا کلمات الهی بنویسید
                </span>
              </div>
              <textarea
                rows={4}
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder="اینجا بنویسید... مثلاً: 'می‌خواهم انتقام بگیرم تو خیلی پستی...' یا 'به لطف خدا صبوری می‌کنم و توفیقت را می‌خواهم...'"
                className="w-full p-3.5 text-sm rounded-xl bg-slate-950/90 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500/50 transition leading-relaxed resize-none"
              />
            </div>

            {/* Conscience Advice Box */}
            {analysis && (
              <div
                className={`p-4 rounded-xl border text-sm transition-all duration-300 animate-in fade-in-50 ${
                  analysis.spiritualVibe === 'caution'
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    : analysis.spiritualVibe === 'blessed'
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-indigo-950/30 border-indigo-500/40 text-indigo-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {analysis.spiritualVibe === 'caution' ? (
                    <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  ) : analysis.spiritualVibe === 'blessed' ? (
                    <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <HeartHandshake className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  )}

                  <div className="space-y-2 w-full">
                    <div className="font-semibold text-xs tracking-wide">
                      {analysis.spiritualVibe === 'caution' && 'هشدار وجدان الهی: تلخی و غضب در کلام'}
                      {analysis.spiritualVibe === 'blessed' && 'نورانیت کلام: آراسته به یاد و رضای حق'}
                      {analysis.spiritualVibe === 'pure' && 'نگاه باطنی: مراقبت از حق کلام'}
                    </div>

                    <p className="text-xs leading-relaxed text-slate-200/90">
                      {analysis.gentleNudge}
                    </p>

                    <div className="font-quran text-xs text-amber-300/90 bg-black/40 p-2 rounded-lg border border-amber-500/20">
                      ﴿ {analysis.divineReminder} ﴾
                    </div>

                    {analysis.suggestedRewrite && (
                      <div className="pt-2">
                        <span className="text-[11px] text-slate-400 block mb-1">
                          پیشنهاد برای رضای خدا:
                        </span>
                        <div className="flex items-center justify-between bg-slate-900/90 p-2.5 rounded-lg border border-slate-700">
                          <span className="text-xs text-slate-200 italic">
                            {analysis.suggestedRewrite}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleApplySuggested(analysis.suggestedRewrite!)}
                            className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2.5 py-1 rounded-md transition shrink-0 mr-2"
                          >
                            جایگزین کن
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {notification && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl text-center">
                {notification}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending || !inputContent.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 hover:from-amber-500 to-amber-700 text-white font-medium text-sm shadow-lg shadow-amber-900/30 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
              ارسال پیام با تبرک و رضای الهی
            </button>
          </form>
        </div>

        {/* Short inspiration box */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-center gap-3">
          <Feather className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            «بوی خدا» یعنی قبل از آنکه کلمه‌ای جاری شود، حضور بی‌پایانش را در جان حس کنیم. واژه‌ها انرژی و تقدیر می‌سازند.
          </span>
        </div>
      </div>

      {/* Right / Live Stream of Messages */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between pb-2">
          <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            جریان پیام‌های آراسته به یاد غیب
          </h4>
          <span className="text-xs text-slate-500">
            {messages.length} پیام ضبط شده در لوح
          </span>
        </div>

        <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-1">
          {messages.map((msg) => {
            const isBlessed = msg.spiritualVibe === 'blessed';
            const isCaution = msg.spiritualVibe === 'caution';

            return (
              <div
                key={msg.id}
                className={`p-5 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                  isBlessed
                    ? 'bg-slate-900/80 border-emerald-500/30 hover:border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                    : isCaution
                    ? 'bg-slate-900/80 border-rose-500/30 hover:border-rose-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-300">{msg.senderName}</span>
                    <span className="text-slate-500">خطاب به</span>
                    <span className="font-medium text-slate-300">{msg.recipientName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {msg.wasRevised && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        اصلاح شده برای رضای خدا ✨
                      </span>
                    )}
                    <span className="text-slate-500 text-[11px]">
                      {new Date(msg.createdAt).toLocaleTimeString('fa-IR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed mb-3 whitespace-pre-wrap">
                  {msg.content}
                </p>

                {msg.divineReminder && (
                  <div className="pt-2.5 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 font-quran text-amber-400/90">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{msg.divineReminder}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      حفظ شده در امانت حق
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
