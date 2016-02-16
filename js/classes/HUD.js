function HUD(battlefield, position, width, height, opacity, bodyColor, borderColor, hideable) {
	this.screenWidth = battlefield.width;
	this.screenHeight = battlefield.height;
	// this.battlefield = battlefield;
	this.position = position;
	this.width = width;
	this.height = height;
	this.opacity = opacity;
	this.bodyColor = bodyColor;
	this.borderColor = borderColor;
	this.hideable = hideable;
	this.gameInfosDivisionX = 8;
	this.towersDivisionX = 1;
	this.settingsDivisionX = 16;
	this.spaceBetweenCells = 5;
	this.cellSize = 32;
	this.divisionBackgroundColor = '#3A3A3A';
	this.cellColor = '#303030';
	this.cellColorHover = '#505050';
	this.imageDraggableTower = new Image();
	// Si menu vertical =========
	this.panelUp = {
		'x' : this.getX() + 4,
		'y' : this.getY() + 4,
		'width' : this.cellSize * 4 + 24,
		'height' : this.cellSize * 6,
		'color' : '#2277C0'
	};
	this.panelMiddle = {
		'x' : this.getX() + 4,
		'y' : this.getY() + 200,
		'width' : this.cellSize * 4 + 24,
		'height' : this.cellSize * 5 - 4,
		'color' : '#6DBF5E'
	};
	this.panelDown = {
		'x' : this.getX() + 4,
		'y' : this.getY() + 360,
		'width' : this.cellSize * 4 + 24,
		'height' : this.cellSize * 6 - 4,
		'color' : '#CA7755'
	};
	//=======================	 
	this.towersCoordinates = [
		[0 * (this.cellSize + 3) + this.panelMiddle.x + 6,  0 * (this.cellSize + 3) + this.panelMiddle.y + 16 + this.cellSize],
		[1 * (this.cellSize + 3) + this.panelMiddle.x + 6,  0 * (this.cellSize + 3) + this.panelMiddle.y + 16 + this.cellSize],
		[2 * (this.cellSize + 3) + this.panelMiddle.x + 6,  0 * (this.cellSize + 3) + this.panelMiddle.y + 16 + this.cellSize],
		[3 * (this.cellSize + 3) + this.panelMiddle.x + 6,  0 * (this.cellSize + 3) + this.panelMiddle.y + 16 + this.cellSize],
		[0 * (this.cellSize + 3) + this.panelMiddle.x + 6,  1 * (this.cellSize + 3) + this.panelMiddle.y + 16 + this.cellSize],
		[1 * (this.cellSize + 3) + this.panelMiddle.x + 6,  1 * (this.cellSize + 3) + this.panelMiddle.y + 16 + this.cellSize],
		[2 * (this.cellSize + 3) + this.panelMiddle.x + 6,  1 * (this.cellSize + 3) + this.panelMiddle.y + 16 + this.cellSize]
	];
	// this.selectedTower = -1;
	this.selectedTower = [-1, null];
	this.gameInfos = {
		money : ig_money,
		lives : ig_livesCurrent,
		waves : ig_wavesCurrent
	}
	this.settingsButtonHoverID = 0;
	this.rangeButtonTriggered = false;
	this.test = false;
	// this.buttonWaveColors = [
		// [ '#FA956C', '#CD6236', '#85472E'],
		// [ '#F59067', '#C85D31', '#804229'],
		// [ '#F08A62', '#C3582B', '#7A3D24'],
		// '#6A2D14'
	// ];
	this.buttonGameColors = [
		[ '#719AFF', '#5884EF', '#334C8A'],
		[ '#6790F5', '#315DC8', '#294280'],
		[ '#628AF0', '#2B58C3', '#243D7A'],
		'#142D6A'
	];
	this.buttonTowerSelectColors = [
		[ '#90F567', '#5DC831', '#428029'],
		[ '#90F567', '#5DC831', '#428029'],
		[ '#90F567', '#5DC831', '#428029'],
		'#2D6A14'
	];
	this.buttonEnemiesColors = [
		[ '#FA956C', '#FA7F53', '#91533A'],
		[ '#F59067', '#C85D31', '#804229'],
		[ '#F08A62', '#C3582B', '#7A3D24'],
		'#6A2D14'
	];
	this.selectedMapTower = [-1, null];
	this.fontSizeTitle = 30;
	this.fontSizeButton = 18;
	this.buttons = [];
	this.imgMoneyUrl = 'graphics/icons/icon_diamond2.png';
	this.imgLivesUrl = 'graphics/icons/icon_lives.png';
	this.imgEnemyUrl = 'graphics/icons/icon_enemy.png';
	this.imgWaveUrl = 'graphics/icons/icon_wave.png';
	this.imgKilledUrl = 'graphics/icons/icon_dead.png';

	this.btnTitleGame = this.createButton(this.panelUp.x, this.getY(), this.panelUp.width, 40, 0);
	this.btnTitleTowerInfos = this.createButton(this.panelUp.x, this.getY(), this.panelUp.width, 40, 0);
	this.btnUpgrade = this.createButton(this.panelUp.x + (this.panelUp.width / 10), this.panelUp.y + (this.cellSize * 4) + 8, this.panelUp.width * 0.8, 22, 10, true);
	this.btnSell = this.createButton(this.panelUp.x + (this.panelUp.width / 10), this.panelUp.y + (this.cellSize * 5) + 4, this.panelUp.width * 0.8, 22, 10, true);

	this.btnTitleTower = this.createButton(this.panelMiddle.x, this.panelMiddle.y, this.panelMiddle.width, 40, 0);

	this.btnTitleWave = this.createButton(this.panelDown.x, this.panelDown.y, this.panelDown.width, 40, 0);
	this.btnWave = this.createButton(this.getX() + ((this.panelDown.width - 100) / 2), this.panelDown.y + this.panelDown.height - 30 - this.spaceBetweenCells, 100, 30, 10, true);
	
}

