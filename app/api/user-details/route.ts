import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    //  localhost:3000/api/cuu?username=sachin?phone=android
    //  /api/user-details?username=${username}`
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam); //TODO: Remove log

    // console.log(
    //   "--- result after zod validation -from check-username-unique.ts result::",
    //   result
    // );
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || []; //TODO: look it
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Invalid query parametes",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;

    const existingUser = await UserModel.findOne(
      { username },
      { password: 0, interactions: 0 }
    );

    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username not found in user-details route.!",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "returning get from user-details route.!",
        existingUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("--- Error from user-details route.!", err);
    return Response.json(
      {
        success: false,
        message: "--- Error from user-details route.!!",
      },
      { status: 500 }
    );
  }
}
