export type TaskState = "UNDEFINED" | "RUNNING" | "LOADED" | "ERROR";

export interface fetchResult {
  data: any;
  state: TaskState;
  stateError: any;
}

export type LoadableType = { [key: string]: fetchResult };

export interface loadable {
  initState(name: string);
  setLoadState(opts: { name: string; state: TaskState });
  setData(opts: { name: string; data: any });
  setError(opts: { name: string; err: any });
  loadables: LoadableType;
}

export class loadables {
  loadables: LoadableType = {
    items: {
      data: null,
      state: "UNDEFINED",
      stateError: null
    }
  };

  initState(name: string) {
    if (!this.loadables[name]) {
      this.loadables[name] = {
        data: null,
        state: "UNDEFINED",
        stateError: null
      };
    }
  }

  setLoadState(opts: { name: string; state: TaskState }) {
    if (!this.loadables[opts.name]) {
      this.loadables[opts.name] = {
        data: null,
        state: "UNDEFINED",
        stateError: null
      };
    }
    this.loadables[opts.name].state = opts.state;
  }
  setData(opts: { name: string; data: any }) {
    this.loadables[opts.name].data = opts.data;
  }
  setError(opts: { name: string; err: any }) {
    this.loadables[opts.name].stateError = opts.err;
  }

  protected async loadItems<T extends loadable>(
    state: T,
    key: string,
    loader: () => Promise<any>,
    ready?: (data: any) => void
  ) {
    state.initState(key);
    const obj = state.loadables[key];
    if (obj.state === "RUNNING") return;
    try {
      state.setLoadState({ name: key, state: "RUNNING" });
      const data = await loader();
      // state.setData({ name: key, data });
      ready(data);
      state.setLoadState({ name: key, state: "LOADED" });
    } catch (e) {
      state.setLoadState({ name: key, state: "ERROR" });
      state.setError({ name: key, err: e });
    }
  }
}
