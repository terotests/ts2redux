import * as React from 'react';
export interface IInterval {
    time: number;
    fn: () => void;
}
export declare class Interval extends React.PureComponent<IInterval> {
    interval: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export declare class WaspContextComponent extends React.PureComponent {
    render(): JSX.Element;
}