// HUD.prototype.initialise = function() {
	// var 
// }

// Return the abscissa position of the HUD
HUD.prototype.getX = function() {
	switch(this.position) {
		case 2 : return 0;
			break;
		case 4 : return 0;
			break;
		case 8 : return 0;
			break;
		case 6 : return this.screenWidth - this.width;
			break;
	}
	return 0;
}

// Return the ordonate position of the HUD
HUD.prototype.getY = function() {
	switch(this.position) {
		case 2 : return this.screenHeight - this.height;
			break;
		case 4 : return 0;
			break;
		case 8 : return 0;
			break;
		case 6 : return 0;
			break;
	}
	return 0;
}

// Update the game's information
HUD.prototype.update = function(event) {
	this.gameInfos.money = ig_money;
	this.gameInfos.lives = ig_livesCurrent;
	this.gameInfos.waves = ig_wavesCurrent;
}

// Draw the HUD
HUD.prototype.draw = function(context, event) {
	this.update(event);
	
	// Draw the tower on mouse when setting it on the map
	// if (this.selectedTower[0] != -1) {
		// this.drawSelectedTowerOnMouse(context, mouseEvent, tower);
	// }
	
	// draw the range of a selected tower (on the map)
	if (this.selectedMapTower[0] != -1) {
		this.selectedMapTower[1].drawRange(context);
		// console.info(this.selectedMapTower[0]);
	}
	
	this.drawBanner(context);
	// this.drawGameInfosDivision(context);
	this.drawTowerInfos(context, this.selectedMapTower);
	this.drawTowerSelectDivision(context);
	// this.drawSettingsDivision(context);
	this.drawWaveDivision(context);
	
	// tests
	// this.drawTileIcon(context, 200, 432);
}

// Draw the main banner containing all the parts of the HUD
HUD.prototype.drawBanner = function(context) {
	context.globalAlpha = this.opacity;
	context.fillStyle = this.bodyColor;
	context.strokeStyle = this.borderColor;
	context.lineWidth = 1;
	switch(this.position) {
		case 2 : context.fillRect(0, this.getY(), this.screenWidth, this.height);
					context.strokeRect(0, this.getY(), this.screenWidth, this.height);
			break;
		case 4 : context.fillRect(0, 0, this.width, this.screenHeight);
					context.strokeRect(0, 0, this.width, this.screenHeight);
			break;
		case 8 : context.fillRect(0, 0, this.screenWidth, this.height);
					context.strokeRect(0, 0, this.screenWidth, this.height);
			break;
		case 6 : context.fillRect(this.getX(), 0, this.width, this.screenHeight);
					context.strokeRect(this.getX(), 0, this.width, this.screenHeight);
					
					context.fillStyle = this.panelUp.color
					context.fillRect(this.panelUp.x, this.panelUp.y, this.panelUp.width, this.panelUp.height);
					
					context.fillStyle = this.panelMiddle.color
					context.fillRect(this.panelMiddle.x, this.panelMiddle.y, this.panelMiddle.width, this.panelMiddle.height);
					
					context.fillStyle = this.panelDown.color
					context.fillRect(this.panelDown.x , this.panelDown.y, this.panelDown.width, this.panelDown.height);
					
					var taskBarHeight = 48;
					var degradeDown = context.createLinearGradient(this.screenWidth / 2, this.screenHeight - (taskBarHeight), this.screenWidth / 2, this.screenHeight);
					degradeDown.addColorStop(0, '#AAAAAA');
					degradeDown.addColorStop(1, '#555555');
					context.fillStyle = degradeDown;
					context.fillRect(0, this.screenHeight - taskBarHeight, this.screenWidth, taskBarHeight);
					context.strokeStyle = '#444444'
					context.fillRect(0, this.screenHeight - taskBarHeight, this.screenWidth, taskBarHeight);
					context.strokeRect(0, this.screenHeight - taskBarHeight, this.screenWidth, taskBarHeight);
					
			break;
	}
}

