import Phaser from "phaser";
import { WarMatch } from "./game/WarMatch";
import { Phases, Turn } from "./game/Turn";
import { GamePlayer } from "./model/GamePlayer";
import { Territory } from "./model/Territory";
import { Board } from "./game/Board";
import eventsCenter from "./services/EventsCenter";
import PlayerType from "./model/Player";
import Objective from "./model/Objective";
import IaPlayer from "./model/IAPlayer";
import { GameEvent } from "./shared/events.model";

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

        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.MOBILIZAR],()=>{
            //Calcular total de exercitos
            // if(this.warMatch.getCurrentPlayer()
            if(this.warMatch.getCurrentPlayer()){
                this.warMatch.getTotalArmiesToPlace()
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

        eventsCenter.on("territory-clicked", (territory:Territory) =>{
            
            if(this.warMatch.turn.currentPhase === Phases.MOBILIZAR){
                territory.mobilize(this.warMatch.board.continents)

            }else if(this.warMatch.turn.currentPhase === Phases.ATACAR){
                this.warMatch.board.checkAttackCondition(
                    territory, this.warMatch.getCurrentPlayer()
                )

            }else if(this.warMatch.turn.currentPhase === Phases.FORTIFICAR){
                this.warMatch.board.checkFortifyCondition(
                    territory, this.warMatch.getCurrentPlayer()
                )
            }
        })

        // eventsCenter.on(GameEvent.nextPhase, (player:GamePlayer) =>{
        //     if(this.warMatch.getCurrentPlayer()){
        //         player.clearPlaced();
        //     }
        // })

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
        

    
        let players = [
            {id: 1, name: 'Tiago', ia: false, color: 'black'},
            {id: 2, name: 'Paulo', ia: false, color: 'blue'},
            {id: 3, name: 'Rafa', ia: false, color: 'red'},
            // {id: 4,name: "Ygor",ia: true,color: 'green'},
            // {id: 5,name: "Thali",ia: true,color: 'yellow'},
            // {id: 6,name: "Edu",ia: true,color: 'pink'}
        ]

        // this.scene.run("InitGameScene")
        // eventsCenter.emit('init', players);

        if(this.warMatch.init(players)){
            // this.scene.run("ShowUIScene",{warMatch: this.warMatch})
            this.scene.run("DisplayScene",{warMatch: this.warMatch})
        }

        // this.scene.scene.on("pointerdown",(pointer)=>{
            // })
        // this.input.on("pointerdown",(pointer)=>{
        //     alert(pointer.x +"-"+pointer.y)
        // })

        
    }

    update(): void {

    }
}