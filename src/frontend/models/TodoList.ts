import axios from 'axios'

export interface TodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type TaskState = 'UNDEFINED' | 'RUNNING' |  'LOADED' | { type:'ERROR', error:any }
/**
 * @simpleredux true
 */
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
      this.state = {
        type: 'ERROR',
        error: e
      }
    }
  }
}
