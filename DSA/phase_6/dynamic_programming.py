# Dynamic Programming Example: Fibonacci Sequence

def fib_memo(n, memo={}):
    """
    Top-Down approach (Memoization)
    """
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

def fib_tab(n):
    """
    Bottom-Up approach (Tabulation)
    """
    if n <= 1:
        return n
    
    table = [0] * (n + 1)
    table[1] = 1
    
    for i in range(2, n + 1):
        table[i] = table[i-1] + table[i-2]
        
    return table[n]

if __name__ == "__main__":
    n = 10
    print(f"Fibonacci({n}) using Memoization: {fib_memo(n)}")
    print(f"Fibonacci({n}) using Tabulation:  {fib_tab(n)}")
    
    # 0/1 Knapsack (Brief conceptual example)
    # weights = [1, 2, 3], values = [6, 10, 12], capacity = 5
    # This would typically be solved with a 2D table.
