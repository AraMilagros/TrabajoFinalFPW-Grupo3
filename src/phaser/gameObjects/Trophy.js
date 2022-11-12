export default class Trophy extends Phaser.GameObjects.Sprite {
    scoreText = null; //varaibles para el score
    score = 0; //se incializa en 0
    totalTrophy = 0;
    trophyRecogidos = 0;
    constructor(scene) { //constructor donde se le pasa de parametro la "scene"
        super(scene);
        this.scenePadre = scene;
    }

    init() {
        this.score = 0; //para que se reinicie el score
    }

    create(player) {  //se pasa de parametro el player
        this.trophyArray = new Array(); //este array va a contener los trofeos
        //se crean los trofeos en distintas partes del mapa
        this.trophies = this.scenePadre.physics.add.image(200, 2720, 'trophy').setImmovable();
        this.trophyArray.push(this.trophies); //para agregar al array anteriormente creado
        this.trophies = this.scenePadre.physics.add.image(518, 2405, 'trophy').setImmovable();
        this.trophyArray.push(this.trophies)
        this.trophies = this.scenePadre.physics.add.image(100, 2110, 'trophy').setImmovable();
        this.trophyArray.push(this.trophies)
        this.trophies = this.scenePadre.physics.add.image(520, 1750, 'trophy').setImmovable();
        this.trophyArray.push(this.trophies)
        this.trophies = this.scenePadre.physics.add.image(230, 1505, 'trophy').setImmovable();
        this.trophyArray.push(this.trophies)
        this.trophies = this.scenePadre.physics.add.image(230, 1055, 'trophy').setImmovable();
        this.trophyArray.push(this.trophies)
        this.trophies = this.scenePadre.physics.add.image(200, 505, 'trophy').setImmovable();
        this.trophyArray.push(this.trophies)
        this.trophies = this.scenePadre.physics.add.image(900, 220, 'trophy').setImmovable();
        this.trophyArray.push(this.trophies)
        //Una vez creado y agregado al array, se lo recorrera para modificar algunos comportamientos
        // se deshabilitara la gravedad y añadira la funcion collisionDetected con los parametros de trofeo y player
        this.trophyArray.forEach((trofeo) => {
            trofeo.body.allowGravity = false;
            this.collisionDetected(trofeo, player);
        })
        this.totalTrophy = this.trophyArray.length;//aqui se guarda la cantidad de trofeos que tendran que recogerse
        this.scenePadre.scoreText = this.scenePadre.add.text(0, 0, 'score: 0', { fontSize: '32px', fill: '#000' }); //esto agrega el score
    }

    collisionDetected(trophies, player) { //indica a Phaser que monitorice si hay una superposición entre el personaje y el trofeo
        this.scenePadre.physics.add.overlap(trophies, player, this.impacto, null, this);//llama a la funcion impacto
    }

    impacto(trophies, player) {
        trophies.disableBody(true, true); //desactiva el trofeo
        this.score += 10; //al impactar se suma de 10 en 10
        this.scenePadre.scoreText.setText('Score: ' + this.score); //se setea el score
        this.trophyRecogidos++;
    }

    checkWin() {
        if (this.totalTrophy == this.trophyRecogidos) {
            return true;
        }
        return false;
    }
}