import { setTimeout } from "timers";

/**
 * User Interface State 
 */

export interface ShopCartItem {
  id?: number
  name: string
}

export interface ShopCart {
  newItemName?: string
  items: ShopCartItem[]
}

export enum TaskState {
  UNDEFINED,
  RUNNING,
  ERROR,
  SUCCESS,
}

const MSG = 'STATE IS NOW'
const MSG2 = 'AFTER DISPATCH STATE IS'
const DELAY = 1000
const LAST_NAME = 'I am the last item!!!!'
const STR_CART = 'cart'
const STR_ITEM = 'item'
const PROB_50 = 0.5

const FRIEND_LIST = [
  'Arthur',
  'John',
  'Martin',
  'Peter'
]
/**
 * @simpleredux true
 */
class TestModel {
  // model with initializer
  items:ShopCartItem[] = []
  maxId:number = 1
  cartId:number = 1
  shopState:TaskState = TaskState.UNDEFINED

  // my shopping carts
  carts: {[key:string]:ShopCart} = {}

  // message to user
  userMessage:string = ''

  // TODO:
  // - ERROR / warning if there are no type initializers
  // - ERROR if there are more than 2 parameters to a reducer
  //   => or you could generate the protocol to be used for dispatching those values
  // - setting value of simple property could be generated

  setUserMessage( value:string ) {
    this.userMessage = value
  }
  
  // reducer
  add( item:ShopCartItem ) {
    console.log(this.maxId)
    this.items.push({
      ...item,
      id : this.maxId++      
    })
  }

  removeFirst() {
    this.items.splice(0,1)
  }  

  sort() {
    this.items.sort( (a,b)=>{
      return a.name.localeCompare(b.name)
    })
  }   

  /**
   * Creates a new shopping cart
   */  
  async addCart() {
    const key = 'cart' + (this.cartId++)
    this.carts[key] = {
      items : [{id:this.maxId++, name: STR_ITEM}]   
    }
  }  

  addCartSync() {
    const key = 'cart' + (this.cartId++)
    this.carts[key] = {
      items : [{id:this.maxId++, name: STR_ITEM}]   
    }
  }   

  addToCart( adding:{cartId:string, item:ShopCartItem } ) {
    this.carts[adding.cartId].items.push( {
      ...adding.item,
      id: this.maxId++
    })
  }  

  setCartNewItem( adding:{cartId:string, name:string } ) {
    this.carts[adding.cartId].newItemName = name
  }   

  addToCartRandom( ) {
    Object.keys(this.carts).forEach( cartKey => {
      this.addToCart( {cartId: cartKey, item: { name : STR_ITEM + this.maxId++}} )
    })
  }  
  
  renameLast( newName: string ) {
    this.items[this.items.length - 1].name = newName
  }  
  // action
  async createItem(someName:string) {
    console.log(MSG, this.shopState)
    if(this.shopState == TaskState.RUNNING) {
      return
    }
    this.shopState = TaskState.RUNNING
    await new Promise( res=> {
      setTimeout(res, DELAY)
    })
    console.log(MSG2, this.shopState)
    this.add({name:someName})
    this.shopState = TaskState.SUCCESS
  }

  async addOneFriend(name) {
    this.add({name})
  }    
  
  async fillSomeFriends() {
    FRIEND_LIST.forEach( (name)=>{
      this.add({name})
    })
  }  

  async ChangeLastItem() {
    this.renameLast(LAST_NAME)
  }    

}

import * as immer from 'immer'
import { connect } from 'react-redux'
import { State } from './index'

export interface ContainerPropsMethods {
  setUserMessage? : (value: string) => any
  add? : (item: ShopCartItem) => any
  removeFirst? : () => any
  sort? : () => any
  addCart? : () => any
  addCartSync? : () => any
  addToCart? : (adding: {
  cartId: string;
  item: ShopCartItem;
  }) => any
  setCartNewItem? : (adding: {
  cartId: string;
  name: string;
  }) => any
  addToCartRandom? : () => any
  renameLast? : (newName: string) => any
  createItem? : (someName: string) => any
  addOneFriend? : (name) => any
  fillSomeFriends? : () => any
  ChangeLastItem? : () => any
}
export interface ITestModel {
  // model with initializer
  items: ShopCartItem[]
  maxId: number
  cartId: number
  shopState: TaskState
  // my shopping carts
  carts: {
  [key: string]: ShopCart;
  }
  // message to user
  userMessage: string
}

