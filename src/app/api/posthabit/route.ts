import dbConnect from '@/libs/dbConnects';
import MentalHealthTrackingModel from '@/model/mentalHealthTracking';
import UserModel from '@/model/User';  

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    
    // Log the incoming request body
    console.log('New tracking entry data:', body);
    
    // Check if the user exists
    const userExists = await UserModel.findById(body.userId); 
    if (!userExists) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'User does not exist',
        }),
        { status: 404 }
      );
    }

    // Create a new instance of the model with the incoming data
    const newTrackingEntry = new MentalHealthTrackingModel(body);
    
    // Save to the database
    await newTrackingEntry.save();

    return new Response(
      JSON.stringify({
        success: true,
        data: newTrackingEntry,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving mental health tracking:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error saving entry',
      }),
      { status: 500 }
    );
  }
}
