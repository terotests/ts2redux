
import * as React from 'react';
import * as container from '../models/reducers/TodoList'

// abstract properties version of the component
export interface Props extends container.IProps {}

// this component can be re-used
export const AbstractTodoList = (props : Props) => {
  return (
  <div>
      <div>TodoList Component</div>
      <button onClick={() => props.getItems()}>Load</button>
      <button onClick={() => props.sortById()}>Sort by Id</button>
      <button onClick={() => props.sortByTitle()}>Sort by Title</button>
      <button onClick={() => props.sortByCompletion()}>Sort by Completion</button>
      <div>
        <div>{props.state}</div>
        <div>{props.state === 'ERROR' ? (new String(props.stateError)) : ''}</div>
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