export interface ContainerPropsState extends ITestModel {}
export interface Props extends ITestModel, ContainerPropsMethods {}
const mapStateToProps = (state : State) : ContainerPropsState => {
  return {
    items: state.TestModel.items,
    maxId: state.TestModel.maxId,
    cartId: state.TestModel.cartId,
    shopState: state.TestModel.shopState,
    carts: state.TestModel.carts,
    userMessage: state.TestModel.userMessage,
  }
}
const mapDispatchToProps = (dispatch) : ContainerPropsMethods => {
  return {
    setUserMessage : (value: string) => {
      return dispatch(RTestModel.setUserMessage(value))
    },
    add : (item: ShopCartItem) => {
      return dispatch(RTestModel.add(item))
    },
    removeFirst : () => {
      return dispatch(RTestModel.removeFirst())
    },
    sort : () => {
      return dispatch(RTestModel.sort())
    },
    addCart : () => {
      return dispatch(RTestModel.addCart())
    },
    addCartSync : () => {
      return dispatch(RTestModel.addCartSync())
    },
    addToCart : (adding: {
    cartId: string;
    item: ShopCartItem;
    }) => {
      return dispatch(RTestModel.addToCart(adding))
    },
    setCartNewItem : (adding: {
    cartId: string;
    name: string;
    }) => {
      return dispatch(RTestModel.setCartNewItem(adding))
    },
    addToCartRandom : () => {
      return dispatch(RTestModel.addToCartRandom())
    },
    renameLast : (newName: string) => {
      return dispatch(RTestModel.renameLast(newName))
    },
    createItem : (someName: string) => {
      return dispatch(RTestModel.createItem(someName))
    },
    addOneFriend : (name) => {
      return dispatch(RTestModel.addOneFriend(name))
    },
    fillSomeFriends : () => {
      return dispatch(RTestModel.fillSomeFriends())
    },
    ChangeLastItem : () => {
      return dispatch(RTestModel.ChangeLastItem())
    },
  }
}
export const StateConnector = connect( mapStateToProps, mapDispatchToProps);

const init_TestModel = () => {
  const o = new TestModel();
  return {
    items: o.items,
    maxId: o.maxId,
    cartId: o.cartId,
    shopState: o.shopState,
    carts: o.carts,
    userMessage: o.userMessage,
  }
}

/**
 * @generated true
 */
export class RTestModel {
  private _state?: ITestModel
  private _dispatch?: (action:any)=>void
  private _getState?: ()=>any
  constructor(state?: ITestModel, dispatch?:(action:any)=>void, getState?:()=>ITestModel) {
    this._state = state
    this._dispatch = dispatch
    this._getState = getState
  }
  get items() : ShopCartItem[]{
    if(this._getState) {
      return this._getState().TestModel.items
    } else {
      return this._state.items
    }
  }
  set items(value:ShopCartItem[]) {
    if(this._state) {
      this._state.items = value
    } else {
      // dispatch change for item items
      this._dispatch({type:'TestModel_items', payload:value})
    }
  }
  get maxId() : number{
    if(this._getState) {
      return this._getState().TestModel.maxId
    } else {
      return this._state.maxId
    }
  }
  set maxId(value:number) {
    if(this._state) {
      this._state.maxId = value
    } else {
      // dispatch change for item maxId
      this._dispatch({type:'TestModel_maxId', payload:value})
    }
  }
  get cartId() : number{
    if(this._getState) {
      return this._getState().TestModel.cartId
    } else {
      return this._state.cartId
    }
  }
  set cartId(value:number) {
    if(this._state) {
      this._state.cartId = value
    } else {
      // dispatch change for item cartId
      this._dispatch({type:'TestModel_cartId', payload:value})
    }
  }
  get shopState() : TaskState{
    if(this._getState) {
      return this._getState().TestModel.shopState
    } else {
      return this._state.shopState
    }
  }
  set shopState(value:TaskState) {
    if(this._state) {
      this._state.shopState = value
    } else {
      // dispatch change for item shopState
      this._dispatch({type:'TestModel_shopState', payload:value})
    }
  }
  get carts() : {
  [key: string]: ShopCart;
  }{
    if(this._getState) {
      return this._getState().TestModel.carts
    } else {
      return this._state.carts
    }
  }
  set carts(value:{
  [key: string]: ShopCart;
  }) {
    if(this._state) {
      this._state.carts = value
    } else {
      // dispatch change for item carts
      this._dispatch({type:'TestModel_carts', payload:value})
    }
  }
  get userMessage() : string{
    if(this._getState) {
      return this._getState().TestModel.userMessage
    } else {
      return this._state.userMessage
    }
  }
  set userMessage(value:string) {
    if(this._state) {
      this._state.userMessage = value
    } else {
      // dispatch change for item userMessage
      this._dispatch({type:'TestModel_userMessage', payload:value})
    }
  }
  