// Draw the part displaying the game information such as money or lives
/* HUD.prototype.drawGameInfosDivision = function(context, gameInfos) {
	// context.fillStyle = this.divisionBackgroundColor;
	// context.fillRect((this.gameInfosDivisionX * this.cellSize) + this.cellSize, this.getY() + this.spaceBetweenCells, this.cellSize * 6, (this.cellSize - this.spaceBetweenCells) * 2);
	context.font = 'normal 20px Arial';
	switch(this.position) {
		case 2 : 
			context.fillStyle = '#FFEE00';
			context.fillText('  $', (this.gameInfosDivisionX * this.cellSize) + this.cellSize + this.spaceBetweenCells, this.getY() + (this.height / 4) + this.spaceBetweenCells);
			context.fillStyle = '#FFFFFF';
			context.fillText(ig_money, (this.gameInfosDivisionX * this.cellSize) + this.cellSize + this.spaceBetweenCells * 9, this.getY() + (this.height / 4) + this.spaceBetweenCells);
			
			context.fillStyle = '#FF0055';
			context.fillText('<3', (this.gameInfosDivisionX * this.cellSize) + this.cellSize + this.spaceBetweenCells, this.getY() + (this.height / 4) + this.cellSize + this.spaceBetweenCells);
			context.fillStyle = '#FFFFFF';
			context.fillText(ig_livesCurrent, (this.gameInfosDivisionX * this.cellSize) + this.cellSize + this.spaceBetweenCells * 11, this.getY() + (this.height / 4) + this.cellSize + this.spaceBetweenCells);
						
			context.fillStyle = '#44BBFF';
			context.fillText('Wave', (this.gameInfosDivisionX * this.cellSize) + (this.cellSize + this.spaceBetweenCells) * 4, this.getY() + (this.height / 4) + this.spaceBetweenCells);
			context.fillStyle = '#FFFFFF';
			context.fillText(ig_wavesCurrent, (this.gameInfosDivisionX * this.cellSize) + (this.cellSize + this.spaceBetweenCells) * 6, this.getY() + (this.height / 4) + this.spaceBetweenCells);
						
			// context.fillStyle = '#55FF55';
			// context.fillText('Score', (this.gameInfosDivisionX * this.cellSize) + (this.cellSize + this.spaceBetweenCells) * 3, this.getY() + (this.height / 4) + this.cellSize + this.spaceBetweenCells);
			// context.fillStyle = '#FFFFFF';
			// context.fillText(ig_score, (this.gameInfosDivisionX * this.cellSize) + (this.cellSize + this.spaceBetweenCells) * 5, this.getY() + (this.height / 4) + this.cellSize + this.spaceBetweenCells);
			
			break;
		// case 4 : 
			// context.fillRect(this.getX() + (this.width / 4), ((this.settingsDivisionX - 5) * this.cellSize) + this.cellSize + this.spaceBetweenCells, this.cellSize, this.cellSize);
			// context.fillRect(this.getX() + (this.width / 4), ((this.settingsDivisionX - 4) * this.cellSize) + this.cellSize + this.spaceBetweenCells * 2, this.cellSize, this.cellSize);
			// break;
		case 6 : 
		
			context.fillStyle = '#FFEE00';
			context.fillText('  $', this.cellSize, this.screenHeight - (this.cellSize / 3.5));
			context.fillStyle = '#FFFFFF';
			context.fillText(ig_money, this.cellSize * 2, this.screenHeight - (this.cellSize / 3.5));
			
			context.fillStyle = '#FF0055';
			context.fillText('<3', (this.screenWidth / 2) - (this.cellSize * 2), this.screenHeight - (this.cellSize / 3.5));
			context.fillStyle = '#FFFFFF';
			context.fillText(ig_livesCurrent, (this.screenWidth / 2) - this.cellSize + this.spaceBetweenCells, this.screenHeight - (this.cellSize / 3.5));
						
			context.fillStyle = this.panelUp.color;
			context.fillText('Wave', this.screenWidth - (this.cellSize * 4), this.screenHeight - (this.cellSize / 3.5));
			context.fillStyle = '#FFFFFF';
			context.fillText(ig_wavesCurrent, this.screenWidth - (this.cellSize * 2), this.screenHeight - (this.cellSize / 3.5));
						
			break;
		// case 8 : 
			// context.fillRect((this.settingsDivisionX * this.cellSize) + this.cellSize + this.spaceBetweenCells, this.getY() + (this.height / 4), this.cellSize, this.cellSize);
			// context.fillRect(((this.settingsDivisionX + 1) * this.cellSize) + this.cellSize + this.spaceBetweenCells * 2, this.getY() + (this.height / 4), this.cellSize, this.cellSize);
			// break;
	}
}
 */

 // Draw the panel displaying the game infos or the selected tower infos
