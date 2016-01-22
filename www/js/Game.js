define(
	[
		'phaser',
		'Ground',
		'Player',
		'Enemy'
	],

	function (Phaser, Ground, Player, Enemy) {
		'use strict';

		function Game (game) {
	        // use init method!
	    }

	    Game.prototype.constructor = Game;

		Game.prototype.init = function () {
			// google analytics track game screen
			//window.analytics.trackView('Bar Fight - Game Screen');

			// load entities
			this._entity = this.game.cache.getJSON('entity');
		};

	    Game.prototype.create = function () {
		    // change background color
		    this.game.stage.backgroundColor = '#5bb4ff';

		    // enable physics system
		    this.game.physics.startSystem(Phaser.Physics.ARCADE);

		    // set gravity on y-axis
		    this.game.physics.arcade.gravity.y = 900;

		    // create enemy group
		    this._enemies = this.game.add.group();

		    // create scene
		    this._ground = new Ground(this.game, 0, this.game.height - 160, this.game.width, 160, 'ground');

		    // create entities
		    this._player = new Player(this.game, this.game.width / 2, this.game.height / 2, this._entity.player);
		    this._enemies.add(new Enemy(this.game, 10, this.game.height / 2, this._entity.enemy, this._player));
		    this._enemies.add(new Enemy(this.game, this.game.width - 10, this.game.height / 2, this._entity.enemy, this._player));

		    // adding to the game
		    this.game.add.existing(this._ground);
		    this.game.add.existing(this._player);
	    };

		Game.prototype.update = function () {
			// ground collision
			this.game.physics.arcade.collide(this._ground, this._player);
			this.game.physics.arcade.collide(this._ground, this._enemies);

			// enemy collision
			this.game.physics.arcade.collide(this._enemies, this._player);

			// check if the game is over
			this.gameOver();
		};

		Game.prototype.gameOver = function () {
			if (!this._player.alive) {
				this.game.state.start('Game');
			} else if (this._enemies.getFirstAlive() == null) {
				this.game.state.start('Game');
			}
		};

		Game.prototype.save = function () {
			// code me!
		};

	    return Game;
	}
);