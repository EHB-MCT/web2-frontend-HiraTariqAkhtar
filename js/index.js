"use strict"

let userSearch = document.getElementById("userSearch");
let content = document.getElementById("content");

const search = document.getElementById("search");
search.addEventListener("click", submitHandler);

function submitHandler(e) {
    e.preventDefault();
        let userInput = userSearch.value;
        //console.log(userInput); 
        fetchSearchDetails(userInput);
}

async function fetchSearchDetails (input){
    let response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=daf4ffe88f06bba73b59069934fc3b37&query=${input}`)
    return await response.json()
    .then (data => {
        //console.log(data)
        if (data.results){
            let userInput = data.results
            content.innerHTML = ""
            userInput.forEach(search => {
                if(search.media_type == "tv"){
                    let filterSerials = userInput.filter(drama => drama.origin_country == "PK")
                    for(let i = 0; i<= data.total_results ; i++){
                        let html = `<div id = "input.id" class = "drama">
                        <h2 class = "title"> ${filterSerials[i].name}</h2>
                        <a href ="details.html"> <img src="https://image.tmdb.org/t/p/w300${filterSerials[i].poster_path}" id = "details"></a>
                        </div>`
                        content.insertAdjacentHTML("beforeend", html);
                        userInput.value = "";
                } 
            }
                 if(search.media_type == "person"){
                   let filterActors = userInput.filter(actor => actor.known_for_department == "Acting" && actor.known_for[0].origin_country == "PK")
                   for(let i = 0; i<= data.total_results ; i++){
                       let html = `<div id = "input.id" class = "actor">
                       <h2 class = "title"> ${filterActors[i].name}</h2>
                       <a href ="details.html"> <img src="https://image.tmdb.org/t/p/w300${filterActors[i].profile_path}" id = "details"></a>
                       </div>`
                       content.insertAdjacentHTML("beforeend", html);
                       userInput.value = "";
                   }
                }
                }
            )
    }
})
}



async function fetchNewSerial (){
    let date = new Date();
    let year=date.getFullYear(); 

    let response = await fetch("http://api.themoviedb.org/3/discover/tv?api_key=daf4ffe88f06bba73b59069934fc3b37&with_original_language=ur&include_adult=false")
    return await response.json()
    .then (data => {
        //console.log(data);
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