  // is a reducer
  setUserMessage(value: string){
    if(this._state) {
      this.userMessage = value;
    } else {
      this._dispatch({type:'TestModel_setUserMessage',payload: value })
    }
  }
  
  static setUserMessage(value: string){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).setUserMessage(value)
    }
  }
  // is a reducer
  add(item: ShopCartItem){
    if(this._state) {
      console.log(this.maxId);
      this.items.push({
      ...item,
      id: this.maxId++
      });
    } else {
      this._dispatch({type:'TestModel_add',payload: item })
    }
  }
  
  static add(item: ShopCartItem){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).add(item)
    }
  }
  // is a reducer
  removeFirst(){
    if(this._state) {
      this.items.splice(0, 1);
    } else {
      this._dispatch({type:'TestModel_removeFirst'})
    }
  }
  
  static removeFirst(){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).removeFirst()
    }
  }
  // is a reducer
  sort(){
    if(this._state) {
      this.items.sort((a, b) => {
      return a.name.localeCompare(b.name);
      });
    } else {
      this._dispatch({type:'TestModel_sort'})
    }
  }
  
  static sort(){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).sort()
    }
  }
  // is task
  /**
   * Creates a new shopping cart
   */
  async addCart() {
      const key = 'cart' + (this.cartId++);
      this.carts[key] = {
          items: [{ id: this.maxId++, name: STR_ITEM }]
      };
  }
  
  static addCart(){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).addCart()
    }
  }
  // is a reducer
  addCartSync(){
    if(this._state) {
      const key = 'cart' + (this.cartId++);
      this.carts[key] = {
      items: [{ id: this.maxId++, name: STR_ITEM }]
      };
    } else {
      this._dispatch({type:'TestModel_addCartSync'})
    }
  }
  
  static addCartSync(){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).addCartSync()
    }
  }
  // is a reducer
  addToCart(adding: {
  cartId: string;
  item: ShopCartItem;
  }){
    if(this._state) {
      this.carts[adding.cartId].items.push({
      ...adding.item,
      id: this.maxId++
      });
    } else {
      this._dispatch({type:'TestModel_addToCart',payload: adding })
    }
  }
  
  static addToCart(adding: {
  cartId: string;
  item: ShopCartItem;
  }){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).addToCart(adding)
    }
  }
  // is a reducer
  setCartNewItem(adding: {
  cartId: string;
  name: string;
  }){
    if(this._state) {
      this.carts[adding.cartId].newItemName = name;
    } else {
      this._dispatch({type:'TestModel_setCartNewItem',payload: adding })
    }
  }
  
  static setCartNewItem(adding: {
  cartId: string;
  name: string;
  }){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).setCartNewItem(adding)
    }
  }
  // is a reducer
  addToCartRandom(){
    if(this._state) {
      Object.keys(this.carts).forEach(cartKey => {
      this.addToCart({ cartId: cartKey, item: { name: STR_ITEM + this.maxId++ } });
      });
    } else {
      this._dispatch({type:'TestModel_addToCartRandom'})
    }
  }
  
  static addToCartRandom(){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).addToCartRandom()
    }
  }
  // is a reducer
  renameLast(newName: string){
    if(this._state) {
      this.items[this.items.length - 1].name = newName;
    } else {
      this._dispatch({type:'TestModel_renameLast',payload: newName })
    }
  }
  
  static renameLast(newName: string){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).renameLast(newName)
    }
  }
  // is task
  // action
  async createItem(someName: string) {
      console.log(MSG, this.shopState);
      if (this.shopState == TaskState.RUNNING) {
          return;
      }
      this.shopState = TaskState.RUNNING;
      await new Promise(res => {
          setTimeout(res, DELAY);
      });
      console.log(MSG2, this.shopState);
      this.add({ name: someName });
      this.shopState = TaskState.SUCCESS;
  }
  
  static createItem(someName: string){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).createItem(someName)
    }
  }
  // is task
  async addOneFriend(name) {
      this.add({ name });
  }
  
  static addOneFriend(name){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).addOneFriend(name)
    }
  }
  // is task
  async fillSomeFriends() {
      FRIEND_LIST.forEach((name) => {
          this.add({ name });
      });
  }
  
  static fillSomeFriends(){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).fillSomeFriends()
    }
  }
  // is task
  async ChangeLastItem() {
      this.renameLast(LAST_NAME);
  }
  
  static ChangeLastItem(){
    return (dispatcher, getState) => {
      (new RTestModel(null, dispatcher, getState)).ChangeLastItem()
    }
  }
}

