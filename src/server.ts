import express from "express";
import cors from "cors";
import fs from "node:fs";
import { db } from './firebase.js';
import { generateBoard } from "./board.js";
import { BoggleSolver } from "./solver.js";
import { encrypt } from "./crypto.js";

const myDicktionary = fs
  .readFileSync("./dictionary.txt", "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase());

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:4200",
    "https://sandro-bogglegame.netlify.app"
  ]
}));
const solver = new BoggleSolver(myDicktionary);

app.get("/generate-board", (req, res) => {
  const sizeParam = req.query.size ?? "4";
  const size =
    typeof sizeParam === "string"
      ? Number.parseInt(sizeParam, 10)
      : 4;
  const boardSize = Number.isNaN(size) ? 4 : size;

  const board: string[][] = generateBoard(boardSize);

  const words = encrypt({board, words: solver.solve(board)});
  res.json({
    response: words
  });
});

app.post('/save-score', async (req, res) => {
  try {
    const { name, score, words } = req.body;

    await db.collection('scores').add({
      name,
      score,
      words,
      createdAt: new Date()
    });

    res.json({ success: true });
  } catch (error) {
    console.error('SAVE SCORE ERROR:', error);
    res.status(500).json({ error: String(error) });
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const snapshot = await db
      .collection('scores')
      .orderBy('score', 'desc')
      .limit(10)
      .get();

    const scores = snapshot.docs.map(doc => doc.data());

    res.json(scores);
  } catch (error) {
    console.error('Failed to fetch leaderboard', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.listen(3000, () => {
  console.log("Boggle server running on port 3000");
});