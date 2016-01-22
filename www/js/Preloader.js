define(['phaser'], function (Phaser) {
    'use strict';
    
    function Preloader (game) {
        // use init method!
    }
    
    Preloader.prototype.constructor = Preloader;
    
    Preloader.prototype.preload = function () {
	    // load spritesheet
        this.load.spritesheet('spr_player', 'assets/images/spr_player.png', 72, 96);
        this.load.spritesheet('spr_enemy', 'assets/images/spr_enemy.png', 72, 96);

	    // load images
	    this.load.image('ground', 'assets/images/ground.png');

	    // load json config files
	    this.load.json('entity', 'assets/entity.json');
    };
    
    Preloader.prototype.create = function () {
        this.game.state.start('Game');
    };
    
    return Preloader;
});