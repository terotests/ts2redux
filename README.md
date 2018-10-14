
# TypeScript to Redux

Tries to simplify creating the Redux state into 3 simple steps:

1. Create a model
2. Compile the model to reducers
3. Bind model to some React component

## Step 1: create a model

```typescript
import axios from 'axios'

export interface TodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

/**
 * @simpleredux true
 */
class TodoList {
  // 1) It is important to define both type and initializer
  items: TodoListItem[] = []
  // 2) This function will be transformed to action / dispacth / reducer and can be used from the
  //    implemented component
  async getItems() {
    this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
  }
}
```

## Step 2: compile the model

run `ts2redux <directory>` for the directory of yours models. Subdirectory `reducers/` will be created

## Step 3: connect model to a component

```typescript
import * as React from 'react';
import * as container from '../models/reducers/TodoList'

// 1) Important: extend the container.Properties and add more props if needed
export interface Props extends container.Props {}

// 2) Create a re-suzable abstract component first
export const AbstractTodoList = (props : Props) => {
  return (
  <div>
      <div>TodoList Component</div>
      <input type="submit"
              value="load"
              className="btn btn-default"
              // 3) the getItems() is mapped here
              onClick={() => props.getItems()}
      />
      <div>
        <table style={{border:'1px solid gray', padding:'5px'}}><tbody>{props.items.map( m => {
          return <tr key={m.id}>
            <td>{m.id}</td>
            <td>{m.title}</td>
            <td>{m.completed ? 'Completed' : 'In Progress'}</td>
          </tr>;
        })}</tbody></table>        
      </div>
  </div>
  );
}

// 4) Connect the Redux model and create a concrete implementation
export const TodoList = container.StateConnector( AbstractTodoList )
```



## License

MIT.
