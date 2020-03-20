"use strict";

const readlineSync = require('readline-sync');
let allTasks = [];
let running = true;

function task (desc, prior, visib, deadl){
    this.description = desc;
    this.priority = prior;
    this.visibility = visib;
    this.deadline = deadl.toDateString();

    return this;
}

const insertTask = () => {
    let desc  = readlineSync.question(`Insert the description of the new task: `)
    let prior = readlineSync.question(`Specify priority (urgent/not urgent(default)): `)
    if(prior != "urgent")
        prior = "not urgent"
    let visib = readlineSync.question(`Specify visibility(shared/private(default)): `)
    if(visib != "shared")
        visib = "private"
    let deadl = readlineSync.question(`Specify deadline as YYYY/MM/DD (optional): `)

    if(desc){
        let date = new Date(deadl)
        let newtask = new task(desc, prior, visib, date)
        allTasks.push(newtask)
    }
    else
        console.log("Please insert a valid description\n")
}

const removeTask = () => {
    let desc = readlineSync.question(`Specify exact description of the task to remove: `)
    let found = false;
    for(let i = allTasks.length-1 ; i >= 0; i--)
        if(allTasks[i].description == desc){
            allTasks.splice(i, 1)
            found = true;
        }
    if(!found)
        console.log("Task not currently present: either insert a new one or check for mistakes\n")
}

const removeTaskByDeadline = () => {
    let deadline = readlineSync.question(`Specify deadline: `)
    let found = false
    let date = new Date(deadline)
    for(let i = allTasks.length-1 ; i >= 0; i--)
        if(allTasks[i].deadline == date.toDateString()){
            allTasks.splice(i, 1)
            found = true
        }
    
    if(!found)
        console.log("Task not currently present: either insert a new one or check for mistakes\n")
}

const listTasks = () => {
    if(allTasks.length){
        allTasks.sort(function(a,b) {
            let stringA = a.description.toUpperCase()
            let stringB = b.description.toUpperCase()
            return (stringA < stringB) ? -1 : (stringA > stringB) ? 1 : 0;
        })
        for(let [i, t] of allTasks.entries()){
            console.log(`Task ${i+1} - ${t.description}; ${t.priority}; ${t.visibility}; deadline: ${t.deadline}`)
        }
    }
    else
        console.log("No tasks currently present\n")
}



while(running){
    let input = readlineSync.question(`Please select one of the following actions: \n
    1 - Insert a new task
    2 - Remove an existing task
    3 - List all current tasks
    4 - Remove all tasks with a certain deadline
    5 - Close the program\n\n`)

    switch(parseInt(input)){
        case 1: {
            insertTask();
            break;
        }
        case 2: {
            removeTask();
            break;
        }
        case 3: {
            listTasks();
            break;
        }
        case 4: {
            removeTaskByDeadline();
            break;
        }
        case 5: {
            console.log("Quitting program\n")
            running = false
            break;
        }
        default:{
            console.log("Please insert a valid input\n")
            break;
        }
    }
}
