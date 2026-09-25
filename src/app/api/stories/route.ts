import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cinematicStories } from '@/db/schema';
import { seedInitialData } from '@/db/seed';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    await seedInitialData();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let stories;
    if (category && category !== 'all') {
      stories = await db.select().from(cinematicStories).where(eq(cinematicStories.category, category));
    } else {
      stories = await db.select().from(cinematicStories);
    }

    return NextResponse.json({ success: true, stories });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch stories' }, { status: 500 });
  }
}
