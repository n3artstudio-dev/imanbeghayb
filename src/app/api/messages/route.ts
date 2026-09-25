import { NextResponse } from 'next/server';
import { db } from '@/db';
import { conscienceMessages } from '@/db/schema';
import { analyzeMessageConscience } from '@/lib/conscience-engine';
import { desc } from 'drizzle-orm';
import { seedInitialData } from '@/db/seed';

export async function GET() {
  try {
    await seedInitialData();
    const messages = await db
      .select()
      .from(conscienceMessages)
      .orderBy(desc(conscienceMessages.createdAt))
      .limit(30);

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderName, recipientName, content, previewOnly, wasRevised } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, error: 'پیام نمی‌تواند خالی باشد' }, { status: 400 });
    }

    const analysis = analyzeMessageConscience(content);

    // If client just wants pre-send analysis ("آینه ضمیر قبل از ارسال")
    if (previewOnly) {
      return NextResponse.json({
        success: true,
        analysis
      });
    }

    // Save actual message
    const [newMessage] = await db.insert(conscienceMessages).values({
      senderName: senderName?.trim() || 'بنده خدا',
      recipientName: recipientName?.trim() || 'مخاطب گرامی',
      content: content.trim(),
      spiritualVibe: analysis.spiritualVibe,
      divineReminder: analysis.divineReminder,
      gentleNudge: analysis.gentleNudge,
      wasRevised: !!wasRevised,
    }).returning();

    return NextResponse.json({
      success: true,
      message: newMessage,
      analysis
    });
  } catch (error) {
    console.error('Error posting message:', error);
    return NextResponse.json({ success: false, error: 'Failed to process message' }, { status: 500 });
  }
}
