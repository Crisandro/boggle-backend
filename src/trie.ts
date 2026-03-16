export class TrieNode {
  public children: Map<string, TrieNode> = new Map();
  public isWord: boolean = false;
}

export class Trie {
  private readonly trieNode = new TrieNode();

  public insert(word: string) {
    let node = this.trieNode;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }

      node = node.children.get(char)!;
    }

    node.isWord = true;
  }

  public hasPrefix(prefix: string) {
    let node = this.trieNode;

    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }

    return true;
  }

  public hasWord(word: string) {
    let node = this.trieNode;

    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }

    return node.isWord;
  }
}