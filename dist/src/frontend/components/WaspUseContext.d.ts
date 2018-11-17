import * as React from 'react';
export interface IInterval {
    time: number;
    fn: () => void;
}
export declare class Interval extends React.Component<IInterval> {
    interval: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export declare const WaspUseContest: () => JSX.Element;
