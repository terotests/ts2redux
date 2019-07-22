/**
 * @redux true
 */

export class IncModel {
  cnt = 0;

  increment() {
    this.cnt++;
  }
  decrement() {
    this.cnt--;
  }

  get incValue() {
    return this.cnt;
  }
}
