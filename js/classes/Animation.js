function Animation(url, delay, loop, sequence) {
	this.image = new Image();
	this.image.referenceDuTileset = this;
	this.image.onload = function() {
		if (!this.complete) {
			throw new Error('Erreur de chargement du tileset nommé : ' + url + '.');
		}
		this.referenceDuTileset.xTilesNumber= this.width / 192;
	}
	this.image.src = url;
	this.tileSize = 192;
	this.delay = delay;
	this.loop = loop;
	this.sequence = sequence;
}

Animation.prototype.drawTile = function(context, numero, xDestination, yDestination) {
	var xSourceTiles = numero % this.xTilesNumber;
	if (xSourceTiles == 0) {
		xSourceTiles = this.xTilesNumber;
	}
	var ySourceTiles = Math.ceil(numero / this.xTilesNumber);
	var xSource = (xSourceTiles - 1) * this.tileSize;
	var ySource = (ySourceTiles - 1) * this.tileSize;
	context.drawImage(this.image, xSource, ySource, this.tileSize, this.tileSize, xDestination, yDestination, this.tileSize, this.tileSize);
}

Animation.prototype.run = function(context) {
	var num = 1;
	var self = this.
	this.timer = setInterval(
		function() {
			self.drawTile(context, num, 0, 0);
			num++;
			if (num > 10) {
				// if (this.loop) {
					// this.num = 0;
				// }
				// else {
					clearInterval(this.timer);
				// }
			}
		}, this.delay
	);
}