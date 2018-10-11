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

const CNT = 2
/**
 * @simpleredux true
 */
class TestModel {
  items:ShopCartItem[] 
  cnt:number = 0

  add( item:ShopCartItem) {
    this.items = [...this.items, item]
  }
  inc() {
    this.cnt = this.cnt + CNT
  }
  async jee(someName:string) {
    const item = { name: someName };
    this.add(item);
  }
}
