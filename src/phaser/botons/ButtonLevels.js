export class ButtonLevels {

    constructor(scene) {
        //Es la escena donde se agregara el button
        this.relatedScene = scene;
    }


    preload() {
        //Se carga el siguiente sprite 
        //es un sprite del mismo button1 que simula estando y no presionado
        this.relatedScene.load.spritesheet('Levels',
            'img/phaser/Levels.png',
            { frameWidth: 350, frameHeight: 140 }
        );

    }

    create() {
        //Se agrega el sprite en la escena
        this.start = this.relatedScene.add.sprite(500, 500, 'Levels').setInteractive().setScale(.6);

        this.start.on('pointerover', () => {
            //Cuando el cursor este encima del button, cambiara al siguiente frame que simula que el button fue presionado
            this.start.setFrame(1);
        });
        this.start.on('pointerout', () => {
            //Y cuando el cursor ya no este encima del button, volvera al primer frame
            this.start.setFrame(0);       
        });
        this.audio = this.relatedScene.sound.add("fondo", {loop : true});
        this.start.on('pointerdown', () => {
            //Recien cuando se detecte un click encima del button, volvera a cargar la escena del Nivel1
            this.relatedScene.scene.start('Niveles');
        });
    }
}
