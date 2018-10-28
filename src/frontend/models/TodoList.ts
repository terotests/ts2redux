import axios from 'axios'

export interface TodoListItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type TaskState = 'UNDEFINED' | 'RUNNING' |  'LOADED' | 'ERROR'
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

const sortFn = (order:SortOrder) => ( a:TodoListItem, b:TodoListItem ) => {
  if(order === SortOrder.ASC) return a.id - b.id
  return b.id - a.id  
}

/**
 * @redux true
 */
export class TodoList {
  items: TodoListItem[] = []
  state: TaskState = 'UNDEFINED'
  stateError: any
  sortOrder:SortOrder = SortOrder.ASC 
  listStart:number = 0
  listPageLength:number = 10

  // Example of memoized list using reselect
  get listToDisplay() : TodoListItem[] {
    return this.items
      .filter( item => item.completed )
      .sort( sortFn(this.sortOrder) )
      .slice( this.listStart, this.listStart + this.listPageLength)
  }
  nextPage() {
    this.listStart += this.listPageLength
  }  
  prevPage() {
    this.listStart -= this.listPageLength
    if(this.listStart < 0 ) this.listStart = 0
  }  
  toggleSortOrder() {
    this.sortOrder = this.sortOrder == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
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
