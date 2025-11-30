/*
Case 4: Social Media — Trending Hashtags

In a system where users repeatedly post hashtags, you need to determine the top 3 trending hashtags every minute.

Input: A stream of hashtags
Output: Dynamically compute the top 3 most frequently occurring hashtags.
*/

class MinHeap {
    constructor() {
        this.heapArray = [];
    }

    push(element) {
        // element = { hashtag, frequency }

        this.heapArray.push(element);
        let childIndex = this.heapArray.length - 1;
        let parentIndex = Math.floor((childIndex - 1) / 2);

        // Compare using frequency
        while (
            childIndex > 0 &&
            this.heapArray[childIndex].frequency < this.heapArray[parentIndex].frequency
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

            // Compare using frequency
            if (
                left < this.heapArray.length &&
                this.heapArray[left].frequency < this.heapArray[smallest].frequency
            ) {
                smallest = left;
            }

            if (
                right < this.heapArray.length &&
                this.heapArray[right].frequency < this.heapArray[smallest].frequency
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

// Min heap to store tok-k frequent hashtags
let hashTagHeap = new MinHeap();

// To store hashtag as key and it's frequency as value
let hashTagMap = new Map();

const TOP_K_HASHTAGS_COUNT = 3;

const hashTagStream = [
    "food",
    "gym",
    "travel",
    "food",
    "coding",
    "music",
    "gym",
    "travel",
    "coding",
    "coding",
    "movies",
    "food",
    "nature",
    "coding",
    "study",
    "memes",
    "memes",
    "gaming",
    "gaming",
    "funny",
    "food",
    "tech",
    "news",
    "travel",
    "crypto",
    "gaming",
    "fitness",
    "fitness",
    "travel",
    "coding",
    "memes",
    "workout",
    "health",
    "art",
    "art",
    "music",
    "study",
    "gym",
    "travel",
    "coding"
];

function findHashTags() {

    // Make hashtag map
    for (const element of hashTagStream) {
        if (hashTagMap.has(element)) {
            hashTagMap.set(element, hashTagMap.get(element) + 1);
        }
        else {
            hashTagMap.set(element, 1);
        }
    }

    for (let [key, value] of hashTagMap) {
        if (hashTagHeap.size() < 3) {
            hashTagHeap.push({ hashtag: key, frequency: value });
            continue;
        }

        // For both less than and equal to
        if (value >= hashTagHeap.top().frequency) {
            hashTagHeap.pop();
            hashTagHeap.push({ hashtag: key, frequency: value });
        }
    }

    // prints in reverse order you can print it from top1-top3 by storing it into array and print that array from reverse
    while (!hashTagHeap.empty()) {
        console.log(`#${hashTagHeap.top().hashtag} trending with ${hashTagHeap.top().frequency} posts`);
        hashTagHeap.pop();
    }
}

findHashTags();
