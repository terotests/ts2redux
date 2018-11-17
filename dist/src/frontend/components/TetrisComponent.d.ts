import * as React from 'react';
import * as container from '../models/reducers/TetrisModel';
export interface Props extends container.IProps {
}
export declare class TetrisC extends React.PureComponent<Props> {
    interval: any;
    keyFunction: (event: KeyboardEvent) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export declare const TetrisComponent: any;
