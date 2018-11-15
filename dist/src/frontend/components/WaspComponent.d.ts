import * as React from 'react';
import * as container from '../models/reducers/WaspModel';
export interface Props extends container.IProps {
}
export declare class WaspC extends React.PureComponent<Props> {
    interval: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export declare const WaspComponent: any;
