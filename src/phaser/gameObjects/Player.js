export default class Player extends Phaser.GameObjects.Sprite{
    isFlooer = true;

    constructor(scene){
        super(scene);
        this.scenePadre = scene;
    }

    create(solidos){
        this.player = this.scenePadre.physics.add.sprite(520, 2720, 'dude').setScale(1.5);
        
        this.player.setBounce(0.2);
        
        //animaciones
        this.scenePadre.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        //Se repite lo mismo que en left
        this.scenePadre.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //Es el fotograma que muestra al player mirando hacia el frente
        this.scenePadre.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

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
        if (this.cursors.up.isDown && (this.isFloor || this.player.body.touching.down)) {
            this.player.setVelocityY(-430);
            this.checkJump();//Es evitar que pueda saltar en el aire
        }
    }

    detectedCollider(solidos){
        this.scenePadre.physics.add.collider(this.player, solidos, this.checkJump, null, this);
        
    }

    checkJump(){
        this.isFloor = !this.isFloor;
    }

    returnPlayer(){
        return this.player;
    }
}