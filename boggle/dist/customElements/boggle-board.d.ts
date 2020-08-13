import { LitElement } from 'lit-element';
import { Cube } from './cube';
export declare type board = string[][];
export declare class BoggleBoard extends LitElement {
    boardEl: HTMLElement;
    cube: HTMLElement;
    cubes: Cube[];
    firstUpdated(): void;
    updateCubeWidth(): void;
    constructor();
    board(): board;
    static styles: import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
//# sourceMappingURL=boggle-board.d.ts.map