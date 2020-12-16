export default class Controller {
    constructor(building) {
        this.building = building;
    }

    call(a, b) {
        for (const el of this.building.elevators) {
            if (a == el.top && b == 1 ||
                a == el.bottom && b == -1 ||
                a > el.top || a < el.bottom) {
                    continue;
            } else {
                el.call(a, b);
                return;
            }
        }
    }
}