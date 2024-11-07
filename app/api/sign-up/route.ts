import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    //quering for same user

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
    });
    // may cause bottle neck for db (calling again and again)
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken.!",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    if (existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: "User already exist with this email.!",
        },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
    //   existingUserByEmail.password = hashedPassword;

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,

        isSubscribed: false,
        queryLeft: 5,
        interactions: [],
      });
      await newUser.save();
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfull.!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("--- Error in registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
