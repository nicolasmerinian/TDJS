function Battlefield(tdGameParent, urlBackground, music, loop, width, height) {
	this.tdGame = tdGameParent;
	this.name = 'battlefield';
	this.background = new Image();
	this.background.src = urlBackground;
	this.music = new Audio(music);
	this.loop = loop;
	this.towers = [];
	this.enemies = [];
	this.junctionPoints = [];
	this.bullets = [];
	this.waves = [];
	this.nextWave = 0;
	this.pathColor = '#666999';
	this.pathWidth = 10;
	this.backgroundDrawn = false;
	this.towersDrawn = false;
	// this.rangesDrawn = false;
	this.pathDrawn = false;
	this.enemiesDrawn = false;
	this.HUDDrawn = false;
	this.background.referenceDuBackground = this;
	this.background.onload = function() {
		if (!this.complete) {
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		}
		this.referenceDuBackground.width = this.width;
		this.referenceDuBackground.height = this.height;
	}
	this.width = width;
	this.height = height;
	this.HUD;
	// this.matrix;
}

/**==========================================================/
/*                    Config methods                        /
==========================================================*/

// Initialize the battlefield
Battlefield.prototype.initialize = function(context) {
	// this.initMatrix();
	this.drawBackground(context);
	this.drawPath(context);
	this.drawEnemies(context);
	this.drawTowers(context);
	this.drawHUD(context);
	this.waves = ig_waves;
	// this.playMusic();
}

// Add a tower on the battlefield
Battlefield.prototype.addTower = function(tower){
	this.towers.push(tower);
}

// Add a junctionPoint to the battlefield
Battlefield.prototype.addJunctionPoint = function(junctionPoint){
	this.junctionPoints.push(junctionPoint);
}

// Add an enemy on the battlefield
Battlefield.prototype.addEnemy = function(enemy){
	enemy.x = this.junctionPoints[0].x * 32;
	enemy.y = this.junctionPoints[0].y * 32;
	this.enemies.push(enemy);
}

// Add a bullet on the battlefield
Battlefield.prototype.addBullet = function(bullet) {
	this.bullets.push(bullet);
}

// Define an HUD
Battlefield.prototype.setHUD = function(HUD) {
	this.HUD = HUD;
}

// Defne a wave
Battlefield.prototype.setWaves = function(waves) {
	this.waves = waves;
}

// --TEMP-- Ne marche pas pour le moment
// Battlefield.prototype.createBlueTower = function(x, y) {
	// for (var tower in towers) {
		// if (towers[tower]['imageUrl'] == 'graphics/towers/eau.png') {
			// var url = 'graphics/towers/eau.png';
			// var atk = towers[tower]['atk'];
			// var range = towers[tower]['range'];
			// var rate = towers[tower]['rate'];
			// var newTower = Tower(0, url, x, y, atk, range, rate);
			// this.addTower(newTower);
		// }
	// }
// }

/**===========================================================/
/*                    Drawing methods                        /
===========================================================*/

// Draw the path followed by enemies
Battlefield.prototype.drawPath = function(context) {
	context.globalAlpha = 1.0;
	context.fillStyle = '#DDBD55';
	if (this.junctionPoints.length > 0) {
		var currJP = this.junctionPoints[0];
		for (var jp = 0 ; jp < this.junctionPoints.length - 1 ; jp++) {
			var nextJP = this.junctionPoints[jp + 1];
			var width = Math.abs(nextJP.x - currJP.x);
			var height = Math.abs(nextJP.y - currJP.y);
			if (currJP.x < nextJP.x) {
				context.fillRect(currJP.x * 32, currJP.y * 32, width * 32, 32);
				// for (var i = currJP.x ; i < width - 1 ; i++) {
					// context.drawImage(ig_imageGround, i * 32, currJP.y * 32);
				// }
			}
			else if (currJP.x > nextJP.x){
				context.fillRect(nextJP.x * 32, nextJP.y * 32, (width + 1) * 32, 32);
				// for (var i = currJP.x ; i > width - 2 ; i--) {
					// context.drawImage(ig_imageGround, i * 32, currJP.y * 32);
				// }
			}
			else {

			}
			if (currJP.y < nextJP.y) {
				context.fillRect(currJP.x * 32, currJP.y * 32, 32, height * 32);
				// for (var j = currJP.y ; j < height - 1 ; j++) {
					// context.drawImage(ig_imageGround, currJP.x * 32, j * 32);
				// }
			}
			else if (currJP.y > nextJP.y){
				context.fillRect(nextJP.x * 32, nextJP.y * 32, 32, (height + 1) * 32);
				// for (var j = currJP.y ; j > height - 1 ; j--) {
					// context.drawImage(ig_imageGround, currJP.x * 32, j * 32);
				// }
			}
			else {

			}
			currJP = nextJP;
		}
	}
	this.pathDrawn = true;
}

