// Helper for analyzing message conscience
// "سامانه وجدان و حس‌گر ایمان به غیب در کلام"
export interface MessageAnalysis {
  spiritualVibe: 'pure' | 'caution' | 'blessed' | 'reminded';
  divineReminder: string;
  gentleNudge: string;
  suggestedRewrite?: string;
  hasHarshWords: boolean;
}

const negativeKeywords = [
  'احمق', 'بیشعور', 'نفرین', 'لعنت', 'کثافت', 'خفه', 'دروغگو', 'پست', 'بی‌عرضه',
  'انتقام', 'داغونت می‌کنم', 'تقاص', 'ازت بدم میاد', 'نامرد', 'بی‌شرف', 'خائن', 'ساقطت می‌کنم'
];

const blessedKeywords = [
  'خدا', 'الهی', 'الحمدلله', 'شکر', 'ان‌شاءالله', 'سلام', 'مهربان', 'ببخش', 'حلال',
  'دعایت می‌کنم', 'صبر', 'رحمت', 'نور', 'حق', 'صداقت', 'صلوات', 'محبت', 'آرامش'
];

export function analyzeMessageConscience(text: string): MessageAnalysis {
  const lower = text.toLowerCase();
  
  const foundNegatives = negativeKeywords.filter(w => lower.includes(w));
  const foundBlessed = blessedKeywords.filter(w => lower.includes(w));

  if (foundNegatives.length > 0) {
    return {
      spiritualVibe: 'caution',
      divineReminder: 'أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَى (علق ۱۴) | مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ (ق ۱۸)',
      gentleNudge: 'برادر/خواهر عزیز، پروردگار غیب و آشکار شاهد این پیام است و فرشتگان در حال کتابتند. آیا به خاطر رضای خدا، بهتر نیست این خشم را فرو خوری و با زبانی آرام‌تر یا سکوت سخن بگویی؟',
      suggestedRewrite: '«من از این موضوع ناراحت شدم، اما به خاطر خدا مایل به حل مسالمت‌آمیز آن با گفت‌وگوی آرام هستم.»',
      hasHarshWords: true
    };
  }

  if (foundBlessed.length >= 2 || (foundBlessed.length >= 1 && text.length > 25)) {
    return {
      spiritualVibe: 'blessed',
      divineReminder: 'إِلَيْهِ يَصْعَدُ الْكَلِمُ الطَّيِّبُ وَالْعَمَلُ الصَّالِحُ يَرْفَعُهُ (فاطر ۱۰) - سخنان پاکیزه به سوی او بالا می‌رود.',
      gentleNudge: 'رایحه معنوی و نورانی در کلامت جاریست. این سخن مایه برکت روح و اتصال به رحمت الهی است.',
      hasHarshWords: false
    };
  }

  return {
    spiritualVibe: 'pure',
    divineReminder: 'وَقُولُوا لِلنَّاسِ حُسْنًا (بقره ۸۳) - با مردم به نیکی سخن بگویید.',
    gentleNudge: 'کلام امانت الهی است. با نیت خیر و آگاهی از حضور پروردگار ارسال کن.',
    hasHarshWords: false
  };
}
