
let div = document.getElementById('container');
let countriesArray = [];

function getCountries(){                                  
    fetch('https://restcountries.eu/rest/v2/all') 
    .then(response =>{return response.json()})
    .then(countries =>{ 
        countriesArray = countries;
        createLayout(countriesArray);
    })
    /* .catch(err => {
       alert('Fetch Error :-S', err);
    });   */   
    
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
    
    
    //sort population descendant and ascendant
    if (window.location.search.substr(1) === "sort=asc"){
        countriesArray.sort((a, b) => b.population - a.population)
    } else if (window.location.search.substr(1) === "sort=desc"){
        countriesArray.sort((a, b) => a.population - b.population)
    }
    
    htmlElements += `<th>Country</th><th>Flags</th><th>Capital</th><th>Language</th><th>Currency</th><th>Population<br><a href="index.html?sort=asc"><img src="https://png.icons8.com/windows/20/000000/chevron-up.png"></a><a href="index.html?sort=desc"><img src="https://png.icons8.com/windows/20/000000/chevron-down.png"></a></th><th>World Population <img src="https://png.icons8.com/material/20/000000/percentage.png"></th><th>Borders</th>`;
    singleCountry.forEach(country => {
        htmlElements += `<tbody><tr>
        <td>${country.name}</td>
        <td  id="tableMap" ><img data-id="${country.latlng}" src = "${country.flag}" width="50" /></td>
        <td>${country.capital}</td>
        <td>${country.languages[0].name}</td>
        <td>${country.currencies[0].name}</td>
        <td>${country.population}</td>
        <td>${(country.population / worldPopulation * 100).toFixed(3)}%</td>
        <td>${country.borders}</td></tr></tbody>`;
        
    });
    
    
    htmlElements += `</div></table>`;
    div.innerHTML = htmlElements;
    
    const showingMap = document.querySelectorAll('#tableMap');
    showingMap.forEach(country => {
        country.addEventListener('click', (e) => {
            
            // const {target} = e; = const target = e.target
            const coordinates = e.target.getAttribute('data-id');
            //console.log(coordinates)
            const final = coordinates.split(",");
            initMap(Number(final[0]),Number(final[1]), 6);
            $('.bd-example-modal-lg').modal()
        })
    })
    
    
}




function initMap(lat, lng, zoom) {
    const coordinates = {
        lat:lat,
        lng:lng 
    }
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom:zoom, 
        center:coordinates
    })
    const marker = new google.maps.Marker({
        position:coordinates,
        map:map
    })
    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
          position: coordinates,
          pov: {
            heading: 34,
            pitch: 10
          }
        });
    map.setStreetView(panorama);
}




function searchCountry(){    
    let input= document.getElementById('searchCountry');
    input.addEventListener('keyup', (e) => {  // Search by country name on the fly
        //console.log(e.target)
        e.preventDefault();
        createLayout(countriesArray); 
        
        
    })
}



getCountries();
searchCountry();
//initMap(-27, 133, 5);

