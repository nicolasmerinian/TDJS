// Game data

var GAME_AREA_WIDTH;
var GAME_AREA_HEIGHT;
var TIMER_GAME = 20; // 20 très bien
var TILE_SIZE = 32;

var ig_livesCurrent = 100;
var ig_livesMax = 100;
var ig_wavesCurrent = 1;
var ig_waveMax = 20;
var ig_difficulty = 2;
var ig_money = 1000;
var ig_scoreCurrent = 0;
var ig_scoreMax = 0;
var ig_enemiesKilled = 0;
var ig_levelTowerMax = 2;

var ig_effects = [
	'poison',
	'ice'
];
var ig_effectPoisonPercentLiveLost = 0.05;
var ig_effectIcePercentSpeed = 0.5;

var ig_percentAtkInc = 1.15;
var ig_percentAtkDec = 0.85;
var ig_percentRateInc = 1.15;
var ig_percentRateDec = 0.85;
var ig_percentRangeInc = 1.15;
var ig_percentRangeDec = 0.85;

var ig_percentSellPrice = 0.5;

var ig_bgsize = {'width' : 20, 'height' : 17};
var ig_imageGrass = new Image();
ig_imageGrass.src = 'graphics/grounds/ground_grass01.png';
var ig_imageGround = new Image();
ig_imageGround.src = 'graphics/grounds/ground_ground01.png';
var ig_groundTileTypes = {
	'tower' : 0,
	'grass' : 1,
	'ground' : 2,
	'water' : 3
}
var ig_groundTileTypesImages = [
	'graphics/grounds/ground_grass02.png',
	'graphics/grounds/ground_grass02.png',
	'graphics/grounds/ground_ground01.png',
	'graphics/grounds/ground_ground01.png'
];
var ig_groundTowerAllowed = [
	false,
	true,
	false,
	false
]

var ig_enemyTypes = {
	'boss' : 0,
	'normal' : 1,
	'hidden' : 2,
	'armored' : 3
}

// Towers
var ig_towers = {

	'tower1' : {
		'name' : 'tower1' ,
		'type' : 0,
		'level' : 0,
		'num' : 0,
		'imageUrl' : ['graphics/towers/normal01.png', 'graphics/towers/normal02.png', 'graphics/towers/normal03.png'],
		'atk' : [1, 2, 2],
		'range' : [96, 100, 112],
		'rate' : [1, 1, 2],
		'effect' : ['none', 'none', 'none'],
		'price' : [10, 14, 21],
		'unlocked' : true
	},
	
	'tower2' : {
		'name' : 'tower2' ,
		'type' : 0,
		'level' : 0,
		'num' : 1,
		'imageUrl' : ['graphics/towers/feu01.png', 'graphics/towers/feu02.png', 'graphics/towers/feu03.png'],
		'atk' : [2, 4, 6],
		'range' : [104, 96, 128],
		'rate' : [1, 2, 2],
		'effect' : ['none', 'none', 'none'],
		'price' : [15, 25, 46],
		'unlocked' : true
	},
	
	'tower3' : {
		'name' : 'tower3' ,
		'type' : 0,
		'level' : 0,
		'num' : 2,
		'imageUrl' : ['graphics/towers/eau01.png', 'graphics/towers/eau02.png', 'graphics/towers/eau03.png'],
		'atk' : [0, 0, 0],
		'range' : [80, 100, 96],
		'rate' : [2, 2, 4],
		'effect' : ['ice', 'ice', 'ice'],
		'price' : [25, 31, 46],
		'unlocked' : true
	},
	
	'tower4' : {
		'name' : 'tower4' ,
		'type' : 0,
		'level' : 0,
		'num' : 3,
		'imageUrl' : ['graphics/towers/poison01.png', 'graphics/towers/poison02.png', 'graphics/towers/poison03.png'],
		'atk' : [0, 0, 0],
		'range' : [112, 112, 128],
		'rate' : [2, 4, 8],
		'effect' : ['poison', 'poison', 'poison'],
		'price' : [19, 33, 57],
		'unlocked' : true
	},
	
	'tower5' : {
		'name' : 'tower5' ,
		'type' : 0,
		'level' : 0,
		'num' : 4,
		'imageUrl' : ['graphics/towers/electrique01.png', 'graphics/towers/electrique02.png', 'graphics/towers/electrique03.png'],
		'atk' : [5, 9, 14],
		'range' : [80, 95, 110],
		'rate' : [2, 4, 8],
		'effect' : ['none', 'none', 'none'],
		'price' : [30, 55, 80],
		'unlocked' : true
	},
	
	'tower6' : {
		'name' : 'tower6' ,
		'type' : 0,
		'level' : 0,
		'num' : 5,
		'imageUrl' : ['graphics/towers/terre01.png', 'graphics/towers/terre02.png', 'graphics/towers/terre03.png'],
		'atk' : [8, 17, 36],
		'range' : [80, 95, 110],
		'rate' : [0.5, 0.5, 1],
		'effect' : ['none', 'none', 'none'],
		'price' : [25, 50, 90],
		'unlocked' : true
	},
	
	'tower7' : {
		'name' : 'tower7' ,
		'type' : 0,
		'level' : 0,
		'num' : 6,
		'imageUrl' : ['graphics/towers/magic01.png', 'graphics/towers/magic02.png', 'graphics/towers/magic03.png'],
		'atk' : [12, 23, 50],
		'range' : [90, 120, 150],
		'rate' : [1, 2, 8],
		'effect' : ['none', 'none', 'none'],
		'price' : [30, 70, 120],
		'unlocked' : true
	}
	
	
}

