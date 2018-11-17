/*********************************************************************************
 *                                                                                *
 *   Redux Reducers and React Context API Provider/Consumer for state WaspModel   *
 *   Generated by ts2redux from Source file ../WaspModel.ts                       *
 *                                                                                *
 *********************************************************************************/

import { clearInterval } from "timers";

export interface Wasp {
  id?: number;
  x: number;
  y: number;
  dx?: number;
  dy?: number;
  steps?: number;
  color?: string;
}

/**
 * @redux true
 */
class WaspModel {
  speed: number = 10;
  lastId: number = 1;
  wasps: { [id: number]: Wasp } = {};

  addWasp(pos: { x: number; y: number }) {
    const o: Wasp = { x: 0, y: 0 };
    o.id = this.lastId++;
    o.x = pos.x;
    o.y = pos.y;
    o.dx = 1 - 2 * Math.random();
    o.dy = 1 - 2 * Math.random();
    o.color = "red";
    this.wasps[o.id] = o;
  }

  incSpeed(value: number) {
    this.speed = this.speed + value;
  }

  setColor(value: { waspId: number; colorValue: string }) {
    if (this.wasps[value.waspId])
      this.wasps[value.waspId].color = value.colorValue;
  }

  step() {
    const list: Wasp[] = Object.keys(this.wasps).map(i => this.wasps[i]);
    if (list.length === 0) {
      return;
    }
    const center = list.reduce(
      (prev, curr) => {
        return {
          x: prev.x + curr.x,
          y: prev.y + curr.y
        };
      },
      { x: 0, y: 0 }
    );
    center.x = center.x / list.length;
    center.y = center.y / list.length;
    for (let key of Object.keys(this.wasps)) {
      const wasp = this.wasps[key];
      const x = center.x - wasp.x;
      const y = center.y - wasp.y;
      const len = Math.sqrt(x * x + y * y);
      if (len > 20) {
        wasp.dx += x / len;
        wasp.dy += y / len;
      }
      wasp.steps = 0;
      wasp.x += wasp.dx;
      wasp.y += wasp.dy;
      if (wasp.x < 0 || wasp.x > 300) wasp.dx = wasp.dx * -1;
      if (wasp.y < 0 || wasp.y > 300) wasp.dy = wasp.dy * -1;
      wasp.steps++;
    }
  }
}
import * as immer from "immer";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { IState } from "./index";
import * as React from "react";

export interface IContainerPropsMethods {
  addWasp: (
    pos: {
      x: number;
      y: number;
    }
  ) => any;
  incSpeed: (value: number) => any;
  setColor: (
    value: {
      waspId: number;
      colorValue: string;
    }
  ) => any;
  step: () => any;
}
export interface IWaspModel {
  speed: number;
  lastId: number;
  wasps: {
    [id: number]: Wasp;
  };
}
export const speedSelectorFn = (state: IWaspModel): number => state.speed;
export const lastIdSelectorFn = (state: IWaspModel): number => state.lastId;
export const waspsSelectorFn = (
  state: IWaspModel
): {
  [id: number]: Wasp;
} => state.wasps;

export type IContainerPropsState = IWaspModel;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {}
export const mapStateToProps = (state: IState): IContainerPropsState => {
  return {
    speed: state.WaspModel.speed,
    lastId: state.WaspModel.lastId,
    wasps: state.WaspModel.wasps
  };
};
export const mapDispatchToProps = (dispatch: any): IContainerPropsMethods => {
  return {
    addWasp: (pos: { x: number; y: number }) => {
      return dispatch(RWaspModel.addWasp(pos));
    },
    incSpeed: (value: number) => {
      return dispatch(RWaspModel.incSpeed(value));
    },
    setColor: (value: { waspId: number; colorValue: string }) => {
      return dispatch(RWaspModel.setColor(value));
    },
    step: () => {
      return dispatch(RWaspModel.step());
    }
  };
};
export const StateConnector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const initWaspModel = () => {
  const o = new WaspModel();
  return {
    speed: o.speed,
    lastId: o.lastId,
    wasps: o.wasps
  };
};
const initWithMethodsWaspModel = () => {
  const o = new WaspModel();
  return {
    speed: o.speed,
    lastId: o.lastId,
    wasps: o.wasps,
    addWasp: o.addWasp,
    incSpeed: o.incSpeed,
    setColor: o.setColor,
    step: o.step
  };
};

/**
 * @generated true
 */
