import { Turn } from "../game/Turn";
import { GamePlayer } from "../model/GamePlayer";
import { Player } from "../model/Player";
import eventsCenter from "../services/EventsCenter";
import { WarMatch } from "../game/WarMatch";

export default class StatusJogador extends Phaser.GameObjects.Container {
    // public spriteFundo: Phaser.GameObjects.Sprite;
    public slug: string;
    public warMatch: WarMatch;
    // cardname: any;
    // textName: Phaser.GameObjects.BitmapText;

    constructor(data: { scene: any; x: number; y: number; fundo: any; warMatch: WarMatch}) {
        let { scene, x,y,fundo, warMatch} = data;
        let spriteFundoAzul = new Phaser.GameObjects.Sprite(scene, 0 ,0, fundo).setOrigin(0).setAlpha(0.3);
        let spriteElipseTurno = new Phaser.GameObjects.Sprite(scene, 140,10, 'ellipse').setOrigin(0);
        let spriteElipseSeguranca = new Phaser.GameObjects.Sprite(scene, 10,10, 'ellipse').setOrigin(0);
        let spriteBotaoFinalizar = new Phaser.GameObjects.Sprite(scene, 270,10, 'ellipse').setOrigin(0);
        let spriteLocalizador = new Phaser.GameObjects.Sprite(scene, 270,-150, 'localizador').setOrigin(0);
        let spriteSeguranca = new Phaser.GameObjects.Sprite(scene, 45,30, 'seguranca').setOrigin(0);
        let textTurnoJogador = new Phaser.GameObjects.BitmapText(scene,160,55,'pressstart', `${warMatch.turn.getCurrentPhaseName()}`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        textTurnoJogador.setTint(0)
        let textBotaoFinalizar = new Phaser.GameObjects.BitmapText(scene,290,55,'pressstart', `FINALIZAR`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        textBotaoFinalizar.setTint(0)
        let textSinalMaisSeguranca = new Phaser.GameObjects.BitmapText(scene,80,80,'pressstart', `+`, 14, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        .setInteractive({useHandCursor:true})
        let textQuantidadeSeguranca = new Phaser.GameObjects.BitmapText(scene,60,80,'pressstart', `${warMatch.getCurrentPlayer().placeble.all}`, 14, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        let textSinalMenosSeguranca = new Phaser.GameObjects.BitmapText(scene,40,80,'pressstart', `-`, 14, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        .setInteractive({useHandCursor:true})
        textSinalMaisSeguranca.setTint(0)
        textQuantidadeSeguranca.setTint(0)
        textSinalMenosSeguranca.setTint(0)
        // let textName4 = new Phaser.GameObjects.BitmapText(scene,480,100,'pressstart', `Fase Atual: ${turn.phasesNames}`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        // textName4.setTint(0)
        let spriteLinhaertical = new Phaser.GameObjects.Sprite(scene, 450,5, 'linha_vertical').setOrigin(0);
        
        // console.log(scene,x,y,fundo)
        super(scene,x,y ,[spriteFundoAzul,spriteElipseTurno,spriteElipseSeguranca,spriteBotaoFinalizar,spriteSeguranca,textTurnoJogador,textBotaoFinalizar,spriteLinhaertical, textSinalMaisSeguranca, textQuantidadeSeguranca, textSinalMenosSeguranca, spriteLocalizador ]);
        this.warMatch = warMatch
        spriteBotaoFinalizar.setInteractive({useHandCursor: true})
         
        spriteBotaoFinalizar.on("pointerover", (pointer, objeto)=>{
            spriteBotaoFinalizar.setTint(0x13a95b);

        })
        spriteBotaoFinalizar.on("pointerdown", (pointer, objeto)=>{
            this.scene.nextPhase();
            textTurnoJogador.setText(this.warMatch.turn.getCurrentPhaseName());
        })
        spriteBotaoFinalizar.on("pointerout", (pointer, objeto)=>{
            spriteBotaoFinalizar.setTint(0xffffff);
        })

        if(this.warMatch.getCurrentPlayer()){
            spriteElipseTurno.setTint(this.warMatch.getCurrentPlayer().color)
            spriteSeguranca.setTintFill(this.warMatch.getCurrentPlayer().color)
        }
        
        this.scene.add.existing(this);
        
        
    }
    
}