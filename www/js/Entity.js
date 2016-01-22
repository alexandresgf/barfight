define(['phaser'], function (Phaser) {
	'use strict';

	function Entity(game, x, y, character) {
		Phaser.Sprite.call(this, game, x, y, character.sprite);

		// enable arcade physics
		this.game.physics.arcade.enableBody(this);

		// setup body
		this.body.allowGravity = true;

		// set coordinates in the center of sprite
		this.anchor.set(0.5);
	}

	Entity.prototype = Object.create(Phaser.Sprite.prototype);
	Entity.prototype.constructor = Entity;

	return Entity;
});