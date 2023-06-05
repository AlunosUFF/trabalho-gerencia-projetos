import { WarMatch } from "../game/WarMatch";
import { GamePlayer } from "./GamePlayer";
import PlayerType from "./Player";
import { Territory } from "./Territory";

export default class IaPlayer extends GamePlayer{

    public coesionWeight = 1;
    public totalitynWeight = 1;
    public aggressiveWeight = 1;
    public survivalWeight = 1;
    public objectiveWeight = 1;

    constructor(data:PlayerType, color: number, warMatch: WarMatch) {
        super(data, color, warMatch);
    }

    cardExchange(){
        // alert("IA trocando cartas")
        //Analisar situação
        
        //Tomar decisão

    }

    mobilize(){
        // alert("IA mobilizando")
        //Mobilizando de formaaleatória
        Object.keys(this.placeble).forEach(place =>{
            let territories = this.warMatch.board.getTerritoriesByContinent(place, this)
            while(this.placeble[place] > 0){
                let index = Math.round(Math.random() * (territories.length-1))
                let territory = territories[index]
                territory.mobilize(this.warMatch.board.continents)
                console
            }
        })
        
        //Analisar situação

        //Tomar decisão

    }

    attack(){
        // alert("IA atacando")
        // Aleatório
        let attackerTerritories = this.warMatch.board.getPlayerTerritoriesByArmiesNumber(this,1)
        attackerTerritories.forEach(attacker =>{
            attacker.highlightNeighbours(this.warMatch.board.territories)
            while(this.warMatch.board.hasHighlightedTerritory(attacker) && attacker.armies > 1){
                attacker.select()
                let highlightedTerritories = this.warMatch.board.getHighlighted()
                let index = Math.round(Math.random() * (highlightedTerritories.length-1))
                this.warMatch.board.checkAttackCondition(highlightedTerritories[index], attacker.owner)
                attacker.unhighlightNeighbours(this.warMatch.board.territories)
                attacker.highlightNeighbours(this.warMatch.board.territories)
            }
            this.warMatch.board.clearBoard()
        })
        //Analisar situação
        
        
        //Tomar decisão
    }

    fortify(){
        // alert("IA fortificando")
        //Aleatório
        let outnumberedTerritories = this.warMatch.board.getPlayerTerritoriesByArmiesNumber(this,1)
        // let withOneTerritories = this.warMatch.board.getPlayerTerritoriesByArmiesNumber(this,1)
        outnumberedTerritories.forEach(territory =>{
            territory.highlightOwnedNeighbors(this.warMatch.board.territories)
            let highlightedTerritories = this.warMatch.board.getHighlighted()
            let index = Math.round(Math.random() * (highlightedTerritories.length-1))
            territory.select()
            if(highlightedTerritories[index]){
                this.warMatch.board.checkFortifyCondition(
                    highlightedTerritories[index], this
                )
                console.log(highlightedTerritories[index])
            }
            // territory.unselect()
            territory.unHighlightOwnedNeighbors(this.warMatch.board.territories)
            this.warMatch.board.clearBoard()
        })
        this.warMatch.board.clearBoard()

        //Analisar situação

        //Tomar decisão
    }

}