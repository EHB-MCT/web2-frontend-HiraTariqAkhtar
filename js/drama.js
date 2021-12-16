"use strict";


function loopSerial(){
for(let i = 1; i<= 13; i++){
    fetchSerial(i)
}
};

async function fetchSerial (page){
    let response = await fetch(`http://api.themoviedb.org/3/discover/tv?api_key=daf4ffe88f06bba73b59069934fc3b37&with_original_language=ur&sort_by=original_title.asc&include_adult=false&page=${page}`)
    return await response.json()
    .then (data => {
        //console.log(data);
        let results = data.results
        let filtered = results.filter(details => details.poster_path != null && details.first_air_date != "" && details.overview != "")
        filtered.forEach(serial =>{
            let html = `<div class="drama" id="${serial.id}">
            <h2 class="title"> ${serial.name}</h2>
            <p> <b>First episode :</b> ${serial.first_air_date} </p>
            <a href ="details.html"> <img src="https://image.tmdb.org/t/p/w200${serial.poster_path}"></a>
            </div>`
            
            let content = document.getElementById("serialData")
            content.insertAdjacentHTML("beforeend", html)
        })
})
}


async function fetchActor (){
    // Iqra Aziz
    let response = await fetch("https://api.themoviedb.org/3/person/2058151?api_key=daf4ffe88f06bba73b59069934fc3b37")
    return await response.json()
    .then (data => {
       // console.log(data)
        let string = `<div class="actor" id="${data.id}">
        <h1 class="title"> ${data.name}</h1>
        <div class ="flex">
        <img src="https://image.tmdb.org/t/p/w300${data.profile_path}">
       <div class="details"> 
       <h4> Date of Birth: </h4>
        <p> ${data.birthday} </p> 
        <h4> Place of Birth: </h4>
        <p>${data.place_of_birth} </p> 
        <h4> Biography: </h4>
        <p> ${data.biography} </p>
        </div>
        </div>
        </div>`
        let content = document.getElementById("actorData")
        content.insertAdjacentHTML("beforeend", string)
        })
}




loopSerial()
fetchActor()
