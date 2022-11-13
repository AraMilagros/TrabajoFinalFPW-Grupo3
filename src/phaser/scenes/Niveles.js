import { ButtonLevel1 } from "../botons/ButtonLevel1";
import { ButtonLevel2 } from "../botons/ButtonLevel2";

export default class Menu extends Phaser.Scene{

    musMenu = null;

    constructor(){
        super({key : 'Niveles'});
        this.level1 = new ButtonLevel1(this);
        this.level2 = new ButtonLevel2(this);


    }

    preload(){

        this.level1.preload();
        this.level2.preload();
    }
 
    create(){
        this.game.config.backgroundColor.setTo(0, 0, 0);
        this.sound.stopAll();
        this.add.image(500,250,'SeleccionNivel').setScale(.7); //se agrega a la imagen y se modifica el tamaño
        this.level1.create();//Aqui se llama la funcion para mostrar el button1 en la escena
        this.level2.create();
        this.musMenu = this.sound.add('menMusic');
        this.musMenu.play({loop:true,volume:0.3});
    }
}