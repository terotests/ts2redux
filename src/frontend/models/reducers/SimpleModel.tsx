/***********************************************************************************
*                                                                                  *
*   Redux Reducers and React Context API Provider/Consumer for state SimpleModel   *
*   Generated by ts2redux at 2018-10-20T11:11:58.917Z                              *
*   From Source file ../SimpleModel.ts                                             *
*                                                                                  *
***********************************************************************************/

import axios from 'axios'

/**
 * @redux true
 */
export class SimpleModel {
  items: any[] = []
  async getItems() {
    this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
  }
}

import * as immer from 'immer'
import { connect } from 'react-redux'
import { State } from './index'
import * as React from 'react'

export interface ContainerPropsMethods {
  getItems? : () => any
}
export interface ISimpleModel {
  items: any[]
}

export interface ContainerPropsState extends ISimpleModel {}
export interface Props extends ContainerPropsState, ContainerPropsMethods {}
export const mapStateToProps = (state : State) : ContainerPropsState => {
  return {
    items: state.SimpleModel.items,
  }
}
export const mapDispatchToProps = (dispatch) : ContainerPropsMethods => {
  return {
    getItems : () => {
      return dispatch(RSimpleModel.getItems())
    },
  }
}
export const StateConnector = connect( mapStateToProps, mapDispatchToProps);

const init_SimpleModel = () => {
  const o = new SimpleModel();
  return {
    items: o.items,
  }
}

/**
 * @generated true
 */
export class RSimpleModel {
  private _state?: ISimpleModel
  private _dispatch?: (action:any)=>void
  private _getState?: ()=>any
  constructor(state?: ISimpleModel, dispatch?:(action:any)=>void, getState?:()=>any) {
    this._state = state
    this._dispatch = dispatch
    this._getState = getState
  }
  get items() : any[]{
    if(this._getState) {
      return this._getState().SimpleModel.items
    } else {
      return this._state.items
    }
  }
  set items(value:any[]) {
    if(this._state) {
      this._state.items = value
    } else {
      // dispatch change for item items
      this._dispatch({type:SimpleModelEnums.SimpleModel_items, payload:value})
    }
  }
  
  // is task
  async getItems() {
      this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data;
  }
  
  static getItems(){
    return (dispatcher, getState) => {
      (new RSimpleModel(null, dispatcher, getState)).getItems()
    }
  }
}

export const SimpleModelEnums = {
  SimpleModel_items : 'SimpleModel_items',
}

export const SimpleModelReducer = (state:ISimpleModel = init_SimpleModel(), action) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case SimpleModelEnums.SimpleModel_items: 
        (new RSimpleModel(draft)).items = action.payload
        break;
    }
  })
}
/***************************
* React Context API test   *
***************************/
export const SimpleModelContext = React.createContext<Props>(null)
export const SimpleModelConsumer = SimpleModelContext.Consumer
let instanceCnt = 1
export class SimpleModelProvider extends React.Component {
  state: ISimpleModel = init_SimpleModel() 
  __devTools:any = null
  constructor( props ){
    super(props)
    this.getItems = this.getItems.bind(this)
    const devs = window['devToolsExtension'] ? window['devToolsExtension'] : null
    if(devs) {
      this.__devTools = devs.connect({name:'SimpleModel'+instanceCnt++})
      this.__devTools.init(this.state)
      this.__devTools.subscribe( msg => {
        if (msg.type === 'DISPATCH' && msg.state) {
          this.setState(JSON.parse(msg.state))
        }
      })
    }
  }
  componentWillUnmount() {
    if(this.__devTools) this.__devTools.unsubscribe()
  }
  async getItems(){
    (new RSimpleModel(null, (action) => {
      const nextState = SimpleModelReducer( this.state, action )
      if(this.__devTools) this.__devTools.send(action.type, nextState)
      this.setState(nextState)
    }, () => ({SimpleModel:this.state})) ).getItems()
  }
  render() {
    return (<SimpleModelContext.Provider value={{...this.state, 
      getItems: this.getItems,
    }}> {this.props.children} 
    </SimpleModelContext.Provider>)
  }
}
