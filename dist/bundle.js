!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){let n=document.getElementById("container"),o=[];function r(t){let e='<div id="myTable"><table class="table table-inverse">',o=t;document.getElementById("searchCountry").value&&(o=o.filter(t=>t.name.toLowerCase().includes(document.getElementById("searchCountry").value.toLowerCase())));let r=0;for(var a=0;a<t.length;a++)r+=t[a].population;console.log(t),"sort=asc"===window.location.search.substr(1)?t.sort((t,e)=>e.population-t.population):"sort=desc"===window.location.search.substr(1)&&t.sort((t,e)=>t.population-e.population),e+='<th>Country</th><th>Flags</th><th>Capital</th><th>Language</th><th>Currency</th><th>Population<br><a href="index.html?sort=asc"><img src="https://png.icons8.com/windows/20/000000/chevron-up.png"></a><a href="index.html?sort=desc"><img src="https://png.icons8.com/windows/20/000000/chevron-down.png"></a></th><th>World Population <img src="https://png.icons8.com/material/20/000000/percentage.png"></th><th>Borders</th>',o.forEach(t=>{e+=`<tbody><tr id="tableMap">\n        <td>${t.name}</td>\n        <td data-id="${t.latlng}"><img src = "${t.flag}" width="50" /></td>\n        <td>${t.capital}</td>\n        <td>${t.languages[0].name}</td>\n        <td>${t.currencies[0].name}</td>\n        <td>${t.population}</td>\n        <td>${(t.population/r*100).toFixed(3)}%</td>\n        <td>${t.borders}</td></tr></tbody>`}),e+="</div></table>",n.innerHTML=e}window.onload=function(){document.getElementById("tableMap").addEventListener("click",t=>{console.log(t);const e=t.target.getAttribute("data-id").split(",");!function(t,e,n){const o={lat:t,lng:e},r=new google.maps.Map(document.getElementById("map"),{zoom:n,center:o});new google.maps.Marker({position:o,map:r})}(Number(e[0]),Number(e[1]),12)})},fetch("https://restcountries.eu/rest/v2/all").then(t=>t.json()).then(t=>{r(o=t)}),document.getElementById("searchCountry").addEventListener("keyup",t=>{t.preventDefault(),r(o)})}]);