import { WarMatch } from "../game/WarMatch";
import { GamePlayer, getContinentFromString, getStringFromContinent } from "./GamePlayer";
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
        let possibleExchages:Territory[][] = this.warMatch.board.checkPossibleExchanges(this.hand)
        if(possibleExchages.length > 0){
            // this.warMatch.board.exchangeCards(currentPlayer, playerCardsToExchange)
            let index = Math.round(Math.random() * (possibleExchages.length-1))
            this.warMatch.board.exchangeCards(this,possibleExchages[index])
        }
        
        //Analisar situação
        
        //Tomar decisão

    }

    mobilize(){
         console.log("alo mundo")
        //Mobilizando de forma aleatória
        Object.keys(this.placeble).forEach(key => {
            const place = getStringFromContinent(Number(key));
            let territories = this.warMatch.board.getTerritoriesByContinent(place, this);
            while (this.placeble[Number(key)] > 0) {
              let index = Math.round(Math.random() * (territories.length - 1));
              let territory = territories[index];
              territory.mobilize(this.warMatch.board.continents);
            }
          });
        
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