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

// We chould start with the map centered on a random point on the world map:
var randomLat = Math.floor(Math.random() * 67);
randomLat *= Math.round(Math.random()) ? 1 : -1;

var randomLong = Math.floor(Math.random() * 181);
randomLong *= Math.round(Math.random()) ? 1 : -1;

// This is where the map is centered.
var centerLatLong = [randomLat, randomLong];
console.log(`randomLatLong: ${centerLatLong}`);

// Early on, I started to go down the road of storing each URL in its own variable, but of course that's a bad idea.
var SAICURL = "http://www.saic.edu";
var Po10URL = "https://www.eamesoffice.com/education/powers-of-ten-2/";

// How many divisions do we want to see the largest circle (radius set in the variable called miles) divided into?
// How many concentric circles do we want to see?
// If we can give visitors one more variable to change (probably within a set range) this would be it.
var divisions = 10

// If we let visitors change one variable, it would be miles, which sets the radius of the widest concentric circle.
var miles = 1000;
console.log(`The largest circle will be ${miles*2} miles (${Math.round(miles*5280)} feet) across.`);

// experimenting with color, setting a separate value for red, green, and blue
// This could give a color gradient, but I think varying opacity is sufficient.
var r = 255;
var g = 255;
var b = 255;
// Color is the color of the boundary of the concentric circle.
var color = [r, g, b];
console.log(`color: ${color}`)

// colorChange is how much each color will change from one concentric circle to the next.
var colorChange = 255 / divisions * -1;
console.log(`color change: ${colorChange}`)

// fillColor is the color of the interior of the concentric circle.
var fillColor = color;
var fillColorChange = colorChange;

// Radius starts at zero, but, when code gets to the loop that makes concentric circles,
// radius will iterate by radiusIncrements up to the limit set in miles.
var radius = 0;

// how many miles apart is one concentric circle from the next?
var radiusIncrements = miles / divisions;
console.log(`Each circle will be ${radiusIncrements} miles (${Math.round(radiusIncrements*5280)} feet) or about a ${Math.round(20 / (miles / radiusIncrements))} minute walk further from the center than the last.`);

// There's loads of sublety to here.
// If we have satellite view and street view, there are probably two different optimal values for opacity to set here.
var opacity = .2;
var opacityChange = -0.05;
// var opacityChange = opacity / miles * -1;

// This sets zoom level at 2, which shows the whole world. I think we should start the map at this zoom level.
var zoom = 2;

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

console.log(`based on a maximum radius of ${miles}, this map starts at zoom level ${zoom}.`);
console.log("initialized variables");


// Create a map object.
var myMap = L.map("map", {
    center: centerLatLong,
    zoom: zoom
  });
console.log("created a map object");

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

  console.log("added a tile layer, read in the API key, and set the map view");

