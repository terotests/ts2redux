/************************************************************************************
 *                                                                                   *
 *   Redux Reducers and React Context API Provider/Consumer for state GenericModel   *
 *   Generated by ts2redux from Source file ../genericModel.ts                       *
 *                                                                                   *
 ************************************************************************************/

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

import * as immer from "immer";
import { connect } from "react-redux";
import { IState } from "./index";
import * as React from "react";

export interface IContainerPropsMethods {
  refreshSum: () => any;
  addItems: <T extends Summable>(items: T[]) => any;
  inc: () => any;
  testLoading: () => any;
}
export interface IGenericModel {
  sum: number;
  isLoading: {
    [key: string]: boolean;
  };
  // This is not a good idea with Immer...
  list: SomeList<Summable>;
}

export type IContainerPropsState = IGenericModel;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {}

function pick<T, K extends keyof T>(o: T, ...props: K[]) {
  return props.reduce((a, e) => ({ ...a, [e]: o[e] }), {}) as Pick<T, K>;
}
export function mapStateToPropsWithKeys<K extends keyof IContainerPropsState>(
  state: IState,
  keys: K[]
): Pick<IContainerPropsState, K> {
  return pick(state.GenericModel as IContainerPropsState, ...keys);
}

export const mapStateToProps = (state: IState): IContainerPropsState => {
  return {
    sum: state.GenericModel.sum,
    isLoading: state.GenericModel.isLoading,
    list: state.GenericModel.list
  };
};

function mapDispatchToPropsWithKeys<K extends keyof IContainerPropsMethods>(
  dispatch: any,
  keys: K[]
): Pick<IContainerPropsMethods, K> {
  return pick(mapDispatchToProps(dispatch), ...keys);
}

export const mapDispatchToProps = (dispatch: any): IContainerPropsMethods => {
  return {
    refreshSum: () => {
      return dispatch(RGenericModel.refreshSum());
    },
    addItems: <T extends Summable>(items: T[]) => {
      return dispatch(RGenericModel.addItems(items));
    },
    inc: () => {
      return dispatch(RGenericModel.inc());
    },
    testLoading: () => {
      return dispatch(RGenericModel.testLoading());
    }
  };
};

export function ConnectKeys<
  K extends keyof IGenericModel,
  J extends keyof IContainerPropsMethods
>(keys: K[], methods: J[]) {
  return connect(
    (state: IState) => mapStateToPropsWithKeys(state, keys),
    (dispatch: any) => mapDispatchToPropsWithKeys(dispatch, methods)
  );
}

export const StateConnector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const initGenericModel = () => {
  const o = new GenericModel();
  return {
    sum: o.sum,
    isLoading: o.isLoading,
    list: o.list
  };
};
const initWithMethodsGenericModel = () => {
  const o = new GenericModel();
  return {
    sum: o.sum,
    isLoading: o.isLoading,
    list: o.list,
    refreshSum: o.refreshSum,
    addItems: o.addItems,
    inc: o.inc,
    testLoading: o.testLoading
  };
};

/**
 * @generated true
 */
export class RGenericModel {
  private _state?: IGenericModel;
  private _dispatch?: (action: any) => void;
  private _getState?: () => any;
  constructor(
    state?: IGenericModel,
    dispatch?: (action: any) => void,
    getState?: () => any
  ) {
    this._state = state;
    this._dispatch = dispatch;
    this._getState = getState;
  }
  get sum(): number {
    if (this._getState) {
      return this._getState().GenericModel.sum;
    } else {
      if (this._state) {
        return this._state.sum;
      }
    }
    throw "Invalid State in GenericModel_sum";
  }
  set sum(value: number) {
    if (this._state && typeof value !== "undefined") {
      this._state.sum = value;
    } else {
      // dispatch change for item sum
      if (this._dispatch) {
        this._dispatch({
          type: GenericModelEnums.GenericModel_sum,
          payload: value
        });
      }
    }
  }
  get isLoading(): {
    [key: string]: boolean;
  } {
    if (this._getState) {
      return this._getState().GenericModel.isLoading;
    } else {
      if (this._state) {
        return this._state.isLoading;
      }
    }
    throw "Invalid State in GenericModel_isLoading";
  }
  set isLoading(value: { [key: string]: boolean }) {
    if (this._state && typeof value !== "undefined") {
      this._state.isLoading = value;
    } else {
      // dispatch change for item isLoading
      if (this._dispatch) {
        this._dispatch({
          type: GenericModelEnums.GenericModel_isLoading,
          payload: value
        });
      }
    }
  }
  get list(): SomeList<Summable> {
    if (this._getState) {
      return this._getState().GenericModel.list;
    } else {
      if (this._state) {
        return this._state.list;
      }
    }
    throw "Invalid State in GenericModel_list";
  }
  set list(value: SomeList<Summable>) {
    if (this._state && typeof value !== "undefined") {
      this._state.list = value;
    } else {
      // dispatch change for item list
      if (this._dispatch) {
        this._dispatch({
          type: GenericModelEnums.GenericModel_list,
          payload: value
        });
      }
    }
  }

  refreshSum() {
    if (this._state) {
      this.sum = this.list.items.reduce((prev, curr) => prev + curr.value(), 0);
    } else {
      if (this._dispatch) {
        this._dispatch({ type: GenericModelEnums.GenericModel_refreshSum });
      }
    }
  }

