import axios from "axios";

/**
 * @redux true
 */
export class SimpleModel {
  items: any[] = [];

  /**
   * @dispatch true
   * @param action
   */
  async SimpleDispatch(action: any) {
    // Example of dispatcher routine
  }

  async getItems() {
    this.items = (await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    )).data;
  }
  get myItems(): any[] {
    return this.items;
  }
}
