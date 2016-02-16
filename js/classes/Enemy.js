function Enemy(battlefield, name, type, url, x, y, life, armor, speed, reward) {
	this.id = battlefield.enemies.length;
	this.name = name;
	this.type = type;
	this.image = new Image();
	this.image.src = url;
	this.life = life;
	this.armor = armor;
	this.speed = speed;
	this.image.referenceDuSprite = this;
	this.image.onload = function() {
		if (!this.complete) {
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		}
		this.referenceDuSprite.width = this.width / 4;
		this.referenceDuSprite.height = this.height / 4;
	}
	this.sprite = new Sprite(url, 0);
	this.sprite.x = x;
	this.sprite.y = y;
	this.nextJunctionPoint = 0;
	this.battlefieldWidth = battlefield.width;
	this.battlefieldHeight = battlefield.height;
	this.reward = reward;
	this.isABoss = false;
	this.status = 'none';
}

// Draw the enemy
Enemy.prototype.draw = function(context) {
	// context.fillStyle = '#FF5555';
	this.majSprite();
	this.sprite.drawSprite(context, this.sprite.x + (32 - this.sprite.width) / 2, this.sprite.y + (32 - this.sprite.height) / 2);
	// context.fillRect(this.x + (32 - this.width) / 2, this.y + (32 - this.height) / 2, this.width, this.height);
	// context.drawImage(this.image, 0, this.direction * this.height, this.width, this.height, this.x + (32 - this.width) / 2, this.y + (32 - this.height) / 2, this.width, this.height);
}

// Update the next destination
Enemy.prototype.move = function(junctionPoints) {
	if (!this.moveTo(junctionPoints[this.nextJunctionPoint].x, junctionPoints[this.nextJunctionPoint].y)) {
		if (this.nextJunctionPoint < junctionPoints.length - 1) {
			this.nextJunctionPoint++;
		}
	}
}

// Make the enemy move toward the next junctionPoint
Enemy.prototype.moveTo = function(jpx, jpy) {
	this.feelEffect();
	var moveRight;
	var moveDown;
	jpx *= 32;
	jpy *= 32;
	if (this.x < jpx) {
		moveRight = 1;
		this.direction = 2;
	}
	else if (this.x > jpx){
		moveRight = -1;
		this.direction = 1;
	}
	else {
		moveRight = 0;
	}
	if (this.y < jpy) {
		moveDown = 1;
		this.direction = 0;
	}
	else if (this.y > jpy){
		moveDown = -1;
		this.direction = 3;
	}
	else {
		moveDown = 0;
	}
	if (moveRight != 0 || moveDown != 0) {
		this.x += moveRight * this.speed;
		this.y += moveDown * this.speed;
		return true;
	}
	else {
		return false;
	}
}

// Destruct itself
Enemy.prototype.destruct = function() {
	// this.battlefield.tdGameParent.increaseMoney(this.reward);
	ig_money += this.reward;
	ig_enemiesKilled +=1;
	battlefield.enemies = battlefield.middlepop(battlefield.enemies, parseInt(this.id));
	battlefield.enemies = battlefield.majTab(battlefield.enemies);
}

// Update the enemy's sprite
Enemy.prototype.majSprite = function() {
	this.sprite.direction = this.direction;
	this.sprite.x = this.x;
	this.sprite.y = this.y;
}

// Make the enemy suffer from its bad status
Enemy.prototype.feelEffect = function() {
	// Poison effect => Reducing enemies' life
	if (this.status == ig_effects[0]) {
		this.life -= ig_enemies[this.name].life * ig_effectPoisonPercentLiveLost;
	}
	// Ice effect => Slowing enemies
	else if (this.status == ig_effects[1]) {		
		var lowSpeed = ig_enemies[this.name].speed * ig_effectIcePercentSpeed;
		this.speed = lowSpeed;
	}
}