// Draw the background
Battlefield.prototype.drawBackground = function(context) {
	context.globalAlpha = 1.0;
	// console.info('lala1');
	context.drawImage(this.background, 0, 0);
	// var tileImg = new Image();
	// var width = ig_map[0].length;
	// var height = ig_map.length;
	// var tileId = 1;
	// for (var i = 0 ; i < height ; i++) {
		// for (var j = 0 ; j < width ; j++) {
			// tileId = ig_map[i][j];
			// var tileImg = new Image();
			// tileImg.src = ig_groundTileTypesImages[tileId];
			// console.info(tileImg);
			// context.drawImage(tileImg, j * 32, i * 32);
		// }
	// }
	this.backgroundDrawn = true;
}

// Draw the towers
Battlefield.prototype.drawTowers = function(context) {
	context.globalAlpha = 1.0;
	for (var tower in this.towers) {
		context.drawImage(this.towers[tower].image, this.towers[tower].x, this.towers[tower].y);
	}
	this.towersDrawn = true;
}

// Drawn the enemies
Battlefield.prototype.drawEnemies = function(context) {
	for (var enemy in this.enemies) {
		this.enemies[enemy].draw(context);
	}
	this.enemiesDrawn = true;
}

// Draw the bullets shot by the towers
Battlefield.prototype.drawBullets = function(context) {
	for (var bullet in this.bullets) {
		this.bullets[bullet].draw(context);
	}
}

// Draw the selected tower's range
Battlefield.prototype.drawRange = function(tower, context) {
	// Dessin du range
	// context.fillStyle = '#555555';
	// context.strokeStyle = '#222222';
	// context.lineWidth = 1;
	// context.globalAlpha = 0.3;
	// context.beginPath();
	// context.arc(tower.x + (tower.width / 2), tower.y + (tower.height / 2), tower.range, 0, 360);
	// context.closePath();
	// context.fill();
	// context.stroke();
	tower.drawRange(context);
	
	// temp : range'scenter drawing
	
	// context.fillStyle = '#FF6666';
	// context.globalAlpha = 1.0;
	// context.beginPath();
	// context.arc(tower.x + (tower.width / 2), tower.y + (tower.height / 2), 5, 0, 360);
	// context.closePath();
	// context.fill();
	
	this.rangesDrawn = true;
	
	// Essai pour le range radial dégradé
	
	// var posX = battlefield.towers[0].x + (battlefield.towers[0].width / 2);
	// var posY = battlefield.towers[0].y + (battlefield.towers[0].height / 2);
	// var rayon1 = 40;
	// var rayon2 = 60;
	// var gradient = context.createRadialGradient(posX, posY, rayon1, posX, posY, rayon2);
	// gradient.addColorStop(0, '#AAA');
	// gradient.addColorStop(0.9, '#888');
	// gradient.addColorStop(1, 'rgba(159,209,216,0)');	
	// context.fillStyle = gradient;
	// context.globalAlpha = 0.5;
	// context.fillRect(10, 10, 160, 160);
	// context.strokeStyle = '#333';
	// context.stroke();
}

// Draw the ranges of all towers on the map
Battlefield.prototype.drawAllTowersRange = function(context) {
	// this.clearScreen();
	// if (this.backgroundDrawn) {
		// this.drawBackground(context);
	// }
	// if (this.pathDrawn) {
		// this.drawPath(context);
	// }
	// if (this.rangesDrawn) {
		for (var tower in this.towers) {
			// this.drawRange(this.towers[tower], context);
			this.towers[tower].drawRange(context);
		}
	// }
	// if (this.towersDrawn) {
		// this.drawTowers(context);
	// }
	// if (this.enemiesDrawn) {
		// this.drawEnemies(context);
	// }
}

