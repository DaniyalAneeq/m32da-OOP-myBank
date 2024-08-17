#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

interface BankAccount{
    accountNumber: number;
    balance: number;

    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(chalk.green(`\n $${amount} withdraw successfully!)`));
            console.log(`\nRemaining balance is: ${this.balance}\n`);
        }else{
            console.log(chalk.red("\n You have insufficient Balance."));
            
        }
    }
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1;
        } this.balance += amount;
        console.log(chalk.green(`\n $${amount} has been deposited successfully!`));
        console.log(`\n Remaining balance is: $${this.balance}\n`);
    }
    checkBalance(): void {
        console.log(`\nCurrent balance is: $${this.balance}\n`);
    }
}

const accounts: BankAccount[] = [
    new BankAccount(1000, 100),
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000)
];

class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(fName:string, lname: string, gender: string, age: number, mNumber: number, acc: BankAccount){
        this.firstName = fName;
        this.lastName = lname;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mNumber;
        this.account = acc;
    }
}

const customers: Customer[] = [
    new Customer("Faraz", "But", "male", 26, 3096459871, accounts[0]),
    new Customer("Anabia", "Khan", "female", 36, 3096464871, accounts[1]),
    new Customer("Daniyal", "Aneeq", "male", 19, 3096464824, accounts[2])
]

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number: "
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if(customer){
            console.log(chalk.italic(`\n Welcome, ${customer.firstName} ${customer.lastName}!\n`));
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Please select, what you want to do: ",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }
            ]);
            switch(ans.select){
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
        }else{
            console.log(chalk.red("\n Warning! Please enter a valid account number."));   
        }
    }while(true)
}
service()