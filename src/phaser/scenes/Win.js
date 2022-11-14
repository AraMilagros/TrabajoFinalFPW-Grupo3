import { ButtonLost } from "../botons/ButtonLost";
export default class Win extends Phaser.Scene{

    musicWin = null;

    constructor(){
        super({key : 'Win'});
        this.play = new ButtonLost(this);
    }

    // preload(){
    //     this.load.setBaseURL('http://localhost:3000');
    //     
    //     this.play.preload();//se llama al preload del play
    // }
 
    create(){
        this.game.config.backgroundColor.setTo(0, 0, 0);
        this.add.image(500,200,'Wingame').setScale(.5);; //se agrega a la imagen y se modifica el tamaño
        this.play.create();//Aqui se llama la funcion para mostrar el buttonLost en la escena
        this.sound.stopAll();
        this.musicWin=this.sound.add('victory')
        this.musicWin.play({loop:true,volume:0.4,seek:1});
    }
}