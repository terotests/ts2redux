import { connect } from 'react-redux';
import { RTestModel } from '../ng';
import { MemberAreaComponent } from './memberArea';
import { State } from '../redux';


const mapStateToProps = (state : State) => {
  return {
    taskState : state.TestModelReducer.shopState,  
    members: state.TestModelReducer.items
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMembers: () => {
      return dispatch(RTestModel.createItem('Jeee!!!'))
    }
  };
}

export const MembersAreaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberAreaComponent);