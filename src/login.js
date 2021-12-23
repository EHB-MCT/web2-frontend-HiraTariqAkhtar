"use strict"

saveData()

function saveData(){
    //get values
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    // save in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
}