// Clear the range(s) previously drawn
Battlefield.prototype.clearAllRanges = function(context) {
	this.clearScreen();
	if (this.backgroundDrawn) {
		this.drawBackground(context);
	}
	if (this.pathDrawn) {
		this.drawPath(context);
	}
	if (this.towersDrawn) {
		this.drawTowers(context);
	}
	if (this.enemiesDrawn) {
		this.drawEnemies(context);
	}
	if (this.HUDDrawn) {
		this.drawHUD(context);
	}
	this.rangesDrawn = false;
}

// Draw the HUD
Battlefield.prototype.drawHUD = function(context) {
	// if (this.HUD.rangeButtonTriggered) {
		// this.rangesDrawn = true;
	// }
	// else {
		this.rangesDrawn = false;
	// }
	this.HUD.draw(context);
	this.HUDDrawn = true;
}

// Clear the screen
Battlefield.prototype.clearScreen = function() {
	context.clearRect(0, 0, GAME_AREA_WIDTH, GAME_AREA_HEIGHT);
}

// Refresh the graphics
Battlefield.prototype.refresh = function(context, mouseEvent) {
	// Proceed
	this.moveEnemies();
	this.updateTowersTimer();
	this.setTargets(context);
	this.updateBullets();
	if (this.bullets.length > 0) {
		this.checkBulletsImpact();
	}
	this.HUD.settingsButtonHover(mouseEvent);
	
	// Draw
	this.clearScreen();
	if (this.backgroundDrawn) {
		this.drawBackground(context);
	}
	if (this.pathDrawn) {
		this.drawPath(context);
	}
	// if (this.backgroundDrawn) {
		// this.drawBackground(context);
	// }
	if (this.rangesDrawn) {
		this.drawAllTowersRange(context);
	}
	if (this.towersDrawn) {
		this.drawTowers(context);
	}
	if (this.enemiesDrawn) {
		this.drawEnemies(context);
	}
	this.makeTowersShoot(context);
	this.drawBullets(context);
	this.clearTargets();
	if (this.HUDDrawn) {
		this.drawHUD(context);
	}
}

/**==========================================================/
/*                    Action methods                        /
==========================================================*/

// Make the selected tower shoot towards a position
Battlefield.prototype.shoot = function(tower, enemy, context) {
	bullet = new Bullet(this, tower, 0, '', tower.x, tower.y, 12, 10);
	this.addBullet(new Bullet(this, tower, 0, '', tower.x, tower.y, 12, 10));
	// tower.shoot(context, bullet, enemy);
}

// Make all the enemies moveTo
Battlefield.prototype.moveEnemies = function() {
	for (var enemy in this.enemies) {
		this.enemies[enemy].move(this.junctionPoints);
	}
	this.isOut();
}

// Check if the enemies are out of the battlefield
Battlefield.prototype.isOut = function() {
	for (var enemy in this.enemies) {
		if (this.enemies[enemy].x < 0 || this.enemies[enemy].x > this.width || this.enemies[enemy].y < 0 || this.enemies[enemy].y >= this.height) {
			if (this.enemies[enemy].nextJunctionPoint == this.junctionPoints.length - 1) {
				// this.tdGameParent.decreaseLives(this.enemies[enemy].life);
				ig_livesCurrent -= this.enemies[enemy].life;
				this.enemies[enemy].destruct();
			}
		}
	}
}

// Allow to pop any value in an array
Battlefield.prototype.middlepop = function(tab, a){
		return (a>tab.length)?false:(tab.slice(0,a).concat(tab.slice(a+1,tab.length)));
}

// Allow to fill all the array by removing all the empty gaps
Battlefield.prototype.majTab = function(tab)  {
	var output = [];
	for (var elem in tab) {
		output.push(tab[elem]);
	}
	for (var elemMaj in output) {
		output[elemMaj].id = elemMaj;
	}
	return output;
}

// Updating towers' targets
Battlefield.prototype.setTargets = function(context) {
	var i = 0;
	for (var tower in this.towers) {
		for (var enemy in this.enemies) {
			this.towers[tower].setTarget(context, this.enemies[enemy]);
		}
		i++;
	}	
}

// Clearing all the towers' targets
Battlefield.prototype.clearTargets = function() {
	for (var tower in this.towers) {
		this.towers[tower].clearTargets();
	}
}

// Clearing all the towers' bullets
Battlefield.prototype.clearBullets = function() {
	this.bullets = [];
}

