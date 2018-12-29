/********************************************************************************
 *                                                                               *
 *   Redux Reducers and React Context API Provider/Consumer for state IncModel   *
 *   Generated by ts2redux from Source file ../IncModel.ts                       *
 *                                                                               *
 ********************************************************************************/

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

import * as immer from "immer";
import { connect } from "react-redux";
import { IState } from "./index";
import * as React from "react";

export interface IContainerPropsMethods {
  increment: () => any;
  decrement: () => any;
}
export interface IIncModel {
  cnt: number;
}

export type IContainerPropsState = IIncModel;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {}
export const mapStateToProps = (state: IState): IContainerPropsState => {
  return {
    cnt: state.IncModel.cnt
  };
};
export const mapDispatchToProps = (dispatch: any): IContainerPropsMethods => {
  return {
    increment: () => {
      return dispatch(RIncModel.increment());
    },
    decrement: () => {
      return dispatch(RIncModel.decrement());
    }
  };
};
export const StateConnector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const initIncModel = () => {
  const o = new IncModel();
  return {
    cnt: o.cnt
  };
};
const initWithMethodsIncModel = () => {
  const o = new IncModel();
  return {
    cnt: o.cnt,
    increment: o.increment,
    decrement: o.decrement
  };
};

/**
 * @generated true
 */
export class RIncModel extends IncModel {
  private _state?: IIncModel;
  private _dispatch?: (action: any) => void;
  private _getState?: () => any;
  constructor(
    state?: IIncModel,
    dispatch?: (action: any) => void,
    getState?: () => any
  ) {
    super();
    this._state = state;
    this._dispatch = dispatch;
    this._getState = getState;
  }
  get cnt(): number {
    if (this._getState) {
      return this._getState().IncModel.cnt;
    } else {
      if (this._state) {
        return this._state.cnt;
      }
    }
    throw "Invalid State in IncModel_cnt";
  }
  set cnt(value: number) {
    if (this._state && typeof value !== "undefined") {
      this._state.cnt = value;
    } else {
      // dispatch change for item cnt
      if (this._dispatch) {
        this._dispatch({ type: IncModelEnums.IncModel_cnt, payload: value });
      }
    }
  }

  increment() {
    if (this._state) {
      incMe(this);
    } else {
      if (this._dispatch) {
        this._dispatch({ type: IncModelEnums.IncModel_increment });
      }
    }
  }

  public static increment() {
    return (dispatcher: any, getState: any) => {
      new RIncModel(undefined, dispatcher, getState).increment();
    };
  }
  decrement() {
    if (this._state) {
      this.cnt--;
    } else {
      if (this._dispatch) {
        this._dispatch({ type: IncModelEnums.IncModel_decrement });
      }
    }
  }

  public static decrement() {
    return (dispatcher: any, getState: any) => {
      new RIncModel(undefined, dispatcher, getState).decrement();
    };
  }
}

export const IncModelEnums = {
  IncModel_cnt: "IncModel_cnt",
  IncModel_increment: "IncModel_increment",
  IncModel_decrement: "IncModel_decrement"
};

export const IncModelReducer = (
  state: IIncModel = initIncModel(),
  action: any
) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case IncModelEnums.IncModel_cnt:
        new RIncModel(draft).cnt = action.payload;
        break;
      case IncModelEnums.IncModel_increment:
        new RIncModel(draft).increment();
        break;
      case IncModelEnums.IncModel_decrement:
        new RIncModel(draft).decrement();
        break;
    }
  });
};
/********************************
 * React Context API component   *
 ********************************/
export const IncModelContext = React.createContext<IProps>(
  initWithMethodsIncModel()
);
export const IncModelConsumer = IncModelContext.Consumer;
let instanceCnt = 1;
export class IncModelProvider extends React.Component {
  public state: IIncModel = initIncModel();
  public lastSetState: IIncModel;
  private __devTools: any = null;
  constructor(props: any) {
    super(props);
    this.lastSetState = this.state;
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    const devs = window["devToolsExtension"]
      ? window["devToolsExtension"]
      : null;
    if (devs) {
      this.__devTools = devs.connect({ name: "IncModel" + instanceCnt++ });
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
  public setStateSync(state: IIncModel) {
    this.lastSetState = state;
    this.setState(state);
  }
  increment() {
    const nextState = immer.produce(this.state, draft =>
      new RIncModel(draft).increment()
    );
    if (this.__devTools) {
      this.__devTools.send("increment", nextState);
    }
    this.setStateSync(nextState);
  }
  decrement() {
    const nextState = immer.produce(this.state, draft =>
      new RIncModel(draft).decrement()
    );
    if (this.__devTools) {
      this.__devTools.send("decrement", nextState);
    }
    this.setStateSync(nextState);
  }
  public render() {
    return (
      <IncModelContext.Provider
        value={{
          ...this.state,
          increment: this.increment,
          decrement: this.decrement
        }}
      >
        {" "}
        {this.props.children}
      </IncModelContext.Provider>
    );
  }
}
