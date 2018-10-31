import * as React from 'react';
import { TodoListItem } from '../models/interfaces';
export interface IPureList {
    items: TodoListItem[];
}
export declare class PureList extends React.PureComponent<IPureList> {
    render(): JSX.Element;
}
