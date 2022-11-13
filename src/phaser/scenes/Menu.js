import { Button1 } from "../botons/Button1";
export default class Menu extends Phaser.Scene{

    musMenu = null;

    constructor(){
        super({key : 'Menu'});
        this.play = new Button1(this);
    }

    preload(){

        this.play.preload();
    }
 
    create(){
        this.game.config.backgroundColor.setTo(0, 0, 0);
        this.sound.stopAll();
        this.add.image(500,200,'Menu').setScale(.5); //se agrega a la imagen y se modifica el tamaño
        this.play.create();//Aqui se llama la funcion para mostrar el button1 en la escena
        this.musMenu = this.sound.add('menMusic');
        this.musMenu.play({loop:true,volume:0.3});
    }
}