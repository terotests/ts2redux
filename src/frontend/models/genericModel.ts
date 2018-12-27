export interface Summable {
  value: () => number;
}

export class SomeList<T extends Summable> {
  items: T[] = [];
  forItems(fn: (item: T) => void) {
    this.items.forEach(fn);
  }
  addItems(items: T[]) {
    console.log("Generic SomeList::addItems was called...");
    console.log(this);
    this.items = [...this.items, ...items];
  }
}
/**
 * @redux true
 */
export class GenericModel {
  sum = 0;
  isLoading: { [key: string]: boolean } = {};
  // This is not a good idea with Immer...
  list: SomeList<Summable> = new SomeList<Summable>();
  refreshSum() {
    this.sum = this.list.items.reduce((prev, curr) => prev + curr.value(), 0);
  }
  addItems<T extends Summable>(items: T[]) {
    console.log(this);
    this.list.addItems(items);
    this.refreshSum();
  }
  inc() {
    this.sum++;
  }
  async testLoading() {}
}
