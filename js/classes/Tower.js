function Tower(battlefield, name, num, type, url, x, y, atk, range, rate, effect, price) {
	this.name = name;
	this.num = num;;
	this.type = type;
	this.level = 0;
	this.image = new Image();
	this.image.src = url;
	this.x = x * 32;
	this.y = y * 32;
	this.atk = atk;
	this.range = range;
	this.rate = rate;
	this.targets = [];
	this.effect = effect;
	this.price = price;
	// temp
	this.lineColor = '#DDAA33';
	this.image.referenceDuSprite = this;
	this.image.onload = function() {
		if (!this.complete) {
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		}
		this.referenceDuSprite.width = this.width;
		this.referenceDuSprite.height = this.height;
	}
	this.timerCount = -28;
	this.timerLap = function() { return parseInt(1000 / (this.rate * TIMER_GAME))};
	// this.bulletModel = [1, [10, 10], '#FFAA55', '#AA5500', '', 12, 10, false, null];
}

Tower.prototype.inRange = function(context, enemy) {
	context.beginPath();
	context.arc(this.x + (this.width / 2), this.y + (this.height / 2), parseInt(this.range * 0.9), 0, 360);
	context.closePath();
	return context.isPointInPath(enemy.x, enemy.y);
}

// Check if an enemy is within the tower's range
Tower.prototype.shoot = function(context, enemy) {
	
	// Laser
	// context.strokeStyle = '#FF0000';
	// context.lineWidth = 3;
	// context.beginPath();
	// context.moveTo(this.x + (this.width / 2), this.y + (this.height / 2));
	// context.lineTo(enemy.x + (enemy.width / 1.3), enemy.y + (enemy.height / 1.3));
	// context.closePath();
	// context.stroke();
	
	// Bullet
	// Bullet(nBullets, towerOrigin, target, shape, size, color, borderColor, url, damage, speed, multihits, effect) {
	var bull;
	switch (this.num) {
		// Normal tower
		case 0 :
			bull = new Bullet(battlefield.bullets.length, this, this.targets[0], 1, [10, 10], '#DDDDDD', '#888888', 'graphics/bullets/bullet_normal01.png', this.atk, 10, false, null);
			break;
		// Fire tower
		case 1 :
			bull = new Bullet(battlefield.bullets.length, this, this.targets[0], 1, [9, 9], '#FF8833', '#AA3300', 'graphics/bullets/bullet_fire03.png', this.atk, 12, false, null);
			break;
		// Ice tower
		case 2 :
			bull = new Bullet(battlefield.bullets.length, this, this.targets[0], 1, [10, 10], '#3344FF', '#001188', 'graphics/bullets/bullet_ice01.png', this.atk, 10, false, 'ice');
			break;
		// Poison tower
		case 3 :
			bull = new Bullet(battlefield.bullets.length, this, this.targets[0], 1, [7, 7], '#66FF55', '#11FF00', 'graphics/bullets/bullet_poison01.png', this.atk, 12, false, 'poison');
			break;
		// Thunder tower
		case 4 :
			bull = new Bullet(battlefield.bullets.length, this, this.targets[0], 1, [8, 8], '#FFEE55', '#AA9900', 'graphics/bullets/bullet_thunder01.png', this.atk, 16, false, null);
			break;
		// Earth tower
		case 5 :
			bull = new Bullet(battlefield.bullets.length, this, this.targets[0], 1, [12, 12], '#CCBB22', '#665500', 'graphics/bullets/bullet_earth.png', this.atk, 8, false, null);
			break;
		// Magic tower
		case 6 :
			bull = new Bullet(battlefield.bullets.length, this, this.targets[0], 1, [32, 32], '#CCBB22', '#665500', 'graphics/bullets/bullet_test01.png', this.atk, 8, false, null);
			break;
	}
	battlefield.addBullet(bull);	
}

// Target the next enemy before shooting
Tower.prototype.setTarget = function(context, enemy) {
	if (this.inRange(context, enemy)) {
		if (this.targets.length == 0) {
			this.targets.push(enemy);
		}
	}
}

// Clear all the targets
Tower.prototype.clearTargets = function() {
	this.targets = [];
}

// Update the tower's internal timer
Tower.prototype.updateTimer = function() {
	this.timerCount++;
	if (this.timerCount % this.timerLap() == 0) {
		this.timerCount = 0;
	}
}

// Return true if the tower is ready to shoot again
Tower.prototype.isReloaded = function() {
	return this.timerCount == 0;
}

// Draw the tower's range
Tower.prototype.drawRange = function(context) {
	context.fillStyle = '#555555';
	context.strokeStyle = '#222222';
	context.lineWidth = 1;
	context.globalAlpha = 0.2;
	context.beginPath();
	context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.range, 0, 360);
	context.closePath();
	context.fill();
	context.globalAlpha = 0.4;
	context.stroke();
}

// Destruct itself
Tower.prototype.destruct = function() {
	var length = battlefield.towers.length;
	battlefield.towers = battlefield.middlepop(battlefield.towers, parseInt(this.id));
	battlefield.towers = battlefield.majTab(battlefield.towers);
	return (battlefield.towers.length < length);
}

// Upgrade the tower
Tower.prototype.upgrade = function() {
	if (this.level < ig_levelTowerMax) {
		this.level++;
		// console.info(this.level);
		// console.info(ig_towers['tower' + parseInt(this.num + 1)]);
		this.image.src = ig_towers['tower' + parseInt(this.num + 1)]['imageUrl'][this.level];
		this.atk = ig_towers['tower' + parseInt(this.num + 1)]['atk'][this.level];
		this.range = ig_towers['tower' + parseInt(this.num + 1)]['range'][this.level];
		this.rate = ig_towers['tower' + parseInt(this.num + 1)]['rate'][this.level];
		this.price = ig_towers['tower' + parseInt(this.num + 1)]['price'][this.level];
		tdGame.decreaseMoney(this.price);
	}
}

// Sell the tower
Tower.prototype.sell = function() {
	// for (var tower in ig_towers.length) {
		// if (this.num == ig_towers[tower]['num']) {
			
		// }
	// }
	var money = Math.floor(this.price / 2);
	// Those two duplicate lines are not an error
	var destructed = this.destruct();
	if (!destructed) {
		// Repeat
		destructed = this.destruct();
	}
	if (destructed) {
		ig_map[parseInt(this.y / 32)][parseInt(this.x / 32)] = ig_groundTileTypes['grass'];
		battlefield.HUD.selectedMapTower = [-1, null];
		return money;
	}
	return 0;
}


