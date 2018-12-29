// separating code from the model
function incMe(obj: IncModel) {
  obj.cnt++;
}

/**
 * @redux true
 */

export class IncModel {
  cnt = 0;
  increment() {
    incMe(this);
  }
  decrement() {
    this.cnt--;
  }
}
