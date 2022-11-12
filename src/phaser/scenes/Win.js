import { ButtonLost } from "../botons/ButtonLost";
export default class Win extends Phaser.Scene{
    constructor(){
        super({key : 'Win'});
        this.play = new ButtonLost(this);
    }

    preload(){
        this.load.image('Wingame','img/phaser/winGame.png'); //se carga la imagen de WinGame
        this.play.preload();//se llama al preload del play
    }
 
    create(){
        this.game.config.backgroundColor.setTo(0, 0, 0);
        this.add.image(500,200,'Wingame').setScale(.5);; //se agrega a la imagen y se modifica el tamaño
        this.play.create();//Aqui se llama la funcion para mostrar el buttonLost en la escena
    }
}