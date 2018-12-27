
import * as React from 'react';
import * as container from '../models/reducers/TetrisModel'
import { PureList } from './PureList';
import { Colors } from '../models/TetrisModel'

// abstract properties version of the component
export interface Props extends container.IProps {}

// this component can be re-used
export class TetrisC extends React.PureComponent<Props> {
  interval: any
  keyFunction = (event:KeyboardEvent) => {
    if(this.props.gameOn) {
      if(event.keyCode == 37) {
        this.props.left()
      }
      if(event.keyCode == 38) {
        this.props.rotate()
      }    
      if(event.keyCode == 39) {
        this.props.right()
      }
      if(event.keyCode == 40) {
        this.props.step()
      }      
    }
    event.preventDefault()
  }
  componentDidMount() {
    this.interval = setInterval(()=>{
      if(this.props.gameOn) this.props.tick()
    }, 100)
    document.addEventListener("keydown", this.keyFunction, false);
  }
  componentWillUnmount() {
    clearInterval( this.interval )
    document.removeEventListener("keydown", this.keyFunction, false);
  }
  render() {
    return (
      <div style={{margin:20, 
          fontFamily: 'Arial', fontSize:'10px', color :'#333333',
          padding:20, backgroundColor:'white', borderRadius:'5px', display:'inline-block'}}>
        
        { !this.props.gameOn ? 
          <div><button onClick={this.props.start}>Start Game</button></div>
          : ''}
        <div>Points:{this.props.points} {this.props.gameEnded ? 'Game Over' : ''}</div>
      
        <div style={{overflow:'hidden', width: this.props.cols*20, height: this.props.rows * 20, position:'relative', backgroundColor:'#222222'}}>
          {
            this.props.cells.map( (row,y) => <div 
              style={{width: this.props.cols*20, height: 21}}
              key={'row_'+y} >{
                row.map( (cell,x) => {
                  /*
                  const active = this.props.activePiece
                  let color = cell.color
                  active.cells.forEach( (arow, ay)=>{
                    arow.forEach( (acell, ax) => {
                      if( ((active.x + ax) == x) && ((active.y + ay) == y)) {
                        if(acell.color !== Colors.EMPTY) color = acell.color
                      }
                    })
                  })
                  */
                  const color = cell.color
                  return <div key={'cell'+y+'_'+x} 
                  style={{backgroundColor:color, 
                    boxShadow: color !== Colors.EMPTY ? 'inset 0 0 3px rgba(0,0,0,0.6)' : '',
                    position:'absolute', left:x*20, top:20*y, width:20, height:20}}></div>
                })}</div>)
          }         
            {this.props.activePiece ? this.props.activePiece.cells.map( (arow, y) => {
            return arow.map( (cell, x) => {
              const active = this.props.activePiece
              const color = cell.color
              const ax = active.x + x
              const ay = active.y + y - ( 1 - this.props.tickCnt / this.props.ticksPerMove) 
              return (<div key={'cell'+y+'_'+x} 
                style={{backgroundColor:color, 
                boxShadow: color !== Colors.EMPTY ? 'inset 0 0 3px rgba(0,0,0,0.6)' : '',
                position:'absolute', left:ax*20, top:20*ay, width:20, height:20}}></div>)
              })
            }) : ''
            } )
          })}     
        </div>             
      </div>
    );
  }
}

// This is the specialized version of the component
export const TetrisComponent = container.StateConnector( TetrisC )