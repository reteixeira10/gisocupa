var mymap = L.map('mapid').setView([-15.796, -47.888], 12);

// L.esri.basemapLayer('Streets').addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jla3RvIiwiYSI6ImNqNTVucjU1dzBkZjMyeHQ2OTYzcmY2bHgifQ.8QZMKxtCMwU-fTFwnIiYAA', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.dark',
  accessToken: 'pk.eyJ1Ijoia3Jla3RvIiwiYSI6ImNqNTVucjU1dzBkZjMyeHQ2OTYzcmY2bHgifQ.8QZMKxtCMwU-fTFwnIiYAA'
}).addTo(mymap);

// L.esri.featureLayer({
//   url: 'http://mapasinterativos.ibge.gov.br/arcgis/rest/services/BIOMA/MapServer/0'
// }).addTo(mymap);

// Aqui vão algumas coisas importantes :
// A layer do tipo dinânimo carrega com a tematização , ja mapserver normal não carrega a tematização 
// Quando tem um grupo de layers não esta carregando, ainda não sei porque.

L.esri.dynamicMapLayer({
  url: 'https://www.geoservicos2.segeth.df.gov.br/arcgis/rest/services/Hidrografia/HIDROGRAFIA/MapServer',
  opacity : 0.9,
  layers: [1,2,3],//Carrega uma layer específica em um group layers 
  useCors: false
}).addTo(mymap);