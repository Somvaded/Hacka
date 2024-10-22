import { NextResponse } from 'next/server';
import dbConnect from '@/libs/dbConnects';
import MentalHealthTrackingModel from '@/model/mentalHealthTracking';
import UserModel from '@/model/User';

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const userExists = await UserModel.findById(userId);
    if (!userExists) {
      return NextResponse.json(
        { success: false, message: 'User does not exist' },
        { status: 404 }
      );
    }

    const trackingEntries = await MentalHealthTrackingModel.find({ userId }).exec();

    return NextResponse.json(
      { success: true, data: trackingEntries },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching mental health tracking entries:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching entries' },
      { status: 500 }
    );
  }
}
