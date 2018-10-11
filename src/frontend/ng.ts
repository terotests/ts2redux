export interface ShopCartItem {
  name: string
}

const CNT = 2
/**
 * @simpleredux true
 */
class TestModel {
  items:ShopCartItem[] 
  cnt:number = 0

  add( item:ShopCartItem) {
    this.items = [...this.items, item]
  }
  inc() {
    this.cnt = this.cnt + CNT
  }
  async jee(someName:string) {
    const item = { name: someName };
    this.add(item);
  }
}

import * as immer from 'immer'
export interface ITestModel {
  items: ShopCartItem[]
  cnt: number
}
class RTestModel {
  private _inReducer = false
  private _state?: ITestModel
  private _dispatch?: (action:any)=>void
  constructor(state?: ITestModel, dispatch?:(action:any)=>void) {
    this._state = state
    this._dispatch = dispatch
  }
  get items() : ShopCartItem[]{
    return this._state.items
  }
  set items(value:ShopCartItem[]) {
    if(this._state) {
      this._state.items = value
    } else {
      // dispatch change for item items
      this._dispatch({type:'TestModel_items', payload:value})
    }
  }
  get cnt() : number{
    return this._state.cnt
  }
  set cnt(value:number) {
    if(this._state) {
      this._state.cnt = value
    } else {
      // dispatch change for item cnt
      this._dispatch({type:'TestModel_cnt', payload:value})
    }
  }
  
  // is a reducer
  add(item: ShopCartItem) {
      this.items = [...this.items, item];
  }
  // is a reducer
  inc() {
      this.cnt = this.cnt + CNT;
  }
  // is task
  async jee(someName: string) {
      const item = { name: someName };
      this.add(item);
  }
}

export const TestModelEnums = {
  TestModel_items : 'TestModel_items',
  TestModel_cnt : 'TestModel_cnt',
  TestModel_add : 'TestModel_add',
  TestModel_inc : 'TestModel_inc',
}

export const TestModelReducer = (state:ITestModel /* todo: init*/, action) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case TestModelEnums.TestModel_items: 
        (new RTestModel(draft)).items = action.payload
        break;
      case TestModelEnums.TestModel_cnt: 
        (new RTestModel(draft)).cnt = action.payload
        break;
      case TestModelEnums.TestModel_add: 
        (new RTestModel(draft)).add(action.payload)
        break;
      case TestModelEnums.TestModel_inc: 
        (new RTestModel(draft)).inc()
        break;
    }
  })
}
