# Expert Structure: Trie (Prefix Tree)

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """Inserts a word into the trie."""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word):
        """Returns True if the word is in the trie."""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

    def starts_with(self, prefix):
        """Returns True if there is any word in the trie that starts with the given prefix."""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

if __name__ == "__main__":
    trie = Trie()
    trie.insert("apple")
    print(f"Search 'apple': {trie.search('apple')}")   # True
    print(f"Search 'app':   {trie.search('app')}")     # False
    print(f"Starts with 'app': {trie.starts_with('app')}") # True
    trie.insert("app")
    print(f"Search 'app' after insert: {trie.search('app')}") # True
