import Phaser from "phaser";

//Importaciones de gameobject
import Player from '../gameObjects/Player';
import plataformaMovible from "../gameObjects/PlataformaMovible";
import Config from '../Config';
import Trophy from '../gameObjects/Trophy';
import Ghost from "../gameObjects/Ghost";

export default class Principal extends Phaser.Scene {
    mapa = null;
    player = null;
    solidos = null;   
    camaraPrincipal = null
    trophies = null;
    ghosts = null;
    fondo =  null;

    constructor(config) {
        super({ key: 'Principal' });
        this.config = config;
    }

    init(){ //con esto el cronometro ya se reinicia
        //objeto para el cronometro
        this.tiempo = {
            minutos: '02',
            segundos: '30'
        }        
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
        this.ghosts = new Ghost(this);
        this.ghosts.create(this.solidos, this.player.returnPlayer());
        
        this.sound.stopAll();
        
        this.fondo=this.sound.add('fondo')
        this.fondo.play({loop:true,volume:0.06,seek:2});

        this.cronometro = this.add.text(0, 0, 'Tiempo: '+this.tiempo.minutos+':'+this.tiempo.segundos, { fontSize: '32px', fill: '#000' });
        //Este evento llamara a la funcion Cronometro() por cada segundo
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.Cronometro();
            }
        })
    }
    
    update(){
        //se llama el metodo que permite el movimiento de la plataforma
        this.platformRoja.move();
        //Se llama el metodo que permite el movimiento del player
        this.player.move(); 

        //Modifica la posicion del texto con respecto a la camara
        let x = this.camaraPrincipal.worldView.x;//Esto permitira acceder al eje x que se está mostrando actualmente
        let y = this.camaraPrincipal.worldView.y;
        //Pasarle estas variables al score permitira que el texto siempre este visible por mas que la camara se mueva junto al jugador
        this.scoreText.x = x+50;
        this.scoreText.y = y+30;
        //Se utiliza las mismas coordenadas para el cronometro, solamente modificando el eje y para mostrarlo debajo del puntaje/score
        this.cronometro.x = this.scoreText.x;
        this.cronometro.y = this.scoreText.y + 40;

        if(this.trophies.checkWin()){//regresa un true si es que todos los trofeos ya fueron recogidos
            this.scene.start('Win');//y en caso de haberlo hecho, se llamara a la escena de ganador
        }

    }

    Cronometro() {
        //A medida que la funcion sea llamada, se ira reduciendo los numeros
        this.tiempo.segundos--;

        //En caso de que el cronometro llegue a 0, tanto en minutos como en segundos, se pausara la escena
        if (this.tiempo.minutos <= 0 && this.tiempo.segundos <= 0) {
            // console.log("si entro");
            this.scene.start('GameOver');
        } else {
            //se controla cuando los segundos pase de 10 a 9.. en pantalla se muestre un 09/08/07 y no 9/8/7 .. etc
            this.tiempo.segundos = (this.tiempo.segundos > 9) ? this.tiempo.segundos : '0' + this.tiempo.segundos;
            if (this.tiempo.segundos == 0) {//en caso de que ya los segundos lleguen a 0, se pasa a mermar los minutos y regresar a 59, los segundos
                this.tiempo.segundos = '59',
                    this.tiempo.minutos--;
                this.tiempo.minutos = (this.tiempo.minutos == 0) ? this.tiempo.minutos : '00';
            }
            //se va modificando el texto para poder ser visualizado en pantalla
            this.cronometro.setText('Tiempo: '+this.tiempo.minutos+':'+this.tiempo.segundos);
        } 
    }

}