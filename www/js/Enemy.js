define(['phaser', 'Character'], function (Phaser, Character) {
	'use strict';

	function Enemy (game, x, y, character, player) {
		Character.call(this, game, x, y, character);

		// keep player reference
		this._player = player;

		// allow click
		this.inputEnabled = true;

		// set callback function onInputUp
		this.events.onInputUp.add(this._player.attack, this._player, 0, this);
	}

	Enemy.prototype = Object.create(Character.prototype);
	Enemy.prototype.constructor = Enemy;

	Enemy.prototype.update = function () {
		this.setCombatText(this.x, this.y - 50);

		if (this.alive) {
			if (this.body.touching.left || this.body.touching.right) {
				this._combat.fight(this, this._player);
			} else {
				this.game.physics.arcade.moveToObject(this, this._player);
			}
		}
	};

	return Enemy;
});