export class RWaspModel {
  private _state?: IWaspModel;
  private _dispatch?: (action: any) => void;
  private _getState?: () => any;
  constructor(
    state?: IWaspModel,
    dispatch?: (action: any) => void,
    getState?: () => any
  ) {
    this._state = state;
    this._dispatch = dispatch;
    this._getState = getState;
  }
  get speed(): number | undefined {
    if (this._getState) {
      return this._getState().WaspModel.speed;
    } else {
      if (this._state) {
        return this._state.speed;
      }
    }
    return undefined;
  }
  set speed(value: number | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.speed = value;
    } else {
      // dispatch change for item speed
      if (this._dispatch) {
        this._dispatch({
          type: WaspModelEnums.WaspModel_speed,
          payload: value
        });
      }
    }
  }
  get lastId(): number | undefined {
    if (this._getState) {
      return this._getState().WaspModel.lastId;
    } else {
      if (this._state) {
        return this._state.lastId;
      }
    }
    return undefined;
  }
  set lastId(value: number | undefined) {
    if (this._state && typeof value !== "undefined") {
      this._state.lastId = value;
    } else {
      // dispatch change for item lastId
      if (this._dispatch) {
        this._dispatch({
          type: WaspModelEnums.WaspModel_lastId,
          payload: value
        });
      }
    }
  }
  get wasps():
    | {
        [id: number]: Wasp;
      }
    | undefined {
    if (this._getState) {
      return this._getState().WaspModel.wasps;
    } else {
      if (this._state) {
        return this._state.wasps;
      }
    }
    return undefined;
  }
  set wasps(
    value:
      | {
          [id: number]: Wasp;
        }
      | undefined
  ) {
    if (this._state && typeof value !== "undefined") {
      this._state.wasps = value;
    } else {
      // dispatch change for item wasps
      if (this._dispatch) {
        this._dispatch({
          type: WaspModelEnums.WaspModel_wasps,
          payload: value
        });
      }
    }
  }

  // is a reducer
  addWasp(pos: { x: number; y: number }) {
    if (this._state) {
      const o: Wasp = { x: 0, y: 0 };
      o.id = this.lastId++;
      o.x = pos.x;
      o.y = pos.y;
      o.dx = 1 - 2 * Math.random();
      o.dy = 1 - 2 * Math.random();
      o.color = "red";
      this.wasps[o.id] = o;
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: WaspModelEnums.WaspModel_addWasp,
          payload: pos
        });
      }
    }
  }

  public static addWasp(pos: { x: number; y: number }) {
    return (dispatcher: any, getState: any) => {
      new RWaspModel(undefined, dispatcher, getState).addWasp(pos);
    };
  }
  // is a reducer
  incSpeed(value: number) {
    if (this._state) {
      this.speed = this.speed + value;
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: WaspModelEnums.WaspModel_incSpeed,
          payload: value
        });
      }
    }
  }

  public static incSpeed(value: number) {
    return (dispatcher: any, getState: any) => {
      new RWaspModel(undefined, dispatcher, getState).incSpeed(value);
    };
  }
  // is a reducer
  setColor(value: { waspId: number; colorValue: string }) {
    if (this._state) {
      if (this.wasps[value.waspId])
        this.wasps[value.waspId].color = value.colorValue;
    } else {
      if (this._dispatch) {
        this._dispatch({
          type: WaspModelEnums.WaspModel_setColor,
          payload: value
        });
      }
    }
  }

  public static setColor(value: { waspId: number; colorValue: string }) {
    return (dispatcher: any, getState: any) => {
      new RWaspModel(undefined, dispatcher, getState).setColor(value);
    };
  }
  // is a reducer
  step() {
    if (this._state) {
      const list: Wasp[] = Object.keys(this.wasps).map(i => this.wasps[i]);
      if (list.length === 0) {
        return;
      }
      const center = list.reduce(
        (prev, curr) => {
          return {
            x: prev.x + curr.x,
            y: prev.y + curr.y
          };
        },
        { x: 0, y: 0 }
      );
      center.x = center.x / list.length;
      center.y = center.y / list.length;
      for (let key of Object.keys(this.wasps)) {
        const wasp = this.wasps[key];
        const x = center.x - wasp.x;
        const y = center.y - wasp.y;
        const len = Math.sqrt(x * x + y * y);
        if (len > 20) {
          wasp.dx += x / len;
          wasp.dy += y / len;
        }
        wasp.steps = 0;
        wasp.x += wasp.dx;
        wasp.y += wasp.dy;
        if (wasp.x < 0 || wasp.x > 300) wasp.dx = wasp.dx * -1;
        if (wasp.y < 0 || wasp.y > 300) wasp.dy = wasp.dy * -1;
        wasp.steps++;
      }
    } else {
      if (this._dispatch) {
        this._dispatch({ type: WaspModelEnums.WaspModel_step });
      }
    }
  }

  public static step() {
    return (dispatcher: any, getState: any) => {
      new RWaspModel(undefined, dispatcher, getState).step();
    };
  }
}

