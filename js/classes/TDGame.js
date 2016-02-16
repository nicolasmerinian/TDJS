function TDGame(playerName, startLives, startMoney, difficulty, battlefield, waves, towersAllowed) {
	this.playerName = playerName;
	this.lives = startLives;
	this.money = startMoney;
	this.difficulty = difficulty;
	this.battlefield = battlefield;
	this.waves = waves;
	this.currentWave = 0;
	this.towersAllowed = towersAllowed;
	this.nbEnemiesKilled = 0;
}

TDGame.prototype.initialize = function(context) {
	this.battlefield.initialize(context);
	// this.waves
}

TDGame.prototype.increaseLives = function(deltaLife) {
	this.lives += deltaLife;
}

TDGame.prototype.decreaseLives = function(deltaLife) {
	this.lives -= deltaLife;
	if (this.lives < 0) {
		this.lives = 0;
	}
}

TDGame.prototype.increaseMoney = function(deltaMoney) {
	this.money += deltaMoney;
}

TDGame.prototype.decreaseMoney = function(deltaMoney) {
	this.money -= deltaMoney;
	if (this.money < 0) {
		this.money = 0;
	}
	ig_money -= deltaMoney;
	if (ig_money < 0) {
		ig_money = 0;
	}
}

TDGame.prototype.increaseScore = function(deltaScore) {
	ig_score += deltaScore;
}

TDGame.prototype.decreaseScore = function(deltaScore) {
	ig_score -= deltaScore;
	if (ig_score < 0) {
		ig_score = 0;
	}
}

TDGame.prototype.setDifficulty = function(difficulty) {
	this.difficulty = difficulty;
}

TDGame.prototype.nextWave = function() {
	this.currentWave++;
	console.info('wave ++');
}

TDGame.prototype.setWaves = function(newWaves) {
	this.waves = newWaves;
}

TDGame.prototype.createEnemy = function(battlefield, id) {
	var enemyName = 'enemy' + id;
	var enemy = new Enemy(battlefield, 0, ig_enemies[enemyName]['imageUrl'], 0, 0, ig_enemies[enemyName]['life'], ig_enemies[enemyName]['speed'], ig_enemies[enemyName]['armor'], ig_enemies[enemyName]['reward']);
	return enemy;
}

TDGame.prototype.createTower = function(battlefield, name, x, y) {
	for (var tower in ig_towers) {
		if (ig_towers[tower]['name'] == name) {
			aff(name + ' => ' + ig_towers[tower]['name']);
			var tower = new Tower(battlefield, ig_towers[tower]['name'], ig_towers[tower]['num']['level'], ig_towers[tower]['type']['level'], ig_towers[tower]['imageUrl']['level'], x, y, ig_towers[tower]['atk']['level'], ig_towers[tower]['range']['level'], ig_towers[tower]['rate']['level'], ig_towers[tower]['price']['level']);
			battlefield.addTower(tower);
		}
	}
}

TDGame.prototype.increaseEnemiesKilled = function() {
	this.nbEnemiesKilled++;
}

TDGame.prototype.upgradeTower = function(tower) {
	tower.upgrade();
}

TDGame.prototype.setHUD = function(HUD) {
	this.battlefield.setHUD(HUD);
}

TDGame.prototype.setJunctionPoints = function(junctionPoints) {
	this.battlefield.junctionPoints = junctionPoints;
}

TDGame.prototype.refresh = function(context, mouse) {
	this.battlefield.HUD.checkHoverButtons(mouse);
	this.battlefield.refresh(context, mouse);
}


