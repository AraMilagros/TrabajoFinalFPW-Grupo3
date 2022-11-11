//Esta clase solo se encargara de precargar todos lo necesario para ser mostrado
export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload(){
        this.load.tilemapTiledJSON('mapa', 'img/phaser/mapa/mapa.json');
        this.load.spritesheet('player',
            'img/phaser/player2.png',
            { frameWidth: 460, frameHeight: 593 }
        );
        this.load.image('tiles', 'img/phaser/mapa/tileSets.png');

        this.load.image('plataformaRoja', 'img/phaser/plataformaRoja.png');
        this.load.image('trophy', 'img/phaser/trophy.png');
        this.load.image('ghost', 'img/phaser/ghost.png');

        this.load.image('Menu','img/phaser/menuGame.png'); //se carga la imagen de menu
        this.load.image('G.O','img/phaser/gameover.png'); //se carga la imagen de game over
        
    }

    //Una vez que se haya precargado lo necesario
    //  se llamara a la clase principal, donde la escena del juego terminara de crearse
    create(){
        this.scene.start('Menu');
    }
}