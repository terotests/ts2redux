import * as React from "react";
import * as container from "../models/reducers/TodoList";
import { PureList } from "./PureList";

// abstract properties version of the component
export interface Props extends container.IProps {}

// this component can be re-used
export const AbstractTodoList = (props: Props) => {
  return (
    <div>
      <h2>TodoList Component, with memoization</h2>
      <div>Title: {props.listTitle}</div>
      <button onClick={() => props.getItems()}>Load</button>
      <button onClick={() => props.toggleSortOrder()}>Toggle Order</button>
      <button onClick={() => props.prevPage()}>Prev</button>
      <button onClick={() => props.nextPage()}>Next</button>
      <button onClick={() => props.addLotOfItems(10000)}>
        Add 10000 items
      </button>
      <button onClick={() => props.setTitle("Jee" + Date.now())}>
        Set Title of List
      </button>
      <div>
        <div>{props.state}</div>
        <div>{props.state === "ERROR" ? new String(props.stateError) : ""}</div>
        <PureList items={props.listToDisplay} />
      </div>
    </div>
  );
};

// This is the specialized version of the component
export const TodoList = container.StateConnector(AbstractTodoList);
