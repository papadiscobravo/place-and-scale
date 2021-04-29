console.log("initializing variables");
// How many locations are there in the array below (and, eventually, in the JSON)?
var placesLength = 0;
var i = 0;

// This will temporarily store a string for the display version of the date founded for each location
// while a for loop binds markers to map:
var placeFoundedDisplay = "";

// storing a couple lat long coordinates as variables to make it faster to change map center while testing
var ArtICLatLong = [41.879544, -87.624219];
var elCaracolLatLong = [20.66667, -88.56667];
var ColiseumLatLong = [41.8902, 12.4924];
var LouvreLatLong = [48.861111, 2.336389];
var NuukLatLong = [64.1814, -51.6941];
var UrukLatLong = [31.324167, 45.637222];
var Po10latlong = [41.864789, -87.613693];
var royalObsLatLong = [51.478039, -0.0];
var MLKLatLong = [33.755, -84.372222];

// We could start with the map centered on a random point on the world map:
// This sets a random longitude...
var randomLong = Math.floor(Math.random() * 181);
randomLong *= Math.round(Math.random()) ? 1 : -1;

// ...and a random latitude no closer to the poles than 67 degrees north or south
// (because the concentric circles get funny near the poles).
var randomLat = Math.floor(Math.random() * 67);
randomLat *= Math.round(Math.random()) ? 1 : -1;
// Of course it'd be even cooler to center the map on a place
// chosen at random from our database of places...

// This turns our random lat and long into a coordinate where the map will be centered.

var centerLatLong = [randomLat, randomLong];
// var centerLatLong = MLKLatLong;
console.log(`the lat long center of this map starts at: ${centerLatLong}`);
console.log("-_-_-_-_-_-_-_-_-_-_-_-");

// We said we'll let visitors change a variable, miles, which sets the radius of the widest concentric circle.

// ******* Other things follow from what value is set in miles:

// var miles = 300;
var miles = Math.random() * 10 + .5;
miles = Math.round((miles * 10)) / 10;
diameter = miles * 2;

// ******* Adding another line of comments to make miles easier to find.


// State for the visitor how big the outer circle is.
console.log(`The largest circle is ${diameter} miles (${Math.round(diameter * 5280)} feet) across. Let's put that another way.`);

// Evaluate that diameter against common dimensions, from smallest (the height of a person)
// to largest (the length of Delaware) and pick the best one.
// Let' say we if it would take more than 100 of something, move to the next largest thing:
var maxCommonObjects = 100;

// Here begins a switch statement that does that:

switch (diameter / 96 < maxCommonObjects) {

  case diameter * 5280 / 5.5 < maxCommonObjects:
// 5.5 ft
// The average height of a person in the U.S. is: female: 5'4", male: 5'9". (Source: N-HANES III.)
console.log(`A person's about 5' 6" tall. If people laid down head to toe, the largest circle would be ${Math.round((miles * 2 * 5280 / 5.5) * 10) / 10} people across.`);
  break;
  
  case diameter * 5280 / 35 < maxCommonObjects:
// 35 ft
// A full-sized school bus is 35 feet long (or longer).
console.log(`Many full-sized school buses are about 35 feet long. The largest circle would be ${Math.round((miles * 2 * 5280 / 35) * 10) / 10} such school buses across.`);
  break;
        
  case diameter * 5280 / 231.3 < maxCommonObjects:
// 231.3 ft
// A 747 is 231.3 feet long.
console.log(`A 747 jet airliner is 231.3 feet long. The largest circle would be ${Math.round((miles * 2 * 5280 / 231.3) * 10) / 10} 747s across.`);
  break;
        
  case diameter * 5280 / 1063 < maxCommonObjects:
// 1063 ft
// The Eiffel Tower is currently 1063 feet tall.
console.log(`The Eiffel Tower is currently 1063 feet tall. If you could lay it on its side, the largest circle would be ${Math.round((miles * 2 * 5280 / 1063) * 10) / 10} Eiffel Towers across.`);
  break;
        
  case diameter / 13.4 < maxCommonObjects:
// 13.4 miles
// Manhattan is about 13.4 miles long.
console.log(`The island of Manhattan's about 13.4 miles from top to bottom. The largest circle would be ${Math.round((miles * 2 / 13.4) * 10) / 10} Manhattans across.`);
  break;

  case diameter / 13.4 >= maxCommonObjects:
// 96 miles
// Delaware is 96 miles long.
console.log(`Delaware is 96 miles long. The largest circle would be ${Math.round((miles * 2 / 96) * 10) / 10} Delawares long.`);
  break;
  };

