// Variables
var elementCanvas;
var context;
var timerGameRefresh;
var timerKey;
var mouse;
var tdGame;

// Lorsque le DOM est prêt
$(document).ready(function() {	
	// We get the canvas object
	elementCanvas = document.getElementById('canvas');
	if (!elementCanvas || !elementCanvas.getContext) {
		return;
	}
	// We get the 2d context so that we can draw in the canvas
	context = elementCanvas.getContext('2d');
	if (!context) {
		return;
	}
	
	var body = document.getElementsByTagName('body')[0];
	body.addEventListener('mousedown', mouseDownHandler, false);
	body.addEventListener('mousemove', mouseMoveHandler,false);
	
	init();
});

function init() {
	GAME_AREA_WIDTH = elementCanvas.width;
	GAME_AREA_HEIGHT = elementCanvas.height;
	rightKey = false;
	leftKey = false;
	upKey = false;
	downKey = false;
	
	
	
	// Mouse coordinates
	mouse = {
		'x' : 0,
		'y' : 0
	}
	
	// Battlefield
	battlefield  = new Battlefield(null, 'graphics/background02.png', '', false, GAME_AREA_WIDTH, GAME_AREA_HEIGHT);
	tdGame = new TDGame('player', 100, 300, 1, battlefield, null, null);
	
	// HUD
	hud = new HUD(battlefield, 6, TILE_SIZE * 5, TILE_SIZE * 5, 1.0, '#444444', '#222222', false);
	tdGame.setHUD(hud); // battlefield.setHUD(hud);
	
	battlefield.initialize(context);
	
	// Junction points
	// 0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640
	jps = [
		new JunctionPoint(-2, 6),
		new JunctionPoint(4, 6),
		new JunctionPoint(4, 1),
		new JunctionPoint(15, 1),
		new JunctionPoint(15, 4),
		new JunctionPoint(8, 4),
		new JunctionPoint(8, 9),
		new JunctionPoint(3, 9),
		new JunctionPoint(3, 11),
		new JunctionPoint(11, 11),
		new JunctionPoint(11, 7),
		new JunctionPoint(15, 7),
		new JunctionPoint(15, 9),
		new JunctionPoint(22, 9)
	];
	tdGame.setJunctionPoints(jps); // battlefield.junctionPoints = jps;
	// (battlefield, name, num, type, url, x, y, atk, range, rate) {	
	// Towers (if any)	
	// to2 = new Tower(battlefield, 'tower1', 2, 1, 'graphics/towers/eau.png', 5, 3, 12, 160, 1, 10);
	// to1 = new Tower(battlefield, 'tower1', 1, 1, 'graphics/towers/feu.png', 10, 8, 10, 180, 1, 10);
	// tdGame.createTower(tdGame.battlefield, 'tower1', 40, 50);

	// to3 = new Tower(1, 'graphics/towers/normal.png', 6, 6, 12, 130, 20);
	// battlefield.addTower(to1);
	// battlefield.addTower(to2);
	// battlefield.addTower(to3);
	
	// Enemies (if any)
	// tdGame.createEnemy(battlefield, 1);
	// e1 = new Enemy(battlefield, 'enemy1', 0, 'graphics/enemies/enemy01.png', 0, 0, 10, 1, 2, 2);
	// battlefield.addEnemy(e1);
	// battlefield.addEnemy(new Enemy(battlefield, 0, 'graphics/enemies/enemy01.png', 0, 0, 20, 1, 1));
	
	// Begin
	// battlefield.waves = ig_waves;
	
	
	timerGame = setInterval(update, TIMER_GAME);
	// timerGame = setInterval(update, 1000);
	
}

function update() {
	tdGame.refresh(context, mouse); // battlefield.refresh(context, mouse);
		// if a tower has been selected in the HUD (in order to be set on the map)
	if (tdGame.battlefield.HUD.selectedTower[0] != -1) {
		var selectedTowerToBeDrawn = ig_towers['tower' + (tdGame.battlefield.HUD.selectedTower[0] + 1)];
		// aff (selectedTowerToBeDrawn.price[0] <= ig_money);
		if (selectedTowerToBeDrawn.price[selectedTowerToBeDrawn.level] <= ig_money) {
			// aff(battlefield.HUD.selectedTower[0]);
			// aff(selectedTowerToBeDrawn);
			tdGame.battlefield.HUD.drawSelectedTowerOnMouse(context, mouse, selectedTowerToBeDrawn);
		}
		else {
			battlefield.HUD.selectedTower[0] = -1;
			battlefield.HUD.selectedTower[1] = null;
		}
	}
}

function mouseMoveHandler(event) {
	mouse.x = event.pageX - elementCanvas.offsetLeft;
	mouse.y = event.pageY - elementCanvas.offsetTop;
}


