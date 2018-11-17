export interface Cell {
    color: string;
}
export declare enum Colors {
    EMPTY = ""
}
export interface ActivePiece {
    x: number;
    y: number;
    width: number;
    height: number;
    cells: Cell[][];
}
/**
 * [' O '],
*  ['OOO'],
*  [' O ']
 */
export declare const createNewPiece: (usingColor: string) => ActivePiece;
/**
 * @redux true
 */
export declare class TetrisModel {
    useColors: string[];
    lastUsedColor: number;
    points: number;
    rows: number;
    cols: number;
    cells: Cell[][];
    activePiece: ActivePiece;
    gameOn: boolean;
    gameEnded: boolean;
    ticksPerMove: number;
    tickCnt: number;
    doesCollide(pieceX: number, pieceY: number, pieceCells?: Cell[][]): boolean;
    tick(): void;
    left(): void;
    right(): void;
    rotate(): void;
    rotateCells(cells: Cell[][]): Cell[][];
    step(): void;
    pickNextColor(): string;
    masonPiece(): void;
    dropRows(): void;
    clearCells(): void;
    resetGame(): void;
    start(): void;
}
