import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

export default async function test(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const response = await fetch("https://www.google.com");
  res.status(200).json({ response });
}
