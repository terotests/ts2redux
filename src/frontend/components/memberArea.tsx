
import * as React from 'react';
import { ShopCartItem } from '../ng';

// Component having some redux state in their props...
export interface Props {
  taskState: number
  members: Array<ShopCartItem>;
  loadMembers: () => any;
}

export const MemberAreaComponent = (props : Props) => {
  return (
  <div>
      <input type="submit"
              value="load"
              className="btn btn-default"
              onClick={() => props.loadMembers()}
      />
      <div>
        <div>{props.taskState}</div>
        {props.members.map( m => {
          return <div key={m.id}>{m.name}</div>;
        })}        
      </div>
  </div>
  );
}