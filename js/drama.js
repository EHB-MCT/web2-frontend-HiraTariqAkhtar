"use strict";


async function fetchSerial (){
    let response = await fetch("http://api.themoviedb.org/3/discover/tv?api_key=daf4ffe88f06bba73b59069934fc3b37&with_original_language=ur&sort_by=original_title.asc&include_adult=false")
    return await response.json()
    .then (data => {
        console.log(data);
        let details = data.results
        let filtered = details.filter(pic => pic.poster_path != null && pic.first_air_date != "" && pic.overview != "")
        filtered.forEach(serial =>{
            let html = `<div class="drama" id="${serial.id}">
            <h2 class="title"> ${serial.name}</h2>
            <p> <b>First episode :</b> ${serial.first_air_date} </p>
            <a href =""> <img src="https://image.tmdb.org/t/p/w200${serial.poster_path}"></a>
            </div>`
            let content = document.getElementById("serialData")
            content.insertAdjacentHTML("beforeend", html)
        })
})
}


async function fetchActor (){
    // Sajal Ali 
    let response = await fetch("https://api.themoviedb.org/3/person/1254942?api_key=daf4ffe88f06bba73b59069934fc3b37")
    return await response.json()
    .then (data => {
        console.log(data)
        let string = `<div class="actor" id="${data.id}">
        <h2 class="title"> ${data.name}</h2></div>`
        let content = document.getElementById("actorData")
        content.insertAdjacentHTML("beforeend", string)
        })
}
fetchSerial()
fetchActor()