import express from "express";
import cors from "cors";
import fs from "node:fs";
import { generateBoard } from "./board.js";
import { BoggleSolver } from "./solver.js";
import { encrypt } from "./crypto.js";

const myDicktionary = fs
  .readFileSync("./dictionary.txt", "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase());

const app = express();
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

app.listen(3000, () => {
  console.log("Boggle server running on port 3000");
});