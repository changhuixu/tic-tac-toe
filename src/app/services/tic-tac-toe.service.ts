import { Injectable } from '@angular/core';
import { Piece } from 'src/app/models/piece';
import { BestMove } from 'src/app/models/best-move';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  private readonly maximizer = Piece.X;
  private readonly minimizer = Piece.O;
  constructor() {}

  minimax(state: Piece[][], depth: number, isMaximizer: boolean): BestMove {
    let bestMove: BestMove;
    if (isMaximizer) {
      bestMove = new BestMove(-1, -1, -100);
    } else {
      bestMove = new BestMove(-1, -1, 100);
    }

    if (depth == 0 || this.isGameOver(state)) {
      return new BestMove(-1, -1, this.evaluate(state));
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (state[row][col] === Piece.EMPTY) {
          state[row][col] = isMaximizer ? this.maximizer : this.minimizer;
          const best = this.minimax(state, depth - 1, !isMaximizer);
          state[row][col] = Piece.EMPTY;

          if (isMaximizer) {
            if (best.score > bestMove.score) {
              bestMove = new BestMove(row, col, best.score);
            }
          } else {
            if (best.score < bestMove.score) {
              bestMove = new BestMove(row, col, best.score);
            }
          }
        }
      }
    }

    return bestMove;
  }

  isGameOver(state: Piece[][]): boolean {
    return this.isWin(state) || this.isDraw(state);
  }

  countOfEmptyCells(state: Piece[][]): number {
    let count = 0;
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        if (state[i][j] === Piece.EMPTY) {
          count++;
        }
      }
    }
    return count;
  }

  isDraw(state: Piece[][]): boolean {
    if (state.some(row => row.some(c => c === Piece.EMPTY))) {
      return false;
    }
    return !this.isWin(state);
  }

  isWin(state: Piece[][]): boolean {
    // horizontal
    for (const col of state) {
      if (col[0] == col[1] && col[0] == col[2] && col[0] != Piece.EMPTY) {
        return true;
      }
    }

    // vertical
    for (let col = 0; col < state[0].length; col++) {
      if (
        state[0][col] === state[1][col] &&
        state[0][col] === state[2][col] &&
        state[0][col] != Piece.EMPTY
      ) {
        return true;
      }
    }

    // diagonal
    if (
      (state[0][0] === state[1][1] &&
        state[0][0] === state[2][2] &&
        state[0][0] != Piece.EMPTY) ||
      (state[0][2] === state[1][1] &&
        state[0][2] === state[2][0] &&
        state[0][2] != Piece.EMPTY)
    ) {
      return true;
    }

    return false;
  }

  /**
   * This function returns true if there are moves remaining on the board.
   * It returns false if there are no moves left to play.
   */
  private isEmptyCellLeft(state: Piece[][]): boolean {
    return state.some(row => row.some(c => c === Piece.EMPTY));
  }

  private evaluate(state: Piece[][]): number {
    const winStates = [
      [state[0][0], state[0][1], state[0][2]],
      [state[1][0], state[1][1], state[1][2]],
      [state[2][0], state[2][1], state[2][2]],
      [state[0][0], state[1][0], state[2][0]],
      [state[0][1], state[1][1], state[2][1]],
      [state[0][2], state[1][2], state[2][2]],
      [state[0][0], state[1][1], state[2][2]],
      [state[2][0], state[1][1], state[0][2]]
    ];

    for (var i = 0; i < 8; i++) {
      if (winStates[i].every(x => x === this.maximizer)) {
        return 10;
      }
      if (winStates[i].every(x => x === this.minimizer)) {
        return -10;
      }
    }
    return 0;
  }
}
