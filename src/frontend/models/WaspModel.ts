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
