import { actionsEnums } from '../common/actionEnums'
import { ShopCartModel } from '../../state'
import { ShopCartItem } from '../../state'
import { fetchAll } from '../../state'
import { getItemsFromCategory } from '../../state'
import { RequstAddNewItem } from '../../state'
import { AnyFn } from '../../state'

// Action which can be dispatched 
export const action_SHOPCARTMODEL_UPDATEITEMS = (payload:Array<ShopCartItem>) => { 
  return {
    type : actionsEnums.ACTION_SHOPCARTMODEL_UPDATEITEMS,
    payload
  }
}

// function which is related to the action... 
export const fetchAllDispatcher = () => async (dispatch) => { 
  try {
    dispatch({type:'RUNNONG_FETCHALL'})
    const value = await fetchAll(dispatch)
    dispatch( action_SHOPCARTMODEL_UPDATEITEMS( value ))
    dispatch({type:'SUCCESS_FETCHALL', payload:value})
  } catch(e) {
    dispatch({type:'ERROR_FETCHALL', payload:e})
  }
}

// function which is related to the action... 
export const getItemsFromCategoryDispatcher = (id:number) => async (dispatch) => { 
  const value = await getItemsFromCategory(id, dispatch)
  dispatch( action_SHOPCARTMODEL_UPDATEITEMS( value ))
}

// Action which can be dispatched 
export const action_SHOPCARTMODEL_ADDITEM = (payload:ShopCartItem) => { 
  return {
    type : actionsEnums.ACTION_SHOPCARTMODEL_ADDITEM,
    payload
  }
}

// function which is related to the action... 
export const RequstAddNewItemDispatcher = (itemName:string) => async (dispatch) => { 
  try {
    dispatch({type:'RUNNONG_REQUSTADDNEWITEM'})
    const value = await RequstAddNewItem(itemName)
    dispatch( action_SHOPCARTMODEL_ADDITEM( value ))
    dispatch({type:'SUCCESS_REQUSTADDNEWITEM', payload:value})
  } catch(e) {
    dispatch({type:'ERROR_REQUSTADDNEWITEM', payload:e})
  }
}

// function which is related to the action... 
export const AnyFnDispatcher = (itemName:string) => async (dispatch) => { 
  try {
    dispatch({type:'RUNNONG_ANYFN'})
    const value = await AnyFn(itemName)
    dispatch( action_SHOPCARTMODEL_ADDITEM( value ))
    dispatch({type:'SUCCESS_ANYFN', payload:value})
  } catch(e) {
    dispatch({type:'ERROR_ANYFN', payload:e})
  }
}
