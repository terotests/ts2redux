import axios from 'axios'

export interface TodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

type TaskState = 'UNDEFINED' | 'RUNNING' |  'LOADED' | { type:'ERROR', error:any }
/**
 * @simpleredux true
 */
class TodoList {
  items: TodoListItem[] = []
  state: TaskState = 'UNDEFINED'
  async getItems() {
    if(this.state === 'RUNNING') return
    try {
      this.state = 'RUNNING'
      this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
      this.state = 'LOADED'
    } catch(e) {
      this.state = {
        type: 'ERROR',
        error: e
      }
    }
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
  state: TaskState
}

export interface ContainerPropsState extends ITodoList {}
export interface Props extends ITodoList, ContainerPropsMethods {}
const mapStateToProps = (state : State) : ContainerPropsState => {
  return {
    items: state.TodoList.items,
    state: state.TodoList.state,
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
    state: o.state,
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
      this._dispatch({type:'TodoList_state', payload:value})
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
          this.state = {
              type: 'ERROR',
              error: e
          };
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
    }
  })
}
