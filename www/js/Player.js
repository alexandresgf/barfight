define(['phaser', 'Character'], function (Phaser, Character) {
	'use strict';

	function Player (game, x, y, character) {
		Character.call(this, game, x, y, character);

		// keep target
		this._target = null;
	}

	Player.prototype = Object.create(Character.prototype);
	Player.prototype.constructor = Player;

	Player.prototype.update = function () {
		this.setCombatText(this.x, this.y - 50);

		if (this._target != null) {
			if (this._target.alive && !this._target.body.touching.left && !this._target.body.touching.right) {
				this.game.physics.arcade.moveToObject(this, this._target);
			} else if (!this._target.alive) {
				this._target = null;
			}
		}
	};

	Player.prototype.attack = function (object, pointer, param, enemy) {
		this._target = enemy;

		if (this._target.body.touching.left || this._target.body.touching.right) {
			this._combat.fight(this, this._target);
		}
	};

	return Player;
});