/**
 * User Interface State 
 * 
 * Nice links btw.
 * https://github.com/gcanti/fp-ts/issues/251
 * https://jaysoo.ca/2017/05/10/learn-fp-with-react-part-2/
 */

export interface ShopCartItem {
  name: string
}

/**
 * @simpleredux true
 */
class TestModel {
  items:ShopCartItem[] 
  cnt:number = 0

  add( item:ShopCartItem) {
    this.items.push(item)
    // typical reducer would do it like...
    // this.items = [...this.items, item]
  }
  inc() {
    this.cnt++
  }
  async jee(someName:string) {
    const item = { name: someName };
    this.add(item);
  }
}
