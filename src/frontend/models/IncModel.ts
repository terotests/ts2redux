
/**
 * @redux true
 */

export class IncModel {
  cnt:number = 0
  async increment() {
    this.cnt++
  }
  async decrement() {
    this.cnt--
  }  
}