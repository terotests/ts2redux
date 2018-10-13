
import * as React from 'react';
import * as container from '../models/reducers/TestModel'

// abstract properties version of the component
export interface Props extends container.Props {}

// this component can be re-used
export const AbstractMemberArea = (props : Props) => {
  return (
  <div>
      <div>Member Area Component</div>
      <input type="submit"
              value="load"
              className="btn btn-default"
              onClick={() => props.addOneFriend('Teppo')}
      />
      <input type="submit"
              value="Fill Friends"
              className="btn btn-default"
              onClick={() => props.fillSomeFriends()}
      />
      <input type="submit"
              value="John Smith"
              className="btn btn-default"
              onClick={() => props.createItem('John Smith')}
      />

      <input type="submit"
              value="Change the last"
              className="btn btn-default"
              onClick={() => props.ChangeLastItem()}
      />
      <input type="submit"
              value="Remove First"
              className="btn btn-default"
              onClick={() => props.removeFirst()}
      /> 
      <input type="submit"
              value="Sort"
              className="btn btn-default"
              onClick={() => props.sort()}
      />
      <input type="submit"
              value="+ Cart Sync"
              className="btn btn-default"
              onClick={() => props.addCartSync()}
      />         
      <input type="submit"
              value="+ Cart"
              className="btn btn-default"
              onClick={() => props.addCart()}
      />     
       <input type="submit"
              value="+ Cart Item"
              className="btn btn-default"
              onClick={() => props.addToCartRandom()}
      /> 
        <input type="submit"
              value="user message"
              className="btn btn-default"
              onClick={() => props.setUserMessage('Hello WOrld!!!!')}
      /> 
      <div>
        <div>{props.userMessage}</div>
        <div>{props.shopState}</div>
        {props.items.map( m => {
          return <div key={m.id}>{m.name}</div>;
        })}        
        <h1>Shopping Carts</h1>
        {Object.keys(props.carts).map( cartId => {
          const cart = props.carts[cartId]
          return <div key={cartId}>
            <h4>{cartId}</h4>
            <button onClick={()=> {
              props.addToCart({cartId, item:{ id:(new Date()).getTime(), name:`Some New Item`}})
            }}>+ item</button>
            <ul>
              {cart.items.map( item => <li key={item.id}>{item.name}</li> )}
            </ul>
            </div>
        })} 

      </div>
  </div>
  );
}

// This is the specialized version of the component
export const MemberArea = container.StateConnector( AbstractMemberArea )