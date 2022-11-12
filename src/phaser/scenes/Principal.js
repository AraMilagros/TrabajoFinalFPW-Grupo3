import Phaser from "phaser";

//Importaciones de gameobject
import Player from '../gameObjects/Player';
import plataformaMovible from "../gameObjects/PlataformaMovible";
import Config from '../Config';
import Trophy from '../gameObjects/Trophy';

export default class Principal extends Phaser.Scene {
    mapa = null;
    player = null;
    solidos = null;   
    camaraPrincipal = null
    trophies = null;

    constructor(config) {
        super({ key: 'Principal' });
        this.config = config;
    }

    create(){
        this.game.config.backgroundColor.setTo(108, 170, 222);
        //Se crea el mapa
        this.mapa = this.make.tilemap({ key: 'mapa' });
        let tilesets = this.mapa.addTilesetImage('tileSets', 'tiles');
        this.solidos = this.mapa.createLayer('solido', tilesets, 0, 0);
        this.solidos.setCollisionByProperty({ solido: true });
        
        this.trophies= new Trophy(this);//Se instancia el trofeo "this"
        //Se crea el jugador
        this.player = new Player(this);//se instancia la clase Player, pasandole esta escena que es donde se creara
        //Se crea el player para poder se visualizado en la escena, tambien se crea las animaciones
        // y se pasa solidos, para poder darle un collider y pueda detectarse una colision con el player
        this.player.create(this.solidos);
        //Con esto la camara seguira al player
        this.camaraPrincipal = this.cameras.main.setBounds(0,0, this.mapa.widthInPixels, this.mapa.heightInPixels);
        this.cameras.main.startFollow(this.player.returnPlayer());

        //Se crea las plataformas movibles
        this.platformRoja = new plataformaMovible(this);//Se instancia la clase PlataformaMovible, pasandole esta escena que es donde se creara
        //Pasa la mismo que en Player, se llama el metodo para crear la plataform y ser visualizado
        // y se pasa el player para añadirle un collider y poder detectar sus colisiones
        this.platformRoja.create(this.player.returnPlayer());
        //se crea el trofeo para que pueda ser visualizado y se le pasa de parametro el player para añadirle un collider y poder detectar sus colisiones
        this.trophies.create(this.player.returnPlayer());

        // this.scoreText = this.add.text(0, 0, 'score: 0', { fontSize: '32px', fill: '#000' });
       
    }
    
    update(){
        //se llama el metodo que permite el movimiento de la plataforma
        this.platformRoja.move();
        //Se llama el metodo que permite el movimiento del player
        this.player.move();        

        //Modifica la posicion del texto con respecto a la camara
        let x = this.camaraPrincipal.worldView.x;
        let y = this.camaraPrincipal.worldView.y;
        this.scoreText.x = x+50;
        this.scoreText.y = y+30;
        
    }

}