HUD.prototype.drawTowerInfos = function(context, tower) {
	// Display the game information
	if (this.selectedMapTower[0] == -1) {
		// Panel title
		
		this.drawButtonDegrade(context, this.btnTitleGame, this.buttonGameColors, '     Game', this.fontSizeTitle);
		// Panel infos
		context.font = 'normal 24px Calibri';
		context.fillStyle = '#FFEE00';
		// context.fillText('  $', this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 2));
		var imgMoney = new Image();
		imgMoney.src = this.imgMoneyUrl;
		context.drawImage(imgMoney, this.panelUp.x + this.cellSize - 1, this.panelUp.y + (this.cellSize * 2) - (imgMoney.height / 1.3));
		context.fillStyle = '#FFFFFF';
		context.fillText(ig_money, this.panelUp.x + (this.cellSize * 2), this.panelUp.y + (this.cellSize * 2));
		
		context.fillStyle = '#FF0055';
		// context.fillText('<3', this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 3));
		var imgLives = new Image();
		imgLives.src = this.imgLivesUrl;
		context.drawImage(imgLives, this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 3) - (imgMoney.height / 1.3));
		context.fillStyle = '#FFFFFF';
		context.fillText(ig_livesCurrent, this.panelUp.x + (this.cellSize * 2), this.panelUp.y + (this.cellSize * 3));
					
		context.fillStyle = '#66EE44';
		// context.fillText('Wave', this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 4));
		var imgWave = new Image();
		imgWave.src = this.imgWaveUrl;
		context.drawImage(imgWave, this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 4) - (imgMoney.height / 1.3));
		context.fillStyle = '#FFFFFF';
		context.fillText(ig_wavesCurrent + '/' + ig_waveMax, this.panelUp.x + (this.cellSize * 2), this.panelUp.y + (this.cellSize * 4));
			
		context.fillStyle = '#EE44FF';
		// context.fillText('Killed', this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 5));
		var imgKilled = new Image();
		imgKilled.src = this.imgKilledUrl;
		context.drawImage(imgKilled, this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 5) - (imgMoney.height / 1.3));
		context.fillStyle = '#FFFFFF';
		context.fillText(ig_enemiesKilled, this.panelUp.x + (this.cellSize * 2), this.panelUp.y + (this.cellSize * 5));				
	}
	// Display the currently selected tower infos
	else {
		// Panel title
		this.drawButtonDegrade(context, this.btnTitleTowerInfos, this.buttonGameColors, '     Tower', this.fontSizeTitle);

		// Panel infos
		context.font = 'normal 20px Calibri';
		context.fillStyle = '#FFFFFF';
		
		// context.fillStyle = '#FFEE00';
		context.fillText('Atk', this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 2) - 8);
		// context.fillStyle = '#FFFFFF';
		context.fillText(this.selectedMapTower[1].atk, this.panelUp.x + (this.cellSize * 3), this.panelUp.y + (this.cellSize * 2) - 8);
		
		// context.fillStyle = '#FF0055';
		context.fillText('Range', this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 3) - 16);
		// context.fillStyle = '#FFFFFF';
		context.fillText(this.selectedMapTower[1].range, this.panelUp.x + (this.cellSize * 3), this.panelUp.y + (this.cellSize * 3) - 16);
					
		// context.fillStyle = '#66EE44';
		context.fillText('Rate', this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 4) - 24);
		// context.fillStyle = '#FFFFFF';
		context.fillText(this.selectedMapTower[1].rate, this.panelUp.x + (this.cellSize * 3), this.panelUp.y + (this.cellSize * 4) - 24);
					
		var textEffect = this.selectedMapTower[1].effect;
		if (textEffect == undefined) {
			textEffect = 'none';
		}
		// context.fillStyle = '#66EE44';
		context.fillText('Effect', this.panelUp.x + this.cellSize, this.panelUp.y + (this.cellSize * 5) - 32);
		// context.fillStyle = '#FFFFFF';
		context.fillText(textEffect, this.panelUp.x + (this.cellSize * 3), this.panelUp.y + (this.cellSize * 5) - 32);
					
		// Button upgrade
		context.font = 'normal 16px Calibri';
		// var btnUpgrade = this.createButton(this.panelUp.x + (this.panelUp.width / 6), this.panelUp.y + (this.cellSize * 4), this.panelUp.width * 2 / 3, 22);
		this.drawButtonDegrade(context, this.btnUpgrade, this.buttonGameColors, ' Upgrade for ' + this.selectedMapTower[1].price, this.fontSizeButton);
		// Button sell
		// var btnSell = this.createButton(this.panelUp.x + (this.panelUp.width / 6), this.panelUp.y + (this.cellSize * 5) - 4, this.panelUp.width * 2 / 3, 22);
		this.drawButtonDegrade(context, this.btnSell, this.buttonGameColors, '       Sell for ' + parseInt(this.selectedMapTower[1].price * ig_percentSellPrice), this.fontSizeButton);
	}
}

