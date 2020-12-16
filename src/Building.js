import Elevator from "./Elevator.js";

export default class Building {
    constructor() {
        this.elevators = [];
    }

    setTheElevator(name, bottom, top) {
        const elevator = new Elevator(name, bottom, top);
        this.elevators.push(elevator);
    }
}
