export function generateBoard(size = 4): string[][] {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const board: string[][] = [];

  for (let currentRow = 0; currentRow < size; currentRow++) {
    const row: string[] = [];

    for (let currentColumn = 0; currentColumn < size; currentColumn++) {
      const letter: string =
        alphabet[Math.floor(Math.random() * alphabet.length)] ?? "";

      row.push(letter);
    }

    board.push(row);
  }

  return board;
}