// Enemies
var ig_enemies = {

	'enemy1' : {
		'imageUrl' : 'graphics/enemies/enemy01.png',
		'life' : 1,
		'speed' : 1, // avec un timerGame = 20, choisir une vitesse parmi 0.25, 0.5, 1, 2, 4, ou 8
		'armor' : 1,
		'reward' : 1,
		'type' : 1
	},
	
	'enemy2' : {
		'imageUrl' : 'graphics/enemies/enemy02.png',
		'life' : 3,
		'speed' : 1,
		'armor' : 4,
		'reward' : 4,
		'type' : 1
	},
		
	'enemy3' : {
		'imageUrl' : 'graphics/enemies/enemy03.png',
		'life' : 3,
		'speed' : 1,
		'armor' : 2,
		'reward' : 5,
		'type' : 1
	},
		
	'enemy4' : {
		'imageUrl' : 'graphics/enemies/enemy04.png',
		'life' : 6,
		'speed' : 2,
		'armor' : 1,
		'reward' : 7,
		'type' : 1
	},
		
	'enemy5' : {
		'imageUrl' : 'graphics/enemies/enemy05.png',
		'life' : 10,
		'speed' : 4,
		'armor' : 0.5,
		'reward' : 8,
		'type' : 1
	},
		
	'enemy6' : {
		'imageUrl' : 'graphics/enemies/enemy06.png',
		'life' : 20,
		'speed' : 1,
		'armor' : 4,
		'reward' : 8,
		'type' : 1
	},
		
	'enemy7' : {
		'imageUrl' : 'graphics/enemies/enemy07.png',
		'life' : 40,
		'speed' : 4,
		'armor' : 1,
		'reward' : 12,
		'type' : 1
	},
		
	'enemy8' : {
		'imageUrl' : 'graphics/enemies/enemy08.png',
		'life' : 100,
		'speed' : 8,
		'armor' : 0.25,
		'reward' : 200,
		'type' : 1
	}
	
}


// Bullets
var bullets = {


	
}


// Waves   Enemy(battlefield, type, url, x, y, life, armor, speed, reward)
var ig_waves = [

	[ // Wave 1
			[1,1,1,1,1,1,1,1,1,1], 1000, 'The 10 first enemies', 'Very weak' // 10 enemies "enemy1"
	],
	
	[ // Wave 2
			[1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,2], 800, 'New better enemies', 'incomming'
	],
	
	[ // Wave 3
			[1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,2,2,1,1,1,2,2,2,2], 500, 'A bunch of low', 'Easy'
	],
	
	[ // Wave 4
			[1,1,1,2,1,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2], 600, 'Make money', 'Cool'
	],// peut-être remplacer par [[nbEnemies, idEnemy], [etc]]
	  // Ce qui donnerait [[3,1],[1,2],[1,1],[2,2],[1,1],[17,2]]
	[ // Wave 5
			[2,2,2,2,2,2,3,2,3,2,3,3,2,2,3,3,3,3,3,3,3,3,3,3,3], 600, 'Still easy-going', ''
	],
	
	[ // Wave 6
			[3,3,3,4,3,3,3,2,2,3,3,3,4,4,4,3,3,4,4,4,4,4,4,4,4], 600, 'Becoming less boring', ''
	]
	
]

// Battlefield



// Background

var ig_map = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // 1
	[1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1],
	[1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1],
	[1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1],
	[1,1,1,1,2,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1], // 5
	[1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1],
	[2,2,2,2,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,2,1,1,2,2,2,2,2,1,1,1,1],
	[1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,2,1,1,1,1],
	[1,1,1,2,2,2,2,2,2,1,1,2,1,1,1,2,2,2,2,2], // 10
	[1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],
	[1,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // 15
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Musics



// Sounds



