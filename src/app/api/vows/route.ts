import { NextResponse } from 'next/server';
import { db } from '@/db';
import { silentVows } from '@/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { seedInitialData } from '@/db/seed';

const quranReplies = [
  'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ (بقره ۲۲۲) - همانا خداوند توبه‌کاران و پاکیزگان را دوست دارد.',
  'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ (رعد ۲۸) - آگاه باش که دل‌ها تنها با یاد خدا آرام می‌گیرد.',
  'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ (بقره ۱۸۶) - چون بندگانم درباره من بپرسند، من بسیار نزدیکم و دعای دعاکننده را اجابت می‌کنم.',
  'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ (بقره ۱۵۲) - مرا یاد کنید تا شما را یاد کنم و شکر مرا گویید.',
  'مَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ (طلاق ۳) - هر که بر خدا توکل کند، او برایش بس است.'
];

export async function GET() {
  try {
    await seedInitialData();
    const vows = await db.select().from(silentVows).orderBy(desc(silentVows.createdAt)).limit(30);
    return NextResponse.json({ success: true, vows });
  } catch (error) {
    console.error('Error vows GET:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch vows' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { anonymousName, vowText, category, action, vowId } = body;

    // Handle like / lighting a candle for a vow
    if (action === 'light' && vowId) {
      const [updated] = await db
        .update(silentVows)
        .set({ lightCount: sql`${silentVows.lightCount} + 1` })
        .where(eq(silentVows.id, Number(vowId)))
        .returning();
      return NextResponse.json({ success: true, vow: updated });
    }

    if (!vowText || !vowText.trim()) {
      return NextResponse.json({ success: false, error: 'متن عهد نمی‌تواند خالی باشد' }, { status: 400 });
    }

    const randomReply = quranReplies[Math.floor(Math.random() * quranReplies.length)];

    const [newVow] = await db.insert(silentVows).values({
      anonymousName: anonymousName?.trim() || 'بنده‌ای در خلوت غیب',
      vowText: vowText.trim(),
      category: category || 'hope',
      quranReply: randomReply,
      lightCount: 1,
    }).returning();

    return NextResponse.json({ success: true, vow: newVow });
  } catch (error) {
    console.error('Error vows POST:', error);
    return NextResponse.json({ success: false, error: 'Failed to save vow' }, { status: 500 });
  }
}
