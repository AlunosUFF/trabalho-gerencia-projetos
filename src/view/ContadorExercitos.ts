import { GamePlayer } from "../model/GamePlayer";

export default class ContadorExercitos extends Phaser.GameObjects.Container {
    // public spriteFundo: Phaser.GameObjects.Sprite;
    public slug: string;
    // cardname: any;
    // textName: Phaser.GameObjects.BitmapText;

    constructor(data: { scene: any; x: number; y: number; fundo: any; player: GamePlayer}) {
        let { scene, x,y,fundo,player} = data;
        x-=120;
        let textName = new Phaser.GameObjects.BitmapText(scene,10,10,'pressstart', player.name, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        textName.setTint(player.color)
        let textTerritorios = new Phaser.GameObjects.BitmapText(scene,10,25,'pressstart', 
        `${player.totalTerritories} territórios`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        let textExercito = new Phaser.GameObjects.BitmapText(scene,10,40,'pressstart', 
        `${player.totalArmies} exércitos`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        textTerritorios.setTint(player.color)
        textExercito.setTint(player.color)
        let spriteFundoBranco = new Phaser.GameObjects.Sprite(scene, 0 ,0, fundo).setOrigin(0).setAlpha(0.5);
        let spriteTipoUsario;
      
        if(player.ia == 'true'){
            spriteTipoUsario = new Phaser.GameObjects.Sprite(scene, 130,15, 'computer').setOrigin(0);
        }else{
            spriteTipoUsario = new Phaser.GameObjects.Sprite(scene, 130,15, 'pessoa').setOrigin(0);
        }
        
        spriteTipoUsario.setTintFill(player.color)
        super(scene,x,y ,[spriteFundoBranco,spriteTipoUsario,textName, textTerritorios, textExercito]);
        
        spriteFundoBranco.setInteractive()

        
        spriteFundoBranco.on("pointerover", (pointer, objeto)=>{
            this.scene.tweens.add({
                targets: this,
                x: x + 120,
                duration: 500,
                ease: "Power3"
            })
        })
        spriteFundoBranco.on("pointerout", (pointer, objeto)=>{
            this.scene.tweens.add({
                targets: this,
                x: x,
                duration: 500,
                ease: "Power3"
            })
        })

        this.scene.add.existing(this);

    }

    highlight(){
        this.setAlpha(0.5)    
    }
    unhighlight(){
        this.setAlpha(1)    
    }
}