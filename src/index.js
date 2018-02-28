
let div = document.getElementById('container');
let countriesArray = [];

function getCountries(){                                  
    fetch('https://restcountries.eu/rest/v2/all') 
    .then(response =>{return response.json()})
    .then(countries =>{ 
        countriesArray = countries;
        createLayout(countriesArray);
    })
    .catch(err => {
       alert('Fetch Error :-S', err);
    });     
    
}

function createLayout(countriesArray) {
    let htmlElements = `<div id="myTable"><table class="table table-inverse">`;
    let singleCountry = countriesArray;  // i set a new variable only for the single country i search, to calculate also the sigle percentage population of it. otherwise it gives 100.00% value for the percentage. 
    if (document.getElementById('searchCountry').value){
        //console.log("bfhrbbf")
        singleCountry = singleCountry.filter( i => i.name.toLowerCase().includes(document.getElementById('searchCountry').value.toLowerCase()))
    }
    let worldPopulation = 0;
    for(var i = 0; i < countriesArray.length; i++){
        worldPopulation += countriesArray[i].population
    };
    //console.log(countriesArray)
    
    //sort population descendent and ascendent
    if (window.location.search.substr(1) === "sort=asc"){
        countriesArray.sort((a, b) => b.population - a.population)
    } else if (window.location.search.substr(1) === "sort=desc"){
        countriesArray.sort((a, b) => a.population - b.population)
    }
    
    htmlElements += `<th>Country</th><th>Capital</th><th>Language</th><th>Currency</th><th>Population<br><a href="index.html?sort=asc"><img src="https://png.icons8.com/windows/20/000000/chevron-up.png"></a><a href="index.html?sort=desc"><img src="https://png.icons8.com/windows/20/000000/chevron-down.png"></a></th><th>World Population <img src="https://png.icons8.com/material/20/000000/percentage.png"></th><th>Borders</th>`;
    singleCountry.forEach(country => {
        htmlElements += `<tr><td><img src = "${country.flag}" width="50" />${country.name}</td>`;
        htmlElements += `<td>${country.capital}</td>`;
        htmlElements += `<td>${country.languages[0].name}</td>`;
        htmlElements += `<td>${country.currencies[0].name}</td>`;
        htmlElements += `<td>${country.population}</td>`;
        htmlElements += `<td>${(country.population / worldPopulation * 100).toFixed(3)}%</td>`;
        htmlElements += `<td>${country.borders}</td></tr>`;
        
        
    });
    
    
    htmlElements += `</div></table>`;
    div.innerHTML = htmlElements;
    
    
};


function searchCountry(){    
    let input= document.getElementById('searchCountry');
    input.addEventListener('keyup', (e) => {  // Search by country name on the fly
        //console.log(e.target)
        e.preventDefault();
        createLayout(countriesArray); 
        
        
    })
};



getCountries();
searchCountry();


