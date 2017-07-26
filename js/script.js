var serv_hidro = L.layerGroup();
var serv_lote_ocupa = L.layerGroup();

//Define os atributos do mapa e insere o meu token do mopbox
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3Jla3RvIiwiYSI6ImNqNTVucjU1dzBkZjMyeHQ2OTYzcmY2bHgifQ.8QZMKxtCMwU-fTFwnIiYAA';

//Define os mapas do mapbox e difine as respectivas variáveis de acesso.
var dark   = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});
    satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite',   attribution: mbAttr});
    outdoors = L.tileLayer(mbUrl, {id: 'mapbox.outdoors',   attribution: mbAttr});

//Cria o mapa
var mymap = L.map('mapid', {
    center: [-15.773, -47.759],
    zoom: 11,
    zoomControl: false, //Não inclui o zoom default do leaflet
    layers: [streets]
});


//Cria o miniMap no canppo inferior direito - obs. foi definido um novo mapa aqui: osm
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data &copy; OpenStreetMap contributors';
//Plugin magic goes here! Note that you cannot use the same layer object again, as that will confuse the two map controls
var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 18, attribution: osmAttrib });
var miniMap = new L.Control.MiniMap(osm, { toggleDisplay: true }).addTo(mymap);

//Add measure plugin ao projeto
var measureControl = L.control.measure({
  position: 'topright',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: undefined,
  activeColor: '#c0067b',
  completedColor: '#ff92b5'
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

var serv_hidro = 'https://www.geoservicos2.segeth.df.gov.br/arcgis/rest/services/Hidrografia/HIDROGRAFIA/MapServer';

//Atribui a primeira layer do grupo a variável rioprin
var rioprin = L.esri.dynamicMapLayer({
  url: serv_hidro,
  layers: [1],//Carrega uma layer específica em um group layers
  useCors: false
});

//Atribui a segunda layer do grupo a variável riosec
var riosec = L.esri.dynamicMapLayer({
  url: serv_hidro,
  layers: [2],//Carrega uma layer específica em um group layers
  useCors: false
});

//Atribui a terceira layer do grupo a variável lagos
var lagos = L.esri.dynamicMapLayer({
  url: serv_hidro,
  layers: [3],//Carrega uma layer específica em um group layers
  useCors: false
});

var serv_lote_ocupa = 'https://www.geoservicos2.segeth.df.gov.br/arcgis/rest/services/Cadastro/LOTE_SITURB_OCUPACAO/MapServer';

//Atribui a terceira layer do grupo a variável lagos
var lote_ocupa = L.esri.dynamicMapLayer({
  url: serv_lote_ocupa,
  layers: [0],//Carrega uma layer específica em um group layers
  useCors: false
});

//Exemplo de popup limples só para a camada de lagos VAI SER REMOVIDO OU ALTERADO
lagos.bindPopup(function (error, featureCollection) {
    if(error || featureCollection.features.length === 0) {
      return false;
    } else {
      return 'Nome do lago: ' + featureCollection.features[0].properties.nome;
    }
});

//Cria os objetos para conter as layers que estarão no control layers
var baseLayers = {
  "Dark Gray": dark,
  "Streets": streets,
  "Satellite" : satellite,
  "Outdoors" : outdoors
};

var overlays = {
  "Rios Pincipais": rioprin,
  "Rios Secundários": riosec,
  "Lagos e Lagoas": lagos,
  "Lote Ocupação": lote_ocupa
};

// http://leafletjs.com/reference-1.0.3.html#control-layers
L.control.layers(baseLayers,overlays).addTo(mymap);
