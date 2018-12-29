import axios from "axios";

export class itemStorage {
  items: any[] = [];
}

/**
 * @redux true
 */
export class SimpleModel extends itemStorage {
  async getItems() {
    this.items = (await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    )).data;
  }
  get myItems(): any[] {
    return this.items;
  }
}
