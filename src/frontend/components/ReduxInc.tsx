import * as React from "react";
import * as container from "../models/reducers/IncModel";

// abstract properties version of the component
export interface Props extends container.IProps {}

// this component can be re-used
export const AbstractInc = (props: Props) => {
  return (
    <div>
      <div>{props.cnt}</div>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </div>
  );
};

// ConnectKeys can be used to map specific functions and properties
// to the target object
export const ReduxInc = container.ConnectKeys(
  ["cnt"],
  ["increment", "decrement"]
)(AbstractInc);
