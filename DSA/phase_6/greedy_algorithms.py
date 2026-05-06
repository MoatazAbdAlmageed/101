# Greedy Algorithm Example: Fractional Knapsack

class Item:
    def __init__(self, value, weight):
        self.value = value
        self.weight = weight
        self.ratio = value / weight

def get_max_value(capacity, items):
    """
    Solves the Fractional Knapsack problem using a Greedy approach.
    We sort items by their value-to-weight ratio and take as much as possible.
    """
    # Sort items by value/weight ratio in descending order
    items.sort(key=lambda x: x.ratio, reverse=True)

    total_value = 0.0
    for item in items:
        if capacity <= 0:
            break
        
        if item.weight <= capacity:
            # Take the whole item
            capacity -= item.weight
            total_value += item.value
        else:
            # Take a fraction of the item
            total_value += item.value * (capacity / item.weight)
            capacity = 0
            
    return total_value

if __name__ == "__main__":
    items = [Item(60, 10), Item(100, 20), Item(120, 30)]
    capacity = 50
    
    max_val = get_max_value(capacity, items)
    print(f"Items: (60, 10), (100, 20), (120, 30)")
    print(f"Knapsack Capacity: {capacity}")
    print(f"Maximum value in knapsack = {max_val}")
