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
            <a href ="details.html"> <img src="https://image.tmdb.org/t/p/w200${serial.poster_path}" id = "details"></a>
            </div>`
            
            let content = document.getElementById("serialData")
            content.insertAdjacentHTML("beforeend", html)

        })
})
}


async function fetchActor (id){
    // for actress Iqra Aziz
    let response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=daf4ffe88f06bba73b59069934fc3b37`)
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
        let title =`<h2 class = "title"> Filmography: </h2>`
        content.insertAdjacentHTML("beforeend", title)
        fetchFilmography(data.id)
        })
}

async function fetchFilmography(id){
    let res = await fetch(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=daf4ffe88f06bba73b59069934fc3b37`)
    return await res.json()
    .then (data => {
        //console.log(data);
        let filmography = data.cast
        console.log(filmography);
        let filtered = filmography.filter(drama => drama.poster_path != null && drama.first_air_date != "" && drama.character != "")
        filtered.forEach(drama => {
            let info = `
            <div class="drama" id="${drama.id}">
            <h3 class="title"> ${drama.name}</h3>
            <p> <b>First episode :</b> ${drama.first_air_date} </p>
            <p> <b>Number of episodes :</b> ${drama.episode_count} </p>
            <p> <b>Character name :</b> ${drama.character} </p>
            <a href ="details.html" > <img src="https://image.tmdb.org/t/p/w200${drama.poster_path}" ></a>  
            </div>`

            let content = document.getElementById("allDramas")
            content.insertAdjacentHTML("beforeend", info)
        })
        
    })
}


async function fetchDramaDetails(id){
    // for drama Suno Chanda
    let res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=daf4ffe88f06bba73b59069934fc3b37`)
    return await res.json()
    .then (data => {
        //console.log(data);
        let details = `<div class="drama" id="${data.id}">
        <h1 class="title"> ${data.name}</h1>
        <div class ="flex">
        <img src="https://image.tmdb.org/t/p/w300${data.poster_path}">
       <div class="details"> 
       <p> <b>First episode :</b> ${data.first_air_date} </p>
       <p> <b>Last episode :</b> ${data.last_air_date} </p>
       <p> <b>Status :</b> ${data.status}</p>
       <p> <b>Production company :</b> ${data.production_companies[0].name} </p>
       <p> <b>Network :</b> <a href ="${data.homepage}" target = "_blank">${data.networks[0].name}</a> </p>
       <p> <b>Number of episodes :</b> ${data.number_of_episodes}</p>
       <p> <b>About :</b> ${data.overview} </p>
        </div>
        </div>
        </div>`
        let content = document.getElementById("detailData")
        content.insertAdjacentHTML("beforeend", details)
        let title =`<h2 class = "title"> Cast: </h2>`
        content.insertAdjacentHTML("beforeend", title)
        fetchCast(data.id)
    })
}

async function fetchCast(id){
    let res = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=daf4ffe88f06bba73b59069934fc3b37`)
    return await res.json()
    .then (data => {
        //console.log(data);
        let cast = data.cast
        //console.log(cast);
        cast.forEach(actor => {
            let info = `
            <div class="actor" id="${actor.id}">
            <h3 class="title"> ${actor.name}</32>
            <p> <b>Character name :</b> ${actor.character} </p>
            <a href ="details.html" > <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" ></a>  
            </div>`
            let content = document.getElementById("cast")
            content.insertAdjacentHTML("beforeend", info)
        })
    })
}



loopSerial()
fetchActor(2058151)
fetchDramaDetails(80018)
