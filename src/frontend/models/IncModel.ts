/**
 * @redux true
 */

export class IncModel {
  cnt = 0;

  // placeholder routine
  async ReduxDispatch(action: any) {}

  increment() {
    this.cnt++;
  }
  decrement() {
    this.cnt--;
  }
}