export const TestModelEnums = {
  TestModel_items : 'TestModel_items',
  TestModel_maxId : 'TestModel_maxId',
  TestModel_cartId : 'TestModel_cartId',
  TestModel_shopState : 'TestModel_shopState',
  TestModel_carts : 'TestModel_carts',
  TestModel_userMessage : 'TestModel_userMessage',
  TestModel_setUserMessage : 'TestModel_setUserMessage',
  TestModel_add : 'TestModel_add',
  TestModel_removeFirst : 'TestModel_removeFirst',
  TestModel_sort : 'TestModel_sort',
  TestModel_addCartSync : 'TestModel_addCartSync',
  TestModel_addToCart : 'TestModel_addToCart',
  TestModel_setCartNewItem : 'TestModel_setCartNewItem',
  TestModel_addToCartRandom : 'TestModel_addToCartRandom',
  TestModel_renameLast : 'TestModel_renameLast',
}

export const TestModelReducer = (state:ITestModel = init_TestModel(), action) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case TestModelEnums.TestModel_items: 
        (new RTestModel(draft)).items = action.payload
        break;
      case TestModelEnums.TestModel_maxId: 
        (new RTestModel(draft)).maxId = action.payload
        break;
      case TestModelEnums.TestModel_cartId: 
        (new RTestModel(draft)).cartId = action.payload
        break;
      case TestModelEnums.TestModel_shopState: 
        (new RTestModel(draft)).shopState = action.payload
        break;
      case TestModelEnums.TestModel_carts: 
        (new RTestModel(draft)).carts = action.payload
        break;
      case TestModelEnums.TestModel_userMessage: 
        (new RTestModel(draft)).userMessage = action.payload
        break;
      case TestModelEnums.TestModel_setUserMessage: 
        (new RTestModel(draft)).setUserMessage(action.payload)
        break;
      case TestModelEnums.TestModel_add: 
        (new RTestModel(draft)).add(action.payload)
        break;
      case TestModelEnums.TestModel_removeFirst: 
        (new RTestModel(draft)).removeFirst()
        break;
      case TestModelEnums.TestModel_sort: 
        (new RTestModel(draft)).sort()
        break;
      case TestModelEnums.TestModel_addCartSync: 
        (new RTestModel(draft)).addCartSync()
        break;
      case TestModelEnums.TestModel_addToCart: 
        (new RTestModel(draft)).addToCart(action.payload)
        break;
      case TestModelEnums.TestModel_setCartNewItem: 
        (new RTestModel(draft)).setCartNewItem(action.payload)
        break;
      case TestModelEnums.TestModel_addToCartRandom: 
        (new RTestModel(draft)).addToCartRandom()
        break;
      case TestModelEnums.TestModel_renameLast: 
        (new RTestModel(draft)).renameLast(action.payload)
        break;
    }
  })
}
