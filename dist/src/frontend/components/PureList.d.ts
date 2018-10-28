import * as React from 'react';
import { TodoListItem } from '../models/TodoList';
export interface IPureList {
    items: TodoListItem[];
}
export declare class PureList extends React.PureComponent<IPureList> {
    render(): JSX.Element;
}
