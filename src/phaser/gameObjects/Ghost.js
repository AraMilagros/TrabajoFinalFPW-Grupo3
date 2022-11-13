export default class Ghost extends Phaser.GameObjects.Sprite {

    constructor(scene) { //constructor donde se le pasa de parametro la "scene"
        super(scene);
        this.scenePadre = scene;
    }

    create(solidos, player,level) {
        switch(level){
            case 1:// nivel 1
            this.ghostArray = new Array();
            this.ghosts = this.scenePadre.physics.add.image(100, 2650, 'ghost').setImmovable();   
            this.ghostArray.push(this.ghosts);
            this.ghosts2 = this.scenePadre.physics.add.image(100, 2410, 'ghost').setImmovable();   
            this.ghostArray.push(this.ghosts2);
            this.ghosts3 = this.scenePadre.physics.add.image(690, 1890, 'ghost').setImmovable();   
            this.ghostArray.push(this.ghosts3);
            this.ghosts4 = this.scenePadre.physics.add.image(660, 1500, 'ghost').setImmovable();   
            this.ghostArray.push(this.ghosts4);
            this.ghosts5 = this.scenePadre.physics.add.image(660, 870, 'ghost').setImmovable();   
            this.ghostArray.push(this.ghosts5);
            this.ghosts6 = this.scenePadre.physics.add.image(750, 170, 'ghost').setImmovable();   
            this.ghostArray.push(this.ghosts6);
            this.ghostArray.forEach((fanta) => {
                fanta.setScale(0.04);
                fanta.body.allowGravity=false;
                this.detectedCollider2(fanta,player);
            })      
            //this.ghosts.setScale(0.04);   
            //this.ghosts.body.allowGravity = false;       
            //this.bombs.setVelocity(Phaser.Math.Between(-200, 200), 20);
            // this.detectedCollider(solidos);    
           // this.detectedCollider2(player);
    
              /*Una interpolación o "Tween" es capaz de manipular las propiedades de uno o más objetos 
              a cualquier valor dado, basado en una duración y tipo de facilidad.*/
            this.scenePadre.tweens.add({ 
                targets: [this.ghosts, this.ghosts2], //Los objetivos-targets son "this.ghosts, this.ghosts2".
                duration: 3000, //duracion o velocidad en la que se desplaza el objeto
                x:660, //crea la interpolación hacia 660 en x
                repeat: -1, // para las veces que se repita, si ponemos -1 sera infinito
                yoyo: true //para que la interpolación-animacion vaya de principio a fin, como un yoyo.
            });
    
            this.scenePadre.tweens.add({ // aca seria lo mismo pero con diferentes targets
                targets: [this.ghosts3,this.ghosts4,this.ghosts5,this.ghosts6],
                duration: 3000,
                x:150,
                repeat: -1,
                yoyo: true
                
            });
            break;
            case 2://nivel 2
            this.ghostArray = new Array();
            this.ghosts = this.scenePadre.physics.add.image(100, 2650, 'ghost2').setImmovable();   
            this.ghostArray.push(this.ghosts);
            this.ghosts2 = this.scenePadre.physics.add.image(100, 2410, 'ghost2').setImmovable();   
            this.ghostArray.push(this.ghosts2);
            this.ghosts3 = this.scenePadre.physics.add.image(690, 1890, 'ghost2').setImmovable();   
            this.ghostArray.push(this.ghosts3);
            this.ghosts4 = this.scenePadre.physics.add.image(660, 1500, 'ghost2').setImmovable();   
            this.ghostArray.push(this.ghosts4);
            this.ghosts5 = this.scenePadre.physics.add.image(660, 870, 'ghost2').setImmovable();   
            this.ghostArray.push(this.ghosts5);
            this.ghosts6 = this.scenePadre.physics.add.image(750, 170, 'ghost2').setImmovable();   
            this.ghostArray.push(this.ghosts6);
            this.ghosts7 = this.scenePadre.physics.add.image(680, 2700, 'ghost2').setImmovable();   
            this.ghostArray.push(this.ghosts7);
            this.ghostArray.forEach((fanta) => {
                fanta.setScale(0.04);
                fanta.body.allowGravity=false;
                this.detectedCollider2(fanta,player);
            })      
            //this.ghosts.setScale(0.04);   
            //this.ghosts.body.allowGravity = false;       
            //this.bombs.setVelocity(Phaser.Math.Between(-200, 200), 20);
            // this.detectedCollider(solidos);    
           // this.detectedCollider2(player);
    
              /*Una interpolación o "Tween" es capaz de manipular las propiedades de uno o más objetos 
              a cualquier valor dado, basado en una duración y tipo de facilidad.*/
            this.scenePadre.tweens.add({ 
                targets: [this.ghosts, this.ghosts2], //Los objetivos-targets son "this.ghosts, this.ghosts2".
                duration: 2500, //duracion o velocidad en la que se desplaza el objeto
                x:660 , //crea la interpolación hacia 660 en x
                repeat: -1, // para las veces que se repita, si ponemos -1 sera infinito
                yoyo: true //para que la interpolación-animacion vaya de principio a fin, como un yoyo.
            });
    
            this.scenePadre.tweens.add({ // aca seria lo mismo pero con diferentes targets
                targets: [this.ghosts3,this.ghosts4,this.ghosts5,this.ghosts6],
                duration: 2500,
                x:150,
                repeat: -1,
                yoyo: true
            });
            this.scenePadre.tweens.add({ // aca seria lo mismo pero con diferentes targets
                targets: [this.ghosts7],
                duration: 8000,
                y:10,
                repeat: -1,
                yoyo: true
            });
            
            break;
        }
    }


    /*detectedCollider(solidos){
        this.scenePadre.physics.add.collider(this.bombs, solidos);       
    }
    */
    detectedCollider2(fanta,player) {
        this.scenePadre.physics.add.collider(fanta, player, this.efect, null, this);
    }

    move() {

      /*  if (this.ghosts.x >= 600) {
            this.ghosts.setVelocityX(-200);
        } else if (this.ghosts.x <= 200) {
            this.ghosts.setVelocityX(200);
        }
        if(this.bombs.x == 400){
           this.bombs.setVelocityX(200);
        }*/
    }

    efect(ghosts,player){ //aca lo que hace es que si el player choca con los fantasmas se vuelve al principio
        player.y = 2720;
        player.x= 450;
    }
}