function mouseDownHandler(event) {

	mouse.x = event.pageX - elementCanvas.offsetLeft;
	mouse.y = event.pageY - elementCanvas.offsetTop;
	mx = Math.floor(mouse.x / 32);
	my = Math.floor(mouse.y / 32);
	
	// Si on clique dans le HUD
	if (mouse.x > GAME_AREA_WIDTH - tdGame.battlefield.HUD.width) {
		// if a tower within the HUD is selected in order to be purchased then set on the map, it is set unselected
		battlefield.HUD.selectedTower[0] = -1;
		battlefield.HUD.selectedTower[1] = null;
		// HUD towers //
		if (mouse.y > tdGame.battlefield.HUD.panelMiddle.y && mouse.y < tdGame.battlefield.HUD.panelMiddle.y + tdGame.battlefield.HUD.panelMiddle.height) {
			// if a tower on the map is selected, it is set unselected
			battlefield.HUD.selectedMapTower[0] = -1;
			battlefield.HUD.selectedMapTower[1] = null;
			for (var i = 0 ; i < battlefield.HUD.towersCoordinates.length ; i++) {
				// aff(battlefield.HUD.towersCoordinates[i].x);
				// aff(battlefield.HUD.towersCoordinates[i].y);
				// aff(mouse.x);
				// aff(mouse.y);
				if (mouse.x >= tdGame.battlefield.HUD.towersCoordinates[i][0] && mouse.x < tdGame.battlefield.HUD.towersCoordinates[i][0] + 32 && mouse.y >= tdGame.battlefield.HUD.towersCoordinates[i][1] && mouse.y < tdGame.battlefield.HUD.towersCoordinates[i][1] + 32) {
					tdGame.battlefield.HUD.selectedTower[0] = i;
					tdGame.battlefield.HUD.selectedTower[1] = ig_towers['tower' + i];
					// aff(i);
				}
			}
		}
		// HUD Game/Selected Tower or Enemies //
		else {
			// If the mouse is over the wave button when the user clicks
			if (tdGame.battlefield.HUD.isHoverButton(mouse, tdGame.battlefield.HUD.btnWave)) {
				// if we don't want several waves in the same time => 0
				var additionalWavesAllowed = 20;
				if (tdGame.battlefield.enemies.length <= additionalWavesAllowed) {
					tdGame.battlefield.initWave();
				}
			}
			
			// if a tower is selected on the map
			if (tdGame.battlefield.HUD.selectedMapTower[0] != -1) {
				// aff('up1');
				// If the mouse is over the upgrade button when the user clicks
				if (tdGame.battlefield.HUD.isHoverButton(mouse, tdGame.battlefield.HUD.btnUpgrade)) {
					// aff('up');
					tdGame.battlefield.HUD.selectedMapTower[1].upgrade();
				}
				// If the mouse is over the sell button when the user clicks
				else if (tdGame.battlefield.HUD.isHoverButton(mouse, tdGame.battlefield.HUD.btnSell)) {
					ig_money += tdGame.battlefield.HUD.selectedMapTower[1].sell();
				}
			}
/* 			// aff('lili');
			battlefield.HUD.settingsButtonHover(mouse);
			// Button range
			if (battlefield.HUD.settingsButtonHoverID == 1) {
				// aff('range');
				if (!battlefield.HUD.rangeButtonTriggered) {
					battlefield.HUD.rangeButtonTriggered = true;
				}
				else {
					battlefield.HUD.rangeButtonTriggered = false;
				}
			}
			// Button save
			else if (battlefield.HUD.settingsButtonHoverID == 2) {
				// aff('save');
			}
			// Button home
			else if (battlefield.HUD.settingsButtonHoverID == 3) {
				// aff('home');
			}
			// else {
				// aff('none');
			// } */
		}
	}
	// MAP
	else {
		// Set a tower on the map (when selected in the HUD)
		if (battlefield.HUD.selectedTower[0] != -1) {
			var i = 0;
			for (var tower in ig_towers) {
				if (i == battlefield.HUD.selectedTower[0]) {
					if (battlefield.checkTileFree(ig_map, mouse) && ig_towers[tower]['price'][ig_towers[tower]['level']] <= ig_money) {
						var to = new Tower(battlefield, tower, i, i, ig_towers[tower]['imageUrl'][ig_towers[tower]['level']], mx, my, ig_towers[tower]['atk'][ig_towers[tower]['level']], ig_towers[tower]['range'][ig_towers[tower]['level']], ig_towers[tower]['rate'][ig_towers[tower]['level']], ig_towers[tower]['effect'][ig_towers[tower]['level']], ig_towers[tower]['price'][ig_towers[tower]['level']]);
						battlefield.addTower(to);
						battlefield.HUD.selectedTower[0] = -1;
						battlefield.HUD.selectedMapTower[0] = -1;
						ig_map[parseInt(mouse.y / 32)][parseInt(mouse.x / 32)] = ig_groundTileTypes['grass'];
						tdGame.decreaseMoney(to.price);
					}
				}
				i++;
			}
		}
		// Display information about a selected tower on the map
		else {
			var i = 0;
			battlefield.HUD.selectedMapTower[0] = -1;
			battlefield.HUD.selectedMapTower[1] = null;
			// aff('icii');aff('lol');
			for (var tower in battlefield.towers) {
				var selTower = battlefield.towers[tower];
				if (mouse.x >= selTower.x && mouse.x < selTower.x + selTower.width && mouse.y >= selTower.y && mouse.y < selTower.y + selTower.height) {
					// battlefield.HUD.displayTowerInfo(context, battlefield.towers[tower]);
					// battlefield.HUD.selectedMapTower = battlefield.towers[tower];
					// aff(tower);
					battlefield.HUD.selectedMapTower[0] = i;
					battlefield.HUD.selectedMapTower[1] = selTower;
					// aff(battlefield.HUD.selectedMapTower);
					// aff('ok1');
				}
				i++;
			}
		}
	}
}

function aff(msg) {
	console.log('Msg de test : ' + msg)
};

