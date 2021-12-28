import fetch from "cross-fetch";

import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

export default async function test(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const response = await fetch("https://www.google.com");
  const result = await response.json();
  console.log(result);
  res.status(200).json({ result });
}
