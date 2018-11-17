export interface Cell {
  color: string;
}

export enum Colors {
  EMPTY = ""
}

export interface ActivePiece {
  x: number;
  y: number;
  width: number;
  height: number;
  cells: Cell[][];
}

export const doesCollide = (
  pieceX: number,
  pieceY: number,
  cells: Cell[][],
  pieceCells: Cell[][],
  width: number,
  height: number
): boolean => {
  let collides = false;
  pieceCells.forEach((row, y) => {    
    row.forEach((cell, x) => {
      if(cell.color === Colors.EMPTY) return
      if ( pieceY + y >= height ) {
        collides = true
        return
      }
      if( ((pieceX + x) < 0) || ( (pieceX + x) >= width) ) {
        collides = true
        return
      }
      if (cell.color !== Colors.EMPTY) {
        if (pieceY + y < 0) return;
        if (cells[pieceY + y][pieceX + x].color !== Colors.EMPTY) {
          collides = true;
        }
      }
    });
  });
  return collides;
};

export const rotateCells = (cells: Cell[][]) => {
  const res: Cell[][] = new Array(cells.length);
  for (let j = 0; j < cells.length; j++) {
    res[j] = new Array(cells[j].length);
  }
  for (let j = 0; j < cells.length; j++) {
    const row = cells[j];
    for (let i = 0; i < row.length; i++) {
      res[i][j] = { color: Colors.EMPTY };
    }
  }
  for (let j = 0; j < cells.length; j++) {
    const row = cells[j];
    for (let i = 0; i < row.length; i++) {
      res[i][cells.length - j - 1] = row[i];
    }
  }
  return res;
};

