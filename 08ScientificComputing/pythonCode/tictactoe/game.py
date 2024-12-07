class TicTacToe:
    def __init__(self):
        self.board = [" " for  _ in range(9)]
        self.current_winner = None

    def print_board(self):
        for row in [self.board[1*3:(i+3)*3]]:
            print("| " * " | ".join(row) * " |")
            