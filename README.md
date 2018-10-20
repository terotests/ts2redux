
# TypeScript to Redux

Compile simple TypeScript classes into both Redux or React Context API state machines, which work together with Redux Devtools (yes, also React Context changes can be viewed from Redux Devtools, time travel also works! 🎉)

## Acknowledgements

This library would not have been possible without following great OS tools:
- [ts-simple-ast](https://github.com/dsherret/ts-simple-ast) for AST code management (special thanks for library author David Sherret for extremely fast responses while I was having problems during development!)
- [immer](https://github.com/mweststrate/immer) for easy immutable transformations
- [yargs](https://github.com/yargs/yargs) for command line processing
- Redux
- [Redux Devtools Extansions](https://github.com/zalmoxisus/redux-devtools-extension)
- and of course [Redux](https://github.com/reduxjs/redux) and [React and the new Context API](https://reactjs.org/docs/context.html)
Also inspiration sources were people at [Koodiklinikka](https://github.com/koodiklinikka), developers at [Leonidas](https://leonidasoy.fi/) and several blog article writers [1](https://daveceddia.com/context-api-vs-redux/)[2](https://medium.freecodecamp.org/replacing-redux-with-the-new-react-context-api-8f5d01a00e8c)

## Introduction

Ok, As you all know, Redux state management can be time consuming and people are switching to more user friendly
solutions like MobX or new React Context API. These are all great.

However, the simplest way of writing a stateful model is simply creating a simple TypeScript class would be like this
```typescript
export class SimpleModel {
  items: any[] = []
  async getItems() {
    // get some data from the internet
    this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
  }
}
```
Or if you prefer the classical increment / decrement example
```typescript
export class IncModel {
  cnt:number = 0
  async increment() {
    this.cnt++
  }
  async decrement() {
    this.cnt--
  }  
}
```
However, because the class is using imperative model with mutable state changes we can not use this with Redux.

Or could we?

Turns out with a little bit of [compiler magic](https://github.com/dsherret/ts-simple-ast) we can transform the *idea* of the class into both Redux and React Context API representations, which are both functionally similar to the original class and extremely easy to use.

Only thing we need to do is tell compiler that this class should be transformed to a Reducer or React Context API Consumer or Provider.

We do it by adding a [JSDoc](http://usejsdoc.org/) comment property to the class comment like this

```typescript
/**
 * @redux true
 */
export class SimpleModel {
  items: any[] = []
  async getItems() {
    this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
  }
}
```
Then we can run something like this

```
  ts2redux src
```
And the directory where `IncModel` and `SimpleModel` now magically contain files [IncModel.tsc](https://github.com/terotests/ts2redux/blob/master/src/frontend/models/reducers/IncModel.tsx) and  
[SimpleModel.tsc](https://github.com/terotests/ts2redux/blob/master/src/frontend/models/reducers/IncModel.tsx) 

Whoa! There is a lot of stuff there, admittedly, and it is not easy to understand what the code does at the first glance. 

But what is important is what is exported from the file and what we can use, the `ts2redux` has been friendly enought to generate to us something which React Context API calls Provider and Consumer pair, which we can now import to our application

## Using React Context API

```typescript
// for the new ReactContext API
import { IncModelConsumer, IncModelProvider } from './models/reducers/IncModel'
```
For React Context API we simply create a upper level `<model>Provider` and lower in the VDOM tree use `<model>Consumer` to render components or to call methods of the model.

```typescript
  <IncModelProvider>
      <IncModelConsumer>{state=><div>
        <div>{state.cnt}</div>
        <button onClick={state.increment}>+</button>
        <button onClick={state.decrement}>-</button>
      </div>}</IncModelConsumer>
  </IncModelProvider>
```

## Using Redux

For Redux the compiler generates the main reducer import in 
```typescript
import { reducers } from './models/reducers/'
```
This is pretty standard Redux stuff, the main reducer is given then to the `createStore`
```typescript
let store = createStore( reducers, /** other params*/)
```
After which you create `<Provider store={store}>` normally.

The IncModel -component would look like this:
```typescript

// impor the IncModel
import * as container from '../models/reducers/IncModel'

// abstract properties version of the component
export interface Props extends container.Props {}

// this component can be re-used
export const AbstractInc = (props : Props) => {
  return (
    <div>
      <div>{props.cnt}</div>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </div>
  );
}
// Connect the abstract component to the Redux model
export const ReduxInc = container.StateConnector( AbstractInc )
```



# TODO -list example

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

## TODO:

Think about local storage and the migrations
https://medium.freecodecamp.org/how-to-use-redux-persist-when-migrating-your-states-a5dee16b5ead

https://github.com/rt2zz/redux-persist/blob/HEAD/docs/migrations.md


## License

MIT.
