import axios from 'axios'

export interface TodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type TaskState = 'UNDEFINED' | 'RUNNING' |  'LOADED' | 'ERROR'
/**
 * @redux true
 */
class TodoList {
  items: TodoListItem[] = []
  state: TaskState = 'UNDEFINED'
  stateError: any

  clearTodoList() {
    this.items = []
  }
  sortByTitle() {
    this.items.sort( (a, b) => a.title.localeCompare( b.title ) )
  }
  sortByCompletion() {
    const toNumber = (value:boolean) : number => value ? 1 : 0;
    this.items.sort( (a, b) => toNumber(a.completed) - toNumber(b.completed) )
  }
  async getItems() {
    if(this.state === 'RUNNING') return
    try {
      this.state = 'RUNNING'
      this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
      this.state = 'LOADED'
    } catch(e) {
      this.state = 'ERROR'
      this.stateError = e
    }
  }
}
