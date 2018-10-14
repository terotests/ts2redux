
# TypeScript to Redux

Tries to simplify creating the Redux state into 3 simple steps (with some substeps):

1. Create a model
2. Compile the model to reducers
3. Bind model to some React component

## Step 1: create a model

```typescript
import axios from 'axios'

// 1) Define some shape for the model
export interface TodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}
export type TaskState = 'UNDEFINED' | 'RUNNING' |  'LOADED' | { type:'ERROR', error:any }

/**
 * @redux true
 */
class TodoList {

  // 2) define model types with initializers
  items: TodoListItem[] = []
  state: TaskState = 'UNDEFINED'

  // 3) define some functions to be used with data
  async getItems() {
    if(this.state === 'RUNNING') return
    try {
      this.state = 'RUNNING'
      this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
      this.state = 'LOADED'
    } catch(e) {
      this.state = {
        type: 'ERROR',
        error: e
      }
    }
  }
}
```

## Step 2: compile the model

run `ts2redux <directory>` for the directory of yours models. Subdirectory `reducers/` will be created

## Step 3: connect model to a component

```typescript
import * as React from 'react';
import * as container from '../models/reducers/TodoList'

// 1) Extend the container.Properties and add more props if needed
export interface Props extends container.Props {}

// 2) Create a reusable abstract component first
export const AbstractTodoList = (props : Props) => {
  return (
  <div>
      <h2>TodoList Component</h2>
      <input type="submit"
              value="load"
              className="btn btn-default"
              // 3) the getItems() is mapped here
              onClick={() => props.getItems()}
      />
      <div>
        <div>{props.state}</div>
        <table><tbody>{props.items.map( m => {
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
