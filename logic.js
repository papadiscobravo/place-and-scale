console.log("initializing variables");
var cityCount = 0;
var i = 0;
var ArtICLatLong = [41.879544, -87.624219];
var elCaracolLatLong = [20.66667, -88.56667];
var ColiseumLatLong = [41.8902, 12.4924];
var LouvreLatLong = [48.861111, 2.336389];
var NuukLatLong = [64.1814, -51.6941];
var UrukLatLong = [31.324167, 45.637222];
var centerLatLong = LouvreLatLong;
var cityCount = 0;
var SAICURL = "http://www.saic.edu";
var Po10latlong = [41.864789, -87.613693];
var Po10URL = "https://www.eamesoffice.com/education/powers-of-ten-2/";
var royalObsLatLong = [51.478039, -0.0];
var constant = 4
var r = 255;
var g = 255;
var b = 255;
var color = [r, g, b];
console.log(`color: ${color}`)
var colorChange = 255 / constant * -1;
console.log(`color change: ${colorChange}`)
var fillColor = color;
var fillColorChange = colorChange;
var miles = 10;
console.log(`The largest circle will be ${miles*2} miles (${Math.round(miles*5280)} feet) across.`);
var radius = 0;
var radiusIncrements = miles / constant;
console.log(`Each circle will be ${radiusIncrements} miles (${Math.round(radiusIncrements*5280)} feet) or about a ${Math.round(20 / (miles / radiusIncrements))} minute walk further from the center than the last.`);
var opacity = .2;
var opacityChange = 0.0;
// var opacityChange = opacity / miles * -1;
var zoom = 2;

switch (miles <= 1999) {

    case miles > 1999:
        zoom = zoom + 1;
        break;
    
    case miles > 999:
        zoom = zoom + 2;
        break;

    case miles > 499:
        zoom = zoom + 3;
        break;

    case miles > 249:
        zoom = zoom + 4;
        break;

    case miles >  174:
        zoom = zoom + 5;
        break;

    case miles > 99:
        zoom = zoom + 6;
        break;

    case miles > 49:
        zoom = zoom + 7;
        break;

    case miles > 34:
        zoom = zoom + 8;
        break;
        
    case miles > 16:
        zoom = zoom + 9;
        break;

    case miles > 9:
        zoom = zoom + 10;
        break;

    case miles > 8.4:
        zoom = zoom + 11;
        break;

    case miles > 5:
        zoom = zoom + 12;
        break;
    
    case miles > .5:
        zoom = zoom + 13;
        break;
            
    case miles > .1:
        zoom = 14;
        break;
      
    };

// zoom   mile radius
//  2      5000
//  3      2500
//  4      1000      ******
//  5       750
//  6       400
//  7       200
//  8       100      ******
//  9        50
// 10        25
// 11        10      ******
// 12         7
// 13         3
// 14         1.5    ******
// 15         0.75
// 16         0.35
// 17         0.2
// 18         0.1    ******
// 19         0.05
// 20         0.025
// 21         0.0125 ******
// 22         0.00625
// 23         0.005

console.log(`based on a maximum radius of ${miles}, this map starts at zoom level ${zoom}.`);
console.log("initialized variables");


// Create a map object
var myMap = L.map("map", {
    center: centerLatLong,
    zoom: zoom
  });
console.log("created a map object");

  // Add a tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 24,
    zoomOffset: -1,
 //   id: "mapbox/streets-v11",
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  }).addTo(myMap);

console.log("added a tile layer");

