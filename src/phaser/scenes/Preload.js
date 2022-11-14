//Esta clase solo se encargara de precargar todos lo necesario para ser mostrado
export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        this.load.setBaseURL('http://localhost:3000');
        this.load.tilemapTiledJSON('mapa2', 'img/phaser/mapa/mapa.json');
        this.load.tilemapTiledJSON('mapa', 'img/phaser/mapa/mapa.json');
        this.load.spritesheet('player',
            'img/phaser/player2.png',
            { frameWidth: 460, frameHeight: 593 }
        );
        this.load.image('tiles', 'img/phaser/mapa/tileSets.png');
        this.load.image('tiles2', 'img/phaser/mapa/tileSets2.png');

        this.load.image('plataformaRoja', 'img/phaser/plataformaRoja.png');
        this.load.image('plataformaMorada', 'img/phaser/plataforma2.png');

        this.load.image('trophy', 'img/phaser/trophy.png');
        this.load.image('ghost', 'img/phaser/ghost.png');
        this.load.image('ghost2', 'img/phaser/ghost2.png');

        this.load.image('Menu', 'img/phaser/menuGame.png'); //se carga la imagen de menu
        this.load.image('G.O', 'img/phaser/gameover.png'); //se carga la imagen de game over
        this.load.image('SeleccionNivel', 'img/phaser/seleccioneunnivel.png')

        this.load.audio('jump', 'img/phaser/jump.mp3');
        this.load.audio('fondo', 'img/phaser/Fondo.mp3');
        this.load.audio('trophy', 'img/phaser/mario-coin.mp3');
        this.load.audio('victory', 'img/phaser/VictoryGame.mp3');
        this.load.audio('GameOver', 'img/phaser/gameOver.mp3');
        this.load.audio('menMusic', 'img/phaser/MusicMenuJump.mp3');

        this.load.spritesheet('level1',
            'img/phaser/N1button.png',
            { frameWidth: 240, frameHeight: 120 }
        );

        this.load.spritesheet('level2',
            'img/phaser/N2button.png',
            { frameWidth: 240, frameHeight: 140 }
        );

        this.load.spritesheet('buttonLost',
            'img/phaser/buttonmenu.png',
            { frameWidth: 240, frameHeight: 120 }
        );

        this.load.spritesheet('buttonRes',
            'img/phaser/buttonRestart.png',
            { frameWidth: 350, frameHeight: 140 }
        );

    }

    //Una vez que se haya precargado lo necesario
    //  se llamara a la clase principal, donde la escena del juego terminara de crearse
    create() {
        this.scene.start('Menu');
    }
}