console.log("-_-_-_-_-_-_-_-_-_-_-_-");


// We said we'd give visitors a second variable to change (probably with a drop-down): divisions.
// How many divisions would the visitor like to see the largest circle divided into?
// ******

// var divisions = 10
var divisions = Math.round(Math.random() * 20)
console.log(`The outer circle has ${divisions} divisions.`);

// ******

// Radius starts at zero, but, when code gets to the loop that makes concentric circles,
// radius will iterate by radiusIncrements up to the limit set in miles.
var radius = 0;

// how many miles apart is one concentric circle from the next?
var radiusIncrements = miles / divisions;
console.log(`Each circle will be ${Math.round(radiusIncrements * 10) / 10} miles (${Math.round(radiusIncrements*5280)} feet), or about a ${Math.round(radiusIncrements*20)} minute walk, from the next.`);

// This sets a zoom level to start.
// In the long switch statement below, value are added to this.

var zoom = 2;

// This sets maximum zoom level for all tile layers
var maxZoomLevel = 22;
console.log(`Zoom level starts at ${zoom}. Visitors can't zoom in further than level ${maxZoomLevel}`);

console.log("-_-_-_-_-_-_-_-_-_-_-_-");


// Here's a long switch statement that sets zoom level based on the radius of the outermost circle, set in the variable miles.
// It deserves a bit more refinement at the small end of the scale.
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

// I made a table of what size circle fit well at what zoom level on my computer.
// It would be different based on a device's screen resolution, as well as what percent of the browser window the map takes up,
// but the real point is to avoic being zoomed so far in that the visitor only sees one circle, or none at all,
// and thinks it's broken.
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

console.log(`Based on a largest circle ${miles} across, this map is reset to zoom level ${zoom}.`);
console.log("The main variables are now initialized.");

// See a list of Mapbox-hosted public styles at
// https://docs.mapbox.com/api/maps/styles/#mapbox-styles
// https://docs.mapbox.com/mapbox-gl-js/example/setstyle/

// If we have time to let people pick a base map, great--I think most of it's here...
var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: maxZoomLevel,
  id: "satellite-v9",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: maxZoomLevel,
  id: "dark-v10",
  accessToken: API_KEY
});

var street = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: maxZoomLevel,
// ...otherwise we can hardcode base map in the next line here:
  id: "satellite-v9",
  accessToken: API_KEY
});

var baseMaps = {
  Satellite: satellite,
  Dark: dark,
  Street: street
};

// Create a map object.
var myMap = L.map("map", {
    center: centerLatLong,
    zoom: zoom
});
console.log("A map object has been created.");

  // Add the tile layer.
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 24,
    zoomOffset: -1,
  // For development so far, I've just been changing map view here.
  // streets-v11 is familiar but sometimes cluttered.
  // dark-v10 is especially useful for laying color over.
  // If we run out of time to let visitors set map view, I'd leave satellite-v9 as the default.
    // id: "mapbox/streets-v11",
    // id: "mapbox/dark-v10",
    id: "mapbox/satellite-v9",

  // API key
    accessToken: API_KEY
  }).addTo(myMap);

console.log("Added a tile layer, read in the API key, and set the map view.");

console.log("-_-_-_-_-_-_-_-_-_-_-_-");

// If the visitor lands in a random spot in a big ocean,
// they should at least see something and know the interface isn't broken.
// So this draws a line around the world along the 45th parallel north...
var parallel = [
  [45.00, -180],
  [45.00, 180]
];
L.polyline(parallel, {
color: "red",
weight: "0.75"
}).addTo(myMap);


// ...the equator...    
var parallel = [
  [0, -180],
  [0, 180]
];
L.polyline(parallel, {
color: "#9999ff",
weight: "0.75"
}).addTo(myMap);

// ...and the 45th parallel south.
var parallel = [
[-45.00, -180],
[-45.00, 180]
];
L.polyline(parallel, {
color: "red",
weight: "0.75"
}).addTo(myMap);

