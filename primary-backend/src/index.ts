import express from "express";
import cors from "cors";
import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

const app = express();
app.use(express.json());
app.use(cors());

app.post("/submition", async (req, res) => {
  await client.connect();
  const { code, problemId, language } = req.body;

  const pushedData = await client.lPush(
    "problems",
    JSON.stringify({ code, problemId, language })
  );
  console.log(pushedData);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Primary backend is running on port 3000!");
});
