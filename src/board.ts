import { DiceConstant } from "./dice.constant.js";

export function generateBoard(size = 4): string[][] {
  const board: string[][] = [];
  let visitedDice: Array<number> = initializeVisitedDiceIndexes();
  for (let currentRow = 0; currentRow < size; currentRow++) {
    const row: string[] = [];

    for (let currentColumn = 0; currentColumn < size; currentColumn++) {
      const currentDice: string = useUnvisitedDice(visitedDice).currentDice;
      visitedDice = useUnvisitedDice(visitedDice).updatedVisitedDice;
      const letter: string =
        currentDice[Math.floor(Math.random() * currentDice.length)] ?? "";

      row.push(letter);
    }

    board.push(row);
  }

  return board;
}

function initializeVisitedDiceIndexes(): Array<number> {
  const diceIndexes: Array<number> = new Array<number>;
  DiceConstant.dices.forEach((dice, diceIndex) => diceIndexes.push(diceIndex));
  return diceIndexes;
}

function useUnvisitedDice(visitedDice: Array<number>): UnvisitedDice {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const diceIndex = Math.floor(Math.random() * DiceConstant.dices.length);
  visitedDice.splice(diceIndex, 1);
  return new UnvisitedDice(DiceConstant.dices[diceIndex] ?? alphabet, visitedDice)
}

class UnvisitedDice {
  constructor(
    public currentDice: string,
    public updatedVisitedDice: Array<number>
  ) {}
}