
import * as React from 'react';
import { WaspModelConsumer} from '../models/reducers/WaspModel'
import { PureList } from './PureList';

export interface IInterval {
  time: number
  fn: ()=>void
}
export class Interval extends React.PureComponent<IInterval> {
  interval: any
  componentDidMount() {
    this.interval = setInterval(()=>{
      this.props.fn()
    }, this.props.time)
  }
  componentWillUnmount() {
    clearInterval( this.interval )
  }
  render() {
    return <span/>
  }
}

// this component can be re-used
export class WaspContextComponent extends React.PureComponent {
  render() {
    return (
      <WaspModelConsumer>{
          state => <div>
             <div>Wasps using React Context API</div>
            <Interval fn={state.step} time={20}/>
            <button onClick={ _ => {
              state.addWasp( { x: 50 + Math.random()*150, y: 50 + Math.random()*150})
            }}>+ Wasp</button>
            <div>
            <svg width={300} height={300}>
              {
                Object.keys( state.wasps ).map( key => {
                  const wasp = state.wasps[parseInt(key)]
                  return <circle onClick={_ => {
                    state.setColor( {waspId: parseInt(key), colorValue:'green'} )
                  }} cx={wasp.x} cy={wasp.y} key={key} r={10} fill={wasp.color} />
                })
              }              
            </svg>             
            </div>
          </div>
        }
        </WaspModelConsumer>
    );
  }
}