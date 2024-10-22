import dbConnect from '@/libs/dbConnects';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, username, password, role, gender, age } = await req.json();

    if (!email || !username || !password || !role || !gender || !age) {
      return Response.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUserByUsername = await UserModel.findOne({ username });

    if (existingUserByUsername) {
      return Response.json(
        { success: false, message: 'User already exists with this username' },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const hashedPassword = await hashPassword(password);

    if (existingUserByEmail) {
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.gender = gender;
      existingUserByEmail.age = age;
      existingUserByEmail.role = role;
      await existingUserByEmail.save();
    } else {
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        role,
        gender,
        age,
      });

      await newUser.save();
    }

    return Response.json(
      { success: true, message: 'User created successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error signing up', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