// Draw the part displaying all the available towers
HUD.prototype.drawTowerSelectDivision = function(context) {
	// context.fillStyle = this.divisionBackgroundColor;
	// context.fillRect((this.towersDivisionX * this.cellSize) - this.spaceBetweenCells * 2, this.getY() + this.spaceBetweenCells, this.cellSize * 5 , (this.cellSize - this.spaceBetweenCells) * 2);
	context.fillStyle = this.cellColor;
	switch(this.position) {
		case 2 : 
			var i = 0;
			for (var tower in ig_towers) {
				// console.info(ig_towers[tower]);
				if (ig_towers[tower]['unlocked']) {
					var img = new Image();
					img.src = ig_towers[tower]['imageUrl'][0];
					context.drawImage(img, this.towersCoordinates[i][0], this.towersCoordinates[i][1]);
				}
				i++;
			}
			break;
		// case 4 : 
			// for (var slot = 0 ; slot < 4 ; slot++) {
				// context.fillRect(this.getX() + (this.width / 4), (this.towersDivisionX * this.cellSize) + (slot * (this.cellSize + this.spaceBetweenCells)), this.cellSize, this.cellSize);
			// }
			// break;
		case 6 : 
			// Panel title
			
			this.drawButtonDegrade(context, this.btnTitleTower, this.buttonTowerSelectColors, '     Towers', this.fontSizeTitle);
		
			var tabTowers = [];
			for (var tower in ig_towers) {
				tabTowers.push(ig_towers[tower]);
			}
			var nbTowersMaxHorizontal = parseInt(this.panelUp.width / this.cellSize);
			// aff(nbTowersMaxHorizontal);
			for (var i = 0 ; i < nbTowersMaxHorizontal ; i++) {
				for (var j = 0 ; j < nbTowersMaxHorizontal ; j++) {
					var id = (j * nbTowersMaxHorizontal) + i;
					if (id < tabTowers.length) {
						// console.info(id);
						// console.info(tabTowers[id]);
						var img = new Image();
						img.src = tabTowers[id]['imageUrl'][0];
						context.drawImage(img, i * (this.cellSize + 3) + this.panelMiddle.x + 6, j * (this.cellSize + 3) + this.panelMiddle.y + 16 + this.cellSize);
					}
				}
			}
			break;
		// case 8 : 
			// for (var slot = 0 ; slot < 4 ; slot++) {
				// context.fillRect((this.towersDivisionX * this.cellSize) + (slot * (this.cellSize + this.spaceBetweenCells)), this.getY() + (this.height / 4), this.cellSize, this.cellSize);
			// }
			// break;
	}
}

