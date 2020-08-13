import { LitElement } from 'lit-element';
declare const FACES: readonly ["left", "right", "top", "bottom", "front", "back"];
declare type face = typeof FACES[number];
export declare class Cube extends LitElement {
    face: string;
    char: string;
    fauxcused: boolean;
    input: HTMLInputElement;
    text: {
        left: string;
        right: string;
        top: string;
        bottom: string;
        front: string;
        back: string;
    };
    constructor();
    static styles: import("lit-element").CSSResult;
    enteredChar(char: string): void;
    _charWasEntered(): boolean;
    _nextFace(): face;
    _face(): import("lit-element").TemplateResult;
    _addQuClass(text: string): (part: import("lit-html").Part) => void;
    render(): import("lit-element").TemplateResult;
}
export {};
//# sourceMappingURL=cube.d.ts.map