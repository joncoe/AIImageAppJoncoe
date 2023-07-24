import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.post("/dream", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const image = aiResponse.data.data[0].url;
    res.send({ image });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong 🤷🏼‍♀️");
  }
});

app.listen(8080, () => console.log("Let's make art on port 8080"));
