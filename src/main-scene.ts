import Phaser from "phaser";
import { WarMatch } from "./game/WarMatch";
import { Phases, Turn } from "./game/Turn";
import { GamePlayer } from "./model/GamePlayer";
import { Territory } from './model/Territory';
import { Board } from "./game/Board";
import eventsCenter from "./services/EventsCenter";
import PlayerType from "./model/Player";
import Objective from "./model/Objective";
import IaPlayer from "./model/IAPlayer";
import { GameEvent, PlayerEvent } from "./shared/events.model";
import DisplayScene from "./scenes/DisplayScene";

const COLORS = {
    'black': 0x4f4f4d,
    'green': 0x03a95e,
    'yellow': 0xe9ae02,
    'blue': 0x1a54a5,
    'pink': 0xde2587,
    'red': 0xec3829,
}

export class MainGameScene extends Phaser.Scene {

    public warMatch!: WarMatch;
    public continentsData: any;
    public cardsData: any;
    public objectiveCardsData: any;
    constructor() {
        super('MainGameScene');
    }
    
    create(): void {
        this.continentsData = this.cache.json.get('continents').continents;
        this.cardsData = this.cache.json.get('cards').cards;
        this.objectiveCardsData = this.cache.json.get('objectives').objectives
        this.warMatch = new WarMatch(new Board(), new Turn(), this);
        this.add.bitmapText(10,10,'pressstart','WAR')
      
        //Eventos
        eventsCenter.on("init", (players: PlayerType[]) => {
            if(this.warMatch.init(players)){
                this.scene.stop("LobbyScene")
                this.scene.run("DisplayScene",{warMatch: this.warMatch})
            }else{
                this.scene.launch("LobbyScene")
            }
        })

        eventsCenter.on("restart", (msg:string) => {
            this.scene.restart()
        })

        // this.input.keyboard.on("keydown-Q",()=>{
        //     this.scene.launch("ShowUIScene",{warMatch: this.warMatch})
        // })

        eventsCenter.on("territory-clicked", (territory:Territory) =>{
            
            let quantidade = (this.scene.get("DisplayScene") as DisplayScene)
                .statusJogador.quantidadeAlocando

            if(this.warMatch.turn.currentPhase === Phases.MOBILIZAR){
                if(quantidade > 0){
                    territory.mobilize(this.warMatch.board.continents, quantidade)
                }else{
                    territory.mobilize(this.warMatch.board.continents, 1);
                }
                (this.scene.get("DisplayScene") as DisplayScene).statusJogador.atualizarTexto()

            }else if(this.warMatch.turn.currentPhase === Phases.ATACAR){
                if(quantidade > 0){
                    this.warMatch.board.checkAttackCondition(
                        territory, this.warMatch.getCurrentPlayer(), quantidade, this
                    );
                }else{
                    this.warMatch.board.checkAttackCondition(
                        territory, this.warMatch.getCurrentPlayer(), 3, this
                    );
                }

            (this.scene.get("DisplayScene") as DisplayScene).statusJogador.atualizarTexto()

            }else if(this.warMatch.turn.currentPhase === Phases.FORTIFICAR){
                if(quantidade > 0){
                    this.warMatch.board.checkFortifyCondition(
                        territory, this.warMatch.getCurrentPlayer(), quantidade
                    )
                }else{
                    this.warMatch.board.checkFortifyCondition(
                        territory, this.warMatch.getCurrentPlayer(), 1
                    )
                }
                (this.scene.get("DisplayScene") as DisplayScene).statusJogador.atualizarTexto()
            }
        })

        //Eventos de turno
        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.MOBILIZAR],()=>{
            this.warMatch.getCurrentPlayer().clearPlaced()

            if(this.warMatch.getCurrentPlayer()){
                this.warMatch.getTotalArmiesToPlace()
                // this.scene.get("DisplayScene")
            }

            if(this.warMatch.getCurrentPlayer().ia){
                // alert("IA Jogando")
                (this.warMatch.getCurrentPlayer() as IaPlayer).cardExchange();
                (this.warMatch.getCurrentPlayer() as IaPlayer).mobilize()
                if(this.warMatch.hasConditionToNextPhase()){
                    // eventsCenter.emit("next-phase",this.warMatch.getCurrentPlayer())
                    // this.warMatch.turn.nextPhase()
                }
            }
                   
        })

        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.ATACAR],()=>{
            this.warMatch.getCurrentPlayer().clearPlaced()
            if(this.warMatch.getCurrentPlayer().ia){
                // alert("IA Jogando")
                (this.warMatch.getCurrentPlayer() as IaPlayer).attack()
                if(this.warMatch.hasConditionToNextPhase()){
                    eventsCenter.emit(GameEvent.nextPhase,this.warMatch.getCurrentPlayer())
                    this.warMatch.turn.nextPhase()
                }
            }
        })

        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.FORTIFICAR],()=>{
            this.warMatch.getCurrentPlayer().clearPlaced()
            if(this.warMatch.getCurrentPlayer().ia){
                // alert("IA Jogando")
                
                (this.warMatch.getCurrentPlayer() as IaPlayer).fortify()
                // this.warMatch.getCurrentPlayer().mobilize()
                if(this.warMatch.hasConditionToNextPhase()){
                    eventsCenter.emit(GameEvent.nextPhase,this.warMatch.getCurrentPlayer())
                    this.warMatch.turn.nextPhase()
                }
            }
        })


        eventsCenter.on(GameEvent.nextTurn , () =>{
            if(this.warMatch.getCurrentPlayer()?.gainedTerritory){
                this.warMatch.board.drawCard(this.warMatch.getCurrentPlayer())
            }
        })

        eventsCenter.on("clear-board", ()=>{
            this.warMatch.board.clearBoard()
        })

        eventsCenter.on("check-victory", (data)=>{
            Objective.checkVictoryCondition(this.warMatch, data)
        })

        eventsCenter.on("game-finished", (player: GamePlayer)=>{
            // if(this.warMatch.getCurrentPlayer()){
            this.add.bitmapText((this.game.config.width as number)/2,(this.game.config.height as number)/2,"pressstart", `Fim de Jogo \n o player ${player.name} venceu`).setDepth(1000).setOrigin(0.5)
            // }
        })

        eventsCenter.on(PlayerEvent.dicePlay, function(data:{attackResult: number[], defenseResult: number[], scene: Phaser.Scene}){
            let displayScene: DisplayScene = data.scene.scene.get("DisplayScene")
            console.log(displayScene)
            displayScene.dicePlay.setVisible(true);
            displayScene.dicePlay.playDice(data.attackResult, data.defenseResult);
            
            // (scene.get("DiplayScene") as DisplayScene).dicePlay.setVisible(true);
            // (scene.get("DiplayScene") as DisplayScene).dicePlay.playDice(data.attackResult, data.defenseResult);
        })

        

        let players = [
            {id: 1, name: 'Tiago', ia: false, color: 'black'},
            {id: 2, name: 'Paulo', ia: true, color: 'blue'},
            {id: 3, name: 'Rafa', ia: false, color: 'red'},
            {id: 4, name: 'Edu', ia: false, color: 'yellow'},
            {id: 5, name: 'Thali', ia: false, color: 'pink'},
            {id: 6, name: 'Ygor', ia: false, color: 'green'},
        ]

        // this.scene.run("InitGameScene")
        // eventsCenter.emit('init', players);

        if(this.warMatch.init(players)){
            // this.scene.run("ShowUIScene",{warMatch: this.warMatch})
            this.scene.run("DisplayScene",{warMatch: this.warMatch})
        }
        
    }

    update(): void {

    }
}