// Making all the towers set oon the battlefield shoot
Battlefield.prototype.makeTowersShoot = function(context) {
	for (var tower in this.towers) {
		if (this.towers[tower].targets.length > 0) {
		// console.info(this.towers[0].timerCount);
		// console.info(this.towers[0].isReloaded());
			if (this.towers[tower].isReloaded()) {
				// var bull = new Bullet(this.bullets.length, this.towers[tower], this.towers[tower].targets[0], 0, '', 12, 10);
				// this.addBullet(bull);
				this.towers[tower].shoot(context, this.towers[tower].targets[0]);
			}
		}
	}
}

// Update the bullets' position and beings
Battlefield.prototype.updateBullets = function() {
	for (var bullet in this.bullets) {
		this.bullets[bullet].update();
	}
}

// Update the timer of all towers
Battlefield.prototype.updateTowersTimer = function() {
	for (var tower in this.towers) {
		this.towers[tower].updateTimer();
	}
}

// Check all the bullet' impact(s)
Battlefield.prototype.checkBulletsImpact = function() {
	for (var bullet in this.bullets) {
		for (var enemy in this.enemies) {
			try {
				this.bullets[bullet].impact(this.enemies[enemy]);
			}
			catch (error) {
			
			}
		}
	}
}

// Initialize the next wave
Battlefield.prototype.initWave = function() {
	var eneID = 0;
	var parent = this;
	var endWave = false;
	this.nextWave = ig_wavesCurrent - 1;
	if (this.nextWave < this.waves.length) {
		var self = this;
		var wave = this.waves[this.nextWave][0];
		var time = this.waves[this.nextWave][1];
		var timerWave = setInterval(
			function() {
				// (battlefield, type, url, x, y, life, armor, speed, reward) {
				// console.info(wave);
				if (!endWave) {
					var eneID2 = wave[eneID];
					// console.info(eneID2);
					var imageUrl = ig_enemies['enemy' + eneID2]['imageUrl'];
					var life = ig_enemies['enemy' + eneID2]['life'];
					var armor = ig_enemies['enemy' + eneID2]['armor'];
					var speed = ig_enemies['enemy' + eneID2]['speed'];
					var reward = ig_enemies['enemy' + eneID2]['reward'];
					try  {
						var enemy = new Enemy(parent, 'enemy' + eneID2, 0, imageUrl, 0, 0, life, armor, speed, reward);
					}
					catch (error) {
					
					}
					parent.addEnemy(enemy);
					eneID++;
					if (eneID > wave.length - 1) {
						endWave = true;
					}
				}
				else {
					self.setNextWave();
					clearInterval(timerWave);
				}
			}, time
		);
	}
}

Battlefield.prototype.setNextWave = function() {
	// if (battlefield.enemies.length == 0) {
		ig_wavesCurrent++;
		// console.info('wave2 ++');
		// clearInterval(timerWave);aff('end');
	// }
}

// Check if an emplacement is free or not, in order to set a tower
Battlefield.prototype.checkTileFree = function(map, tower) {
	var px = parseInt(tower.x / 32);
	var py = parseInt(tower.y / 32);
	var tileId = map[py][px];
	return ig_groundTowerAllowed[tileId];
}

// Initialize the matrix representing the map's objects
Battlefield.prototype.initMatrix = function() {
	var matrix = [];
	for (var i = 0 ; i < ((this.height - this.HUD.height) / 32) ; i++) {
		var array = [];
		for (var j = 0 ; j < ((this.width - this.HUD.width) / 32) ; j++) {
			array.push(0);
		}
		matrix.push(array);
	}
	return matrix;
}

/**=========================================================/
/*                    music methods                        /
=========================================================*/

// Play a sound
Battlefield.prototype.playMusic = function() {
	this.music.play();
	this.music.loop = this.loop;
}

// Stop a sound
Battlefield.prototype.stopMusic = function() {
	if (this.music != undefined) {
		this.music.stop(); 
	}	
	// audio.pause();
	//audio = null;
	
	/*
	Pour faire une boucle perso, on peut utiliser currentTime genre : 
	si on veut que la music boucle entre 1 et 2 min, cad quand elle
	arrive à 2mn jouées, elle retourne à son état à 1mn, puis continue.
	On teste : this.music.currentTime == 120
	si true : this.music.currentTime == 60	
	*/
}


