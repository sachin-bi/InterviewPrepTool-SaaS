import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  // TODO: use this in all other routes
  // console.log("-- request: ");

  // if (request.method !== 'GET') {
  //   return Response.json(
  //     {
  //       success: false,
  //       message: "--- Error: requset.method should be 'GET'.!",
  //     },
  //     { status: 405 }
  //   );
  // }

  await dbConnect();
  // localhost:3000/api/cuu?username=sachin?phone=android
  try {
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

    const existingUser = await UserModel.findOne({
      username,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken.!",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("--- Error checking username.!", err);
    return Response.json(
      {
        success: false,
        message: "--- Error checking username.!",
      },
      { status: 500 }
    );
  }
}
