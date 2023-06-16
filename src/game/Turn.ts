import { GamePlayer } from "../model/GamePlayer";
import eventsCenter from "../services/EventsCenter";
import Util from "../services/Util";
import { GameEvent } from "../shared/events.model";

export enum Phases{
    MOBILIZAR = 0,
    ATACAR = 1,
    FORTIFICAR = 2
}
export class Turn{
    public totalPlayers: number = 0;
    public currentPlayer: number = 0;
    public moves: number = 0;
    public playersOrders: number[] = [];
    public currentPhase: number = -1;
    public phasesNames: string[] = ["Mobilizar","Atacar","Fortificar"];
    public counter = 0;
    
    setTotalPlayers(){
        this.totalPlayers = this.playersOrders.length;
    }


    shufflePlayerOrder(players:number[]){
        this.playersOrders = Util.shuffle(players);
    }
    
    init(players:number[]) {
        this.shufflePlayerOrder(players);
        // this.currentPhase = Phases.MOBILIZAR;
        // this.nextPhase();
        this.currentPhase++;
        this.setTotalPlayers();
    }

    nextPlayer(): void{
        this.currentPlayer++;
        this.currentPlayer %= this.totalPlayers;
    }

    getCurrentPlayerId(){
        return this.playersOrders[this.currentPlayer]
    }

    getCurrentPlayer(players:GamePlayer[]):GamePlayer{
        return players.find(player =>{
            return player.id === this.getCurrentPlayerId()
        })
    }

    getCurrentPhaseName(){
        return this.phasesNames[this.currentPhase]
    }

    nextPhase(){
        
        this.currentPhase++;
        if(this.counter < this.playersOrders.length && this.currentPhase === 1){
            this.currentPhase+=2;
        }
        if(!(this.currentPhase < this.phasesNames.length)){
            this.nextTurn();
        }
        this.currentPhase %= this.phasesNames.length
        

        eventsCenter.emit(this.getCurrentPhaseName())
        
    }

    nextTurn(){
        this.counter++;
        this.nextPlayer();
        eventsCenter.emit(GameEvent.nextTurn)
    }
}