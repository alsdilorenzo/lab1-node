"use strict";

const readlineSync = require('readline-sync');

function task (desc, prior, visib, deadl){
    this.description = desc;
    this.priority = prior;
    this.visibility = visib;
    this.deadline = deadl.toDateString();

    return this;
}

let allTasks = [];
let running = true;

const removeTask = (desc) => {
    let found = false;
    for(let [i, t] of allTasks.entries())
        if(t.description == desc){
            allTasks.splice(i, 1)
            found = true;
        }
    if(!found)
        console.log("Task not currently present: either insert a new one or check for mistakes\n")
}

while(running){
    let input = readlineSync.question(`Please select one of the following actions: \n
    1 - Insert a new task\n
    2 - Remove an existing task\n
    3 - List all current tasks\n
    4 - Close the program\n\n`)

    switch(parseInt(input)){
        case 1: {
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
            break;
        }
        case 2: {
            let desc = readlineSync.question(`Specify exact description of the task to remove: `)
            removeTask(desc)
            break;
        }
        case 3: {
            if(allTasks.length){
                allTasks.sort(function(a,b) {
                    let stringA = a.description.toUpperCase()
                    let stringB = b.description.toUpperCase()
                    return (stringA < stringB) ? -1 : (stringA > stringB) ? 1 : 0;
                })
                for(let [i, t] of allTasks.entries())
                    Object.keys(t).forEach((prop) => console.log(`Task ${i+1} - ${prop}: ${t[prop]}`))
            }
            else
                console.log("No tasks currently present\n")
            break;
        }
        case 4: {
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
