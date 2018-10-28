import * as React from 'react';
import { TodoListItem } from '../models/TodoList';

export interface IPureList {
  items: TodoListItem[]
}

export class PureList extends React.PureComponent<IPureList> {
  render() {
    return <table><tbody>{this.props.items.map( m => {
      return <tr key={m.id}>
        <td>{m.id}</td>
        <td>{m.title}</td>
        <td>{m.completed ? 'Completed' : 'In Progress'}</td>
      </tr>;
    })}</tbody></table>
  }
}