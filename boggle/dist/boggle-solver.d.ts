import './customElements/cube';
import './customElements/boggle-board';
import './customElements/q-or-qu';
import './customElements/solve-button';
import './customElements/word-box';
import { WordBox } from './customElements/word-box';
import { BoggleBoard, board } from './customElements/boggle-board';
import { SolveButton } from './customElements/solve-button';
import { LitElement } from 'lit-element';
declare type solvedBoard = [string, number][];
declare type solvedState = 'unsolved' | 'solving' | 'solved';
export declare class BoggleSolver extends LitElement {
    boggleBoard: BoggleBoard;
    wordBox: WordBox;
    solveButton: SolveButton;
    state: solvedState;
    qu?: boolean;
    constructor();
    handleKeydown(e: KeyboardEvent): Promise<void>;
    solve(board: board): Promise<solvedBoard>;
    displayWords(words: solvedBoard): void;
    solveButtonClicked(): Promise<void>;
    render(): import("lit-element").TemplateResult;
    static styles: import("lit-element").CSSResult;
}
export {};
//# sourceMappingURL=boggle-solver.d.ts.map