  public static refreshSum() {
    return (dispatcher: any, getState: any) => {
      new RGenericModel(undefined, dispatcher, getState).refreshSum();
    };
  }
  addItems<T extends Summable>(items: T[]) {
    if (this._state) {
      console.log(this);
      this.list.addItems(items);
      this.refreshSum();
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: GenericModelEnums.GenericModel_addItems,
          payload: items
        });
      }
    }
  }

  public static addItems<T extends Summable>(items: T[]) {
    return (dispatcher: any, getState: any) => {
      new RGenericModel(undefined, dispatcher, getState).addItems(items);
    };
  }
  inc() {
    if (this._state) {
      this.sum++;
    } else {
      if (this._dispatch) {
        this._dispatch({ type: GenericModelEnums.GenericModel_inc });
      }
    }
  }

  public static inc() {
    return (dispatcher: any, getState: any) => {
      new RGenericModel(undefined, dispatcher, getState).inc();
    };
  }
  // testLoading
  async testLoading() {}

  public static testLoading() {
    return (dispatcher: any, getState: any) => {
      new RGenericModel(undefined, dispatcher, getState).testLoading();
    };
  }
}

export const GenericModelEnums = {
  GenericModel_sum: "GenericModel_sum",
  GenericModel_isLoading: "GenericModel_isLoading",
  GenericModel_list: "GenericModel_list",
  GenericModel_refreshSum: "GenericModel_refreshSum",
  GenericModel_addItems: "GenericModel_addItems",
  GenericModel_inc: "GenericModel_inc"
};

export const GenericModelReducer = (
  state: IGenericModel = initGenericModel(),
  action: any
) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case GenericModelEnums.GenericModel_sum:
        new RGenericModel(draft).sum = action.payload;
        break;
      case GenericModelEnums.GenericModel_isLoading:
        new RGenericModel(draft).isLoading = action.payload;
        break;
      case GenericModelEnums.GenericModel_list:
        new RGenericModel(draft).list = action.payload;
        break;
      case GenericModelEnums.GenericModel_refreshSum:
        new RGenericModel(draft).refreshSum();
        break;
      case GenericModelEnums.GenericModel_addItems:
        new RGenericModel(draft).addItems(action.payload);
        break;
      case GenericModelEnums.GenericModel_inc:
        new RGenericModel(draft).inc();
        break;
    }
  });
};
/********************************
 * React Context API component   *
 ********************************/
export const GenericModelContext = React.createContext<IProps>(
  initWithMethodsGenericModel()
);
export const GenericModelConsumer = GenericModelContext.Consumer;
let instanceCnt = 1;
export class GenericModelProvider extends React.Component {
  public state: IGenericModel = initGenericModel();
  public lastSetState: IGenericModel;
  private __devTools: any = null;
  constructor(props: any) {
    super(props);
    this.lastSetState = this.state;
    this.refreshSum = this.refreshSum.bind(this);
    this.addItems = this.addItems.bind(this);
    this.inc = this.inc.bind(this);
    this.testLoading = this.testLoading.bind(this);
    const devs = window["__REDUX_DEVTOOLS_EXTENSION__"]
      ? window["__REDUX_DEVTOOLS_EXTENSION__"]
      : null;
    if (devs) {
      this.__devTools = devs.connect({ name: "GenericModel" + instanceCnt++ });
      this.__devTools.init(this.state);
      this.__devTools.subscribe((msg: any) => {
        if (msg.type === "DISPATCH" && msg.state) {
          this.setState(JSON.parse(msg.state));
        }
      });
    }
  }
  public componentWillUnmount() {
    if (this.__devTools) {
      this.__devTools.unsubscribe();
    }
  }
  public setStateSync(state: IGenericModel) {
    this.lastSetState = state;
    this.setState(state);
  }
  refreshSum() {
    const nextState = immer.produce(this.state, draft =>
      new RGenericModel(draft).refreshSum()
    );
    if (this.__devTools) {
      this.__devTools.send("refreshSum", nextState);
    }
    this.setStateSync(nextState);
  }
  addItems<T extends Summable>(items: T[]) {
    const nextState = immer.produce(this.state, draft =>
      new RGenericModel(draft).addItems(items)
    );
    if (this.__devTools) {
      this.__devTools.send("addItems", nextState);
    }
    this.setStateSync(nextState);
  }
  inc() {
    const nextState = immer.produce(this.state, draft =>
      new RGenericModel(draft).inc()
    );
    if (this.__devTools) {
      this.__devTools.send("inc", nextState);
    }
    this.setStateSync(nextState);
  }
  async testLoading() {
    new RGenericModel(
      undefined,
      (action: any) => {
        const nextState = GenericModelReducer(this.lastSetState, action);
        if (this.__devTools) {
          this.__devTools.send(action.type, nextState);
        }
        this.setStateSync(nextState);
      },
      () => ({ GenericModel: this.lastSetState })
    ).testLoading();
  }
  public render() {
    return (
      <GenericModelContext.Provider
        value={{
          ...this.state,
          refreshSum: this.refreshSum,
          addItems: this.addItems,
          inc: this.inc,
          testLoading: this.testLoading
        }}
      >
        {" "}
        {this.props.children}
      </GenericModelContext.Provider>
    );
  }
}
