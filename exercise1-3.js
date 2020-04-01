"use strict";

const readline = require('readline-sync'); 

function printMenu(){
    console.log("\n1 - Insert a new task")
    console.log("2 - Remove a task by description")
    console.log("3 - Remove a task by deadline")
    console.log("4 - Show all tasks")
    console.log("5 - Close\n")
}

function addTask(tasks){
    const desc = readline.question("Insert task description: ")
    const urge = (readline.question("Is the task urgent? (Y/N): ", {defaultInput: 'n'}).toLowerCase().trim() === 'y')
    const visib = (readline.question("Is the task private? (Y/N): ", {defaultInput: 'y'}).toLowerCase().trim() === 'y')

    let date = readline.question('Task deadline (YYYY-MM-DD): ').trim();
    if(!date.includes(" ")) {
        date += " 23:59:59z";
    }
    const deadline = new Date(date);
    const task = {"description": desc, "urgent": urge ,"private": visib, "deadline": deadline};
    tasks.push(task);

    if(!Number.isNaN(deadline.getTime())) {
        const now = new Date();
        setTimeout(function(task) {
            tasks.splice(tasks.indexOf(task), 1);
        }, deadline.getTime() - now.getTime(), task);
    }
}

function removeByDescription(tasks){
    const remove = readline.question('Task to be removed (description): ');
    const toBeRemoved = [];
    for(const task of tasks) {
        if(task.description === remove){
            toBeRemoved.push(task);
        }
    }
    for(const removeTask of toBeRemoved){
        tasks.splice(tasks.indexOf(removeTask), 1);
    }
}

function removeByDeadline(tasks){
    let remove = readline.question('Remove the tasks of (YYYY-MM-DD): ');
    remove = new Date(remove);

    const toBeRemoved = [];
    for(const task of tasks){
        if(task.deadline.getFullYear() === remove.getFullYear() && task.deadline.getMonth() === remove.getMonth() && task.deadline.getDay() === remove.getDay()){
            toBeRemoved.push(task);
        }
    }
    for(const removeTask of toBeRemoved){
        tasks.splice(tasks.indexOf(removeTask), 1);
    }
}

function printTasks(tasks){
    tasks.sort((a,b) => a.description.localeCompare(b.description));
    console.log(tasks);
}


if (require.main === module) {
    const tasks = [];

    const menu = setInterval(()=> {
    printMenu();
    let input = readline.question('Please specify the desired action: ');

        switch(input.trim()) {
            case '1':
                addTask(tasks)
                break;

            case '2':
                removeByDescription(tasks)
                break;

            case '3':
                removeByDeadline(tasks)
                break;

            case '4':
                printTasks(tasks)
                break;

            default:
                clearInterval(menu)
        }
    }, 500);
}