export default class Ghost extends Phaser.GameObjects.Sprite {

    constructor(scene) { //constructor donde se le pasa de parametro la "scene"
        super(scene);
        this.scenePadre = scene;
    }

    create(solidos, player) {
        this.ghosts = this.scenePadre.physics.add.image(600, 2650, 'ghost').setImmovable();
        this.ghosts.setBounce(1);
        this.ghosts.setScale(0.04);
        this.ghosts.body.allowGravity = false;
        //this.bombs.setVelocity(Phaser.Math.Between(-200, 200), 20);



        // this.detectedCollider(solidos);    
        this.detectedCollider2(player);
    }


    /*detectedCollider(solidos){
        this.scenePadre.physics.add.collider(this.bombs, solidos);       
    }
    */
    detectedCollider2(player) {
        this.scenePadre.physics.add.collider(this.ghosts, player, this.efect, null, this);
    }

    move() {


        if (this.ghosts.x >= 600) {
            this.ghosts.setVelocityX(-200);
        } else if (this.ghosts.x <= 200) {
            this.ghosts.setVelocityX(200);
        }
        /*if(this.bombs.x == 400){
           this.bombs.setVelocityX(200);
        }*/
    }

    efect(ghosts,player){ //aca revisar la logica
        player.y = 2720;
        player.x= 450;
    }
}