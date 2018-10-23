import axios from 'axios'

export interface TodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type TaskState = 'UNDEFINED' | 'RUNNING' |  'LOADED' | 'ERROR'

export type SortColumns = 'id' | 'title'
export type FilterTypes = 'none' | 'completed'
/**
 * @redux true
 */
export class TodoList {
  items: TodoListItem[] = []
  state: TaskState = 'UNDEFINED'
  stateError: any
  sortColumn: SortColumns = 'id'
  filterType: FilterTypes = 'none'

  getFilteredList(): TodoListItem[] {
    switch (this.filterType ) {
      case 'completed':
        return this.items.slice().filter( item => item.completed )
        break       
    }
    return this.items
  }

  getSortedList() : TodoListItem[] {
    switch (this.sortColumn ) {
      case 'id':
        return this.getFilteredList().slice().sort( (a, b) => a.id - b.id )
        break
      case 'title':
        return this.getFilteredList().slice().sort( (a, b) => a.title.localeCompare( b.title ) )
        break        
    }
  }
  clearTodoList() {
    this.items = []
  }
  reverse() {
    this.items.reverse()
  }  
  sortById() {
    this.items.sort( (a, b) => a.id - b.id )
  }
  sortByTitle() {
    this.items.sort( (a, b) => a.title.localeCompare( b.title ) )
  }
  sortByCompletion() {
    const toNumber = (value:boolean) : number => value ? 1 : 0;
    this.items.sort( (a, b) => toNumber(a.completed) - toNumber(b.completed) )
  }
  /**
   * Fetch items from json placeholder service
   */
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