export const createNewPiece = (usingColor: string): ActivePiece => {
  const items = [
    {
      x: 0,
      y: -2,
      width: 2,
      height: 2,
      cells: [
        [{ color: usingColor }, { color: usingColor }],
        [{ color: usingColor }, { color: usingColor }]
      ]
    },
    {
      x: 0,
      y: -2,
      width: 3,
      height: 3,
      cells: [
        [
          { color: Colors.EMPTY },
          { color: Colors.EMPTY },
          { color: Colors.EMPTY }
        ],
        [{ color: usingColor }, { color: usingColor }, { color: usingColor }],
        [
          { color: Colors.EMPTY },
          { color: usingColor },
          { color: Colors.EMPTY }
        ]
      ]
    },
    {
      x: 0,
      y: -2,
      width: 3,
      height: 3,
      cells: [
        [
          { color: Colors.EMPTY },
          { color: Colors.EMPTY },
          { color: Colors.EMPTY }
        ],
        [{ color: usingColor }, { color: usingColor }, { color: usingColor }],
        [
          { color: Colors.EMPTY },
          { color: Colors.EMPTY },
          { color: usingColor }
        ]
      ]
    },
    {
      x: 0,
      y: -2,
      width: 3,
      height: 3,
      cells: [
        [
          { color: Colors.EMPTY },
          { color: Colors.EMPTY },
          { color: Colors.EMPTY }
        ],
        [{ color: usingColor }, { color: usingColor }, { color: usingColor }],
        [
          { color: usingColor },
          { color: Colors.EMPTY },
          { color: Colors.EMPTY }
        ]
      ]
    },
    {
      x: 0,
      y: -2,
      width: 4,
      height: 4,
      cells: [
        [
          { color: Colors.EMPTY },
          { color: usingColor },
          { color: Colors.EMPTY },
          { color: Colors.EMPTY },
        ],
        [{ color: Colors.EMPTY }, { color: usingColor }, { color: Colors.EMPTY }, { color: Colors.EMPTY }],
        [{ color: Colors.EMPTY }, { color: usingColor }, { color: Colors.EMPTY }, { color: Colors.EMPTY }],
        [{ color: Colors.EMPTY }, { color: usingColor }, { color: Colors.EMPTY }, { color: Colors.EMPTY }],
      ]      
    }
  ];
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * @redux true
 */
export class TetrisModel {
  useColors: string[] = ["red", "blue", "green", "yellow", "brown"];
  lastUsedColor: number = 0;

  points: number = 0

  rows: number = 20;
  cols: number = 10;
  cells: Cell[][] = [];

  activePiece: ActivePiece;
  gameOn: boolean = false;
  gameEnded: boolean = false;

  ticksPerMove:number = 10
  tickCnt:number = 0

  tick() {
    this.tickCnt++
    if(this.tickCnt >= this.ticksPerMove) {
      this.tickCnt = 0
      this.step()
    }
  }

  left() {
    if (
      !doesCollide(
        this.activePiece.x - 1,
        this.activePiece.y,
        this.cells,
        this.activePiece.cells,
        this.cols,
        this.rows
      )
    ) {
      this.activePiece.x--;
    }
  }
  right() {
    if (
      !doesCollide(
        this.activePiece.x + 1,
        this.activePiece.y,
        this.cells,
        this.activePiece.cells,
        this.cols,
        this.rows
      )
    ) {
      this.activePiece.x++;
    }    
  }

  rotateCells (cells: Cell[][]) : Cell[][] {
    const res: Cell[][] = new Array(cells.length);
    for (let j = 0; j < cells.length; j++) {
      res[j] = new Array(cells[j].length);
    }
    for (let j = 0; j < cells.length; j++) {
      const row = cells[j];
      for (let i = 0; i < row.length; i++) {
        res[i][j] = { color: Colors.EMPTY };
      }
    }
    for (let j = 0; j < cells.length; j++) {
      const row = cells[j];
      for (let i = 0; i < row.length; i++) {
        res[i][cells.length - j - 1] = row[i];
      }
    }
    return res;
  };  

  rotate() {
    const newOrientation = this.rotateCells(this.activePiece.cells);
    if (
      !doesCollide(
        this.activePiece.x,
        this.activePiece.y,
        this.cells,
        newOrientation,
        this.cols,
        this.rows
      )
    ) {
      this.activePiece.cells = newOrientation;
    }
  }

  step() {
    if (this.gameOn) {
      let freezePiece = false;
      if (
        !freezePiece &&
        !doesCollide(
          this.activePiece.x,
          this.activePiece.y + 1,
          this.cells,
          this.activePiece.cells,
          this.cols,
          this.rows
        )
      ) {
        this.activePiece.y++;
      } else {
        if (this.activePiece.y < 0) {
          this.gameEnded = true;
          this.gameOn = false;
        } else {
          freezePiece = true;
        }
      }
      if (freezePiece) {
        this.addPiece();
        this.dropRows()
        this.activePiece = createNewPiece(this.pickNextColor());
        this.activePiece.x = Math.floor( Math.random()*5 )
      }
    }
  }

  pickNextColor() : string {
    this.lastUsedColor++;
    if (this.lastUsedColor >= this.useColors.length) {
      this.lastUsedColor = 0;
    }
    return this.useColors[this.lastUsedColor];
  }

  addPiece() {
    const piece = this.activePiece;
    piece.cells.forEach((row, y) => {
      if (piece.y + y < 0) return;
      row.forEach((cell, x) => {
        if (cell.color !== Colors.EMPTY) {
          this.cells[piece.y + y][piece.x + x].color = cell.color;
        }
      });
    });
  }

  dropRows() {
    const nextRows = []
    let emptyCnt = 0
    for( let i=0; i < this.cells.length ; i++ ) {
      const row = this.cells[i]
      if( row.filter( cell => cell.color === Colors.EMPTY).length > 0 ) {
        nextRows.push( row )
      } else {
        emptyCnt++
      }
    }
    if( emptyCnt > 0 ) {
      this.points += emptyCnt * emptyCnt * 10
      while(emptyCnt-- > 0) {
        const newEmpty = new Array(this.cols);
        for (let col = 0; col < this.cols; col++) {
          newEmpty[col] = { color: Colors.EMPTY };
        }        
        nextRows.unshift( newEmpty )
      }
      this.cells = nextRows 
      this.ticksPerMove--     
    }
  }  

  resetGame() {
    this.cells = new Array(this.rows);
    for (let row = 0; row < this.rows; row++) {
      this.cells[row] = new Array(this.cols);
      for (let col = 0; col < this.cols; col++) {
        this.cells[row][col] = { color: Colors.EMPTY };
      }
    }
    this.activePiece = createNewPiece(this.pickNextColor());
    this.ticksPerMove = 10
    this.tickCnt = 0
  }

  start() {
    this.resetGame();
    this.gameOn = true;
    this.gameEnded = false;
    this.points = 0
  }
}