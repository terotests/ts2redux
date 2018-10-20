
import * as React from 'react';
import * as container from '../models/reducers/IncModel'

// abstract properties version of the component
export interface Props extends container.Props {}

// this component can be re-used
export const AbstractInc = (props : Props) => {
  return (
    <div>
      <div>{props.cnt}</div>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </div>
  );
}

// This is the specialized version of the component
export const ReduxInc = container.StateConnector( AbstractInc )