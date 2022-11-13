import Phaser from "phaser";
import Barra from '../gameObjects/Barra';
import Ball from '../gameObjects/Ball';
import Bloque from '../gameObjects/Bloque';

//El audio al estar en una carpeta dentro de src, para ser reconocido tiene que ser importado de esta manera
//Despues en preload se tendra que pasar 'ballBlockImpact' para ser cargado en vez del url de su ubicacion
// -Otro modo de cargar el audio es pasar la carpeta de sound a la carpeta public y  llamarlo como de costumbre
/**
 * si los sonidos estan en carpeta public:
 *      en preload: this.load.audio('choque', 'sounds/ballBlockImpact.wav');
 * si los sonidos estan en carpeta src:
 *      importar primero : import ballBlockImpact from '../assets/sounds/ballBlockImpact.wav';
 *      en preload: this.load.audio('choque', ballBlockImpact);
 */

export default class Level2 extends Phaser.Scene{
    barra = null;
    ball = null;
    bloque = null;
    sonido = null;
    musicGame = null;
    nivelActual = 2;
    constructor(){
    //Esto servira para que en caso de perder, y se quiera volver a jugar, pueda ser llamado por su key, en este caso 'Principal'
        super({key: 'Level2'});
    }

    preload(){
        this.load.setBaseURL('http://localhost:3000');
        // se carga la imagen de fondo
        this.load.image('Fondo2','img/arkanoid/Galaxy.jpg');
        //se carga la imagen de barra
        this.load.image('barra', 'img/arkanoid/barra.png');
        //se carga la imagen de ball
        this.load.image('ball', 'img/arkanoid/ball.png');

        //se carga las imagenes de cada bloque
        this.load.image('bloqueRojo', 'img/arkanoid/bloqueRojo.png');
        this.load.image('bloqueVerde', 'img/arkanoid/bloqueVerde.png');
        this.load.image('bloqueAmarillo', 'img/arkanoid/bloqueAmarillo.png');
        this.load.image('bloqueAzul', 'img/arkanoid/bloqueAzul.png');
        this.load.image('bloqueRosa', 'img/arkanoid/bloqueRosa.png');
        //se carga la imagen de particulas
        this.load.image("particle", "img/arkanoid/particle.png");
        this.load.image('particleDestruction', 'img/arkanoid/particleDestruction.png');
        //sonido
        this.load.audio('choque','sounds/ballBlockImpact.wav');
        this.load.audio('impactoBar','sounds/ballBarImpact.wav');
        this.load.audio('music2', 'sounds/gameMusic2.mp3');
    }

    create(){
        //Se agrega una imagen para fondo
        this.add.image(450,300,'Fondo2' );
        //Esto permite que detecte las colisiones en los limites del lienzo, menos abajo
        // es decir que si la barra no alcanza la ball, éste desaparecera del lienzo
        this.physics.world.setBoundsCollision(true, true, true, false);
        
        //----creacion de ball
        this.ball = new Ball(this);//se crea una instancia de la clase Ball, pasandole de parametro esta escena
        this.ball.create();//se llama la funcion que creara el ball

        //----Creacion de las barras
        this.barra = new Barra(this);//Se instancia la clase Barra y se pasa esta escena
        this.barra.create();//funcion que creara la barra y se añadira a esta escena
        //Esto permitira que la barra pueda detectar la colision con ball
        //la cual se la pasa de parametro, mediante una funcion que retorna la ball
        this.barra.detectedCollider(this.ball.returnBall());
        
        //----Creacion de los bloques
        this.bloque = new Bloque(this);//se instancia los bloques, pasando esta escena
        this.bloque.create(2);//funcion para crear los bloques y ser visibles en esta escena
        //Es igual que en barra, permitira detectar la colision entre los bloques y ball
        this.bloque.detectedCollision(this.ball.returnBall());
        //se agrega el sonido en caso de que ball choque a un bloque
        this.sonido = this.sound.add('choque');//Esto se llama en Bloque.js cuando se detecta un impacto
        this.impactoBar = this.sound.add('impactoBar');// sonido que se llama en Barra.js cuando detecta un impacto
        this.sound.stopAll();
        this.musicGame = this.sound.add('music2');
        this.musicGame.play({loop: true, volume: 0.4});
    }

    update(){
        //Funcion de la clase Barra que permite su movimiento mediante el teclado
        //y se pasa ball para detectar el comienzo del juego. Ball comienza pegada a la barra  y recien al presionar space, el juego comenzara
        this.barra.move(this.ball.returnBall());
        //En caso de que no se logre alcazar ball y caiga, se terminara el jeugo
        if(this.ball.directionY() > 600){
            // console.log("fin");
            this.gameOver();
        }
        //verifica en caso de que el numero de bloques sea 0 y si lo es el jugador gana
        if(this.bloque.countBlocks()===0){
            this.winPlayer();
        }
    }

    gameOver(){
        //Se llama la siguiente escena que muestra que se perdio
        this.scene.start('GameOver');
        this.musicGame.stop();
    }
    winPlayer(){
        //se llama a la escena winner para indicar que gano
        this.scene.start('Winner');
        this.musicGame.stop();
    }
     //Metodo que retorna la variable que contiene el nivel actual.
    // LevelDataRestart(){
    //     return this.nivelActual;
    // }
}