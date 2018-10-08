import { actionsEnums } from '../common/actionEnums'
import { ShopCartModel } from '../../state'
import { updateItems } from '../../state'
import { AddItem } from '../../state'

export const ShopCartModelReducer = (state:ShopCartModel /* TODO: default state here*/, action) => {
  switch (action.type) {
    case actionsEnums.ACTION_SHOPCARTMODEL_UPDATEITEMS:
      return updateItems(state, action.payload) 
    case actionsEnums.ACTION_SHOPCARTMODEL_ADDITEM:
      return AddItem(state, action.payload) 
  }
  return state
}
