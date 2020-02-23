import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center;">
      <h1 style="margin-bottom:auto;">Tic-Tac-Toe</h1>
      <a
        href="https://github.com/changhuixu/tic-tac-toe"
        target="_blank"
        rel="noopener"
      >
        GitHub Repo
      </a>
    </div>
    <div style="margin:0 auto; max-width:300px;">
      <app-board></app-board>
    </div>
  `,
  styles: []
})
export class AppComponent {}
