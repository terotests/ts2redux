
import * as React from 'react';
/*
import {MemberTableComponent} from './components/memberTable';
import {MemberEntity} from '../../model/member'
*/

/**
* @redux model 
*/
export interface CustomUIState {
  membersList: MemberEntity[];
}

export interface MemberEntity {
  name: string
}

// simple function to manipulate the data...
function loadMembers(input:CustomUIState) : CustomUIState {
  return {
    ...input,
    membersList : [{name:'User 1'}, {name:'User 2'}]
  }
}


export interface Props {
  /**
   * @from MembersModel.membersList
   */
  members: Array<MemberEntity>;
  /**
   * @to MembersModel.loadMembers
   */  
  loadMembers: () => any;
}

export const MemberAreaComponent = (props : Props) => {
  return (
  <div>
      {props.members.map( m => {
        return <div>{m.name}</div>;
      })}
      <br/>
      <input type="submit"
              value="load"
              className="btn btn-default"
              onClick={() => props.loadMembers()}
      />
  </div>
  );
}