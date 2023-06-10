import { GamePlayer } from "../model/GamePlayer";
import Objective from "../model/Objective";
import { ObjetiveCard } from "./ObjectiveCard";

export default class ObjetivoJogador extends Phaser.GameObjects.Container {
    // public spriteFundo: Phaser.GameObjects.Sprite;
    public slug: string;
    objectiveCard: any;
    // cardname: any;
    // textName: Phaser.GameObjects.BitmapText;

    constructor(data: { scene: any; x: number; y: number; fundo: any, objective: Objective, color: number}) {
        let { scene, x,y,fundo,objective,color} = data;
        let spriteObjetivo = new Phaser.GameObjects.Sprite(scene, 750,510, 'ellipse').setOrigin(0);
        let spriteIconBjetivo = new Phaser.GameObjects.Sprite(scene, 770,525, 'objetivo').setOrigin(0);
        
       
        let objetivoCard = new ObjetiveCard({
            scene,
            x: x + 400,
            y: y + 160,
            objective: objective,
            color:color
        }).setVisible(false);


        spriteObjetivo.setInteractive({useHandCursor: true})

        super(scene,x,y ,[spriteObjetivo,spriteIconBjetivo,objetivoCard]);

        this.objectiveCard = objetivoCard;

        spriteObjetivo.on("pointerover", (pointer, objeto)=>{
            spriteObjetivo.setAlpha(0.7);
        })
        spriteObjetivo.on("pointerout", (pointer, objeto)=>{
            spriteObjetivo.setAlpha(1);
        })
        spriteObjetivo.on("pointerdown",()=>{
            this.objectiveCard.setVisible(!this.objectiveCard.visible);
        })

        
        this.scene.add.existing(this);

    }
}