// Draw the part displaying buttons which allow to save or exit the game
/* HUD.prototype.drawSettingsDivision = function(context) {
	// context.fillStyle = this.divisionBackgroundColor;
	// context.fillRect((this.settingsDivisionX * this.cellSize) + this.cellSize - this.spaceBetweenCells * 2, this.getY() + this.spaceBetweenCells, this.cellSize * 3 , (this.cellSize - this.spaceBetweenCells) * 2);
	// context.fillStyle = this.cellColor;
	switch(this.position) {
		case 2 : 
			// context.fillRect((this.settingsDivisionX * this.cellSize), this.getY() + (this.height / 4),this.cellSize, this.cellSize);
			// context.fillRect(((this.settingsDivisionX + 1) * this.cellSize) + this.spaceBetweenCells, this.getY() + (this.height / 4), this.cellSize, this.cellSize);
			// context.fillRect(((this.settingsDivisionX + 2) * this.cellSize) + this.spaceBetweenCells * 2, this.getY() + (this.height / 4), this.cellSize, this.cellSize);
			this.drawIconRange(context, (this.settingsDivisionX * this.cellSize), this.getY() + (this.height / 4));
			this.drawIconSave(context, ((this.settingsDivisionX + 1) * this.cellSize) + this.spaceBetweenCells, this.getY() + (this.height / 4));
			this.drawIconHome(context, ((this.settingsDivisionX + 2) * this.cellSize) + this.spaceBetweenCells * 2, this.getY() + (this.height / 4));
			break;
		// case 4 : 
			// context.fillRect(this.getX() + (this.width / 4), ((this.settingsDivisionX - 5) * this.cellSize) + this.cellSize + this.spaceBetweenCells, this.cellSize, this.cellSize);
			// context.fillRect(this.getX() + (this.width / 4), ((this.settingsDivisionX - 4) * this.cellSize) + this.cellSize + this.spaceBetweenCells * 2, this.cellSize, this.cellSize);
			// break;
		// case 6 : 
			// context.fillRect(this.getX() + (this.width / 4), ((this.settingsDivisionX - 5) * this.cellSize) + this.cellSize + this.spaceBetweenCells, this.cellSize, this.cellSize);
			// context.fillRect(this.getX() + (this.width / 4), ((this.settingsDivisionX - 4) * this.cellSize) + this.cellSize + this.spaceBetweenCells * 2, this.cellSize, this.cellSize);
			// break;
		// case 8 : 
			// context.fillRect((this.settingsDivisionX * this.cellSize) + this.cellSize + this.spaceBetweenCells, this.getY() + (this.height / 4), this.cellSize, this.cellSize);
			// context.fillRect(((this.settingsDivisionX + 1) * this.cellSize) + this.cellSize + this.spaceBetweenCells * 2, this.getY() + (this.height / 4), this.cellSize, this.cellSize);
			// break;
	}
}
 */

// Draw the panel displaying the wave&enemies infos
HUD.prototype.drawWaveDivision = function(context) {
	// Panel title
	
	this.drawButtonDegrade(context, this.btnTitleWave, this.buttonEnemiesColors, '    Enemies', this.fontSizeTitle);
	
	// Enemies infos
	// console.info(battlefield.nextWave + 1);
	context.font = 'bold 16px Calibri';
	context.fillText('Next Wave : ', this.panelDown.x + (this.cellSize / 2) - 4, this.panelDown.y + (this.panelDown.height / 3));
	context.font = 'normal 16px Calibri';
	context.fillText('Wave ' + ig_wavesCurrent, this.panelDown.x + (this.cellSize / 2) - 4, this.panelDown.y + (this.panelDown.height / 3) + this.cellSize);
	try {
		var textNextWave = ig_waves[ig_wavesCurrent - 1][2]
	}
	catch (error) {
	
	}
	context.font = 'italic 16px Calibri';
	context.fillText(textNextWave, this.panelDown.x + (this.cellSize / 2) - 4, this.panelDown.y + (this.panelDown.height / 2 + (this.cellSize / 2) + 4));
	textNextWave = ig_waves[ig_wavesCurrent - 1][3]
	context.fillText(textNextWave, this.panelDown.x + (this.cellSize / 2) - 4, this.panelDown.y + (this.panelDown.height / 2) + this.cellSize + 4);
	
	
	// Button next wave
	// var btnW = 100;
	// var btnH = 30;
	// var angle = 10;
	this.drawButtonDegrade(context, this.btnWave, this.buttonEnemiesColors, '   Send wave', this.fontSizeButton);
}

