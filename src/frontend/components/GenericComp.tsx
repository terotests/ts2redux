import * as React from 'react';
import * as container from '../models/reducers/genericModel'

// abstract properties version of the component
export interface Props extends container.IProps {}

class Nro {
  val = 0
  constructor(n:number) {
    this.val = n
  }
  value() {
    return this.val
  }
}

class OtherNro {
  val = 0
  constructor(n:number) {
    this.val = n
  }
  value() {
    return this.val
  }
}

// this component can be re-used
export const AbstractGeneric = (props : Props) => {
  return (
    <div>
      Redux Sum : {props.sum}
      <div><button onClick={() => {
        props.addItems( [new Nro(Math.random()), new OtherNro(2)] )
      }}>Sum some</button></div>
    </div>
  );
}

// This is the specialized version of the component
export const GenericRedux = container.StateConnector( AbstractGeneric )                  