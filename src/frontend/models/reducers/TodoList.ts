import axios from 'axios'

export interface TodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type TaskState = 'UNDEFINED' | 'RUNNING' |  'LOADED' | 'ERROR'
/**
 * @redux true
 */
class TodoList {
  items: TodoListItem[] = []
  state: TaskState = 'UNDEFINED'
  stateError: any

  clearTodoList() {
    this.items = []
  }
  sortByTitle() {
    this.items.sort( (a, b) => a.title.localeCompare( b.title ) )
  }
  sortByCompletion() {
    const toNumber = (value:boolean) : number => value ? 1 : 0;
    this.items.sort( (a, b) => toNumber(a.completed) - toNumber(b.completed) )
  }
  async getItems() {
    if(this.state === 'RUNNING') return
    try {
      this.state = 'RUNNING'
      this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
      this.state = 'LOADED'
    } catch(e) {
      this.state = 'ERROR'
      this.stateError = e
    }
  }
}

import * as immer from 'immer'
import { connect } from 'react-redux'
import { State } from './index'

export interface ContainerPropsMethods {
  clearTodoList? : () => any
  sortByTitle? : () => any
  sortByCompletion? : () => any
  getItems? : () => any
}
export interface ITodoList {
  items: TodoListItem[]
  state: TaskState
  stateError: any
}

export interface ContainerPropsState extends ITodoList {}
export interface Props extends ContainerPropsState, ContainerPropsMethods {}
export const mapStateToProps = (state : State) : ContainerPropsState => {
  return {
    items: state.TodoList.items,
    state: state.TodoList.state,
    stateError: state.TodoList.stateError,
  }
}
export const mapDispatchToProps = (dispatch) : ContainerPropsMethods => {
  return {
    clearTodoList : () => {
      return dispatch(RTodoList.clearTodoList())
    },
    sortByTitle : () => {
      return dispatch(RTodoList.sortByTitle())
    },
    sortByCompletion : () => {
      return dispatch(RTodoList.sortByCompletion())
    },
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
    state: o.state,
    stateError: o.stateError,
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
      this._dispatch({type:TodoListEnums.TodoList_items, payload:value})
    }
  }
  get state() : TaskState{
    if(this._getState) {
      return this._getState().TodoList.state
    } else {
      return this._state.state
    }
  }
  set state(value:TaskState) {
    if(this._state) {
      this._state.state = value
    } else {
      // dispatch change for item state
      this._dispatch({type:TodoListEnums.TodoList_state, payload:value})
    }
  }
  get stateError() : any{
    if(this._getState) {
      return this._getState().TodoList.stateError
    } else {
      return this._state.stateError
    }
  }
  set stateError(value:any) {
    if(this._state) {
      this._state.stateError = value
    } else {
      // dispatch change for item stateError
      this._dispatch({type:TodoListEnums.TodoList_stateError, payload:value})
    }
  }
  
  // is a reducer
  clearTodoList(){
    if(this._state) {
      this.items = [];
    } else {
      this._dispatch({type:TodoListEnums.TodoList_clearTodoList})
    }
  }
  
  static clearTodoList(){
    return (dispatcher, getState) => {
      (new RTodoList(null, dispatcher, getState)).clearTodoList()
    }
  }
  // is a reducer
  sortByTitle(){
    if(this._state) {
      this.items.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      this._dispatch({type:TodoListEnums.TodoList_sortByTitle})
    }
  }
  
  static sortByTitle(){
    return (dispatcher, getState) => {
      (new RTodoList(null, dispatcher, getState)).sortByTitle()
    }
  }
  // is a reducer
  sortByCompletion(){
    if(this._state) {
      const toNumber = (value: boolean): number => value ? 1 : 0;
      this.items.sort((a, b) => toNumber(a.completed) - toNumber(b.completed));
    } else {
      this._dispatch({type:TodoListEnums.TodoList_sortByCompletion})
    }
  }
  
  static sortByCompletion(){
    return (dispatcher, getState) => {
      (new RTodoList(null, dispatcher, getState)).sortByCompletion()
    }
  }
  // is task
  async getItems() {
      if (this.state === 'RUNNING')
          return;
      try {
          this.state = 'RUNNING';
          this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data;
          this.state = 'LOADED';
      }
      catch (e) {
          this.state = 'ERROR';
          this.stateError = e;
      }
  }
  
  static getItems(){
    return (dispatcher, getState) => {
      (new RTodoList(null, dispatcher, getState)).getItems()
    }
  }
}

export const TodoListEnums = {
  TodoList_items : 'TodoList_items',
  TodoList_state : 'TodoList_state',
  TodoList_stateError : 'TodoList_stateError',
  TodoList_clearTodoList : 'TodoList_clearTodoList',
  TodoList_sortByTitle : 'TodoList_sortByTitle',
  TodoList_sortByCompletion : 'TodoList_sortByCompletion',
}

export const TodoListReducer = (state:ITodoList = init_TodoList(), action) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case TodoListEnums.TodoList_items: 
        (new RTodoList(draft)).items = action.payload
        break;
      case TodoListEnums.TodoList_state: 
        (new RTodoList(draft)).state = action.payload
        break;
      case TodoListEnums.TodoList_stateError: 
        (new RTodoList(draft)).stateError = action.payload
        break;
      case TodoListEnums.TodoList_clearTodoList: 
        (new RTodoList(draft)).clearTodoList()
        break;
      case TodoListEnums.TodoList_sortByTitle: 
        (new RTodoList(draft)).sortByTitle()
        break;
      case TodoListEnums.TodoList_sortByCompletion: 
        (new RTodoList(draft)).sortByCompletion()
        break;
    }
  })
}
