var express = require('express');
var router = express.Router();

/* GET write us Page. */
router.get('/', function(req, res, next) {

  const pieces = [
    {
      id:12324, 
      thumb:"http://picsum.photos/400/200?random=1", 
      name:"The Sibling Exploring",
      artist:"Roberto Cespedes",
      type:"Oil",
      date:"12/12/2018",
      size:"2x2",
      price:"100 USD"
    },
    {
      id:6655, 
      thumb:"http://picsum.photos/400/200?random=2", 
      name:"Lorem ipsum dolor sit amet.",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    }, 
    {
      id:144624, 
      thumb:"http://picsum.photos/400/200?random=3", 
      name:"The sam",
      artist:"Jose Rollano",
      type:"watercolor",
      date:"05/10/2017",
      size:"2x3",
      price:"190 USD"
    },
    {
      id:144004, 
      thumb:"http://picsum.photos/400/200?random=4", 
      name:"photo 65",
      artist:"Felix P. R.",
      type:"watercolor",
      date:"05/01/2017",
      size:"2x3",
      price:"100 USD"
    },
    {
      id:101624, 
      thumb:"http://picsum.photos/400/200?random=5", 
      name:"the 67 is back",
      artist:"Jose Perales",
      type:"Oil",
      date:"05/01/2018",
      size:"4x5",
      price:"370 USD"
    },
    {
      id:474624, 
      thumb:"http://picsum.photos/400/200?random=6", 
      name:"sample pic",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:44624, 
      thumb:"http://picsum.photos/400/200?random=7", 
      name:"Lorem ipsum",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:884624, 
      thumb:"http://picsum.photos/400/200?random=8", 
      name:"trecientos",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:144624, 
      thumb:"http://picsum.photos/400/200?random=9", 
      name:"hamburguer tree",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:1024624, 
      thumb:"http://picsum.photos/400/200?random=10", 
      name:"polio",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:62524, 
      thumb:"http://picsum.photos/400/200?random=11", 
      name:"dato 000",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:90624, 
      thumb:"http://picsum.photos/400/200?random=12", 
      name:"Lorem",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:34624, 
      thumb:"http://picsum.photos/400/200?random=13", 
      name:"sea 9",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:77624, 
      thumb:"http://picsum.photos/400/200?random=14", 
      name:"open wide cat",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:34624, 
      thumb:"http://picsum.photos/400/200?random=15", 
      name:"rain from rain",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:4524, 
      thumb:"http://picsum.photos/400/200?random=16", 
      name:"train you wife",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:148824, 
      thumb:"http://picsum.photos/400/200?random=17", 
      name:"elephant of europe",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:1494, 
      thumb:"http://picsum.photos/400/200?random=18", 
      name:"the plague is my candy",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:1691, 
      thumb:"http://picsum.photos/400/200?random=19", 
      name:"roll noice",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:13581, 
      thumb:"http://picsum.photos/400/200?random=20", 
      name:"chubby slimmer though",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    },
    {
      id:11544, 
      thumb:"http://picsum.photos/400/200?random=21", 
      name:"random",
      artist:"Maria P. R.",
      type:"watercolor",
      date:"05/11/2017",
      size:"2x3",
      price:"170 USD"
    }
  ];

  const payload = { 
    title: 'Art Shoping', 
    stringPieces: JSON.stringify(pieces),
    piecePhoto: pieces,
    categories:[
      {
        path:"/category/realism/",
        name:"Realism"
      },
      {
        path:"/category/hyperrealism/",
        name:"Hyperrealism"
      },
      {
        path:"/category/surrealism/",
        name:"Surrealism"
      },
      {
        path:"/category/impressionism/",
        name:"Impressionism"
      },
      {
        path:"/category/expressionism/",
        name:"Expressionism"
      },
      {
        path:"/category/abstract-art/",
        name:"Abstract art"
      },
      {
        path:"/category/pop-art/",
        name:"Pop Art"
      },
      {
        path:"/category/cubism/",
        name:"Cubism"
      },
      {
        path:"/category/portrait/",
        name:"Portrait"
      },
      {
        path:"/category/gender-painting/",
        name:"Gender painting"
      },
      {
        path:"/category/landscape/",
        name:"Landscape"
      },
      {
        path:"/category/still-life/",
        name:"Still life"
      },
      {
        path:"/category/naked/",
        name:"Naked"
      },
      {
        path:"/category/historical-painting/",
        name:"Historical Painting"
      },
      {
        path:"/category/oil/",
        name:"Oil"
      },
      {
        path:"/category/wax/",
        name:"Wax"
      },
      {
        path:"/category/watercolor/",
        name:"Watercolor"
      },
      {
        path:"/category/tempera/",
        name:"Tempera"
      },
      {
        path:"/category/acrylic/",
        name:"Acrylic"
      },
      {
        path:"/category/pie/",
        name:"Pie"
      },
      {
        path:"/category/quenching/",
        name:"Quenching"
      },
      {
        path:"/category/ink/",
        name:"Ink"
      },
      {
        path:"/category/cool/",
        name:"Cool"
      },
      {
        path:"/category/grisalea/",
        name:"Grisalea"
      },
      {
        path:"/category/pointillism/",
        name:"Pointillism"
      },
      {
        path:"/category/dripping/",
        name:"Dripping"
      },
      {
        path:"/category/grafitti/",
        name:"Grafitti"
      },
      {
        path:"/category/mixed-media/",
        name:"Mixed media"
      },
      {
        path:"/category/on-wooden-board/",
        name:"On wooden board"
      },
      {
        path:"/category/on-canvas/",
        name:"On canvas"
      },
      {
        path:"/category/in-copper/",
        name:"In copper"
      },
      {
        path:"/category/in-glass/",
        name:"In glass"
      },
      {
        path:"/category/on-paper/",
        name:"On paper"
      },
      {
        path:"/category/sculpture/",
        name:"Sculpture"
      },
      {
        path:"/category/abstract-sculpture/",
        name:"Abstract sculpture"
      },
      {
        path:"/category/relief/",
        name:"Relief"
      },
      {
        path:"/category/color-relief/",
        name:"Color relief"
      },
      {
        path:"/category/glass-relief/",
        name:"Glass relief"
      },
      {
        path:"/category/contemporary/",
        name:"Contemporary"
      },
      {
        path:"/category/round-bulk-statue/",
        name:"Round Bulk Statue"
      },
      {
        path:"/category/low-relief/",
        name:"Low relief"
      },
      {
        path:"/category/bust/",
        name:"Bust"
      },
      {
        path:"/category/torso/",
        name:"Torso"
      },
      {
        path:"/category/kinetic-sculpture/",
        name:"Kinetic sculpture"
      },
      {
        path:"/category/chryselephantine/",
        name:"Chryselephantine"
      },
      {
        path:"/category/architectural-sculpture/",
        name:"Architectural sculpture"
      },
      {
        path:"/category/clay-sculpture/",
        name:"Clay sculpture"
      },
      {
        path:"/category/stone-sculpture/",
        name:"Stone sculpture"
      },
      {
        path:"/category/stucco-sculpture/",
        name:"Stucco sculpture"
      },
      {
        path:"/category/metal-sculpture/",
        name:"Metal sculpture"
      },
      {
        path:"/category/wood-sculpture/",
        name:"Wood sculpture"
      },
      {
        path:"/category/ivory-Sculpture/",
        name:"Ivory Sculpture"
      },
      {
        path:"/category/concrete-sculpture/",
        name:"Concrete sculpture"
      },
      {
        path:"/category/emptying/",
        name:"Emptying"
      },
      {
        path:"/category/removing/",
        name:"Removing"
      },
      {
        path:"/category/adding/",
        name:"Adding"
      }
    ]
  };

  res.render('write', payload);
});

module.exports = router;
