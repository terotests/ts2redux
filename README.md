
# TypeScript to Redux

Compile simple TypeScript classes into both Redux or React Context API state machines, which work together with Redux Devtools (yes, also React Context changes can be viewed from Redux Devtools, time travel also works! 🎉)

Too good to be true?

Yes, it is true, but the compiler is still quite young and Please Do check the [Limitations](https://github.com/terotests/ts2redux#limitations) before you test the library.

## Installation

```
npm i -g ts2redux
```
Run test app by cloning [Repository](https://github.com/terotests/ts2redux) and then
```
npm install
npm test
```

## Why?

It is not likely that state management gets much easier than this:

1. State is written using as TypeScript `class` - initializers, reducers, actions are derived from that
2. You can choose Redux or Context API (or both for that matter)
3. Partial Redux Devtools support for React Context API 
4. Just use normal `async` - no fancy library needed for async operations
5. Typed with TypeScript

Also the library imposes no direct dependencies, after it has compiled the sources, you do not need the compiler any more - the resulting files have not dependencies to anything else than proven libraries like React, Immer etc.

And as an added bonus, we get selector support with `reselect` using method getters! 

## Acknowledgements

This library would not have been possible without following great OS tools:
- [ts-simple-ast](https://github.com/dsherret/ts-simple-ast) for AST code management (special thanks for library author David Sherret for extremely fast responses while I was having problems during development!)
- [immer](https://github.com/mweststrate/immer) for easy immutable transformations
- [reselect](https://github.com/reduxjs/reselect) selector library for Redux
- [yargs](https://github.com/yargs/yargs) for command line processing
- [Redux Devtools Extensions](https://github.com/zalmoxisus/redux-devtools-extension)
- and of course [Redux](https://github.com/reduxjs/redux) and [React and the new Context API](https://reactjs.org/docs/context.html)

Also inspiration sources were fellow coders at [Koodiklinikka](https://github.com/koodiklinikka), developers at [Leonidas](https://leonidasoy.fi/) and several blog article writers [1](https://daveceddia.com/context-api-vs-redux/)[2](https://medium.freecodecamp.org/replacing-redux-with-the-new-react-context-api-8f5d01a00e8c)

## Introduction

The simplest way of writing a stateful model is simply creating a simple TypeScript class would be like this
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
  increment() {
    this.cnt++
  }
  decrement() {
    this.cnt--
  }  
}
```
The question asked was: would it be possible to transfer this simple state representation automatically to Redux? Or even to React Context API?

Turns out with a little bit of [compiler magic](https://github.com/dsherret/ts-simple-ast) we can transform the *idea* of the class into both Redux and React Context API representations. The Redux compiling will create necessary Actions, Enumerations and Reducers, Combined Reducers and MapStateToProps, MapDispatchToProps to manage the component state correctly. 

The compiler does not need much help, we need to add the [JSDoc](http://usejsdoc.org/) comment property before the class and also we need to remember to give types to the properties of the class.

```typescript
/**
 * @redux true
 */
export class IncModel {
  // ...
}
```
Then we can compile the model
```
  ts2redux <path>
```
And the directory will have `reducers/` directory where `IncModel` and `SimpleModel` are defined [IncModel.tsx](https://github.com/terotests/ts2redux/blob/master/src/frontend/models/reducers/IncModel.tsx) and  
[SimpleModel.tsx](https://github.com/terotests/ts2redux/blob/master/src/frontend/models/reducers/IncModel.tsx) together with all Redux ceremony and more.

## Limitations

### Type of class properties must be specified

```typescript
class Foo {
  // OK
  name:string
  // OK
  name2:string = 'Someone'
  // ERROR
  name3 = 'Someone'
}
```
Reason for this is that at least for now, the type is not inferred from the assigned value.

### Async Functions can not mutate state deeply (synchronous can)

There is important limitation for `async` functions for the class: `async` function can read state but can only assign (`=`) to class properties, not mutate them deeply like syncronous functions, which are compiled to reducers.

This is because `async` functions can only mutate the state by dispatching new Redux actions from the assigments. 

For example
```typescript
 // this is OK
 this.items = []            
 // this is error, no dispatch generated, Redux will complain about this too
 this.items.sort( /*... */)  
```

### Functions can only have one parameter

```typescript
class Foo {
  // OK
  hello(message:{sender:string, receiver:string}) {

  }
  // this is ERROR
  hello(sender:string, receiver:string) {

  }
}
```
The reason for this is just simplicity: the first parameter is compiled directly to the actions payload. In the
future the compiler might compile functions with variable number of parameters directly to the payload, but
this is not supported at the moment.

### Relative imports from state modules are not compiled correctly

Because the Model code is brutally copied to the beginning of the genrated reducer file, relative imports like
```typescript
import * as foo from '../barzone'
```
Will be broken. If you need to import files in the model files it is recommened to [Configure TypeScript not to user relative paths](https://decembersoft.com/posts/say-goodbye-to-relative-paths-in-typescript-imports/)

### React Context API -components are not removed from Redux Devtools after unmount

If you generate a lot of Redux Context API -components and Redux Devtools is enabled, history of unmounted components is visible in the Redux Devtools debugging history. In some cases this may be desirable, in some cases not. 

In case the component is unmounted, it's listeners are unsubscribed and time travel will not work.

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

# Selectors

Selectors are great, if you want to avoid expensive recalculations and optimize rendering performance using PureComponents.

To create a selector, define function with `get` -modifier like `get someProperty() : someReturnValueType`. This will create a new property `someProperty` which can be used as a cached result of some computation based on the model.

For example see code from [TodoList.ts](https://github.com/terotests/ts2redux/blob/master/src/frontend/models/TodoList.ts#L33-L38)

```typescript
export class TodoList {

  // ... some model parameters used to transform the list...
  items: TodoListItem[] = []
  sortOrder:SortOrder = SortOrder.ASC 
  listStart:number = 0
  listPageLength:number = 10

  // use this like <PureList items={props.listToDisplay}/> 
  get listToDisplay() : TodoListItem[] {
    return this.items
      .filter( item => item.completed )
      .sort( sortFn(this.sortOrder) )
      .slice( this.listStart, this.listStart + this.listPageLength)
  }
```
The advantage of selector is that value is memoized and will only update if parameters affecting it's value will change. In the example above,`listToDisplay` is recalculated only if the value of `items`, `sortOrder`, `listStart` or `listPageLength`changes.

If property above is given to a `PureComponent` like this
```jsx
<PureList items={props.listToDisplay}/> 
```
The component will render only when parameters affecting it's computation change.

# Examples

Some example of Models are available in [src/frontend/models](https://github.com/terotests/ts2redux/tree/master/src/frontend/models) -directory.

## Error handling in async functions

In typical Redux code you want to have some kind of loading state

```typescript
export type TaskState = 'UNDEFINED' | 'RUNNING' |  'LOADED' | 'ERROR'
```

Any kind of loading state is pretty easy to implement, for example

```typescript
class TodoList {
  items: TodoListItem[] = []
  state: TaskState = 'UNDEFINED'
  async getItems() {
    if(this.state === 'RUNNING') return
    try {
      this.state = 'RUNNING'
      this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
      this.state = 'LOADED'
    } catch(e) {
      this.state = 'ERROR'
    }
  }
}
```
# License

MIT.
