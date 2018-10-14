
import * as React from 'react';
import * as container from '../models/reducers/TodoList'

// abstract properties version of the component
export interface Props extends container.Props {}

// this component can be re-used
export const AbstractTodoList = (props : Props) => {
  return (
  <div>
      <div>TodoList Component</div>
      <input type="submit"
              value="load"
              className="btn btn-default"
              onClick={() => props.getItems()}
      />
      <div>
        <div>{props.state}</div>
        <table><tbody>{props.items.map( m => {
          return <tr key={m.id}>
            <td>{m.id}</td>
            <td>{m.title}</td>
            <td>{m.completed ? 'Completed' : 'In Progress'}</td>
          </tr>;
        })}</tbody></table>        
      </div>
  </div>
  );
}

// This is the specialized version of the component
export const TodoList = container.StateConnector( AbstractTodoList )