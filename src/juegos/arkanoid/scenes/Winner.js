import Phaser from "phaser";
// import Config from "../Config.js";

import { ButtonMenu } from "../components/ButtonMenu.js";
export default class Winner extends Phaser.Scene{
    win = null;
    constructor(){
        super({key: 'Winner'});
        this.ButtonMenu = new ButtonMenu(this);
    }
    preload(){
        this.load.setBaseURL('http://localhost:3000');
        this.load.audio('winGame', 'sounds/winGame.mp3');
        //Se carga una imagen de 'winner'
        this.load.image('winner', 'img/arkanoid/winner.png');
        this.ButtonMenu.preload();//se llama la funcion preload que cargara la imagen del button para volver a reiniciar el juego
    }
    
    create(){
        this.win = this.sound.add('winGame');
        //Se agrega la imagen de 'game over' modificando su tamaño para hacerlo mas pequeño
        this.add.image(450, 150,'winner').setScale(1.8);
        //Se llama la funcion para mostrar el button en la escena
        this.ButtonMenu.create();
        this.win.play({volume: 0.5});
    }
}