console.log("Drew a blue line around the world at the equator and red lines around the world at the 45th parallels north and south");

// easter egg
var axeHistorique = [
[48.890171, 2.243282],
[48.861613, 2.333366]
];
L.polyline(axeHistorique, {
color: "lightblue",
weight: "2"
}).addTo(myMap);

console.log("-_-_-_-_-_-_-_-_-_-_-_-");

console.log("Now starting to read in the primary dataset...");
  // The array containing each place's name, location, and date founded. It's not really cities any more.
  // Some of them still have population, which is a holdover from the Activity 3 code this started from.
  // I can put the data in this array into a table in a SQLite database, from which Flask will retrieve a JSON.
  // I also started by storing URL in the name, which I will separate out into different fields in the db.

  // If we want to do some data scraping, check out the table at 
  // https://en.wikipedia.org/wiki/List_of_city_squares_by_size
  // We'd have to click through to the place,
  // then click on its coordinates, then harvest the decimal lat long value from the GeoHack page that opens:

  var places = [
  {
    location: [41.883841, -87.6],
    name: `<a href="http://www.chicago.gov" target="_blank">Chicago</a>`,
    founded: 1837
  },
  
  {
    location: ArtICLatLong,
    name: `<a href="http://artic.edu" target="_blank">Art Institute of Chicago</a>`,
    founded: 1879
  },

  {
    location: Po10latlong,
    name: `<a href="https://www.eamesoffice.com/education/powers-of-ten-2" target="_blank">Powers of Ten picnic site</a>`,
    founded: 1968
  },

  {
    location: [0, 0],
    name: `<a href="https://www.explainxkcd.com/wiki/index.php/2344:_26-Second_Pulse" target="_blank">26-second pulse</a> <br> (<a href="http://ciei.colorado.edu/pubs/2006/3.pdf" target="_blank">see also</a>)`,
    founded: ""
  },  

  {
    location: [9.037917, 7.453389],
    name: `<a href="https://en.wikipedia.org/wiki/Moshood_Abiola_National_Stadium" target="_blank">Moshood_Abiola_National_Stadium</a>`,
    founded: 2003
  },  

  {
    location: [55.382469, 14.054739],
    name: `<a href="https://en.m.wikipedia.org/wiki/Ale%27s_Stones" target="_blank">Ale's Stones</a>`,
    founded: 600
  },  

  {
    location: [52.521667, 13.413333],
    name: `<a href="https://en.m.wikipedia.org/wiki/Alexanderplatz" target="_blank">Alexanderplatz</a>`,
    founded: 1805
  },  

  {
    location: [43.677778, 4.631111],
    name: `<a href="https://en.wikipedia.org/wiki/Arles_Amphitheatre" target="_blank">Arles Amphitheater</a>`,
    founded: 90
  },

  {
    location: [-34.60499758, -58.369831854],
    name: `<a href="https://en.wikipedia.org/wiki/Plaza_de_Mayo" target="_blank">Plaza de Mayo</a>`,
    founded: 1884
  },  

  {
    location: [27.539669, 71.915253],
    name: `<a href="https://en.wikipedia.org/wiki/Bhadla_Solar_Park" target="_blank">Bhadla Solar Park</a>`,
    founded: 2020
  },  

  {
    location: [5.5476, -0.1926],
    name: `<a href="https://en.wikipedia.org/wiki/Black_Star_Square" target="_blank">Black Star Square</a>`,
    founded: 1961
  },  

  {
    location: [39.9061, 116.4281],
    name: `<a href="https://en.wikipedia.org/wiki/Beijing_Ancient_Observatory" target="_blank">Beijing Ancient Observatory</a>`,
    founded: 1442
  },  

  {
    location: [40.862775, 14.26655],
    name: `<a href="https://second.wiki/wiki/piazza_carlo_iii" target="_blank">Piazza Carlo III</a>`,
    founded: 1850
  },

  {
    location: [42.142293, -102.857987],
    name: `<a href="https://en.wikipedia.org/wiki/Carhenge" target="_blank">Carhenge</a>`,
    founded: 1987
  },

  {
    location: [-43.53099, 172.63656],
    name: `<a href="https://en.wikipedia.org/wiki/Cathedral_Square" target="_blank">Cathedral Square</a>`,
    founded: 1850
  },

  {
    location: [20.66667, -88.56667],
    name: `<a href="https://www.exploratorium.edu/ancientobs/chichen/HTML/caracol.html" target="_blank">El Caracol observatory, Chichen Itza</a>`,
    founded: 906
  },  

  {
    location: [48.856111, 2.298333],
    name: `<a href="https://en.wikipedia.org/wiki/Champ_de_Mars" target="_blank">Champs des Mars</a>`,
    founded: 1765
  },

  {
    location: [36.0530, -107.9559],
    name: `<a href="https://www.nps.gov/chcu/learn/historyculture/index.htm" target="_blank">Chaco Canyon</a>`,
    founded: 900
  },

  {
    location: [51.389167, 30.099444],
    name: `<a href="https://en.wikipedia.org/wiki/Chernobyl_Nuclear_Power_Plant" target="_blank">Reactor no. 4</a>`,
    founded: 1977
  },

  {
    location: [-9.556667, -78.235833],
    name: `<a href="https://www.wmf.org/project/chankillo" target="_blank">Chankillo</a>`,
    founded: -400
  },

  {
    location: [48.865556, 2.321111],
    name: `<a href="https://en.wikipedia.org/wiki/Place_de_la_Concorde" target="_blank">Place de la Concorde</a>`,
    founded: 1772
  },  

  {
    location: [41.8902, 12.4924],
    name: `<a href="https://en.wikipedia.org/wiki/Colosseum" target="_blank">The Coliseum</a>`,
    founded: 80
  },  

  {
    location: [22.564444, 88.343333],
    name: `<a href="https://en.wikipedia.org/wiki/Eden_Gardens" target="_blank">Eden Gardens</a>`,
    founded: 1864
  },  

  {
    location: [-37.817798, 144.968714],
    name: `<a href="https://en.wikipedia.org/wiki/Federation_Square" target="_blank">Federation Square</a>`,
    founded: 2002
  },  

  {
    location: [50.004444, 36.233333],
    name: `<a href="https://en.wikipedia.org/wiki/Freedom_Square_(Kharkiv)" target="_blank">Freedom Square</a>`,
    founded: 1926
  },  

  {
    location: [29.976111, 31.132778],
    name: `<a href="https://en.wikipedia.org/Giza_pyramid_complex" target="_blank">Giza Necropolis</a>`,
    founded: -2580
  },  

  {
    location: [54.491111, 9.565278],
    name: `<a href="https://en.wikipedia.org/wiki/Hedeby" target="_blank">Hedeby/Haithabu</a>`,
    founded: 770
  },  

  {
    location: [34.112778, -118.338889],
    name: `<a href="https://en.wikipedia.org/wiki/Hollywood_Bowl" target="_blank">Hollywood Bowl</a>`,
    founded: 1922
  },  

  {
    location: [-34.9241, 138.6057],
    name: `<a href="https://en.wikipedia.org/wiki/Hindmarsh_Square" target="_blank">Hindmarsh Square</a>`,
    founded: 1837
  },  

  {
    location: [34.384498462, 132.453164854],
    name: `<a href="https://en.wikipedia.org/wiki/Hiroshima" target="_blank">Hiroshima</a>`,
    founded: 1598
  },  

  {
    location: [23.126222, 113.31925],
    name: `<a href="https://en.wikipedia.org/wiki/Huacheng_Square" target="_blank">Huacheng Square</a>`,
    founded: 2010
  },  

  {
    location: [28.612864, 77.229306],
    name: `<a href="https://en.wikipedia.org/wiki/India_Gate" target="_blank">India Gate Complex</a>`,
    founded: 1921
  },  

  {
    location: [37.443889, -6.046667],
    name: `<a href="https://en.m.wikipedia.org/wiki/Roman_amphitheatre_of_Italica" target="_blank">Amphitheater of Italica</a>`,
    founded: 138
  },

  {
    location: [31.625833, -7.989444],
    name: `<a href="https://en.wikipedia.org/wiki/Jemaa_el-Fnaa" target="_blank">Jemaa el-Fnaa</a>`,
    founded: 1100
  },

  {
    location: [40.722213, -73.987301],
    name: `<a href="https://katzsdelicatessen.com" target="_blank">Katz's Deli</a>`,
    founded: 1888
  },

  {
    location: [53.1957, 50.1013],
    name: `<a href="https://en.wikipedia.org/wiki/Kuybyshev_Square" target="_blank">Kuybyshev Square</a>`,
    founded: 1894
  },

  {
    location: [-0.0001, 9.454167],
    name: `<a href="https://en.wikipedia.org/wiki/Libreville" target="_blank">Libreville, Gabon</a>`,
    founded: 1839
  },

  {
    location: [25.034444, 121.521667],
    name: `<a href="http://www.louvre.fr" target="_blank">Liberty Square</a>, Taipei`,
    founded: 1975
  },

  {
    location: [48.861111, 2.336389],
    name: `<a href="http://www.louvre.fr" target="_blank">the Louvre</a>`,
    founded: 1200
  },

  {
    location: [48.85, 2.35],
    name: `<a href="https://en.wikipedia.org/wiki/Lutecia" target="_blank">Lutecia</a>`,
    founded: -52
  },

  {
    location: [25.668611, -100.309722],
    name: `the <a href="https://en.wikipedia.org/wiki/Macroplaza" target="_blank">Macroplaza</a>`,
    founded: 1982
  },

  {
    location: [32.65745, 51.677778],
    name: `<a href="https://en.wikipedia.org/wiki/Naqsh-e_Jahan_Square" target="_blank">Meidan Emam</a>`,
    founded: 1598
  },

  {
    location: [37.395810, 46.209219],
    name: `<a href="https://en.wikipedia.org/wiki/Maragheh_observatory" target="_blank">Maragheh</a>`,
    founded: 1197
  },

  {
    location: [-22.912167, -43.230164],
    name: `<a href="https://en.m.wikipedia.org/wiki/Maracan%C3%A3_Stadium" target="_blank">Maracanã Stadium</a>`,
    founded: 1950
  },

  {
    location: [32.65745, 51.677778],
    name: `<a href="https://en.wikipedia.org/wiki/Naqsh-e_Jahan_Square" target="_blank">Naqsh-e Jahan Square</a>`,
    founded: 1598
  },

  {
    location: [65.416667, 20.666667],
    name: `<a href="https://en.wikipedia.org/wiki/Markbygden_Wind_Farm" target="_blank">Markbygden_Wind_Farm</a>`,
    founded: 2014
  },

  {
    location: [33.755, -84.372222],
    name: `<a href="https://en.wikipedia.org/wiki/Martin_Luther_King_Jr._National_Historical_Park" target="_blank">Martin Luther King Jr. National Historical Park</a>`,
    founded: 1980
  },

  {
    location: [42.36, -71.092],
    name: `<a href="http://mit.edu" target="_blank">Massachusetts Institute of Technology</a>`,
    founded: 1861
  },

  {
    location: [40.820856, -96.705637],
    name: `<a href="https://en.wikipedia.org/wiki/Memorial_Stadium_(Lincoln)" target="_blank"> Memorial Stadium, Lincoln, Nebraska</a>`,
    founded: 1923
  },  
 
  {
    location: [-6.175278, 106.827222],
    name: `<a href="https://en.wikipedia.org/wiki/Merdeca_Square" target="_blank">Merdeca Square</a>`,
    founded: 1976
  },

  {
    location: [40.779546, -73.962916],
    name: `<a href="http://www.metmuseum.org" target="_blank">the Metropolitan Museum of Art</a>`,
    founded: 1870
  },

  {
    location: [41.882708, -87.622667],
    name: `<a href="https://en.wikipedia.org/wiki/Millennium_Park" target="_blank">Millenium Park</a>`,
    founded: 2004
  },

  {
    location: [45.000000, -93.2739],
    name: "Minneapolis where the north 45th parallel crosses the Mississippi River",
    founded: 1856
  },
  
  {
    location: [27.988100, 86.925000],
    name: `<a href="https://en.wikipedia.org/wiki/Mount_Everest" target="_blank">peak of Mount Everest</a>`,
    founded: ""
  },  

  {
    location: [32.770913583, 129.857913235],
    name: `<a href="https://en.wikipedia.org/wiki/Nagasaki" target="_blank">Nagasaki</a>`,
    founded: 1571
  },  

  {
    location: [40.7128, -74.0059],
    name: `<a href="http://www.nyc.gov" target="_blank">New York</a>`,
    founded: 1624
  },

  {
    location: [-8.671667, 115.233889],
    name: `<a href="https://en.wikipedia.org/wiki/Bajra_Sandhi_Monument" target="_blank">Niti Mandala Square</a>`,
    founded: 1897
  },

  {
    location: [90, 0],
    name: `<a href="https://en.wikipedia.org/wiki/North_Pole" target="_blank">the North Pole</a>`,
    founded: ""
  },

  {
    location: [64.1814, -51.6941],
    name: `<a href="https://naalakkersuisut.gl/en" target="_blank">Nuuk, Greenland</a>`,
    founded: -2200
  },  
  
  {
    location: [40.001667, -83.019722],
    name: `<a href="https://en.wikipedia.org/wiki/Ohio_Stadium" target="_blank">Ohio Stadium</a>`,
    founded: 1922
  },  

  {
    location: [-33.437492, -70.651062],
    name: `<a href="https://en.m.wikipedia.org/wiki/Parade_Square" target="_blank">Parade Square</a>`,
    founded: 1955
  },  

  {
    location: [31.229564, 121.47438],
    name: `<a href="https://en.wikipedia.org/wiki/People%27s_Square" target="_blank">People's Square</a>`,
    founded: 1994
  },  

  {
    location: [-33.437492, -70.651062],
    name: `<a href="https://en.m.wikipedia.org/wiki/Plaza_de_Armas_(Santiago)" target="_blank">Plaza de Armas</a>, Santiago`,
    founded: 1541
  },  

  {
    location: [48.853279, 2.348468],
    name: `<a href="http://www.paris.fr" target="_blank">Paris: Point zéro des routes de France</a>`,
    founded: 1924
  },  

  {
    location: [40.751264, 14.49497],
    name: `<a href="https://en.m.wikipedia.org/wiki/Amphitheatre_of_Pompeii" target="_blank">Amphitheater of Pompei</a>`,
    founded: -70
  },

  {
    location: [45.398333, 11.875833],
    name: `<a href="https://en.wikipedia.org/wiki/Prato_della_Valle" target="_blank">Prato della Valle</a>`,
    founded: 1635
  },

  {
    location: [51.405556, 30.056944],
    name: `<a href="https://en.wikipedia.org/wiki/Pripyat" target="_blank">Pripyat</a>`,
    founded: 1970
  },

  {
    location: [48.5604, 3.299],
    name: `<a href="https://en.m.wikipedia.org/wiki/Provins" target="_blank">Provins</a>, Ville-Haute`,
    founded: ""
  },

  {
    location: [14.651417, 121.049167],
    name: `<a href="https://en.m.wikipedia.org/wiki/Quezon_Memorial_Circle" target="_blank">Quezon Memorial Circle</a>`,
    founded: 1940
  },

  {
    location: [40.728039, -74.001836],
    name: `<a href="https://raffettospasta.com/" target="_blank">Raffetto's Pasta</a>`,
    founded: 1906
  },

  {
    location: [55.754167, 37.62],
    name: `<a href="https://en.m.wikipedia.org/wiki/Red_Square" target="_blank">Red Square</a>`,
    founded: 1493
  },

  {
    location: [43.238333, 76.945278],
    name: `<a href="https://en.wikipedia.org/wiki/Republic_Square,_Almaty" target="_blank">Republic Square</a>, Kazakhstan`,
    founded: 1986
  },

  {
    location: [14.5825, 120.978333],
    name: `<a href="https://en.m.wikipedia.org/wiki/Rizal_Park" target="_blank">Rizal Park</a>`,
    founded: 1820
  },

  {
    location: royalObsLatLong,
    name: `<a href="https://www.rmg.co.uk/royal-observatory" target="_blank">Royal Observatory, Greenwich</a>`,
    founded: 1676
  },  

  {
    location: [13.755, 100.493056],
    name: `<a href="https://en.wikipedia.org/wiki/Sanam_Luang" target="_blank">Sanam Luang</a>`,
    founded: 1855
  },  

  {
    location: [45.7, -120.06],
    name: `<a href="https://en.wikipedia.org/wiki/Shepherds_Flat_Wind_Farm" target="_blank">Shepherds Flat Wind Farm</a>`,
    founded: 2012
  },  

  {
    location: [42.691944, 23.324167],
    name: `<a href="https://en.wikipedia.org/wiki/Slaveykov_Square" target="_blank">Slaveykov Square</a>`,
    founded: 1515
  },  

  {
    location: [-90, 0],
    name: `<a href="https://en.wikipedia.org/wiki/Spring_City_Square" target="_blank">Spring City Square</a>`,
    founded: ""
  },

  {
    location: [-90, 0],
    name: `<a href="https://en.wikipedia.org/wiki/South_Pole" target="_blank">the South Pole</a>`,
    founded: ""
  },

  {
    location: [-4.33, 15.310278],
    name: `<a href="https://en.m.wikipedia.org/wiki/Stade_des_Martyrs" target="_blank">Stade des Martyrs</a>`,
    founded: 1992
  },

  {
    location: [51.178889, -1.826111],
    name: `<a href="https://en.wikipedia.org/wiki/Stonehenge" target="_blank">Stonehenge</a>`,
    founded: -2500
  },

  {
    location: [-10.184583, -48.333694],
    name: `<a href="https://en.wikipedia.org/wiki/Sunflower_Square" target="_blank">Sunflower Square</a>`,
    founded: 1991
  },

  {
    location: [47.918889, 106.9175],
    name: `<a href="https://en.wikipedia.org/wiki/S%C3%BCkhbaatar_Square" target="_blank">S%C3%BCkhbaatar Square</a>`,
    founded: 1923
  },

  {
    location: [30.0444, 31.2357],
    name: `<a href="https://en.wikipedia.org/wiki/Tahrir_Square" target="_blank">Tahrir Square</a>`,
    founded: 1850
  },

  {
    location: [27.175, 78.041944],
    name: `<a href="https://en.wikipedia.org/wiki/Taj_Mahal" target="_blank">Taj Mahal</a>`,
    founded: 1653
  },

  {
    location: [-16.795867, -180],
    name: `<a href="https://en.wikipedia.org/wiki/Taveuni" target="_blank">Taveuni Island, Fiji-International Date Line</a>`,
    founded: ""
  },  

  {
    location: [-33.8808, 151.2169],
    name: `<a href="https://en.wikipedia.org/wiki/Taylor_Square" target="_blank">Taylor Square</a>`,
    founded: ""
  },  

  {
    location: [64.253806, -21.03725],
    name: `<a href="https://www.thingsites.com/thing-site-profiles/thingvellir-iceland" target="_blank">Thingvellir</a>`,
    founded: 930
  },  

  {
    location: [39.901996392, 116.38833178],
    name: `<a href="https://en.m.wikipedia.org/wiki/Tianamen_Square" target="_blank">Tianamen Square</a>`,
    founded: 1651
  },

  {
    location: [16.775833, -3.009444],
    name: `<a href="https://en.wikipedia.org/wiki/Timbuktu" target="_blank">Timbuktu</a> ancient center of learning`,
    founded: 1100
  },  

  {
    location: [40.757, -73.986],
    name: `<a href="https://en.m.wikipedia.org/wiki/Times_Square" target="_blank">Times Square</a> New York`,
    founded: 1872
  },  

  {
    location: [51.508056, -0.128056],
    name: `<a href="https://en.m.wikipedia.org/wiki/Trafalgar_Square" target="_blank">Trafalgar Square</a>`,
    founded: 1200
  },  

  {
    location: [60.885833, 101.894444],
    name: `<a href="https://en.m.wikipedia.org/wiki/Tunguska_event" target="_blank">Tunguska Event</a>`,
    founded: 1908
  },  

  {
    location: [44.967243, -103.771556],
    name: `<a href="https://www.ngs.noaa.gov/commemorative/marks.shtml" target="_blank">geographical center of the United States</a>`,
    founded: 1959
  },

  {
    location: [34.161155, -118.167642],
    name: `<a href="https://www.ucla.edu" target="_blank">University of California, Los Angeles</a>`,
    founded: 1882
  },

  {
    location: [55.907778, 12.696667],
    name: `<a href="https://en.wikipedia.org/wiki/Uraniborg" target="_blank">Uraniborg</a>`,
    founded: 1580
  },

  {
    location: [31.324167, 45.637222],
    name: `ancient city of <a href="https://www.worldhistory.org/uruk/" target="_blank">Uruk</a>`,
    founded: -3500
  },

  {
    location: [51.555833, -0.279722],
    name: `<a href="https://en.wikipedia.org/wiki/Wembley_Stadium" target="_blank">Wembly Stadium</a>`,
    founded: 2007
  },

  {
    location: [19.432778, -99.133056],
    name: `<a href="https://en.m.wikipedia.org/wiki/Z%C3%B3calo" target="_blank">Xinghai Square</a>`,
    founded: 1997
  },  

  {
    location: [38.881111, 121.582778],
    name: `<a href="https://en.wikipedia.org/wiki/Xinghai_Square" target="_blank">the Zócalo</a>`,
    founded: 1523
  },  

  ];
