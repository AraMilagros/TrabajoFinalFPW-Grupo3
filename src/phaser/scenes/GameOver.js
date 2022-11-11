import { ButtonLost } from "../botons/ButtonLost";
export default class Menu extends Phaser.Scene{
    constructor(){
        super({key : 'GameOver'});
        this.play = new ButtonLost(this);
    }

    preload(){
        this.play.preload();
    }
 
    create(){
        this.game.config.backgroundColor.setTo(0, 0, 0);
        this.add.image(500,200,'G.O').setScale(1); //se agrega a la imagen y se modifica el tamaño
        this.play.create();//Aqui se llama la funcion para mostrar el buttonLost en la escena
    }
}