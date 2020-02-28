import { Component, OnInit } from '@angular/core';
import { Piece } from '../models/piece';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private currentPlayer: Piece;
  gameOver: boolean;
  board: Piece[][];
  statusMessage: string;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.board = [
      [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
      [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY],
      [Piece.EMPTY, Piece.EMPTY, Piece.EMPTY]
    ];
    this.currentPlayer = Piece.X;
    this.gameOver = false;
    this.statusMessage = `Player ${this.currentPlayer}'s turn`;
  }

  move(row: number, col: number) {
    if (!this.gameOver && this.board[row][col] === Piece.EMPTY) {
      this.board[row][col] = this.currentPlayer;
      if (this.isDraw()) {
        this.statusMessage = `It's a Draw.`;
        this.gameOver = true;
      } else if (this.isWin()) {
        this.hooray();
        this.statusMessage = `Player ${this.currentPlayer} win!`;
        this.gameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === Piece.O ? Piece.X : Piece.O;
        this.statusMessage = `Player ${this.currentPlayer}'s turn`;
      }
    }
  }

  isDraw(): boolean {
    if (this.board.some(row => row.some(c => c === Piece.EMPTY))) {
      return false;
    }
    return !this.isWin();
  }

  isWin(): boolean {
    // horizontal
    for (const col of this.board) {
      if (col[0] == col[1] && col[0] == col[2] && col[0] != Piece.EMPTY) {
        return true;
      }
    }

    // vertical
    for (let col = 0; col < this.board[0].length; col++) {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col] &&
        this.board[0][col] != Piece.EMPTY
      ) {
        return true;
      }
    }

    // diagonal
    if (
      (this.board[0][0] === this.board[1][1] &&
        this.board[0][0] === this.board[2][2] &&
        this.board[0][0] != Piece.EMPTY) ||
      (this.board[0][2] === this.board[1][1] &&
        this.board[0][2] === this.board[2][0] &&
        this.board[0][2] != Piece.EMPTY)
    ) {
      return true;
    }

    return false;
  }

  private hooray() {
    var audio = new Audio('assets/KidsCheering.mp3');
    audio.play();
  }
}
