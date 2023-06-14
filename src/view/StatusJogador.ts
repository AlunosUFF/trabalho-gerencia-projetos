import { Phases } from "../game/Turn";
import { WarMatch } from "../game/WarMatch";
import DisplayScene from "../scenes/DisplayScene";
import eventsCenter from "../services/EventsCenter";
import { TerritoryFactory } from "../services/territory-factory";
import { GameEvent, PlayerEvent } from "../shared/events.model";

export default class StatusJogador extends Phaser.GameObjects.Container {
    // public spriteFundo: Phaser.GameObjects.Sprite;
    public warMatch: WarMatch;
    public textTurnoJogador: Phaser.GameObjects.BitmapText;
    public textQuantidadeAlocando: Phaser.GameObjects.BitmapText;
    quantidadeAlocando: number;
    quantidadeAlocavel: number;
    textQuantidadeAlocavel: Phaser.GameObjects.BitmapText;
    public mode!: Phases;
    
    // cardname: any;
    // textName: Phaser.GameObjects.BitmapText;

    constructor(data: { scene: Phaser.Scene; x: number; y: number; fundo: any; warMatch: WarMatch}) {
        let { scene, x,y,fundo, warMatch} = data;
        let spriteFundoAzul = new Phaser.GameObjects.Sprite(scene, 0 ,0, fundo).setOrigin(0)
        .setAlpha(0.3);

        let spriteElipseTurno = new Phaser.GameObjects.Sprite(scene, 140,10, 'ellipse')
        .setOrigin(0);

        let spriteElipseSeguranca = new Phaser.GameObjects.Sprite(scene, 10,10, 'ellipse')
        .setOrigin(0);

        let spriteBotaoFinalizar = new Phaser.GameObjects.Sprite(scene, 270,10, 'ellipse')
        .setOrigin(0);

        // le = new Phaser.GameObjects.Sprite(scene, 270,-150, 'localizador').setOrigin(0);
        let spriteSeguranca = new Phaser.GameObjects.Sprite(scene, 45,30, 'seguranca')
        .setOrigin(0);

        let textTurnoJogador = new Phaser.GameObjects.BitmapText(scene,160,55,'pressstart', 
        `${warMatch.turn.getCurrentPhaseName()}`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        .setTint(0);

        // console.log("Placeble", warMatch.getCurrentPlayer())
        let textQuantidadeAlocavel = new Phaser.GameObjects.BitmapText(scene,182,73,'pressstart', 
        `${warMatch.getCurrentPlayer().placeble.all}`, 20, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        .setTint(0);
                
        let textBotaoFinalizar = new Phaser.GameObjects.BitmapText(scene,290,55,'pressstart', 
        `FINALIZAR`, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER).setTint(0);

        let textSinalMaisAlocando = new Phaser.GameObjects.BitmapText(scene,80,80,'pressstart',
         `+`, 14, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        .setInteractive({useHandCursor:true}).setTint(0);

        let textQuantidadeAlocando = new Phaser.GameObjects.BitmapText(scene,60,80,'pressstart', 
        `${0}`, 14, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        .setTint(0).setInteractive({useHandCursor:true})

        let textSinalMenosAlocando = new Phaser.GameObjects.BitmapText(scene,40,80,'pressstart', 
        `-`, 14, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        .setInteractive({useHandCursor:true})
        .setTint(0)

        let spriteLinhaertical = new Phaser.GameObjects.Sprite(scene, 450,5, 'linha_vertical')
        .setOrigin(0);TerritoryFactory


        
        // console.log(scene,x,y,fundo)
        super(scene,x,y ,[
            spriteFundoAzul,spriteElipseTurno,spriteElipseSeguranca,
            spriteBotaoFinalizar,spriteSeguranca,textTurnoJogador,
            textBotaoFinalizar,spriteLinhaertical, textSinalMaisAlocando, 
            textQuantidadeAlocando, textSinalMenosAlocando,textQuantidadeAlocavel ]);
        
        this.warMatch = (this.scene as DisplayScene).warMatch
        this.textQuantidadeAlocando = textQuantidadeAlocando
        this.textQuantidadeAlocavel = textQuantidadeAlocavel
        this.quantidadeAlocando = 0
        this.quantidadeAlocavel = (this.scene as DisplayScene).warMatch.getCurrentPlayer().placeble.all
        this.textTurnoJogador = textTurnoJogador


        spriteBotaoFinalizar.setInteractive({useHandCursor: true})
         
        spriteBotaoFinalizar.on("pointerover", (pointer, objeto)=>{
            spriteBotaoFinalizar.setTint(0xcccccc).setAlpha(0.5);
        })

        spriteBotaoFinalizar.on("pointerdown", (pointer, objeto)=>{
            if(this.warMatch.hasConditionToNextPhase()){
                (this.scene as DisplayScene).nextPhase();
                eventsCenter.emit(GameEvent.nextPhase,this.warMatch.getCurrentPlayer());
            }
        })

        spriteBotaoFinalizar.on("pointerout", (pointer, objeto)=>{
            spriteBotaoFinalizar.setTint(0xffffff).setAlpha(1);
        })

        if((this.scene as DisplayScene).warMatch.getCurrentPlayer()){
            spriteElipseTurno.setTint((this.scene as DisplayScene).warMatch.getCurrentPlayer().color)
            spriteSeguranca.setTintFill((this.scene as DisplayScene).warMatch.getCurrentPlayer().color)
        }

        textSinalMaisAlocando.on("pointerdown", ()=>{
            this.atualizarQuantidadeAlocando(1)
        })
        
        textSinalMenosAlocando.on("pointerdown", ()=>{
            this.atualizarQuantidadeAlocando(-1)
        })

        // eventsCenter.on(PlayerEvent.mobilized, (data: {continentSlug: string, quantity: number})=>{
        //     // this.atualizarTexto()
        // })

        this.scene.add.existing(this);
    }

    atualizarTexto(){
        this.quantidadeAlocando = 0
        this.quantidadeAlocavel = this.warMatch.getCurrentPlayer().placeble.all
        this.textQuantidadeAlocando.setText(this.quantidadeAlocando.toString())
        this.textQuantidadeAlocavel.setText(this.quantidadeAlocavel.toString())
    }

    atualizarQuantidadeAlocando(quantidade:number){
        this.quantidadeAlocando += quantidade
        if(this.quantidadeAlocando < 0){
            this.quantidadeAlocando = 0
            return
        }

        this.quantidadeAlocando = (this.quantidadeAlocando < 0) ? 0 : this.quantidadeAlocando
        this.quantidadeAlocando = (this.quantidadeAlocavel === 0) 
        ? this.quantidadeAlocando - quantidade : this.quantidadeAlocando

        this.quantidadeAlocavel -= quantidade
        this.quantidadeAlocavel = this.quantidadeAlocavel < 0 ? 0 : this.quantidadeAlocavel;
        this.quantidadeAlocavel = this.quantidadeAlocavel > this.warMatch.getCurrentPlayer().placeble.all
          ? this.warMatch.getCurrentPlayer().placeble.all : this.quantidadeAlocavel;

        this.textQuantidadeAlocando.setText(this.quantidadeAlocando.toString())
        this.textQuantidadeAlocavel.setText(this.quantidadeAlocavel.toString())
        // (this.scene as DisplayScene).refresh()
    }
    
}