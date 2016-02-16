function Wave(enemies, timeInterval) {
	this.enemies = enemies || [];
	this.timeInterval = timeInterval;
	this.nextEnemy = -1;
	this.numberOfEnemies = this.enemies.length;
}

// Return the next enemy which will appear on the map
Wave.prototype.nextEnemyEntry = function() {
	if (this.nextEnemy + 1 < this.enemies.length - 1) {
		this.nextEnemy++;
		return this.enemies[this.nextEnemy];
	}
	// If there isn't anymore enemy to sent out on the map
	return false;
}

