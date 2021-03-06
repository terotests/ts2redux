import { setTimeout } from "timers";

/**
 * User Interface State
 */

export interface ShopCartItem {
  id?: number;
  name: string;
}

export interface ShopCart {
  newItemName?: string;
  items: ShopCartItem[];
}

export enum TaskState {
  UNDEFINED,
  RUNNING,
  ERROR,
  SUCCESS
}

export interface TestObj {
  name: string;
}

function getTestObj(): TestObj {
  return { name: "OK" };
}

const MSG = "STATE IS NOW";
const MSG2 = "AFTER DISPATCH STATE IS";
const DELAY = 1000;
const LAST_NAME = "I am the last item!!!!";
const STR_CART = "cart";
const STR_ITEM = "item";
const PROB_50 = 0.5;

const FRIEND_LIST = ["Arthur", "John", "Martin", "Peter"];
/**
 * @redux true
 */
class TestModel {
  // model with initializer
  items: ShopCartItem[] = [];
  maxId = 1;

  maybeString?: string;

  // Default initializers work :)
  str_init_test = "OK?";
  bool_init_test = false;
  bool4 = true;
  obj_init_test = getTestObj();
  rand_init_test = Math.floor(Math.random() * 5);

  arr_init_test = [1, 2, 3];
  arr_init_test2 = [1, 2, 3, "foo"];
  obj_literal_test = { cnt: 200 };

  cartId: number = 1;
  shopState: TaskState = TaskState.UNDEFINED;

  // my shopping carts
  carts: { [key: string]: ShopCart } = {};

  // message to user
  userMessage: string = "";
  testObj?: TestObj;

  setUserMessage(value: string) {
    this.userMessage = value;
  }

  // reducer
  add(item: ShopCartItem) {
    console.log(this.maxId);
    this.items.push({
      ...item,
      id: this.maxId++
    });
  }

  removeFirst() {
    this.items.splice(0, 1);
  }

  sort() {
    this.items.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Creates a new shopping cart
   */

  addCart() {
    const key = "cart" + this.cartId++;
    this.carts[key] = {
      items: [{ id: this.maxId++, name: STR_ITEM }]
    };
  }

  addCartSync() {
    const key = "cart" + this.cartId++;
    this.carts[key] = {
      items: [{ id: this.maxId++, name: STR_ITEM }]
    };
  }

  addToCart(adding: { cartId: string; item: ShopCartItem }) {
    this.carts[adding.cartId].items.push({
      ...adding.item,
      id: this.maxId++
    });
  }

  setCartNewItem(adding: { cartId: string; name: string }) {
    this.carts[adding.cartId].newItemName = name;
  }

  addToCartRandom() {
    Object.keys(this.carts).forEach(cartKey => {
      this.addToCart({
        cartId: cartKey,
        item: { name: STR_ITEM + this.maxId++ }
      });
    });
  }

  renameLast(newName: string) {
    this.items[this.items.length - 1].name = newName;
  }
  // action
  async createItem(someName: string) {
    console.log(MSG, this.shopState);
    if (this.shopState == TaskState.RUNNING) {
      return;
    }
    this.shopState = TaskState.RUNNING;
    await new Promise(res => {
      setTimeout(res, DELAY);
    });
    console.log(MSG2, this.shopState);
    this.add({ name: someName });
    this.shopState = TaskState.SUCCESS;
  }

  async addOneFriend(name) {
    this.add({ name });
  }

  async fillSomeFriends() {
    FRIEND_LIST.forEach(name => {
      this.add({ name });
    });
  }

  async ChangeLastItem() {
    this.renameLast(LAST_NAME);
  }
}
