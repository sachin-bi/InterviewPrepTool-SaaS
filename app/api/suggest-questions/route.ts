// docs here:
// (1) https://ai.google.dev/gemini-api/docs/quickstart?lang=node       // this one used here
// (2) https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai
// TODO: watch-out the return of this route

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const {content} = await request.json();
    // console.log("--be:content--",content);
    

    const genAI = new GoogleGenerativeAI(process.env.GIMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "This is job details starts with $$$ and ends with $$$: $$$" + {content} + "$$$  Create a list of ten questions formatted as a single string. Each question should be separated by '||'. These questions which might be asked in this interview , and should be suitable for this interview. Avoid sensitive topics, focusing instead on interview . For example, your output should be structured like this in single string: ' General:|| Tell us a little bit about yourself and your academic background.|| What are your career goals and why are you interested in P360?|| What are your biggest strengths and weaknesses?|| How do you stay up-to-date with new technologies in your field?|| Technical:|| Explain your understanding of basic SQL concepts.|| Briefly explain the concept of cloud computing.|| How would you approach solving a logical reasoning problem?|| Can you share an example of a puzzle or game you enjoy and why?|| Describe your comfort level with basic math operations.|| Behavioral:|| How do you communicate technical information to non-technical people?|| Describe a time you worked effectively in a team, especially when facing challenges or disagreements. ' Generate ten questions only, Ensure the questions are based on job details provided above.";

    const result = await model.generateContent(prompt);

    //   console.log(result.response.text());
    //   console.log(result.response.candidates);
    //   console.log(result.response.candidates[0].content.parts[0].text);  // type error
    // console.log("-- Gemini suggestions::",
    //   result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
    //     "-- Gemini didn't return suggesstions!"
    // );

    if (!result) {
      return Response.json(
        {
          success: false,
          message: "Gemini didn't return suggesstions!",
          result,
        },
        { status: 500 }
      );
    }

    // data to be sent - manipulation
    const textSuggestions = result.response.text();

    // Step 1: Split by "||" to separate each question, then trim extra whitespace
    const questionsArray = textSuggestions
      .split("||")
      .map((question) => question.trim());

    // Step 2: Convert each question into an object with a 'text' key
    const questionsObjectsArray = questionsArray.map((question) => ({
      content: question,
    }));

    return Response.json(
      {
        success: true,
        message: "Gemini suggesstions! ",
        messages: questionsObjectsArray,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("---error from ai suggest-messages route:", err);
    return Response.json(
      {
        success: false,
        message: "Err in get-messages suggestion ai/route",
      },
      { status: 500 }
    );
  }
}
