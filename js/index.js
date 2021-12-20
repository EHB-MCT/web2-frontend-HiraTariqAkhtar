"use strict"

async function fetchNewSerial (){
    let date = new Date();
    let year=date.getFullYear(); 

    let response = await fetch(`http://api.themoviedb.org/3/discover/tv?api_key=daf4ffe88f06bba73b59069934fc3b37&with_original_language=ur&include_adult=false`)
    return await response.json()
    .then (data => {
        console.log(data);
        let results = data.results
        let filtered = results.filter(details => details.first_air_date > `${year}`)
        filtered.forEach(serial =>{
            let html = `<div class="drama" id="${serial.id}">
            <h2 class="title"> ${serial.name}</h2>
            <div class ="flex">
            <a href ="details.html"> <img src="https://image.tmdb.org/t/p/w200${serial.poster_path}" id = "details"></a>
            <div class="details"> 
            <p> <b>First episode :</b> ${serial.first_air_date} </p>
            <p> <b>Overview :</b> ${serial.overview} </p>
            </div>
            </div>
            </div>`
            
            let content = document.getElementById("new")
            content.insertAdjacentHTML("beforeend", html)

        })
})
}

fetchNewSerial()
