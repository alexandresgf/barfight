define(['phaser', 'Entity', 'Combat'], function (Phaser, Entity, Combat) {
	'use strict';

	function Character(game, x, y, character) {
		Entity.call(this, game, x, y, character);

		// character name
		this.name = character.name;

		// character attributes
		this._attr = {
			str: character.attr.str,
			hab: character.attr.hab,
			end: character.attr.end,
			arm: character.attr.arm,
			pow: character.attr.pow
		};

		// health points
		this.health = (this._attr.end === 0) ? 1 : (this._attr.end * 5);

		// maximum value of health
		this.maxHealth = this.health;

		// stamina points
		this._stamina = this.health;

		// experience points
		this._xp = 0;

		// equipped item
		this._equipped = null;

		// combat object
		this._combat = new Combat();

		// combat status text
		this._printCombat = this.game.add.text(x, y);

		// setup combat text
		this._printCombat.anchor.set(0.5);

		// change bound box collision mask
		this.body.setSize(this.width / 2, this.height, 0, 0);

		// set current frame
		this.frame = 7;
	}

	Character.prototype = Object.create(Entity.prototype);
	Character.prototype.constructor = Character;

	Character.prototype._roll = function () {
		return this.game.rnd.integerInRange(1, 6);
	};

	Character.prototype.setCombatText = function (x, y) {
		this._printCombat.x = x;
		this._printCombat.y = y;
	};

	Character.prototype.showCombat = function (value) {
		var status = this.game.add.text(this.x, this.y, value);
		var animText = this.game.add.tween(status);
		var posY = this.y;

		status.anchor.set(0.5);
		animText.to({y: posY - 50}, 500, Phaser.Easing.Elastic.Out);
		animText.onComplete.add(function () {
			status.destroy();
		});
		animText.start();
	};

	Character.prototype.dodge = function (pAtk) {
		var dodge = this._attr.hab - pAtk._attr.hab;

		if (dodge > 0 && this._roll() <= dodge) {
			return true;
		}

		return false;
	};

	Character.prototype.atkPower = function () {
		return this._attr.hab + this._attr.str + this._roll();
	};

	Character.prototype.defPower = function () {
		return this._attr.hab + this._attr.arm + this._roll();
	};

	Character.prototype.initiative = function () {
		return this._attr.hab + this._roll();
	};

	Object.defineProperty(Character.prototype, 'attr', {
		get: function () {
			return this._attr;
		}
	});

	return Character;
});