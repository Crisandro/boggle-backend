import { Trie } from "./trie.js";

export class BoggleSolver {

  private readonly trie: Trie;
  private readonly results: Set<string> = new Set();
  private rows: number = 0;
  private columns: number = 0;

  constructor(private readonly words: string[]) {
    this.trie = new Trie();

    for (const word of words) {
      if (3 <= word.length) {
        this.trie.insert(word);
      }
    }
  }

  public solve(board: string[][]): string[] {

    this.results.clear();

    this.rows = board.length;
    this.columns = board[0]?.length ?? 0;

    const visited =
      Array.from({ length: this.rows },
        () => new Array(this.columns).fill(false));

    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        this.dfs(board, row, column, visited, "");
      }
    }

    return Array.from(this.results);
  }

  private dfs(
    board: string[][],
    currentRow: number,
    currentColumn: number,
    visited: boolean[][],
    prefix: string
  ) {

    if (0 > currentRow || 0 > currentColumn || currentRow >= this.rows || currentColumn >= this.columns) return;
    if (visited[currentRow]?.[currentColumn]) return;

    const word = prefix + board[currentRow]?.[currentColumn];

    if (!this.trie.hasPrefix(word)) return;

    if (this.trie.hasWord(word)) {
      this.results.add(word);
    }

    visited[currentRow]![currentColumn] = true;

    for (let otherRow = -1; 1 >= otherRow; otherRow++) {
      for (let otherColumn = -1; 1 >= otherColumn; otherColumn++) {
        if (0 !== otherRow || 0 !== otherColumn) {
          this.dfs(board, currentRow + otherRow, currentColumn + otherColumn, visited, word);
        }
      }
    }

    visited[currentRow]![currentColumn] = false;
  }
}