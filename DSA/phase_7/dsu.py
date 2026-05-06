# Expert Structure: Disjoint Set Union (DSU) / Union-Find

class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i):
        """Find with Path Compression"""
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        """Union by Rank"""
        root_i = self.find(i)
        root_j = self.find(j)
        
        if root_i != root_j:
            if self.rank[root_i] < self.rank[root_j]:
                self.parent[root_i] = root_j
            elif self.rank[root_i] > self.rank[root_j]:
                self.parent[root_j] = root_i
            else:
                self.parent[root_i] = root_j
                self.rank[root_j] += 1
            return True
        return False

if __name__ == "__main__":
    dsu = DSU(5)
    dsu.union(0, 1)
    dsu.union(2, 3)
    dsu.union(4, 3)
    
    print(f"Find(0): {dsu.find(0)}")
    print(f"Find(1): {dsu.find(1)}")
    print(f"Find(4): {dsu.find(4)}")
    print(f"Is 0 and 1 connected? {dsu.find(0) == dsu.find(1)}")
    print(f"Is 0 and 4 connected? {dsu.find(0) == dsu.find(4)}")
    
    dsu.union(1, 2)
    print(f"Is 0 and 4 connected after union(1, 2)? {dsu.find(0) == dsu.find(4)}")
