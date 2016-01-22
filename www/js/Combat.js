define(['phaser'], function (Phaser) {
	'use strict';

	function Combat() {
		// code me!
	}

	Combat.prototype.constructor = Combat;

	Combat.prototype._initiative = function (eAtk, eDef) {
		var eAtkInit = eAtk.initiative();
		var eDefInit = eDef.initiative();

		if (eAtkInit > eDefInit) {
			return 1;
		} else if (eAtkInit === eDefInit) {
			if (eAtk.attr.hab > eDef.attr.hab) {
				return 1;
			}
		}

		return 0;
	};

	Combat.prototype._turn = function (eAtk, eDef) {
		if (!eDef.dodge(eAtk)) {
			var hit = Math.abs(eAtk.atkPower() - eDef.defPower());

			eDef.damage(hit);

			return hit;
		}

		return 0;
	};

	Combat.prototype.fight = function (eAtk, eDef) {
		var status = this._initiative(eAtk, eDef);

		if (status) {
			var result = this._turn(eAtk, eDef);

			if (result === 0) {
				eDef.showCombat('MISS');
			} else {
				eDef.showCombat(result);
			}
		} else {
			eAtk.showCombat('FAIL');
		}
	};

	return Combat;
});