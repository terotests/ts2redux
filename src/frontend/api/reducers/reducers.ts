import { actionsEnums } from '../common/actionEnums'
import { ShopCartModel } from '../../state'
import { initializeShopCart } from '../../state'
import { updateItems } from '../../state'
import { AddItem } from '../../state'
import { UserInfoModel } from '../../state'
import { initUserModel } from '../../state'
import { setUser } from '../../state'

export const ShopCartModelReducer = (state:ShopCartModel = initializeShopCart(), action) => {
  switch (action.type) {
    case actionsEnums.ACTION_SHOPCARTMODEL_FN:
      return action.payload(state) 
    case actionsEnums.ACTION_SHOPCARTMODEL_UPDATEITEMS:
      return updateItems(state, action.payload) 
    case actionsEnums.ACTION_SHOPCARTMODEL_ADDITEM:
      return AddItem(state, action.payload) 
  }
  return state
}

export const UserInfoModelReducer = (state:UserInfoModel = initUserModel(), action) => {
  switch (action.type) {
    case actionsEnums.ACTION_USERINFOMODEL_FN:
      return action.payload(state) 
    case actionsEnums.ACTION_USERINFOMODEL_SETUSER:
      return setUser(state, action.payload) 
  }
  return state
}