// Old
HUD.prototype.settingsButtonHover = function(mouseEvent) {
	var btnRangeX = (this.settingsDivisionX * this.cellSize);
	var btnRangeY = this.getY() + (this.height / 4);
	var btnSaveX = ((this.settingsDivisionX + 1) * this.cellSize) + this.spaceBetweenCells;
	var btnSaveY = this.getY() + (this.height / 4);
	var btnHomeX = ((this.settingsDivisionX + 2) * this.cellSize) + this.spaceBetweenCells * 2;
	var btnHomeY = this.getY() + (this.height / 4);
	// Button Ranges
	if (mouseEvent.x >= btnRangeX && mouseEvent.x < btnRangeX + 32 && mouseEvent.y >= btnRangeY && mouseEvent.y < btnRangeY + 32) {
		// console.info('range');
		this.settingsButtonHoverID = 1;
	}
	// Button Save
	else if (mouseEvent.x >= btnSaveX && mouseEvent.x < btnSaveX + 32 && mouseEvent.y >= btnSaveY && mouseEvent.y < btnSaveY + 32) {
		// console.info('save');
		this.settingsButtonHoverID = 2;
	}
	// Button Home
	else if (mouseEvent.x >= btnHomeX && mouseEvent.x < btnHomeX + 32 && mouseEvent.y >= btnHomeY && mouseEvent.y < btnHomeY + 32) {
		// console.info('home');
		this.settingsButtonHoverID = 3;
	}
	else {
		// console.info('none');
		this.settingsButtonHoverID = 0;
	}
}

// Return true if the mouse is over the specified button
HUD.prototype.isHoverButton = function(mouseEvent, button) {
	// console.info(mouseEvent.x + ', ' + mouseEvent.y);
	// console.info(button.x + ', ' + button.y);
	// console.info(button.width + ', ' + button.height);
	if (mouseEvent.x >= button.x && mouseEvent.x < button.x + button.width && mouseEvent.y >= button.y && mouseEvent.y < button.y + button.height) {
		return true;
	}
	return false;
}

// Old
HUD.prototype.drawIconRange = function(context, x, y) {
	// if the mouse isn't over the range button
	if (this.settingsButtonHoverID != 1) {
		// if the range button isn't triggered
		if (!this.rangeButtonTriggered) {
			context.fillStyle = this.cellColor;
			context.globalAlpha = 1.0;
			context.fillRect(x, y, this.cellSize, this.cellSize);
			// this.drawTileIcon(context, x, y);
			context.strokeStyle = '#DDDDDD';
			context.lineWidth = 1;
			context.globalAlpha = 0.3;
		}
		// if the range button is triggered
		else {
			context.fillStyle = this.cellColor;
			context.globalAlpha = 1.0;
			context.fillRect(x, y, this.cellSize, this.cellSize);
			context.strokeStyle = '#0099FF';
			context.strokeRect(x, y, this.cellSize, this.cellSize);
			context.lineWidth = 2;
			context.globalAlpha = 0.3;			
		}
	}
	// if the mouse is over the range button
	else {
		context.fillStyle = this.cellColorHover;
		context.globalAlpha = 1.0;
		context.strokeStyle = '#FFFFFF';
		context.fillRect(x, y, this.cellSize, this.cellSize);
		context.strokeRect(x, y, this.cellSize, this.cellSize);		
		context.strokeStyle = '#EEEEEE';
		context.globalAlpha = 0.3;
	}
	context.beginPath();
	context.arc(x + 16, y + 16, 10, 0, 360);
	context.closePath();
	context.stroke();
}

// Old
HUD.prototype.drawIconSave = function(context, x, y) {
	if (this.settingsButtonHoverID != 2) {
		context.fillStyle = this.cellColor;
		context.globalAlpha = 1.0;
		context.fillRect(x, y, this.cellSize, this.cellSize);
		context.strokeStyle = '#DDDDDD';
		context.lineWidth = 1;
		context.globalAlpha = 0.3;

	}
	else {
		context.fillStyle = this.cellColorHover;
		context.globalAlpha = 1.0;
		context.strokeStyle = '#FFFFFF';
		context.lineWidth = 1;
		context.fillRect(x, y, this.cellSize, this.cellSize);
		context.strokeRect(x, y, this.cellSize, this.cellSize);	
		context.strokeStyle = '#EEEEEE';
		context.globalAlpha = 0.3;		
	}
	context.beginPath();
	context.moveTo(x + 4, y + 4);
	context.lineTo(x + 24, y + 4);
	context.lineTo(x + 28, y + 8);
	context.lineTo(x + 28, y + 28);
	context.lineTo(x + 4, y + 28);
	context.lineTo(x + 4, y + 4);
	context.moveTo(x + 20, y + 4);
	context.lineTo(x + 20, y + 12);
	context.lineTo(x + 8, y + 12);
	context.lineTo(x + 8, y + 4);
	context.moveTo(x + 16, y + 4);
	context.lineTo(x + 16, y + 8);
	context.lineTo(x + 12, y + 8);
	context.lineTo(x + 12, y + 4);
	context.moveTo(x + 24, y + 28);
	context.lineTo(x + 24, y + 16);
	context.lineTo(x + 8, y + 16);
	context.lineTo(x + 8, y + 28);
	context.closePath();
	context.stroke();
}