console.log("reading in the array of cities");
  // The array containing each place's name, location, and date founded. It's not really cities any more.
  // Some of them still have population, which is a holdover from the Activity 3 code this started from.
  // I can put the data in this array into a table in a SQLite database, from which Flask will retrieve a JSON.
  // I also started by storing URL in the name, which I will separate out into different fields in the db.

  var places = [
  {
    location: [41.883841, -87.6],
    name: `<a href="http://www.chicago.gov" target="_blank">Chicago</a>`,
    founded: 1837,
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
    founded: 1866,
    population: "3,519 students"
  },

  {
    location: ArtICLatLong,
    name: `<a href="http://artic.edu" target="_blank">Art Institute of Chicago</a>`,
    founded: 1879,
    population: "0"
  },

  {
    location: Po10latlong,
    name: `<a href="${Po10URL}" target="_blank">Powers of Ten picnic site</a>`,
    founded: 1968,
    population: "2"
  },

  {
    location: [0, 0],
    name: `<a href="https://www.explainxkcd.com/wiki/index.php/2344:_26-Second_Pulse" target="_blank">26-second pulse</a> <br> (<a href="http://ciei.colorado.edu/pubs/2006/3.pdf" target="_blank">see also</a>)`,
    founded: "",
    population: "0<br>location approximate"
  },  

  {
    location: [55.382469, 14.054739],
    name: `<a href="https://en.m.wikipedia.org/wiki/Ale%27s_Stones" target="_blank">Ale's Stones</a>`,
    founded: 600,
    population: "0"
  },  

  {
    location: [52.521667, 13.413333],
    name: `<a href="https://en.m.wikipedia.org/wiki/Alexanderplatz" target="_blank">Alexanderplatz</a>`,
    founded: 1805,
    population: "0"
  },  

  {
    location: [43.677778, 4.631111],
    name: `<a href="https://en.wikipedia.org/wiki/Arles_Amphitheatre" target="_blank">Arles Amphitheater</a>`,
    founded: 90,
    population: "0"
  },

  {
    location: [39.9061, 116.4281],
    name: `<a href="https://en.wikipedia.org/wiki/Beijing_Ancient_Observatory" target="_blank">Beijing Ancient Observatory</a>`,
    founded: 1442,
    population: ""
  },  

  {
    location: [42.142293, -102.857987],
    name: `<a href="https://en.wikipedia.org/wiki/Carhenge" target="_blank">Carhenge</a>`,
    founded: 1987,
    population: "0"
  },

  {
    location: [20.66667, -88.56667],
    name: `<a href="https://www.exploratorium.edu/ancientobs/chichen/HTML/caracol.html" target="_blank">El Caracol observatory, Chichen Itza</a>`,
    founded: 906,
    population: "0"
  },  

  {
    location: [36.0530, -107.9559],
    name: `<a href="https://www.nps.gov/chcu/learn/historyculture/index.htm" target="_blank">Chaco Canyon</a>`,
    founded: 900,
    population: ""
  },

  {
    location: [51.389167, 30.099444],
    name: `<a href="https://en.wikipedia.org/wiki/Chernobyl_Nuclear_Power_Plant" target="_blank">Reactor no. 4</a>`,
    founded: 1977,
    population: ""
  },

  {
    location: [-9.556667, -78.235833],
    name: `<a href="https://www.wmf.org/project/chankillo" target="_blank">Chankillo</a>`,
    founded: -400,
    population: ""
  },

  {
    location: [41.8902, 12.4924],
    name: `<a href="https://en.wikipedia.org/wiki/Colosseum" target="_blank">The Coliseum</a>`,
    founded: 80,
    population: "0"
  },  

  {
    location: [22.564444, 88.343333],
    name: `<a href="https://en.wikipedia.org/wiki/Eden_Gardens" target="_blank">Eden Gardens</a>`,
    founded: 1864,
    population: "0"
  },  

  {
    location: [29.976111, 31.132778],
    name: `<a href="https://en.wikipedia.org/Giza_pyramid_complex" target="_blank">Giza Necropolis</a>`,
    founded: -2580,
    population: ""
  },  

  {
    location: [54.491111, 9.565278],
    name: `<a href="https://en.wikipedia.org/wiki/Hedeby" target="_blank">Hedeby/Haithabu</a>`,
    founded: 770,
    population: ""
  },  

  {
    location: [34.112778, -118.338889],
    name: `<a href="https://en.wikipedia.org/wiki/Hollywood_Bowl" target="_blank">Hollywood Bowl</a>`,
    founded: 1922,
    population: ""
  },  

  {
    location: [34.384498462, 132.453164854],
    name: `<a href="https://en.wikipedia.org/wiki/Hiroshima" target="_blank">Hiroshima</a>`,
    founded: 1598,
    population: "1,199,391 (2019); 255,260 (1945)"
  },  

  {
    location: [23.126222, 113.31925],
    name: `<a href="https://en.wikipedia.org/wiki/Huacheng_Square" target="_blank">Huacheng Square</a>`,
    founded: 2010,
    population: ""
  },  

  {
    location: [28.612864, 77.229306],
    name: `<a href="https://en.wikipedia.org/wiki/India_Gate" target="_blank">India Gate Complex</a>`,
    founded: 1921,
    population: ""
  },  

  {
    location: [37.443889, -6.046667],
    name: `<a href="https://en.m.wikipedia.org/wiki/Roman_amphitheatre_of_Italica" target="_blank">Amphitheater of Italica</a>`,
    founded: 138,
    population: "0"
  },

  {
    location: [-0.0001, 9.454167],
    name: `<a href="https://en.wikipedia.org/wiki/Libreville" target="_blank">Libreville, Gabon</a>`,
    founded: 1839,
    population: "703,904 (2013)"
  },

  {
    location: [48.85, 2.35],
    name: `<a href="https://en.wikipedia.org/wiki/Lutecia" target="_blank">Lutecia</a>`,
    founded: -52,
    population: "0"
  },

  {
    location: [48.861111, 2.336389],
    name: `<a href="http://www.louvre.fr" target="_blank">the Louvre</a>`,
    founded: 1200,
    population: "0"
  },

  {
    location: [25.668611, -100.309722],
    name: `the <a href="http://www.louvre.fr" target="_blank">Macroplaza</a>`,
    founded: 1982,
    population: "0"
  },

  {
    location: [32.65745, 51.677778],
    name: `<a href="https://en.wikipedia.org/wiki/Naqsh-e_Jahan_Square" target="_blank">Meidan Emam</a>`,
    founded: 1598,
    population: ""
  },

  {
    location: [37.395810, 46.209219],
    name: `<a href="https://en.wikipedia.org/wiki/Maragheh_observatory" target="_blank">Maragheh</a>`,
    founded: 1197,
    population: ""
  },

  {
    location: [-22.912167, -43.230164],
    name: `<a href="https://en.m.wikipedia.org/wiki/Maracan%C3%A3_Stadium" target="_blank">Maracanã Stadium</a>`,
    founded: 1950,
    population: ""
  },

  {
    location: [33.755, -84.372222],
    name: `<a href="https://en.wikipedia.org/wiki/Martin_Luther_King_Jr._National_Historical_Park" target="_blank">Martin Luther King Jr. National Historical Park</a>`,
    founded: 1980,
    population: ""
  },

  {
    location: [42.36, -71.092],
    name: `<a href="http://mit.edu" target="_blank">Massachusetts Institute of Technology</a>`,
    founded: 1861,
    population: ""
  },

  {
    location: [40.820856, -96.705637],
    name: `<a href="https://en.wikipedia.org/wiki/Memorial_Stadium_(Lincoln)" target="_blank"> Memorial Stadium, Lincoln, Nebraska</a>`,
    founded: 1923,
    population: ""
  },  
 
  {
    location: [-6.175278, 106.827222],
    name: `<a href="https://en.wikipedia.org/wiki/Merdeca_Square" target="_blank">Merdeca Square</a>`,
    founded: 1976,
    population: "0"
  },

  {
    location: [40.779546, -73.962916],
    name: `<a href="http://www.metmuseum.org" target="_blank">the Metropolitan Museum of Art</a>`,
    founded: 1870,
    population: "0"
  },

  {
    location: [45.000000, -93.2739],
    name: "Minneapolis where the north 45th parallel crosses the Mississippi River",
    founded: 1856,
    population: "420,324"
  },
  
  {
    location: [27.988100, 86.925000],
    name: `<a href="https://en.wikipedia.org/wiki/Mount_Everest" target="_blank">peak of Mount Everest</a>`,
    founded: "",
    population: "0"
  },  

  {
    location: [32.770913583, 129.857913235],
    name: `<a href="https://en.wikipedia.org/wiki/Nagasaki" target="_blank">Nagasaki</a>`,
    founded: 1571,
    population: "407,624 (2020); 195,290 (1945)"
  },  

  {
    location: [40.7128, -74.0059],
    name: `<a href="http://www.nyc.gov" target="_blank">New York</a>`,
    founded: 1624,
    population: "8,550,405"
  },

  {
    location: [90, 0],
    name: `<a href="https://en.wikipedia.org/wiki/North_Pole" target="_blank">the North Pole</a>`,
    founded: "",
    population: "0"
  },

  {
    location: [64.1814, -51.6941],
    name: `<a href="https://naalakkersuisut.gl/en" target="_blank">Nuuk, Greenland</a>`,
    founded: -2200,
    population: "18,326"
  },  
  
  {
    location: [40.001667, -83.019722],
    name: `<a href="https://en.wikipedia.org/wiki/Ohio_Stadium" target="_blank">Ohio Stadium</a>`,
    founded: 1922,
    population: "0"
  },  

  {
    location: [-33.437492, -70.651062],
    name: `<a href="https://en.m.wikipedia.org/wiki/Plaza_de_Armas_(Santiago)" target="_blank">Plaza de Armas</a>, Santiago`,
    founded: 1541,
    population: ""
  },  

  {
    location: [48.853279, 2.348468],
    name: `<a href="http://www.paris.fr" target="_blank">Paris: Point zéro des routes de France</a>`,
    founded: 1924,
    population: "2,161,000 (est.)"
  },  

  {
    location: [40.751264, 14.49497],
    name: `<a href="https://en.m.wikipedia.org/wiki/Amphitheatre_of_Pompeii" target="_blank">Amphitheater of Pompei</a>`,
    founded: -70,
    population: "0"
  },

  {
    location: [51.405556, 30.056944],
    name: `<a href="https://en.wikipedia.org/wiki/Pripyat" target="_blank">Pripyat</a>`,
    founded: 1970,
    population: `49,360 (1986); <a href="https://www.bbc.co.uk/news/resources/idt-sh/moving_to_Chernobyl" target="_blank">120-150 in entire exclusion zone today</a>`
  },

  {
    location: [48.5604, 3.299],
    name: `<a href="https://en.m.wikipedia.org/wiki/Provins" target="_blank">Provins</a>, Ville-Haute`,
    founded: "",
    population: ""
  },

  {
    location: [14.651417, 121.049167],
    name: `<a href="https://en.m.wikipedia.org/wiki/Quezon_Memorial_Circle" target="_blank">Quezon Memorial Circle</a>`,
    founded: 1940,
    population: ""
  },

  {
    location: [55.754167, 37.62],
    name: `<a href="https://en.m.wikipedia.org/wiki/Red_Square" target="_blank">Red Square</a>`,
    founded: 1493,
    population: ""
  },

  {
    location: [14.5825, 120.978333],
    name: `<a href="https://en.m.wikipedia.org/wiki/Rizal_Park" target="_blank">Rizal Park</a>`,
    founded: 1820,
    population: ""
  },

  {
    location: royalObsLatLong,
    name: `<a href="https://www.rmg.co.uk/royal-observatory" target="_blank">Royal Observatory, Greenwich</a>`,
    founded: 1676,
    population: ""
  },  

  {
    location: [-90, 0],
    name: `<a href="https://en.wikipedia.org/wiki/South_Pole" target="_blank">the South Pole</a>`,
    founded: "",
    population: "0"
  },

  {
    location: [-4.33, 15.310278],
    name: `<a href="https://en.m.wikipedia.org/wiki/Stade_des_Martyrs" target="_blank">Stade des Martyrs</a>`,
    founded: 1992,
    population: "0"
  },

  {
    location: [51.178889, -1.826111],
    name: `<a href="https://en.wikipedia.org/wiki/Stonehenge" target="_blank">Stonehenge</a>`,
    founded: -2500,
    population: "0"
  },

  {
    location: [-10.184583, -48.333694],
    name: `<a href="https://en.wikipedia.org/wiki/Sunflower_Square" target="_blank">Sunflower Square</a>`,
    founded: 1991,
    population: "0"
  },

  {
    location: [27.175, 78.041944],
    name: `<a href="https://en.wikipedia.org/wiki/Taj_Mahal" target="_blank">Taj Mahal</a>`,
    founded: 1653,
    population: "0"
  },

  {
    location: [-16.795867, -180],
    name: `<a href="https://en.wikipedia.org/wiki/Taveuni" target="_blank">Taveuni Island, Fiji-International Date Line</a>`,
    founded: "",
    population: "19,000 (est.)"
  },  

  {
    location: [64.253806, -21.03725],
    name: `<a href="https://www.thingsites.com/thing-site-profiles/thingvellir-iceland" target="_blank">Thingvellir</a>`,
    founded: 930,
    population: ""
  },  

  {
    location: [39.901996392, 116.38833178],
    name: `<a href="https://en.m.wikipedia.org/wiki/Tianamen_Square" target="_blank">Tianamen Square</a>`,
    founded: 1651,
    population: ""
  },

  {
    location: [16.775833, -3.009444],
    name: `<a href="https://en.wikipedia.org/wiki/Timbuktu" target="_blank">Timbuktu</a> ancient center of learning`,
    founded: 1100,
    population: "54,453 (2009)"
  },  

  {
    location: [40.757, -73.986],
    name: `<a href="https://en.m.wikipedia.org/wiki/Times_Square" target="_blank">Times Square</a> New York`,
    founded: 1872,
    population: ""
  },  

  {
    location: [51.508056, -0.128056],
    name: `<a href="https://en.m.wikipedia.org/wiki/Trafalgar_Square" target="_blank">Trafalgar Square</a>`,
    founded: 1200,
    population: ""
  },  

  {
    location: [44.967243, -103.771556],
    name: `<a href="https://www.ngs.noaa.gov/commemorative/marks.shtml" target="_blank">geographical center of the United States</a>`,
    founded: 1959,
    population: "0"
  },

  {
    location: [34.069444, -118.445278],
    name: `<a href="https://www.ucla.edu" target="_blank">University of California, Los Angeles</a>`,
    founded: 1882,
    population: "44,300 students (est.)"
  },

  {
    location: [31.324167, 45.637222],
    name: `ancient city of <a href="https://en.wikipedia.org/wiki/Uruk" target="_blank">Uruk</a>`,
    founded: -3500,
    population: "0"
  },

  {
    location: [19.432778, -99.133056],
    name: `<a href="https://en.m.wikipedia.org/wiki/Z%C3%B3calo" target="_blank">Xinghai Square</a>`,
    founded: 1997,
    population: ""
  },  

  {
    location: [38.881111, 121.582778],
    name: `<a href="https://en.wikipedia.org/wiki/Xinghai_Square" target="_blank">the Zócalo</a>`,
    founded: 1523,
    population: ""
  },  

  ];

