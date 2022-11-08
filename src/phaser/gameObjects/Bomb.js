export default class Bomb extends Phaser.GameObjects.Sprite{
    
    constructor(scene){ //constructor donde se le pasa de parametro la "scene"
        super(scene);
        this.scenePadre = scene;
    }

   
    
    create(solidos,player){
        this.bombs = this.scenePadre.physics.add.image(590, 2650,'bomb').setImmovable(); 
        this.bombs.setBounce(1); 
        this.bombs.setVelocity(Phaser.Math.Between(-200, 200), 20);


        this.detectedCollider(solidos);    
        this.detectedCollider(player);   
    }
    
   
    detectedCollider(solidos){
        this.scenePadre.physics.add.collider(this.bombs, solidos);       
    }

    detectedCollider2(player){
        this.scenePadre.physics.add.collider(this.bombs, player);       
    }

}