console.log("reading in array of cities");
  // An array containing each city's name, location, and population
  var cities = [
  {
    location: [41.883841, -87.6],
    name: `<a href="http://www.chicago.gov" target="_blank">Chicago</a>`,
    population: "2,720,546"
  },
  
  {
    location: [41.879131, -87.620697],
    name: "280 Bldg: 280 S. Columbus Dr (Cafe 280)" 
    // population: ""
  },

  {
    location: [41.881094, -87.626148],
    name: "Sullivan Center, 36 S. Wabash Ave."
    // population: ""
  },

  {
    location: [41.880803, -87.625623],
    name: "Sharp Bldg: 37 S. Wabash Ave (Campus Cafe)" 
    // population: ""
  },

  {
    location: [41.880347, -87.624358],
    name: "McLean Center, 112 S. Michigan Ave. (McLean Cafe)" 
    // population: ""
  },

  {
    location: [41.880283, -87.624365],
    name: "Lakeview Building, 116 S. Michigan Ave." 
    // population: ""
  },

  {
    location: [41.874103, -87.624385],
    name: "Spertus Institute, 610 S. Michigan Ave."
    // population: ""
  },

  {
    location: [41.916832, -87.648496],
    name: "Roger Brown Home and Study Collection, 1926 N. Halsted St."
    // population: ""
  },

  {
    location: [41.884797, -87.627933],
    name: "162 N. State St",
    // population: ""
  },

  {
    location: [41.882006, -87.628187],
    name: "7 W. Madison",
    // population: ""
  },

  {
    location: [41.876868, -87.625675],
    name: "59 E. Van Buren",
    // population: ""
  },

  {
    location: [41.880831, -87.626182],
    name: `<a href="${SAICURL}" target="_blank">School of the Art Institute of Chicago</a>`,
    population: "3,519 students"
  },

  {
    location: ArtICLatLong,
    name: `<a href="http://artic.edu" target="_blank">Art Institute of Chicago</a>`,
    population: "0"
  },

  {
    location: Po10latlong,
    name: `<a href="${Po10URL}" target="_blank">Powers of Ten picnic site</a>`,
    population: "2"
  },

  {
    location: [0, 0],
    name: `<a href="https://www.explainxkcd.com/wiki/index.php/2344:_26-Second_Pulse" target="_blank">26-second pulse</a> <br> (<a href="http://ciei.colorado.edu/pubs/2006/3.pdf" target="_blank">see also</a>)`,
    population: "0<br>location approximate"
  },  

  {
    location: [39.9061, 116.4281],
    name: `<a href="https://en.wikipedia.org/wiki/Beijing_Ancient_Observatory" target="_blank">Beijing Ancient Observatory</a>`,
    population: ""
  },  

  {
    location: [42.142293, -102.857987],
    name: `<a href="https://en.wikipedia.org/wiki/Carhenge" target="_blank">Carhenge</a>`,
    population: "0"
  },

  {
    location: [20.66667, -88.56667],
    name: `<a href="https://www.exploratorium.edu/ancientobs/chichen/HTML/caracol.html" target="_blank">El Caracol observatory, Chichen Itza</a>`,
    population: "0"
  },  

  {
    location: [36.0530, -107.9559],
    name: `<a href="https://www.nps.gov/chcu/learn/historyculture/index.htm" target="_blank">Chaco Canyon</a>`,
    population: ""
  },

  {
    location: [51.389167, 30.099444],
    name: `<a href="https://en.wikipedia.org/wiki/Chernobyl_Nuclear_Power_Plant" target="_blank">Reactor no. 4</a>`,
    population: ""
  },

  {
    location: [-9.556667, -78.235833],
    name: `<a href="https://www.wmf.org/project/chankillo" target="_blank">Chankillo</a>`,
    population: ""
  },

  {
    location: [41.8902, 12.4924],
    name: `<a href="https://en.wikipedia.org/wiki/Colosseum" target="_blank">The Coliseum</a>`,
    population: "0"
  },  

  {
    location: [34.384498462, 132.453164854],
    name: `<a href="https://en.wikipedia.org/wiki/Hiroshima" target="_blank">Hiroshima</a>`,
    population: "1,199,391 (2019); 255,260 (1945)"
  },  

  {
    location: [-0.0001, 9.454167],
    name: `<a href="https://en.wikipedia.org/wiki/Libreville" target="_blank">Libreville, Gabon</a>`,
    population: "703,904 (2013)"
  },

  {
    location: [48.861111, 2.336389],
    name: `<a href="http://www.louvre.fr" target="_blank">the Louvre</a>`,
    name: "",
    population: "0"
  },

  {
    location: [37.395810, 46.209219],
    name: `<a href="https://en.wikipedia.org/wiki/Maragheh_observatory" target="_blank">Maragheh</a>`,
    population: ""
  },

  {
    location: [40.820856, -96.705637],
    name: `<a href="https://en.wikipedia.org/wiki/Memorial_Stadium_(Lincoln)" target="_blank"> Memorial Stadium, Lincoln, Nebraska</a>`,
    population: ""
  },  
 
  {
    location: [40.779546, -73.962916],
    name: `<a href="http://www.metmuseum.org" target="_blank">the Metropolitan Museum of Art</a>`,
    name: "",
    population: "0"
  },

  {
    location: [45.000000, -93.2739],
    name: "Minneapolis where the north 45th parallel crosses the Mississippi River",
    population: "420,324"
  },
  
  {
    location: [27.988100, 86.925000],
    name: `<a href="https://en.wikipedia.org/wiki/Mount_Everest" target="_blank">peak of Mount Everest</a>`,
    population: "0"
  },  

  {
    location: [32.770913583, 129.857913235],
    name: `<a href="https://en.wikipedia.org/wiki/Nagasaki" target="_blank">Nagasaki</a>`,
    population: "407,624 (2020); 195,290 (1945)"
  },  

  {
    location: [40.7128, -74.0059],
    name: `<a href="http://www.nyc.gov" target="_blank">New York</a>`,
    population: "8,550,405"
  },

  {
    location: [90, 0],
    name: `<a href="https://en.wikipedia.org/wiki/North_Pole" target="_blank">the North Pole</a>`,
    population: "0"
  },

  {
    location: [64.1814, -51.6941],
    name: `<a href="https://naalakkersuisut.gl/en" target="_blank">Nuuk, Greenland</a>`,
    population: "18,326"
  },  
  
  {
    location: [48.853279, 2.348468],
    name: `<a href="http://www.paris.fr" target="_blank">Paris: Point zéro des routes de France</a>`,
    population: "2,161,000 (est.)"
  },  

  {
    location: [51.405556, 30.056944],
    name: `<a href="https://en.wikipedia.org/wiki/Pripyat" target="_blank">Pripyat</a>`,
    population: `49,360 (1986); <a href="https://www.bbc.co.uk/news/resources/idt-sh/moving_to_Chernobyl" target="_blank">120-150 in entire exclusion zone today</a>`
  },

  {
    location: royalObsLatLong,
    name: `<a href="https://www.rmg.co.uk/royal-observatory" target="_blank">Royal Observatory, Greenwich</a>`,
    population: ""
  },  

  {
    location: [-90, 0],
    name: `<a href="https://en.wikipedia.org/wiki/South_Pole" target="_blank">the South Pole</a>`,
    population: "0"
  },

  {
    location: [51.178889, -1.826111],
    name: `<a href="https://en.wikipedia.org/wiki/Stonehenge" target="_blank">Stonehenge</a>`,
    population: "0"
  },

  {
    location: [-16.795867, -180],
    name: `<a href="https://en.wikipedia.org/wiki/Taveuni" target="_blank">Taveuni Island, Fiji-International Date Line</a>`,
    population: "19,000 (est.)"
  },  

  {
    location: [64.253806, -21.03725],
    name: `<a href="https://www.thingsites.com/thing-site-profiles/thingvellir-iceland" target="_blank">Thingvellir</a>`,
    population: ""
  },  

  {
    location: [16.775833, -3.009444],
    name: `<a href="https://en.wikipedia.org/wiki/Timbuktu" target="_blank">Timbuktu</a> ancient center of learning`,
    population: "54,453 (2009)"
  },  

  {
    location: [44.967243, -103.771556],
    name: `<a href="https://www.ngs.noaa.gov/commemorative/marks.shtml" target="_blank">geographical center of the United States</a>`,
    population: "0"
  },

  {
    location: [31.324167, 45.637222],
    name: `ancient city of <a href="https://en.wikipedia.org/wiki/Uruk" target="_blank">Uruk</a>`,
    population: "0"
  },

  ];


