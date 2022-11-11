import { Button1 } from "../botons/Button1";
export default class Menu extends Phaser.Scene{
    constructor(){
        super({key : 'Menu'});
        this.play = new Button1(this);
    }

    preload(){

        this.play.preload();
    }
 
    create(){
        this.game.config.backgroundColor.setTo(0, 0, 0);
        this.add.image(500,200,'Menu').setScale(.5); //se agrega a la imagen y se modifica el tamaño
        this.play.create();//Aqui se llama la funcion para mostrar el button1 en la escena
    }
}