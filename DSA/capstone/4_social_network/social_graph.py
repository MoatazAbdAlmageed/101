import collections
import heapq

class SocialGraph:
    def __init__(self):
        self.adj = collections.defaultdict(list)
        self.user_data = {}

    def add_user(self, user_id, name):
        self.user_data[user_id] = name

    def add_friendship(self, u1, u2, weight=1):
        """Add a bidirectional friendship with an optional weight (e.g., interaction level)."""
        self.adj[u1].append((u2, weight))
        self.adj[u2].append((u1, weight))

    def find_shortest_path(self, start_id, end_id):
        """Dijkstra's Algorithm to find the shortest path between two users."""
        pq = [(0, start_id, [start_id])]
        visited = set()
        
        while pq:
            cost, current, path = heapq.heappop(pq)
            
            if current == end_id:
                return path, cost
            
            if current in visited:
                continue
            
            visited.add(current)
            
            for neighbor, weight in self.adj[current]:
                if neighbor not in visited:
                    heapq.heappush(pq, (cost + weight, neighbor, path + [neighbor]))
                    
        return None, float('inf')

    def get_common_friends(self, u1, u2):
        """Find mutual friends using set intersection."""
        friends1 = {neighbor for neighbor, weight in self.adj[u1]}
        friends2 = {neighbor for neighbor, weight in self.adj[u2]}
        return friends1.intersection(friends2)

    def recommend_friends(self, user_id):
        """Recommend friends based on friends-of-friends (BFS)."""
        recommendations = collections.Counter()
        my_friends = {neighbor for neighbor, weight in self.adj[user_id]}
        
        for friend in my_friends:
            for fof, weight in self.adj[friend]:
                if fof != user_id and fof not in my_friends:
                    recommendations[fof] += 1
        
        return recommendations.most_common(5)

if __name__ == "__main__":
    network = SocialGraph()
    
    # Add users
    users = {1: "Alice", 2: "Bob", 3: "Charlie", 4: "David", 5: "Eve"}
    for uid, name in users.items(): network.add_user(uid, name)
    
    # Add friendships
    network.add_friendship(1, 2) # Alice - Bob
    network.add_friendship(2, 3) # Bob - Charlie
    network.add_friendship(3, 4) # Charlie - David
    network.add_friendship(1, 3) # Alice - Charlie
    network.add_friendship(4, 5) # David - Eve
    
    # Shortest path Alice -> Eve
    path, cost = network.find_shortest_path(1, 5)
    path_names = [users[uid] for uid in path] if path else "No path"
    print(f"Shortest path Alice to Eve: {' -> '.join(path_names)} (Cost: {cost})")
    
    # Common friends Alice and David
    common = network.get_common_friends(1, 4)
    common_names = [users[uid] for uid in common]
    print(f"Common friends between Alice and David: {common_names}")
    
    # Recommendations for Alice
    recs = network.recommend_friends(1)
    rec_names = [(users[uid], count) for uid, count in recs]
    print(f"Friend recommendations for Alice: {rec_names}")
