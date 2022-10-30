//Esta clase solo se encargara de precargar todos lo necesario para ser mostrado
export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload(){
        this.load.tilemapTiledJSON('mapa', 'img/phaser/mapa/mapa.json');
        this.load.spritesheet('dude',
            'img/phaser/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.image('tiles', 'img/phaser/mapa/tileSets.png');

        this.load.image('plataformaRoja', 'img/phaser/plataformaRoja.png');
    }

    //Una vez que se haya precargado lo necesario
    //  se llamara a la clase principal, donde la escena del juego terminara de crearse
    create(){
        this.scene.start('Principal');
    }
}