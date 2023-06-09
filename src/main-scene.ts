import Phaser from "phaser";
import { TerritoryFactory } from './services/territory-factory'
import { WarMatch } from "./game/WarMatch";
import { Phases, Turn } from "./game/Turn";
import { GamePlayer } from "./model/GamePlayer";
import { Territory } from "./model/Territory";
import { Board } from "./game/Board";
import eventsCenter from "./services/EventsCenter";
import PlayerType from "./model/Player";
import ContadorExercitos from "./view/ContadorExercitos";
import InitGameScene from "./scenes/InitGameScene";
import Util from "./services/Util";
import Objective from "./model/Objective";
import IaPlayer from "./model/IAPlayer";



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
    public inputKeys: object;
    public continentsData: any;
    public cardsData: any;
    public objectiveCardsData: any;
    constructor() {
        super('MainGameScene');
        
    }

    preload():void{
        
    }
    
    create(): void {
        this.continentsData = this.cache.json.get('continents').continents;
        this.cardsData = this.cache.json.get('cards').cards;
        this.objectiveCardsData = this.cache.json.get('objectives').objectives
        this.warMatch = new WarMatch(new Board(), new Turn(), this);
        
      
        //Eventos
        //Busca o evento dos novos jogadores no jogo
        eventsCenter.on("init", (players: PlayerType[]) => {
            if(this.warMatch.init(players)){
                console.log(players)
                this.scene.stop("InitGameScene")
                this.scene.run("ShowUIScene",{warMatch: this.warMatch})
            }else{
                this.scene.launch("LobbyScene")
            }
        })

        eventsCenter.on("restart", (msg:string) => {
            this.scene.restart()
        })

        eventsCenter.on("showModal", (msg:string) => {
            console.log(msg)
        })

        this.input.keyboard.on("keydown-Q",()=>{
            this.scene.launch("DisplayScene",{warMatch: this.warMatch})
        })

        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.MOBILIZAR],()=>{
            //Calcular total de exercitos
            if(this.warMatch.getCurrentPlayer()){
                this.warMatch.getTotalArmiesToPlace()
            }

            if(this.warMatch.getCurrentPlayer().ia){
                // alert("IA Jogando")
                this.warMatch.getCurrentPlayer().cardExchange()
                this.warMatch.getCurrentPlayer().mobilize()
                if(this.warMatch.hasConditionToNextPhase()){
                    // eventsCenter.emit("next-phase",this.warMatch.getCurrentPlayer())
                    // this.warMatch.turn.nextPhase()
                }
            }
                   
        })

        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.ATACAR],()=>{
            if(this.warMatch.getCurrentPlayer().ia){
                // alert("IA Jogando")
                this.warMatch.getCurrentPlayer().attack()
                if(this.warMatch.hasConditionToNextPhase()){
                    eventsCenter.emit("next-phase",this.warMatch.getCurrentPlayer())
                    this.warMatch.turn.nextPhase()
                }
            }
        })

        eventsCenter.on(this.warMatch.turn.phasesNames[Phases.FORTIFICAR],()=>{
            if(this.warMatch.getCurrentPlayer().ia){
                // alert("IA Jogando")
                
                this.warMatch.getCurrentPlayer().fortify()
                // this.warMatch.getCurrentPlayer().mobilize()
                if(this.warMatch.hasConditionToNextPhase()){
                    eventsCenter.emit("next-phase",this.warMatch.getCurrentPlayer())
                    this.warMatch.turn.nextPhase()
                }
            }
        })

        eventsCenter.on("territory-clicked", (territory:Territory) =>{
            // if(this.warMatch.getCurrentPlayer()?.ia){
            //     alert("IA Jogando, não é permitida jogada");
            //     return
            // }

            if(this.warMatch.turn.currentPhase === Phases.MOBILIZAR){

                territory.mobilize(this.warMatch.board.continents)

            }else if(this.warMatch.turn.currentPhase === Phases.ATACAR){

                this.warMatch.board.checkAttackCondition(
                    territory, this.warMatch.getCurrentPlayer()
                )
            }
        })

        eventsCenter.on("next-phase", (player:GamePlayer) =>{
            if(this.warMatch.getCurrentPlayer()){
                player.clearPlaced();
            }
        })

        eventsCenter.on("next-turn" , () =>{
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

        eventsCenter.on("game-finished", (player)=>{
            // if(this.warMatch.getCurrentPlayer()){
            this.add.bitmapText(this.game.config.width/2,this.game.config.height/2,"pressstart", `Fim de Jogo \n o player ${player.name} venceu`).setDepth(1000).setOrigin(0.5)
            // }
        })
        

    
        let players = [
            {id: 1, name: 'Tiago', ia: false, color: 'black'},
            {id: 2, name: 'Paulo', ia: true, color: 'blue'},
            {id: 3, name: 'Rafa', ia: true, color: 'red'},
            {id: 4,name: "Ygor",ia: true,color: 'green'},
            {id: 5,name: "Thali",ia: true,color: 'yellow'},
            {id: 6,name: "Edu",ia: true,color: 'pink'}
        ]

        this.scene.run("InitGameScene")
        // eventsCenter.emit('init', players);

        if(this.warMatch.init(players)){
            // this.scene.run("ShowUIScene",{warMatch: this.warMatch})
            this.scene.run("DisplayScene",{warMatch: this.warMatch})
        }else{
            alert("Jogo nao inicializado")
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