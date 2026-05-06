# Backtracking Example: N-Queens Problem

def is_safe(board, row, col, n):
    # Check this row on left side
    for i in range(col):
        if board[row][i] == 1:
            return False

    # Check upper diagonal on left side
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
        if board[i][j] == 1:
            return False

    # Check lower diagonal on left side
    for i, j in zip(range(row, n, 1), range(col, -1, -1)):
        if board[i][j] == 1:
            return False

    return True

def solve_n_queens_util(board, col, n):
    # Base case: If all queens are placed
    if col >= n:
        return True

    # Consider this column and try placing this queen in all rows one by one
    for i in range(n):
        if is_safe(board, i, col, n):
            # Place queen
            board[i][col] = 1

            # Recur to place rest of the queens
            if solve_n_queens_util(board, col + 1, n):
                return True

            # If placing queen in board[i][col] doesn't lead to a solution, backtrack
            board[i][col] = 0

    return False

def print_board(board):
    for row in board:
        print(" ".join(["Q" if x == 1 else "." for x in row]))

if __name__ == "__main__":
    N = 4
    board = [[0 for _ in range(N)] for _ in range(N)]

    if solve_n_queens_util(board, 0, N):
        print(f"Solution for {N}-Queens:")
        print_board(board)
    else:
        print(f"No solution exists for {N}-Queens")
