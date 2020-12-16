export function testTheElevator(times, building, controller) {
    let counter = 0;
    const interval = setInterval(() => {
        const floor = Math.floor(Math.random() * 11);
        const dir = getDir();
        controller.call(floor, dir) 
        counter++;

        if ( counter == 99 ) {
            clearInterval(interval);
        }

    }, 2200); 

}

function getDir() {
    const index = Math.random() * 2;
    if (index > 1) {
        return 1;
    } else {
        return -1;
    }
}