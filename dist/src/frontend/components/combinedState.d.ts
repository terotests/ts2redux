/// <reference types="react" />
import * as todoContainer from '../models/reducers/TodoList';
import * as userContainer from '../models/reducers/UserState';
export interface Props extends todoContainer.IProps, userContainer.IProps {
}
export declare const AbstractCombinedStates: (props: Props) => JSX.Element;
export declare const StateConnector: any;
export declare const CombinedStates: any;
