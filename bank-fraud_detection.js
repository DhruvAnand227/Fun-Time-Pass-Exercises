/*
CASE 5: Banking System — Fraud Detection

A bank provides a transaction system:

transactions = [amounts in order]

 ==> If a user make a payment of 50000 or more under 60 seconds across multiple transactions → flag as suspicious.

Function design:

suspicious(transactionsWithTimestamps) → true/false
*/

// Code Begins

const prompt = require("prompt-sync")();

// Assumed user account structure
let userAccount = { Name: "Dhruv", lastTransactionTime: Date.now(), transactionLogs: [] };

function transactions(userAccount) {
    let receiver = prompt("Enter the receiver's name: ");
    let amount = Number(prompt("Enter the amount of money: "));

    while (true) {
        if (receiver === "" && amount === -1) {
            return;
        }

        userAccount.transactionLogs.push({ To: receiver, Amount: amount, Time: Date.now() });
        receiver = prompt("Enter the receiver's name: ");
        amount = Number(prompt("Enter the amount of money: "));

    }
}

function suspicious(transactionsWithTimestamps) {
    let i = 0, j = 0;
    let moneySpent = 0;
    while (j < transactionsWithTimestamps.length) {
        if (j < transactionsWithTimestamps.length && transactionsWithTimestamps[j].Time - transactionsWithTimestamps[i].Time >= 0 &&
            transactionsWithTimestamps[j].Time - transactionsWithTimestamps[i].Time <= 60000
        ) {
            moneySpent += transactionsWithTimestamps[j].Amount;

        }
        else {
            moneySpent -= transactionsWithTimestamps[i].Amount;
            i++;
        }
        
        if (moneySpent >= 50000) {
            console.log("Account Suspicious");
            return true;
        }
        j++;
    }
    console.log("Nothing suspicious found");
    return false;
}

transactions(userAccount);
suspicious(userAccount.transactionLogs);
