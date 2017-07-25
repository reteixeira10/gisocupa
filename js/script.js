var mylayer = L.layerGroup();

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3Jla3RvIiwiYSI6ImNqNTVucjU1dzBkZjMyeHQ2OTYzcmY2bHgifQ.8QZMKxtCMwU-fTFwnIiYAA';

var dark   = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

var mymap = L.map('mapid', {
  center: [-15.796, -47.888],
  zoom: 12,
  zoomControl: false, //Não inclui o zoom default do leaflet
  layers: [streets, mylayer]
});

var measureControl = L.control.measure({
  position: 'topright',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: undefined
});
measureControl.addTo(mymap);

//Add leaflet.zoomhome plugin ao projeto
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(mymap);

//Add scale ao mapa
L.control.scale({imperial: false}).addTo(mymap);

// Aqui vão algumas coisas importantes :
// A layer do tipo dinânimo carrega com a tematização , ja mapserver normal não carrega a tematização
// Quando tem um grupo de layers não esta carregando, ainda não sei porque.

var mylayer = 'https://www.geoservicos2.segeth.df.gov.br/arcgis/rest/services/Hidrografia/HIDROGRAFIA/MapServer';

var hidro1 = L.esri.dynamicMapLayer({
  url: mylayer,
  layers: [1],//Carrega uma layer específica em um group layers
  useCors: false
});

var hidro2 = L.esri.dynamicMapLayer({
  url: mylayer,
  layers: [2],//Carrega uma layer específica em um group layers
  useCors: false
});

var hidro3 = L.esri.dynamicMapLayer({
  url: mylayer,
  layers: [3],//Carrega uma layer específica em um group layers
  useCors: false
});

//Exemplo de popup limples só para a camada de lagos
hidro3.bindPopup(function (error, featureCollection) {
    if(error || featureCollection.features.length === 0) {
      return false;
    } else {
      return 'Nome do lago: ' + featureCollection.features[0].properties.nome;
    }
  });

var baseLayers = {
  "Dark Gray": dark,
  "Streets": streets
};

var overlays = {
  "Rios Pincipais": hidro1,
  "Rios Secundários": hidro2,
  "Lagos e Lagoas": hidro3
};

// http://leafletjs.com/reference-1.0.3.html#control-layers
L.control.layers(baseLayers,overlays).addTo(mymap);