export const WaspModelEnums = {
  WaspModel_speed: "WaspModel_speed",
  WaspModel_lastId: "WaspModel_lastId",
  WaspModel_wasps: "WaspModel_wasps",
  WaspModel_addWasp: "WaspModel_addWasp",
  WaspModel_incSpeed: "WaspModel_incSpeed",
  WaspModel_setColor: "WaspModel_setColor",
  WaspModel_step: "WaspModel_step"
};

export const WaspModelReducer = (
  state: IWaspModel = initWaspModel(),
  action: any
) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case WaspModelEnums.WaspModel_speed:
        new RWaspModel(draft).speed = action.payload;
        break;
      case WaspModelEnums.WaspModel_lastId:
        new RWaspModel(draft).lastId = action.payload;
        break;
      case WaspModelEnums.WaspModel_wasps:
        new RWaspModel(draft).wasps = action.payload;
        break;
      case WaspModelEnums.WaspModel_addWasp:
        new RWaspModel(draft).addWasp(action.payload);
        break;
      case WaspModelEnums.WaspModel_incSpeed:
        new RWaspModel(draft).incSpeed(action.payload);
        break;
      case WaspModelEnums.WaspModel_setColor:
        new RWaspModel(draft).setColor(action.payload);
        break;
      case WaspModelEnums.WaspModel_step:
        new RWaspModel(draft).step();
        break;
    }
  });
};
/***************************
 * React Context API test   *
 ***************************/
export const WaspModelContext = React.createContext<IProps>(
  initWithMethodsWaspModel()
);
export const WaspModelConsumer = WaspModelContext.Consumer;
let instanceCnt = 1;
export class WaspModelProvider extends React.Component {
  public state: IWaspModel = initWaspModel();
  public lastSetState: IWaspModel;
  private __devTools: any = null;
  constructor(props: any) {
    super(props);
    this.lastSetState = this.state;
    this.addWasp = this.addWasp.bind(this);
    this.incSpeed = this.incSpeed.bind(this);
    this.setColor = this.setColor.bind(this);
    this.step = this.step.bind(this);
    const devs = window["devToolsExtension"]
      ? window["devToolsExtension"]
      : null;
    if (devs) {
      this.__devTools = devs.connect({ name: "WaspModel" + instanceCnt++ });
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
  public setStateSync(state: IWaspModel) {
    this.lastSetState = state;
    this.setState(state);
  }
  addWasp(pos: { x: number; y: number }) {
    const nextState = immer.produce(this.state, draft =>
      new RWaspModel(draft).addWasp(pos)
    );
    if (this.__devTools) {
      this.__devTools.send("addWasp", nextState);
    }
    this.setStateSync(nextState);
  }
  incSpeed(value: number) {
    const nextState = immer.produce(this.state, draft =>
      new RWaspModel(draft).incSpeed(value)
    );
    if (this.__devTools) {
      this.__devTools.send("incSpeed", nextState);
    }
    this.setStateSync(nextState);
  }
  setColor(value: { waspId: number; colorValue: string }) {
    const nextState = immer.produce(this.state, draft =>
      new RWaspModel(draft).setColor(value)
    );
    if (this.__devTools) {
      this.__devTools.send("setColor", nextState);
    }
    this.setStateSync(nextState);
  }
  step() {
    const nextState = immer.produce(this.state, draft =>
      new RWaspModel(draft).step()
    );
    if (this.__devTools) {
      this.__devTools.send("step", nextState);
    }
    this.setStateSync(nextState);
  }
  public render() {
    return (
      <WaspModelContext.Provider
        value={{
          ...this.state,
          addWasp: this.addWasp,
          incSpeed: this.incSpeed,
          setColor: this.setColor,
          step: this.step
        }}
      >
        {" "}
        {this.props.children}
      </WaspModelContext.Provider>
    );
  }
}