var cityLength = cities.length;
console.log(`Read in array of ${cityLength} cities.`);

var N45 = [
      [45.00, -180],
      [45.00, 180]
    ];
L.polyline(N45, {
    color: "red",
    weight: "0.75"
    }).addTo(myMap);

var S45 = [
    [-45.00, -180],
    [-45.00, 180]
  ];
L.polyline(S45, {
    color: "red",
    weight: "0.75"
    }).addTo(myMap);

console.log("drew a line around the world at the 45th parallels north and south");


// The axe historique in Paris
// starts at la Défense, say [48.890171, 2.243282]
// and ends in front of the Louvre, about [48.861613, 2.333366]
var axeHistorique = [
  [48.890171, 2.243282],
  [48.861613, 2.333366]
];
L.polyline(axeHistorique, {
color: "blue",
weight: "2"
}).addTo(myMap);

console.log("drew a line along the axe historique in Paris");


  // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
  for (var i = 0; i < cityLength; i++) {
    var city = cities[i];
    L.marker(city.location)
      .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
      .addTo(myMap);
    console.log(`marked ${i+1}`);
  };
console.log(`checked whether largest circle desired (${miles} miles) was greater than or less than 1 mile`);

if (miles < 1) {
    L.circle(centerLatLong, {
        color: color,
        fillColor: fillColor,
        fillOpacity: opacity,
        radius: miles * 1609.34
        }).addTo(myMap);

        console.log(`drew ${Math.round(miles*2*5280)}-foot diameter circle enclosing an area of ${Math.round(miles*miles*Math.PI)} square miles (${Math.round(miles*miles*Math.PI*27878400)} square feet) around the center point`);
    };

if (miles >= 1) {

    console.log(`started running a loop to draw concentric circles out to ${miles} miles around the center point`);

    for ( radius = 0 + radiusIncrements; radius <= miles;) {

        // Create a circle and give it attributes
        L.circle(centerLatLong, {
          color: "#ffffff",
          fillColor: fillColor,
          fillOpacity: opacity,
          radius: radius * 1609.34
        }).addTo(myMap);
        console.log(`drew ${radius*2}-mile diameter circle enclosing an area of ${Math.round(radius*radius*Math.PI)} square miles around the center point`);
        // opacity = opacity + opacityChange;
        // r = r + colorChange;
        g = g + colorChange;
        // b = b + colorChange;
        fillColor = [r, g, b];
        console.log(`color: ${color} opacity: ${opacity}`);
        radius = radius + radiusIncrements;
        };
        console.log(`finished running a loop to draw concentric circles out to ${miles} miles around the center point`);
    };

    console.log("finished running this script");