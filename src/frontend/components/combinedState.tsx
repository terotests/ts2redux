
import * as React from 'react';
import { connect } from 'react-redux'
import * as todoContainer from '../models/reducers/TodoList'
import * as userContainer from '../models/reducers/UserState'

// abstract properties version of the component
export interface Props extends todoContainer.Props, userContainer.Props {}

// this component can be re-used
export const AbstractCombinedStates = (props : Props) => {
  return (
  <div>
      <div>Combined States Component</div>
      <div>
        <div>User Name Now: {props.username}</div>
        <div>Items length Now: {props.items.length}</div>
        <button onClick={()=>{props.getItems()}}>Try Loading</button>
        <button onClick={()=>{props.clearTodoList()}}>Clear List</button>
      </div>
  </div>
  );
}

export const StateConnector = connect( 
  (state) => ({
    ...todoContainer.mapStateToProps(state),
    ...userContainer.mapStateToProps(state),
  }),
  (dispatch) => ({
    ...todoContainer.mapDispatchToProps(dispatch),
    ...userContainer.mapDispatchToProps(dispatch),
  }),
);

// This is the specialized version of the component
export const CombinedStates = StateConnector( AbstractCombinedStates )
