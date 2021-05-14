import { Component, OnInit, Input } from '@angular/core';
import { Piece } from '../models/piece';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input() piece: Piece = Piece.EMPTY;
  @Input() row: number = 0;
  @Input() col: number = 0;
  get color(): string {
    switch (this.piece) {
      case Piece.X:
        return 'x';
      case Piece.O:
        return 'o';
      default:
        return '';
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
