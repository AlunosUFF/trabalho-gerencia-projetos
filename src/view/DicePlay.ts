import Phaser from 'phaser';
import DisplayScene from '../scenes/DisplayScene';
import { WarMatch } from '../game/WarMatch';

const dadosValor = {
    "icon_dado_1": 1,
    "icon_dado_2": 2,
    "icon_dado_3": 3,
    "icon_dado_4": 4,
    "icon_dado_5": 5,
    "icon_dado_6": 6
}


export default class DicePlay extends Phaser.GameObjects.Container{
    diceAttack: Phaser.GameObjects.Sprite[] = [];
    diceDefense: Phaser.GameObjects.Sprite[] = [];


    constructor(data:{scene:Phaser.Scene, x:number, y:number}){
        let {scene, x, y} = data;


        let colorAttack = (scene as DisplayScene).warMatch.getCurrentPlayer().color;
        let backgroundAttack = new Phaser.GameObjects.Rectangle(scene, 10, -25, 130, 50, colorAttack)
        .setStrokeStyle(1, 0xffffff)

        let colorDefense = (scene as DisplayScene).warMatch.getCurrentPlayer().color;
        let backgroundDefense = new Phaser.GameObjects.Rectangle(scene, 10, 25, 130, 50, colorDefense)
        .setStrokeStyle(1, 0xffffff)

        let textAttack = new Phaser.GameObjects.Text(scene, -45, -50, "Ataque", {color: "#000", fontSize:"14px"})
        let textDefense = new Phaser.GameObjects.Text(scene, -45, 0, "Defesa", {color: "#000", fontSize:"14px"})

        super(scene, x, y, [backgroundAttack, backgroundDefense, textAttack, textDefense]);
        this.scene = scene
        for(let i=0; i < 3; i++){
            let x = -30 + (40 * (i % 3))
            let y = -20  + (50 * (Math.floor(i / 3)))
            let spriteDado = new Phaser.GameObjects.Sprite(scene, x, y, `icon_dado_${i + 1}`)
            .setScale(0.2).setTintFill(0x000000).setVisible(false);
            this.add(spriteDado);
            this.diceAttack.push(spriteDado);
        }

        for(let i=0; i < 3; i++){
            let x = -30 + (40 * (i % 3))
            let y = 30
            let spriteDado = new Phaser.GameObjects.Sprite(scene, x, y, `icon_dado_${i + 1}`)
            .setScale(0.2).setTintFill(0x000000).setVisible(false);
            this.add(spriteDado);
            this.diceDefense.push(spriteDado);
        }

        this.scene.add.existing(this)
    }

    playDice(attackResults: number[], defenseResults:number []){
        attackResults.forEach((attackResult, index) =>{
            (this.diceAttack[index] as Phaser.GameObjects.Sprite).setTexture(`icon_dado_${attackResult}`)
            .setVisible(true)
        })
        defenseResults.forEach((defenseResult, index) =>{
            (this.diceDefense[index] as Phaser.GameObjects.Sprite).setTexture(`icon_dado_${defenseResult}`)
            .setVisible(true)
        })
    }
}