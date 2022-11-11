import React, { useEffect, useState } from 'react';
import Principal from './scenes/Principal';
import Preload from './scenes/Preload';
import Phaser from 'phaser';
import Menu from './scenes/Menu';
import GameOver from './scenes/GameOver'


function Config() {
    const [listo, setListo] = useState(true);

    useEffect(() => {

        var config = {
            type: Phaser.AUTO,
            autoCenter:Phaser.Scale.CENTER_HORIZONTALLY,

            //width: window.innerWidth-90,
            //width: window.innerWidth-416,
            // height: window.innerHeight,
            width: 1005,
            height: 650,
            autoResize: true,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 400 },
                    debug: false
                }
            },
            scene:[Preload, Menu, Principal, GameOver]
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