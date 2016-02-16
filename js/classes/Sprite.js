function Sprite(url, direction) {
	this.direction = direction;
	this.image = new Image();
	this.image.referenceDuSprite = this;
	this.image.onload = function() {
		if (!this.complete) {
			throw "Erreur de chargement du spritenommé \"" + url + "\".";
		}
		this.referenceDuSprite.width = this.width / 4;
		this.referenceDuSprite.height = this.height / 4;
	}
	this.image.src = url;
	this.x = undefined;
	this.y = undefined;
}

Sprite.prototype.drawSprite = function(context, posX, posY) {
	context.drawImage(this.image, 0, this.direction * this.height, this.width, this.height, posX, posY, this.width, this.height);
}