// Old
HUD.prototype.drawIconHome = function(context, x, y) {
	if (this.settingsButtonHoverID != 3) {
		context.fillStyle = this.cellColor;
		context.globalAlpha = 1.0;
		context.fillRect(x, y, this.cellSize, this.cellSize);
		context.fillStyle = '#AAAAAA';
		context.strokeStyle = '#DDDDDD';
		context.lineWidth = 1;
		context.globalAlpha = 0.3;

	}
	else {
		context.fillStyle = this.cellColorHover;
		context.globalAlpha = 1.0;
		context.strokeStyle = '#FFFFFF';
		context.lineWidth = 1;
		context.fillRect(x, y, this.cellSize, this.cellSize);
		context.strokeRect(x, y, this.cellSize, this.cellSize);	
		context.strokeStyle = '#EEEEEE';
		context.globalAlpha = 0.3;		
	}
	context.beginPath();
	context.moveTo(x + 4, y + 12);
	context.lineTo(x + 16, y + 4);
	context.lineTo(x + 28, y + 12);
	context.lineTo(x + 28, y + 28);
	context.lineTo(x + 4, y + 28);
	context.lineTo(x + 4, y + 12);
	context.lineTo(x + 28, y + 12);
	context.closePath();
	context.stroke();
}

// Old
HUD.prototype.drawTileIcon = function(context, x, y) {
	var degrade = context.createLinearGradient(x + 16, y, x + 16, y + this.cellSize);
	degrade.addColorStop(0, "#AAAAAA");
	degrade.addColorStop(1, "#444444");
	context.fillStyle = degrade;
	context.fillRect(x, y, this.cellSize, this.cellSize);
}

// Create a button (data)
HUD.prototype.createButton = function(x, y, w, h, r, b) {
	var btn = {
		'x' : x,
		'y' : y,
		'width' : w,
		'height' : h,
		'radius' : r,
		'state' : 1,
		'isButton' : b
	};
	this.buttons.push(btn);
	return btn;
}

// Draw the existing buttons
HUD.prototype.drawButtonDegrade = function(context, button, colors, text, fontSize) {
	var x = button.x;
	var y = button.y;
	var w = button.width;
	var h = button.height;
	var r = button.radius;
	var state = button.state;
	var degradeWave = context.createLinearGradient(x + (w / 2), y, x + (w / 2), y + h);
	degradeWave.addColorStop(0, colors[state][0]);
	degradeWave.addColorStop(0.2, colors[state][1]);
	degradeWave.addColorStop(0.9, colors[state][2]);
	context.beginPath();
	context.moveTo(x + r, y);
	context.lineTo(x + w - r, y);
	context.quadraticCurveTo(x + w, y, x + w, y + r);
	context.lineTo(x + w, y + h - r);
	context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	context.lineTo(x + r, y + h);
	context.quadraticCurveTo(x, y + h, x, y + h - r);
	context.lineTo(x, y + r);
	context.quadraticCurveTo(x, y, x + r, y);
	context.closePath();
	context.fillStyle = degradeWave;
	context.fill();
	context.strokeStyle = colors[3];
	context.stroke();
	var txtLength = text.length * 16;
	context.fillStyle = '#FFFFFF';
	context.font = 'normal ' + fontSize + 'px Calibri';
	context.fillText(text, x, y + (h / 1.5) + 3)
}

// Draw near to the miouse cursor the selected tower being set on the map
HUD.prototype.drawSelectedTowerOnMouse = function(context, mouseEvent, tower) {
	this.imageDraggableTower.src = tower.imageUrl[tower.level];
	var imgX = mouseEvent.x - (this.imageDraggableTower.width / 2);
	var imgY = mouseEvent.y - (this.imageDraggableTower.height / 2);
	context.drawImage(this.imageDraggableTower, imgX, imgY);
}

// Return true if the mouse is over the buttons. iIf true, their state is modified
HUD.prototype.checkHoverButtons = function(mouseEvent) {
	// console.info('hover???');
	for (var btn in this.buttons) {
		if (this.buttons[btn]['isButton']) {
			if (this.isHoverButton(mouseEvent, this.buttons[btn])) {
				this.buttons[btn].state = 0;
				// console.info('hover');
			}
			else {
				this.buttons[btn].state = 1;
			}
		}
	}
}


