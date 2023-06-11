import { WarMatch } from "../game/WarMatch";
import { GamePlayer } from "./GamePlayer";
import PlayerType, { Player } from "./Player";
import { Territory } from './Territory';
import { Board } from "./Boards";
import { Board } from '../game/Board';

export default class IaPlayer extends GamePlayer{

    public coesionWeight = 1;
    public totalitynWeight = 1;
    public aggressiveWeight = 1;
    public survivalWeight = 1;
    public objectiveWeight = 1;

    constructor(data:PlayerType, color: number, warMatch: WarMatch) {
        super(data, color, warMatch);
    }

    //Trocar
    cardExchange(){
        alert("IA trocando cartas")
        /*let possibleExchanges:Territory[][] = this.warMatch.board.checkPossibleExchanges(this.hand)
        if(possibleExchanges.length > 0){
            // this.warMatch.board.exchangeCards(currentPlayer, playerCardsToExchange)
            let index = Math.round(Math.random() * (possibleExchanges.length-1))
            this.warMatch.board.exchangeCards(this,possibleExchanges[index])
        }*/
    
        // início da análise de troca
        let possibleExchanges: Territory[][] = this.warMatch.board.checkPossibleExchanges(this.hand)
            
        if (possibleExchanges.length > 0) {
            // Análise da situação e tomada de decisão
            let bestExchange: Territory[][] = this.analyzeSituation(possibleExchanges);
                
            if (bestExchange) 
                this.warMatch.board.exchangeCards(this, bestExchange);
            else{
                let index = Math.round(Math.random() * (possibleExchanges.length-1));
                this.warMatch.board.exchangeCards(this,possibleExchanges[index]);
            }
        }

    }    
    //Analisar situação 
    analyzeSituation(possibleExchanges: Territory[][]){

        let bestExchange: Territory[][] | null = null;
        let bestExchangeScore = 0;
    
        // Percorrer todas as combinações de trocas possíveis
        for (let exchange:Territory[][] of possibleExchanges) {
             
             let exchangeScore = this.evaluateExchange(exchange);
    
            // Comparar o score com o melhor score atual
            if (exchangeScore > bestExchangeScore) {
                bestExchange = exchange;
                bestExchangeScore = exchangeScore;
            }
        }
    
        return bestExchange;
    }
        
    evaluateExchange(exchange: Territory[][]): number {

        let exchangeValue = 0;
        let currentPlayerArmies = this.totalArmies;
        let currentPlayerTerritories = this.warMatch.board.getPlayerTerritories(this);
        currentPlayerTerritories.sort((a, b) => b.armies + a.armies);// territórios com menor  de tropas na frente 
        let ownTerritoriesNum =  currentPlayerTerritories.count;

        currentPlayerTerritories.forEach((territory)=> {
            let neighborTerritories = territory.neighbors;  
            let differencePower = 0;
            for (let neighbor of neighborTerritories){ // analise de  tropar alocadas
 
                 if(neighbor.owner !== this)
                   differencePower = neighbor.armies/territory.armies;    

                 if( differencePower > 1){
                     exchangeValue -= 10;
                 }else 
                    exchangeValue += 10;
                 
                 
            }       
        });
        
        for(let territory of this.warMatch.board.territories){ //analise de todos territorios mundiais
            
            let territoriesNotOwned = 0;
            

            if(territory.owner !== this)
                territoriesNotOwned += 1;

            let domainDifference = ownTerritoriesNum - territoriesNotOwned;
            
            if(domainDifference < 0){
                exchangeValue -= 10;
            }else 
                exchangeValue += 10;

            if((ownTerritoriesNum + territoriesNotOwned)/3 <= ownTerritoriesNum)
                exchangeValue += 10;
            
        }

        if(currentPlayerArmies/ownTerritoriesNum >= 3)
            exchangeValue += 10;
        
        return exchangeValue;
                    
    }  

    //Mobilização
    //Analisar situação
    mobilize(){
        alert("IA mobilizando")

        Object.keys(this.placeble).forEach(place =>{
            let territories = this.warMatch.board.getTerritoriesByContinent(place, this)
            while(this.placeble[place] > 0){
                let target = this.analiticMobilize();
                let territory = territories[target];
                territory.mobilize(this.warMatch.board.continents)
            }
        })
    
    }
   
    analiticMobilize(){

        let aiTerritories = this.warMatch.board.getPlayerTerritories(this) ; // Obtém todos os territórios controlados pela IA
        aiTerritories.sort((a, b) => b.armies - a.armies);//territórios com maior número de tropas ficam na frente
        let moveTerritory = null;
        
        // Analisar cada território
        aiTerritories.forEach((territory) =>{
            let neighborTerritories = territory.neighbors;  
            let maxDanger = 0;

            for (let neighbor of neighborTerritories){
               let danger = 0;

                if(neighbor.owner !== this)
                  danger = neighbor.armies/territory.armies;    

                if(danger > maxDanger){
                    maxDanger = danger;
                    moveTerritory = territory;
                
                }
                
            }
       });

       return moveTerritory;
        
    }   
        
    //Atacar
    
    attack() {

        
        let aiTerritories = this.warMatch.board.getPlayerTerritories(this)
        let attackerTerritories = Territory;

        aiTerritories.forEach((territory) =>{
            let neighborTerritories = territory.neighbors; 

            for (let neighbor of neighborTerritories){

                if(neighbor.owner !== this)
                attackerTerritories.add(neighbor);     
            }

        })
        attackerTerritories.sort((a, b) => b.armies + a.armies);// inimigos com menores tropas ficam na frente
        aiTerritories.sort((a,b) => b.armies - a.armies); //territórios com maiores tropas na frente

        aiTerritories.forEach(attacker => {
        // Tomar decisão de ataque
            attacker.highlightNeighbours(this.warMatch.board.territories)
            let index = 0;
            while(this.warMatch.board.hasHighlightedTerritory(attacker) && attacker.armies > 1){
                attacker.select()
                if(this.warMatch.board.checkAttackCondition(attackerTerritories[index], attacker.owner)){
                    this.warMatch.board.checkAttackCondition(attackerTerritories[index], attacker.owner);
                } else
                    index ++
            }

            this.warMatch.board.clearBoard();
        });
    }
    
        
    fortify(){
        alert("IA fortificando")
        
        let aiTerritories = this.warMatch.board.getPlayerTerritories(this)
        aiTerritories.sort((a,b) => b.armies + a.armies);// territórios menores na frente
       
        aiTerritories.forEach(territory =>{

            territory.select()
            
            this.warMatch.board.checkFortifyCondition(territory,this);
                       
            territory.unselect()

        })

        this.warMatch.board.clearBoard()

        //Analisar situação

        //Tomar decisão
    }

}