import heapq
import collections

class Node:
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.freq < other.freq

class HuffmanCoder:
    def __init__(self):
        self.codes = {}
        self.reverse_codes = {}

    def _build_freq_dict(self, text):
        return collections.Counter(text)

    def _build_tree(self, freq_dict):
        heap = [Node(char, freq) for char, freq in freq_dict.items()]
        heapq.heapify(heap)

        while len(heap) > 1:
            node1 = heapq.heappop(heap)
            node2 = heapq.heappop(heap)

            merged = Node(None, node1.freq + node2.freq)
            merged.left = node1
            merged.right = node2
            heapq.heappush(heap, merged)

        return heap[0]

    def _build_codes(self, root, current_code):
        if root is None:
            return

        if root.char is not None:
            self.codes[root.char] = current_code
            self.reverse_codes[current_code] = root.char
            return

        self._build_codes(root.left, current_code + "0")
        self._build_codes(root.right, current_code + "1")

    def compress(self, text):
        if not text: return "", None
        
        freq_dict = self._build_freq_dict(text)
        root = self._build_tree(freq_dict)
        self._build_codes(root, "")

        encoded_text = "".join(self.codes[char] for char in text)
        return encoded_text, root

    def decompress(self, encoded_text):
        current_code = ""
        decoded_text = ""

        for bit in encoded_text:
            current_code += bit
            if current_code in self.reverse_codes:
                decoded_text += self.reverse_codes[current_code]
                current_code = ""
        
        return decoded_text

if __name__ == "__main__":
    text = "this is an example for huffman encoding"
    coder = HuffmanCoder()
    
    encoded, tree = coder.compress(text)
    print(f"Original Text: {text}")
    print(f"Original Size: {len(text) * 8} bits")
    print(f"Encoded Text:  {encoded}")
    print(f"Encoded Size:  {len(encoded)} bits")
    
    decoded = coder.decompress(encoded)
    print(f"Decoded Text:  {decoded}")
    print(f"Compression Ratio: {len(encoded) / (len(text) * 8):.2f}")
