/*
An online auction system where multiple users place bids.

Each bid:

{userId, amount, timestamp}

Rules:

Always print the current highest bid

If the same amount occurs → the earlier timestamp wins

If the same user places multiple bids → only the latest bid is considered
*/

const prompt = require('prompt-sync')();

class MaxHeap {
    constructor() {
        this.heapArray = [];
    }

    push(element) {
        // element = { id, amount, timeStamp }

        this.heapArray.push(element);
        let childIndex = this.heapArray.length - 1;
        let parentIndex = Math.floor((childIndex - 1) / 2);

        // Compare using amount
        while (
            childIndex > 0 &&
            this.heapArray[childIndex].amount > this.heapArray[parentIndex].amount
        ) {
            [this.heapArray[childIndex], this.heapArray[parentIndex]] =
                [this.heapArray[parentIndex], this.heapArray[childIndex]];

            childIndex = parentIndex;
            parentIndex = Math.floor((childIndex - 1) / 2);
        }
    }

    pop() {
        if (this.empty()) {
            console.log("Heap is empty!");
            return null;
        }

        const topElement = this.heapArray[0];
        const lastIndex = this.heapArray.length - 1;

        // Replace root with last element
        this.heapArray[0] = this.heapArray[lastIndex];
        this.heapArray.pop();

        let i = 0;

        while (true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            // Compare using amount
            if (
                left < this.heapArray.length &&
                this.heapArray[left].amount > this.heapArray[smallest].amount
            ) {
                smallest = left;
            }

            if (
                right < this.heapArray.length &&
                this.heapArray[right].amount > this.heapArray[smallest].amount
            ) {
                smallest = right;
            }

            if (smallest === i) break;

            [this.heapArray[i], this.heapArray[smallest]] =
                [this.heapArray[smallest], this.heapArray[i]];

            i = smallest;
        }

        return topElement;
    }

    top() {
        if (this.empty()) return null;
        return this.heapArray[0];
    }

    empty() {
        return this.heapArray.length === 0;
    }

    size() {
        return this.heapArray.length;
    }
}

let prevMaxHeap = new MaxHeap();
const userMap = new Map();

function addBid() {
    console.log("===== WELCOME TO THE AUCTION =====\n\n")

    let userID = prompt("Enter user id: ");
    let bidAmount = Number(prompt("Enter the bid amount: "));

    while (true) {
        if (userID === "" && bidAmount === -1) {
            if (!prevMaxHeap.empty()) {
                const top = prevMaxHeap.top();
                console.log(`Auction is won by ${top.id} with a bid amount of ${top.amount}`);
            }
            break;
        }
        // always set latest user bid
        userMap.set(userID, { amount: bidAmount, timeStamp: Date.now() });

        // pop until top.id is userID to store latest user bid
        while (!prevMaxHeap.empty() && prevMaxHeap.top().id === userID) {
            prevMaxHeap.pop();
        }

        prevMaxHeap.push({ id: userID, amount: bidAmount, timeStamp: userMap.get(userID).timeStamp });
        getCurrentBidWinner(prevMaxHeap, userMap);

        userID = prompt("Enter user id: ");
        bidAmount = Number(prompt("Enter the bid amount: "));

    }
}

function getCurrentBidWinner(prevMaxHeap, userMap) {
    while (!prevMaxHeap.empty()) {
        const top = prevMaxHeap.top();
        const latest = userMap.get(top.id);

        // If this heap entry is stale (user has a newer bid or user removed), drop it
        if (!latest || top.amount !== latest.amount) {
            prevMaxHeap.pop();
            continue;
        }

        // top is valid latest bid for that user — print and return
        console.log(`Maximum bid amount till now is ${top.amount} by user id ${top.id}`);
        return;
    }

    console.log("No entry in auction till now");
}


addBid();
