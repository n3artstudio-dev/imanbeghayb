import { NextResponse } from 'next/server';
import { db } from '@/db';
import { quizQuestions } from '@/db/schema';
import { seedInitialData } from '@/db/seed';

export async function GET() {
  try {
    await seedInitialData();
    const questions = await db.select().from(quizQuestions);
    return NextResponse.json({ success: true, questions });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch quiz' }, { status: 500 });
  }
}