// cityLength stores how many records there are in the array called cities:
var cityLength = places.length;
console.log(`Read in array of ${placesLength} places.`);

  // This loops through the array called places and creates one marker for each place,
  // then binds a popup containing that place's info and adds it to the map.
  for (var i = 0; i < placesLength; i++) {
    var place = places[i];
    L.marker(place.location)
      .bindPopup("<h2>" + place.name + "</h2> <hr> <h3>founded " + place.founded + "</h3>")
      .addTo(myMap);
    // console.log(`marked ${i+1}`);
  };


// If the visitor lands in a random spot in a big ocean,
// they should at least see a line and know the interface isn't broken.

// So drawing a red line around the world along the 45th parallel north...
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

console.log("drew a line around the world at the equator and the 45th parallels north and south");


// The axe historique in Paris starts at la Défense and ends in front of the Louvre.
var axeHistorique = [
  [48.890171, 2.243282],
  [48.861613, 2.333366]
];
L.polyline(axeHistorique, {
color: "lightblue",
weight: "2"
}).addTo(myMap);

console.log("drew a line along l'axe historique in Paris");

console.log(`Now checking whether largest circle desired (${miles}-mile radius) is greater than or less than 1 mile`);

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
        // console.log(`drew ${radius*2}-mile diameter circle enclosing an area of ${Math.round(radius*radius*Math.PI)} square miles around the center point`);
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

console.log(`checked whether largest circle desired (${miles}-mile radius) was greater than or less than 1 mile.`);
console.log(`randomLatLong: ${centerLatLong} zoom level ${zoom}`);
console.log("finished running this script");