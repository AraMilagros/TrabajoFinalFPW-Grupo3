export default class plataformaMovible extends Phaser.GameObjects.Sprite{

    constructor(scene){
        super(scene);
        this.scenePadre = scene;
    }

    create(player){
        //este array contendra todas las plataformas que se crearan en la escena
        this.plataformasArray = new Array();
  
        //Se craeran 5 plataformas con diferentes posiciones a lo largo del mapa
        // Para luego ser agregados al array, anteriormente creado
        this.platformRoja = this.scenePadre.physics.add.image(902, 2000, 'plataformaRoja').setImmovable();
        this.plataformasArray.push(this.platformRoja);//Se agrega al array
        this.platformRoja = this.scenePadre.physics.add.image(200, 1550, 'plataformaRoja').setImmovable();
        this.plataformasArray.push(this.platformRoja);
        this.platformRoja = this.scenePadre.physics.add.image(1000, 1350, 'plataformaRoja').setImmovable();
        this.plataformasArray.push(this.platformRoja);
        this.platformRoja = this.scenePadre.physics.add.image(200, 600, 'plataformaRoja').setImmovable();
        this.plataformasArray.push(this.platformRoja);
        this.platformRoja = this.scenePadre.physics.add.image(902, 400, 'plataformaRoja').setImmovable();
        this.plataformasArray.push(this.platformRoja);

        //Una vez creado y agregado al array, se lo recorrera para modificar algunos comportamientos
        // se deshabilitara la gravedad y añadira un collider
        this.plataformasArray.forEach((elem) =>{
            elem.body.allowGravity = false;
            this.detectedCollision(elem, player);
        })
    }

    move(){
       //Aqui se vuelve a recorrer el array para verificar sus posiciones
       //  esto hara que las plataformas se muevan de forma horizontal
        this.plataformasArray.forEach((elem) =>{
            if(elem.x >= 900){
                elem.setVelocityX(-200);
            }else if(elem.x <= 200){
                elem.setVelocityX(200);
            }
        })

    }

    //Metodo que añade el collider
    detectedCollision(player, plataforma){
        this.scenePadre.physics.add.collider(player, plataforma);
    }

    
}