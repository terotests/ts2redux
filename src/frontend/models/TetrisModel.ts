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

const pieceDeclaration = (color:string, rows:string[]) : ActivePiece => {
  const cells = new Array( rows.length )
  for( let i=0; i < rows.length; i++) {
    const row = rows[i]
    cells[i] = new Array( row.length )
    for( let c=0; c < row.length; c++) {
      if(row.charAt(c) == ' ') {
        cells[i][c] = {color: Colors.EMPTY}
      } else {
        cells[i][c] = {color: color}        
      }
    }
  }
  return {
    x : 0,
    y : rows.length * -1,
    width : rows.length,
    height : rows.length,
    cells
  }
}

/**
 * [' O '],
*  ['OOO'],
*  [' O ']
 */

export const createNewPiece = (usingColor: string): ActivePiece => {
  const items = [
    pieceDeclaration( usingColor,
      ['xx',
       'xx']),
    pieceDeclaration( usingColor,
        ['   ',
         'xxx',
         ' x ']
      ),
    pieceDeclaration( usingColor,
      [' x ',
       ' x ',
       'xx ']
      ), 
    pieceDeclaration( usingColor,
      [' x ',
       ' x ',
       ' xx']
      ),            
    pieceDeclaration( usingColor,
      [' x  ',
       ' x  ',
       ' x  ',
       ' x  ']
      ),                        
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

  doesCollide(
    pieceX: number,
    pieceY: number,
    pieceCells?: Cell[][],
  ): boolean {
    let collides = false;
    const compareAgainst = pieceCells || this.activePiece.cells
    compareAgainst.forEach((row, y) => {    
      row.forEach((cell, x) => {
        if(cell.color === Colors.EMPTY) return
        if ( pieceY + y >= this.rows ) {
          collides = true
          return
        }
        if( ((pieceX + x) < 0) || ( (pieceX + x) >= this.cols) ) {
          collides = true
          return
        }
        if (cell.color !== Colors.EMPTY) {
          if (pieceY + y < 0) return;
          if (this.cells[pieceY + y][pieceX + x].color !== Colors.EMPTY) {
            collides = true;
          }
        }
      });
    });
    return collides;
  };  

  tick() {
    this.tickCnt++
    if(this.tickCnt >= this.ticksPerMove) {
      this.tickCnt = 0
      this.step()
    }
  }

  left() {
    if (
      !this.doesCollide(
        this.activePiece.x - 1,
        this.activePiece.y
      )
    ) {
      this.activePiece.x--;
    }
  }
  right() {
    if (
      !this.doesCollide(
        this.activePiece.x + 1,
        this.activePiece.y
      )
    ) {
      this.activePiece.x++;
    }    
  }
  // keyboard control for rotation, tries to rotate activePiece and if
  // it does not collide, rotation can be done
  rotate() {
    const newOrientation = this.rotateCells(this.activePiece.cells);
    if (
      !this.doesCollide(
        this.activePiece.x,
        this.activePiece.y,
        newOrientation
      )
    ) {
      this.activePiece.cells = newOrientation;
    }
  }
  // creates a new piece with rotated values
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

  step() {
    if (this.gameOn) {
      if (
        !this.doesCollide(
          this.activePiece.x,
          this.activePiece.y + 1
        )
      ) {
        this.activePiece.y++;
      } else {
        if (this.activePiece.y < 0) {
          this.gameEnded = true;
          this.gameOn = false;
        } else {
          this.masonPiece();
          this.dropRows()
          this.activePiece = createNewPiece(this.pickNextColor());
          this.activePiece.x = Math.floor( Math.random()*5 )
        }
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

  // adds the piece permanently to the structure
  masonPiece() {
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

  // drops full rows and adds points to the user
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

  clearCells() {
    this.cells = new Array(this.rows);
    for (let row = 0; row < this.rows; row++) {
      this.cells[row] = new Array(this.cols);
      for (let col = 0; col < this.cols; col++) {
        this.cells[row][col] = { color: Colors.EMPTY };
      }
    }
  }

  resetGame() {
    this.clearCells()
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