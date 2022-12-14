export default class Player extends Phaser.GameObjects.Sprite{
    //isFlooer = true;

    constructor(scene){
        super(scene);
        this.scenePadre = scene;
    }

    create(solidos){
        this.player = this.scenePadre.physics.add.sprite(470, 2720, 'player').setScale(0.09);
        this.player.setBounce(0.1);
        
        //animaciones
        this.scenePadre.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 11, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        //Se repite lo mismo que en left
        this.scenePadre.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        //Es el fotograma que muestra al player mirando hacia el frente
        this.scenePadre.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 20
        });
        this.audio = this.scenePadre.sound.add("jump", {loop : false});
        this.detectedCollider(solidos);     
    }


    move(){
        this.cursors = this.scenePadre.input.keyboard.createCursorKeys();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);//es key que se puso en anims
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.onFloor()) { //con "body.onFloor()" controla que no salte 2 veces
            this.player.setVelocityY(-400);
             this.audio.play();
             this.audio.volume= 0.15;
           // this.checkJump();//Es evitar que pueda saltar en el aire
        }
    }

    detectedCollider(solidos){
        this.scenePadre.physics.add.collider(this.player, solidos);
        
    }

    /*checkJump(){
        this.isFloor = !this.isFloor;
    }*/

    returnPlayer(){
        return this.player;
    }
}