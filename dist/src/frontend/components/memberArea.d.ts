/// <reference types="react" />
import { ShopCartItem } from '../ng';
export interface Props {
    taskState: number;
    members: Array<ShopCartItem>;
    loadMembers: () => any;
}
export declare const MemberAreaComponent: (props: Props) => JSX.Element;