console.log(`...which has ${places.length} records.`);

// cityLength stores how many records there are in the array called cities:
var placesLength = places.length;
console.log(`Read in ${placesLength} places.`);

  // This loops through the array called places and creates one marker for each place,
  // then binds a popup containing that place's info and adds it to the map.
  for (var i = 0; i < placesLength; i++) {
    var place = places[i];

    if (place.founded < 0) {
      foundedDisplay = `${place.founded * -1} BCE`}
    else {
    foundedDisplay = `${place.founded}`};

    L.marker(place.location)
      .bindPopup("<h2>" + place.name + "</h2> <hr> <h3>" + foundedDisplay + "</h3>")
      .addTo(myMap);
    // console.log(`marked ${i+1}`);
  };

console.log(`Popups bound to markers placed on map.`);

console.log("-_-_-_-_-_-_-_-_-_-_-_-");
console.log("Setting initial color and opacity values:");

// Color is the color of the *boundary* of the concentric circle.
Color = "#ffffff";

// fillColor is the color of the *interior* of the concentric circle.
var fillColor = Color;

// If we have allow multiple map views more than satellite view,
// we'll want to test and determine different optimal opacities for each view
// and set them here:
var opacity = 0.05;
console.log(`color: ${Color}, fillColor: ${fillColor}, opacity: ${opacity}`);
console.log("-_-_-_-_-_-_-_-_-_-_-_-");

