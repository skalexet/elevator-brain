/*
    this.innerCall(0); calling inside the elevator pressing the floor num 

    this.emergency();        stop the elevator at the nearest floor and
                                  open the doors

    this.pressHoldOpened       hold the doors opened
    this.releaseHoldOpened     let the doors to close
*/

import { callHandler } from "./func/callHandler.js";
import { clear } from "./func/clear.js";

export default class Elevator {
    constructor(name, bottom, top) {
        this.name = name;
        this.top = top;
        this.bottom = bottom;
        this.currentFloor = 0;
        this.doorsOpened = false;
        this.direction = null;
        this.queue = [];
        this.ordered = [];
        this.active = false;
        this.interval = null;
        this.holdOpened = false;
    }

    pushToTheQueue(floor) {
        if (this.direction == 1 && floor > this.currentFloor) {
            this.queue.push(floor);
            this.queue.sort((a, b) => (a < b) ? -1 : 1);
            this.defineDestination();
        } else if (this.direction == -1 && floor < this.currentFloor) {
            this.queue.push(floor);
            this.queue.sort((a, b) => (a > b) ? -1 : 1);
            this.defineDestination();
        } else {
            return;
        }
    }

    defineDestination() {
        this.destination = this.queue[0];
    }

    defineDirection(order) {
        if (this.currentFloor < order.floor) {
            this.direction = 1;
            this.pushToTheQueue(order.floor);
        } else if (this.currentFloor > order.floor) {
            this.direction = -1;
            this.pushToTheQueue(order.floor);
        } else {
            this.checkDirection(order);
        }
    }

    checkDirection(order) {
        if (order.dir == this.direction) {
            this.pushToTheQueue(order.floor);
        } else {
            this.ordered.push(order);
        }
    }

    queueManager(order) {
        if (!this.direction) {
            this.defineDirection(order);
        } else {
            this.checkDirection(order);
        }
    }

    call(floor, dir) {
        this.queueManager(callHandler(floor, dir));

        if (!this.active) {
            this.processing();
        } else {
            return;
        }
    }

    checkForBeyond(number) {
        if (number > this.top || number < this.bottom) {
            return true;
        } else {
            return false;
        }
    }

    innerCall(number) { 
        if (!this.checkForBeyond(number)) {
            this.pushToTheQueue(number); 
        } else {
            console.log('INNER ERR');
        }
    }

    activate() {
        if (!this.active) {
            this.active = true;
        } 
    }

    inactivate() {
        if (this.active) {
            this.active = false;
        } 
    }

    recall() {
        this.inactivate();
        this.direction = null;
        this.destination = null;
        for (const order of this.ordered) {
            this.ordered = this.ordered.filter(o => o != order);
            this.call(order.floor, order.dir);
        }
    }

    checking() {
        if(this.ordered.length == 0) {
            return;
        } else if (this.ordered.length > 0) {
            this.recall();
        }
    }

    processing() {
        if (this.queue.length > 0) {
            this.defineDestination();
            this.activate();
            this.goTo();
        } else {
            this.checking();
        } 
    }

    updateQueue() {
        this.queue = this.queue.filter(q => q != this.currentFloor);
    }

    emergency() {
        if (this.queue.length > 0) {
            console.log(`Emergency button!!! Floor ${this.currentFloor}`);
            clearInterval(this.interval);
            clear(this.ordered);

            this.queue = [this.currentFloor + this.direction];
            this.destination = this.queue[0];

            this.goTo();
        } else {
            console.log(`Emergency button!!! Floor ${this.currentFloor}`);
            this.openTheDoor();
        }
    }
 
    goTo() {
        if (!this.doorsOpened) {
            console.log(`Elevator ${this.name} goes to ${this.destination}`);

            this.interval = setInterval(() => {
                this.currentFloor = this.currentFloor + this.direction;
                console.log(this.currentFloor, this.name);

                if (this.currentFloor == this.destination) {
                    clearInterval(this.interval);
                     
                    this.updateQueue();
                    this.openTheDoor();  
                }
            }, 1000);
        } 
    }

    pressHoldOpened() {
        this.holdOpened = true;
        if (!this.doorsOpened) {
            this.openTheDoor();
        }
    }

    releaseHoldOpened() {
        this.holdOpened = false;
        if (this.doorsOpened) {
            this.closeTheDoor();
        }
    }

    openTheDoor() {
        setTimeout(() => {
            this.doorsOpened = true;
            console.log(`${this.currentFloor, this.name} Doors opened`);

            if (!this.holdOpened) {
                setTimeout(() => this.closeTheDoor(), 1500);
            }
             
        }, 1000);
    }

    closeTheDoor() {
        if (this.doorsOpened) {
            this.doorsOpened = false;
            console.log(`${this.currentFloor, this.name} Doors closed`);
            
            this.processing();
        }
    }

}
