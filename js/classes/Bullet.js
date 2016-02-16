function Bullet(nBullets, towerOrigin, target, shape, size, color, borderColor, url, damage, speed, multihits, effect) {
	this.id = nBullets;
	this.image = new Image();
	this.image.src = url;
	this.damage = damage;
	this.speed = speed;
	this.x = towerOrigin.x;
	this.y = towerOrigin.y;
	this.targetX = target.x;
	this.targetY = target.y;
	this.multihits = multihits;
	this.effect = effect || 'none';
	this.shapeID = shape;
	this.width = size[0];
	this.height = size[1];
	this.image.referenceDuSprite = this;
	this.image.onload = function() {
		if (!this.complete) {
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		}
		this.referenceDuSprite.width = this.width;
		this.referenceDuSprite.height = this.height;
	}
	// this.battlefieldWidth = battlefield.width;
	// this.battlefieldHeight = battlefield.height;
	this.towerOrigin = towerOrigin;
	this.range = towerOrigin.range;
	this.a = 0;
	this.b = 0;
	this.findEquation({x : this.towerOrigin.x, y : this.towerOrigin.y}, {x : this.targetX, y : this.targetY});
	this.backX;
	this.color = color;
	this.borderColor = borderColor;
	this.shape = ['square', 'round'];
	this.timerBullet = 0;
	this.imageStep = 0;
}

// Draw the bullet according to its towerOrigin
Bullet.prototype.draw = function(context) {
	if (this.image === undefined || this.image.src == '') {
		context.fillStyle = this.color;
		context.strokeStyle = this.borderColor;
		context.globalAlpha = 1.0;
		if (this.shape[this.shapeID] == 'square') {
			context.fillRect(this.x + (32 - this.width) / 2, this.y + (32 - this.height) / 2, this.width, this.height);
			context.strokeRect(this.x + (32 - this.width) / 2, this.y + (32 - this.height) / 2, this.width, this.height);
		}
		else if (this.shape[this.shapeID] == 'round') {
			context.lineWidth = 1;
			context.beginPath();
			context.arc(this.x + ((this.towerOrigin.width - this.width) / 2) + (this.width / 2), this.y + ((this.towerOrigin.height - this.height) / 2) + (this.height / 2), parseInt((this.width + this.height) / 4), 0, 360);
			context.closePath();
			context.fill();
			context.stroke();
		}
	}
	else {
		// context.drawImage(this.image, 0 + (this.width / 4) * this.imageStep, 0, this.width / 4, this.height, this.x + ((this.towerOrigin.width - this.width) / 2) + (this.width / 2), this.y + ((this.towerOrigin.height - this.height) / 2) + (this.height / 2), this.width / 4, this. height);
		context.drawImage(this.image, 0 + (this.width / 4) * this.imageStep, 0, this.width / 4, this.height, this.x, this.y, this.width / 4, this. height);
		// this.timerBullet++;
		// if (this.timerBullet % 1 == 0) {
			this.imageStep++;
			if (this.imageStep > 3) {
				this.imageStep = 0;
			}
		// }
	}
}

// Detruct itself
Bullet.prototype.destruct = function() {
	battlefield.bullets = battlefield.middlepop(battlefield.bullets, parseInt(this.id));
	battlefield.bullets = battlefield.majTab(battlefield.bullets);
}

// Proceed the equation to find the trajectory the bullet will move along
Bullet.prototype.findEquation = function(tower, enemy) {
	this.a = (enemy.y - tower.y) / (enemy.x - tower.x);
	this.b = tower.y - (this.a * tower.x);
	if (tower.x >= enemy.x) {
		this.backX = -1;
	}
	else {
		this.backX = 1;
	}
}

// Make the bullet move ahead according to the equation proceeded
Bullet.prototype.moveAhead = function() {
	this.x += (this.speed * this.backX);
	this.y = (this.x * this.a) + this.b;
}

// Return the distance from itself to its originTower
Bullet.prototype.distToOrigin = function() {
	var d1 = this.x - this.towerOrigin.x;
	var d2 = this.y - this.towerOrigin.y;
	d1 = Math.pow(d1, 2);
	d2 = Math.pow(d2, 2);
	var dist = d1 + d2;
	dist = Math.sqrt(dist);
	return dist;
}

// If the bullet is out of the originTower's range, it will destruct itself
Bullet.prototype.checkRangeLimit = function() {
	if (this.distToOrigin() >= this.range) {
		this.destruct();
	}
}

// Update the bullet
Bullet.prototype.update = function() {
	this.moveAhead();
	// this.checkRangeLimit();
}

// Check if the bullet touches the specified enemy
Bullet.prototype.impact = function(enemy) {
	if (this.x >= enemy.x && this.x < enemy.x + enemy.width && this.y >= enemy.y && this.y < enemy.y + enemy.height) {
		this.inflictDamageTo(enemy);
		if (!this.multihits) {
			this.destruct();
		}
	}
}

// Do damage to the specified enemy according to effects and/or the strength of the tower
Bullet.prototype.inflictDamageTo = function(enemy) {
	for (var effect in ig_effects) {
		if (this.effect == ig_effects[effect]) {
			enemy.status = this.effect;
		}
	}
	var damages = this.damage;
	enemy.life -= damages;
	if (enemy.life <= 0) {
		enemy.destruct();
	}
}



