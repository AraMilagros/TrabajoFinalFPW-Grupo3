import React, { useEffect, useState } from 'react';
import Principal from './scenes/Principal';
import Preload from './scenes/Preload';
import Phaser from 'phaser';


function Config() {
    const [listo, setListo] = useState(true);

    useEffect(() => {

        var config = {
            type: Phaser.AUTO,
            // autoCenter:Phaser.Scale.CENTER_HORIZONTALLY,
            width: window.innerWidth,
            height: window.innerHeight,
            autoResize: true,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 400 },
                    debug: true
                }
            },
            scene:[Preload, Principal]
        };

        var game = new Phaser.Game(config);
        game.events.on("LISTO", setListo);
        return () => {
            setListo(false);
            game.destroy(true);
        }
    }, [listo]);
}    

export default Config;