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
  items: TodoListItem[] = []
  async getItems() {
    this.items = (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
  }
}
