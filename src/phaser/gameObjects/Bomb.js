export default class Bomb extends Phaser.GameObjects.Sprite {

    constructor(scene) { //constructor donde se le pasa de parametro la "scene"
        super(scene);
        this.scenePadre = scene;
    }

    create(solidos, player) {
        this.bombs = this.scenePadre.physics.add.image(600, 2650, 'bomb').setImmovable();
        this.bombs.setBounce(1);
        this.bombs.setScale(0.04);
        this.bombs.body.allowGravity = false;
        //this.bombs.setVelocity(Phaser.Math.Between(-200, 200), 20);



        // this.detectedCollider(solidos);    
        this.detectedCollider2(player);
    }


    /*detectedCollider(solidos){
        this.scenePadre.physics.add.collider(this.bombs, solidos);       
    }
    */
    detectedCollider2(player) {
        this.scenePadre.physics.add.collider(this.bombs, player, this.efect, null, this);
    }

    move() {


        if (this.bombs.x >= 600) {
            this.bombs.setVelocityX(-200);
        } else if (this.bombs.x <= 200) {
            this.bombs.setVelocityX(200);
        }
        /*if(this.bombs.x == 400){
           this.bombs.setVelocityX(200);
        }*/
    }

    efect(player,bombs){ //aca revisar la logica
        bombs.y = 2720;
        bombs.x= 450;
    }
}