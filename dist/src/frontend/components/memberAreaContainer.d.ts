import { ShopCartItem } from '../ng';
export interface ContainerPropsState {
    taskState: number;
    members: Array<ShopCartItem>;
}
export interface ContainerPropsMethods {
    loadMembers?: () => any;
    fillSomeFriends?: () => any;
    createItem?: (name: string) => any;
    ChangeLastItem?: () => any;
    addToCartRandom?: () => any;
    addCart?: () => any;
}
export interface Props extends ContainerPropsState, ContainerPropsMethods {
}
export declare const StateConnector: any;
