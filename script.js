import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import input from "./input.js";
/* const path = require("path")
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let users = [];

function readFile(){
    try {
        users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf8")); 
        console.log(users);
    }
    catch (error) {
        console.error("No users found");
    }   

    appController();
}


async function addNewUser(users){

    const name = await input("Enter your name: ");
    const id = users.length + 1;

    users.push({id, name});

    try{
        fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(users), "utf8");
    } catch (error) {
        console.error(error);
    } 

    appController()
}

async function appController(){
    console.info("1. Add new user 2. View all users");
    const option = await input("Option: ");

    switch(option){
        case "1":
            await addNewUser();
            break;
        case "2":
            readFile();
            break;
        default:
            console.error("Invalid option! Exiting...");
            break;
    }
}

appController();