// If someone wants to see a circle with a radius of less than a mile,
// this draws only one circle...
if (miles < 1) {
    L.circle(centerLatLong, {
        color: Color,
        fillColor: fillColor,
        fillOpacity: opacity,
        radius: miles * 1609.34
        }).addTo(myMap);

        console.log(`Drew ${Math.round(miles*2*5280)}-foot diameter circle enclosing an area of ${Math.round(miles*miles*Math.PI)} square miles (${Math.round(miles*miles*Math.PI*27878400)} square feet) around the center point`);
    };
console.log(`checked whether largest circle (${miles}-mile radius) was greater than one mile.`);

// ...but if someone wants to see a circle with a radius of a mile or more,
// draw concentric circles:
if (miles >= 1) {

    console.log(`Started running a loop to draw concentric circles out to ${miles} miles around the center point.s`);

    for ( radius = 0 + radiusIncrements; radius <= miles;) {

        // Create a circle and give it attributes
        L.circle(centerLatLong, {
          color: Color,
          fillColor: fillColor,
          fillOpacity: opacity,
          radius: radius * 1609.34
        }).addTo(myMap);
        // console.log(`Drew concentric circle ${Math.round((radius * 2) * 10 ) / 10} miles across.`);

        // console.log(`color: ${Color} opacity: ${opacity}`);
        radius = radius + radiusIncrements;
        };
        console.log(`Finished running the concentric circles loop.`);
    };

console.log("-_-_-_-_-_-_-_-_-_-_-_-");

console.log(`Finished running this script with center at ${centerLatLong} lat long, a ${miles}-mile radius outer circle (enclosing ${Math.round((miles * miles * Math.PI) * 10) / 10} square miles and ${divisions} concentric circles), and zoom level ${zoom}.`);