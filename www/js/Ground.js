define(['phaser'], function (Phaser) {
	'use strict';

	function Ground(game, x, y, width, height, sprite) {
		Phaser.TileSprite.call(this, game, x, y, width, height, sprite);

		// enable arcade physics
		this.game.physics.arcade.enableBody(this);

		// setup body
		this.body.allowGravity = false;
		this.body.immovable = true;
	}

	Ground.prototype = Object.create(Phaser.TileSprite.prototype);
	Ground.prototype.constructor = Ground;

	return Ground;
});