
import * as React from 'react';
import * as container from '../models/reducers/WaspModel'
import { PureList } from './PureList';

// abstract properties version of the component
export interface Props extends container.IProps {}

// this component can be re-used
export class WaspC extends React.PureComponent<Props> {
  interval: any
  componentDidMount() {
    this.interval = setInterval(()=>{
      this.props.step()
    }, 20)
  }
  componentWillUnmount() {
    clearInterval( this.interval )
  }
  render() {
    return (
      <div>
        <div>Wasps using Redux</div>
        <button onClick={ _ => {
          this.props.addWasp( { x: 50 + Math.random()*150, y: 50 + Math.random()*150})
        }}>+ Wasp</button>
        <div>
        <svg width={300} height={300}>
          {
            Object.keys( this.props.wasps ).map( key => {
              const wasp = this.props.wasps[parseInt(key)]
              return <circle cx={wasp.x} cy={wasp.y} key={key} r={10} fill="red" />
            })
          }              
        </svg>             
        </div>
      </div>
    );
  }
}

// This is the specialized version of the component
export const WaspComponent = container.StateConnector( WaspC )