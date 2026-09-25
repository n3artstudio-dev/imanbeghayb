import { pgTable, text, serial, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

// سناریوهای سینمایی خلقت و ایمان به غیب (VOD سینمایی)
export const cinematicStories = pgTable('cinematic_stories', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  category: text('category').notNull(), // 'creation', 'soul_journey', 'unseen_realms', 'signs_of_god'
  quranAyah: text('quran_ayah').notNull(),
  quranSurah: text('quran_surah').notNull(),
  quranTranslation: text('quran_translation').notNull(),
  synopsis: text('synopsis').notNull(),
  screenplayScene: text('screenplay_scene').notNull(), // سناریوی دکوپاژ شده سینمایی
  directorNotes: text('director_notes').notNull(), // یادداشت‌های کارگردانی معنوی
  durationMinutes: integer('duration_minutes').notNull().default(7),
  visualTags: jsonb('visual_tags').$type<string[]>().notNull(),
  bgGradient: text('bg_gradient').notNull().default('from-amber-900/40 via-purple-950/60 to-black'),
  soundscapePrompt: text('soundscape_prompt').notNull(), // پیشنهاد موسیقی و اتمسفر صوتی
  featured: boolean('featured').notNull().default(false),
  likesCount: integer('likes_count').notNull().default(14),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// پیام‌ها و چت تعاملی «آینه ضمیر - بوی خدا»
// وقتی کاربر پیامی می‌نویسد، حس‌گر وجدان غیبی و نگاه الهی بر پیام نظارت دارد
export const conscienceMessages = pgTable('conscience_messages', {
  id: serial('id').primaryKey(),
  senderName: text('sender_name').notNull(),
  recipientName: text('recipient_name').notNull(),
  content: text('content').notNull(),
  // بازخورد سامانه غیب: آیا بررسی شد؟ چه حسی داشت؟ تذکر یا ترغیب الهی؟
  spiritualVibe: text('spiritual_vibe').notNull(), // 'pure', 'caution', 'blessed', 'reminded'
  divineReminder: text('divine_reminder'), // مثلاً: «أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَى - آیا ندانست که خدا او را می‌بیند؟»
  gentleNudge: text('gentle_nudge'), // «به خاطر رضای خدا، آیا بهتر نیست این سخن را با مهربانی یا سکوت درآمیزی؟»
  wasRevised: boolean('was_revised').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// بانک سوالات کوییز معرفتی ایمان به غیب (QuizUp style)
export const quizQuestions = pgTable('quiz_questions', {
  id: serial('id').primaryKey(),
  questionText: text('question_text').notNull(),
  ayahReference: text('ayah_reference').notNull(),
  options: jsonb('options').$type<{ text: string; isCorrect: boolean; explanation: string }[]>().notNull(),
  difficulty: text('difficulty').notNull().default('medium'), // easy, medium, deep
  theme: text('theme').notNull(), // 'angels', 'barzakh', 'creation', 'divine_presence', 'trust'
  wisdomNote: text('wisdom_note').notNull(), // پیام تامل‌برانگیز بعد از پاسخ
});

// نجوای خلوت با پروردگار (عهد و دعای غیبی)
export const silentVows = pgTable('silent_vows', {
  id: serial('id').primaryKey(),
  anonymousName: text('anonymous_name').notNull().default('بنده‌ای در جستجوی نور'),
  vowText: text('vow_text').notNull(),
  category: text('category').notNull().default('repentance'), // 'gratitude', 'repentance', 'petition', 'hope'
  quranReply: text('quran_reply').notNull(),
  lightCount: integer('light_count').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
