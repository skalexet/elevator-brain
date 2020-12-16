/* 
    Manual for engineers.

    Interface.

    In the general folder is the main.js file that contains the building  
    variable that defines the model of current building. 
    Open this file and take a look at the commented lines bellow.
    There is provided the controller statement that allows users to call the
    elevator. Elevator calling takes two parameters floor and dir. First of it
    is the current floor on which the call button has been pushed, second is the 
    direction. Direction defined by two values: 1 is up, -1 is down.

    So, for binding the call button out of the elevator use the methods:
    
    controller.call(floor, dir);

    or

    controller.call(floor, dir);

    Each elevator has own controll pannel on each floor. As the elevator's brain 
    recognized call from current floor its goes there immediately or puts the call 
    to the queue of calls.

    For instance: passenger had a lunch at the floor number 10 and decided to go 
    down to the floor number 0. Then he pushes the button on the elevator contoll
    panel marked like arrow down. Then the elevator controller system catches this 
    request defines the relative elevator and must call the method:
    
    el.call(floor, dir); // ...where el = elevator

    Inside the elevator must be the inner controll pannel with set of buttons
    such as numbers of floors that we can bind to innerCall() method of the current
    elevator. This calling must look like for example if the passenger already
    inside the elevator A and clicks the button marked as 4:
    
    this.innerCall(4); // method is defined in Elevator constructor (Elevator.js)

    Also the inner pannel must have the EMERGENCY button and HOLD OPENED button.

    EMERGENCY button supposed to be binded to the inner controll panel also. 
    For example the passenger inside the elevator B suddenly impressed
    by idea to go out right on the next floor. Then its passenger is able
    to smash the emergency button to get out in that floor and it's doing:
        
    this.emergency(); // method is defined in Elevator constructor (Elevator.js)

    HOLD OPENED button brings the elevator's doorsOpend statement to true and open
    it if closed. This statement is not gonna be changed untill the user will 
    release this button, otherwise after it released, doors is gonna be closed.
    
    Passenger presses the HOLD OPENED:
    this.pressHoldOpened(); // method is defined in Elevator.js module

    Passenger releases the HOLD OPENED:
    this.releaseHoldOpened(); // method is defined in the Elevator.js module
*/

import Building from "./src/Building.js"; 
import Controller from "./src/Controller.js";
import { testTheElevator } from "./test/passGenerator.js";

const building = new Building();

building.setTheElevator("A", -1, 9);
building.setTheElevator("B", 0, 10);

const controller = new Controller(building);

testTheElevator(100, building, controller);

/* 
    controller.call(3, -1);  calling outside the elevator, pressing the "down"
    controller.call(0, 1);  calling outside the elevator, pressing the "up"

    check the Elevator.js for more...
*/
