/*
📦 Case 6: Inventory System — Product Expiry Tracking
In a pharmaceutical warehouse, products arrive in lots, and each lot contains:

{
  expiryDate,   // timestamp (the date on which the lot expires)
  quantity      // number of units available in this lot
}


When a purchase request arrives, the system must always fulfill the order by using stock from the earliest-expiring lot first (FIFO by expiry).
This ensures that older inventory gets consumed before newer inventory.

🎯 Task

Design a function:
removeStock(quantityRequested)

which:
-> Removes the required stock quantity from the warehouse.
-> Always consumes items from the lot with the closest expiry date first.
-> Uses multiple lots if needed.
-> Updates or deletes lots based on how much quantity is used.
-> Returns (or logs) which lots were used to fulfill the request.

Essentially, implement an expiry-based priority system using a Min-Heap / Priority Queue, where:

-> Priority = earliest expiry date
-> Root of heap = lot expiring soonest
*/

class MinHeap {
    constructor() {
        this.heapArray = [];
    }

    push(element) {
        // element = { expiryDate, quantity }

        this.heapArray.push(element);
        let childIndex = this.heapArray.length - 1;
        let parentIndex = Math.floor((childIndex - 1) / 2);

        // Compare using expiryDate
        while (
            childIndex > 0 &&
            this.heapArray[childIndex].expiryDate < this.heapArray[parentIndex].expiryDate
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

            // Compare using expiryDate
            if (
                left < this.heapArray.length &&
                this.heapArray[left].expiryDate < this.heapArray[smallest].expiryDate
            ) {
                smallest = left;
            }

            if (
                right < this.heapArray.length &&
                this.heapArray[right].expiryDate < this.heapArray[smallest].expiryDate
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

let stockHeap = new MinHeap();

async function sleep(time) {
    return await new Promise((res) => {
        setTimeout(() => {
            res();
        }, time);
    })
}

// Function which add stocks to heap with a time gap, so every stock have different expiry time
// Expiry Time in months like 14, 15.
async function addStock(expiryTime, lotAmount) {
    await sleep(500);
    const expiryInMS = (expiryTime * 30 * 24 * 60 * 60 * 1000) + Date.now();
    stockHeap.push({ expiryDate: expiryInMS, quantity: lotAmount });
    await sleep(200);
}

function removeStock(quantityRequested) {
    let quantityRequired = quantityRequested;

    while (quantityRequired > 0) {
        if (stockHeap.empty()) {
            console.log("Out of stock!");
            break;
        }

        const diff = quantityRequired - stockHeap.top().quantity;

        if (diff >= 0) {
            // quantity is more than lot size
            quantityRequired -= stockHeap.top().quantity;
            stockHeap.pop();
        }
        else {
            stockHeap.top().quantity -= quantityRequired;
            quantityRequired = 0;
        }
    }
}

await Promise.all([
    addStock(8, 100),
    addStock(2, 50),
    addStock(4, 800),
    addStock(10, 200)
]);

removeStock(1140);
console.log(stockHeap.top().quantity);
