/*
Food Delivery ETA Calculator

You are building an ETA calculator for Zomato/Swiggy.

Given:

Restaurant location
User location
Driver current location
Driver speed
Food preparation time

Calculate:

Exact ETA (in minutes) that the app will show to the customer.

The driver will first go to the restaurant, then to the customer.

Return:

totalETA
*/

// Driver speed is in km/hr and foodPrepTime is in minutes and all distance in meters
const testcase = {
    driverLoc: [20, 10], restaurantLoc: [80, 20], userLoc: [-600, 100], driverSpeed: 30,
    foodPrepTime: 10
}

function findETA(giveInfo) {
    let totalETA = 0;

    // convert driver speed to m/min
    const driverSpeed = (giveInfo.driverSpeed * (1000 / 60));

    // Distance between two points in graph is underRoot of ((x1-x2)^2 + (y1-y2)^2) 

    // Driver to Restaurant distance calculation
    const driverToRestaurantXCoordinate = Math.pow((giveInfo.driverLoc[0] - giveInfo.restaurantLoc[0]), 2);
    const driverToRestaurantYCoordinate = Math.pow((giveInfo.driverLoc[1] - giveInfo.restaurantLoc[1]), 2);
    const driverToRestaurantDist = Math.pow(driverToRestaurantXCoordinate + driverToRestaurantYCoordinate, 0.5);

    // Restaurant to Customer distance calculation
    const restaurantToUserXCoordinate = Math.pow((giveInfo.restaurantLoc[0] - giveInfo.userLoc[0]), 2);
    const restaurantToUserYCoordinate = Math.pow((giveInfo.restaurantLoc[1] - giveInfo.userLoc[1]), 2);
    const restaurantToUserDist = Math.pow(restaurantToUserXCoordinate + restaurantToUserYCoordinate, 0.5);

    // If distance greater than 10Km then order will not be taken by driver
    if (driverToRestaurantDist + restaurantToUserDist > 10000) {
        console.log("Can't take order due to heavy distance");
        return;
    }

    // Time to reach restaurant
    const timeToReachRestaurant = Math.floor(driverToRestaurantDist / driverSpeed);
    totalETA += timeToReachRestaurant;

    // Keep decrementing food prep time until driver reaching the restaurant
    giveInfo.foodPrepTime -= Math.min(giveInfo.foodPrepTime, timeToReachRestaurant);

    // If food is not prepared and driver reached then he will have to wait
    if (giveInfo.foodPrepTime > 0) {
        totalETA += giveInfo.foodPrepTime;
        giveInfo.foodPrepTime = 0;
    }

    // Time to reach customer
    const timeToReachUser = Math.floor(restaurantToUserDist / driverSpeed);

    totalETA += timeToReachUser;

    console.log(`Food arriving in ${totalETA} minutes`);

    // 1. Convert totalETA (minutes) to milliseconds
    const etaInMilliseconds = totalETA * 60 * 1000;

    // 2. Calculate the future time in milliseconds
    const futureTimeMs = Date.now() + etaInMilliseconds;

    // 3. Create a new Date object from the future timestamp
    const arrivalTime = new Date(futureTimeMs);

    console.log(`Arrival Time ${arrivalTime.toLocaleTimeString()}`);

    return totalETA;
}

findETA(testcase);
