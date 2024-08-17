#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.green(`\n $${amount} withdraw successfully!)`));
            console.log(`\nRemaining balance is: ${this.balance}\n`);
        }
        else {
            console.log(chalk.red("\n You have insufficient Balance."));
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(chalk.green(`\n $${amount} has been deposited successfully!`));
        console.log(`\n Remaining balance is: $${this.balance}\n`);
    }
    checkBalance() {
        console.log(`\nCurrent balance is: $${this.balance}\n`);
    }
}
const accounts = [
    new BankAccount(1000, 100),
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000)
];
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(fName, lname, gender, age, mNumber, acc) {
        this.firstName = fName;
        this.lastName = lname;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mNumber;
        this.account = acc;
    }
}
const customers = [
    new Customer("Faraz", "But", "male", 26, 3096459871, accounts[0]),
    new Customer("Anabia", "Khan", "female", 36, 3096464871, accounts[1]),
    new Customer("Daniyal", "Aneeq", "male", 19, 3096464824, accounts[2])
];
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number: "
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.italic(`\n Welcome, ${customer.firstName} ${customer.lastName}!\n`));
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Please select, what you want to do: ",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit: "
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw: "
                        }
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting the program....");
                    console.log(chalk.italic.black("\n \tThank you for using our bank services."));
                    return;
            }
        }
        else {
            console.log(chalk.red("\n Warning! Please enter a valid account number."));
        }
    } while (true);
}
service();
