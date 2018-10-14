import axios from 'axios'

export interface TodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

/**
 * @simpleredux true
 */
class TodoList {
  items: TodoListItem[] = []
  async getItems() {
    this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
  }
}

import * as immer from 'immer'
import { connect } from 'react-redux'
import { State } from './index'

export interface ContainerPropsMethods {
  getItems? : () => any
}
export interface ITodoList {
  items: TodoListItem[]
}

export interface ContainerPropsState extends ITodoList {}
export interface Props extends ITodoList, ContainerPropsMethods {}
const mapStateToProps = (state : State) : ContainerPropsState => {
  return {
    items: state.TodoList.items,
  }
}
const mapDispatchToProps = (dispatch) : ContainerPropsMethods => {
  return {
    getItems : () => {
      return dispatch(RTodoList.getItems())
    },
  }
}
export const StateConnector = connect( mapStateToProps, mapDispatchToProps);

const init_TodoList = () => {
  const o = new TodoList();
  return {
    items: o.items,
  }
}

/**
 * @generated true
 */
export class RTodoList {
  private _state?: ITodoList
  private _dispatch?: (action:any)=>void
  private _getState?: ()=>any
  constructor(state?: ITodoList, dispatch?:(action:any)=>void, getState?:()=>ITodoList) {
    this._state = state
    this._dispatch = dispatch
    this._getState = getState
  }
  get items() : TodoListItem[]{
    if(this._getState) {
      return this._getState().TodoList.items
    } else {
      return this._state.items
    }
  }
  set items(value:TodoListItem[]) {
    if(this._state) {
      this._state.items = value
    } else {
      // dispatch change for item items
      this._dispatch({type:'TodoList_items', payload:value})
    }
  }
  
  // is task
  async getItems() {
      this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data;
  }
  
  static getItems(){
    return (dispatcher, getState) => {
      (new RTodoList(null, dispatcher, getState)).getItems()
    }
  }
}

export const TodoListEnums = {
  TodoList_items : 'TodoList_items',
}

export const TodoListReducer = (state:ITodoList = init_TodoList(), action) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case TodoListEnums.TodoList_items: 
        (new RTodoList(draft)).items = action.payload
        break;
    }
  })
}
