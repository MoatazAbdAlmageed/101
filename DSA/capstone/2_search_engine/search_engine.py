import os
import re

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
        self.file_indices = set() # Store indices of files where this word appears

class SearchEngine:
    def __init__(self):
        self.root = TrieNode()
        self.file_list = []

    def _normalize(self, text):
        return re.sub(r'[^a-z0-9]', '', text.lower())

    def index_file(self, file_path):
        """Read a file and index its words."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                words = re.findall(r'\w+', content)
                
                file_idx = len(self.file_list)
                self.file_list.append(file_path)
                
                for word in words:
                    self._insert(self._normalize(word), file_idx)
            print(f"Indexed: {file_path}")
        except Exception as e:
            print(f"Error indexing {file_path}: {e}")

    def _insert(self, word, file_idx):
        if not word: return
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
        node.file_indices.add(file_idx)

    def search(self, query):
        """Search for a word and return files containing it."""
        query = self._normalize(query)
        node = self.root
        for char in query:
            if char not in node.children:
                return []
            node = node.children[char]
        
        if node.is_end_of_word:
            return [self.file_list[i] for i in node.file_indices]
        return []

    def autocomplete(self, prefix):
        """Return all words in the index starting with this prefix."""
        prefix = self._normalize(prefix)
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
        
        results = []
        self._dfs(node, prefix, results)
        return results

    def _dfs(self, node, current_word, results):
        if node.is_end_of_word:
            results.append(current_word)
        
        for char, next_node in node.children.items():
            self._dfs(next_node, current_word + char, results)

if __name__ == "__main__":
    engine = SearchEngine()
    
    # Create dummy files for testing
    os.makedirs("sample_data", exist_ok=True)
    with open("sample_data/file1.txt", "w") as f: f.write("Data structures and algorithms are fundamental to computer science.")
    with open("sample_data/file2.txt", "w") as f: f.write("Algorithms can be analyzed using Big-O notation.")
    with open("sample_data/file3.txt", "w") as f: f.write("Python is a great language for learning algorithms.")
    
    # Index files
    for filename in os.listdir("sample_data"):
        engine.index_file(os.path.join("sample_data", filename))
    
    # Test search
    print("\nSearch for 'algorithms':")
    print(engine.search("algorithms"))
    
    # Test autocomplete
    print("\nAutocomplete for 'alg':")
    print(engine.autocomplete("alg"))
    
    print("\nAutocomplete for 'data':")
    print(engine.autocomplete("data"))
