"use strict";

let wordList = ["Spring", "Winter", "Autumn", "Summer", "Hi", "Test"];
console.log(wordList)


for(let [i, s] of wordList.entries()){
    if(s.length <= 3)
        wordList[i] = "";
    else
        wordList[i] = s.slice(0, 2) + s.slice(s.length-2, s.length);
}

console.log(wordList)