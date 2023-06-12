import { WarMatch } from "../game/WarMatch";
import eventsCenter from "../services/EventsCenter";
import { GamePlayer, playerCOLORS } from "./GamePlayer";

export default class Objective{
    owner: GamePlayer;
    warMatch: WarMatch;
    id: number;
    description: string;
    target: "continent" | "gamePlayer" | "territory";
    condition: {}
    type: "conquer" | "destroy";
    slug: string;

    constructor(warMatch: WarMatch, owner:GamePlayer, data) {
        let {id, type, description, slug, condition, targetType} = data
        this.warMatch = warMatch;
        this.owner = owner;
        this.id = id;
        this.condition = condition;
        this.type = type
        this.slug = slug
        this.description = description
        this.target = targetType
        
        // console.log(this)
    }

    static checkVictoryCondition(warMatch: WarMatch, data){
        let player: GamePlayer | undefined = warMatch.getCurrentPlayer()
        let fnString = `${player?.objective.type}`
        let objective = player?.objective

        if(player?.objective.type === "conquer"){
            Objective.conquer(warMatch, objective , data)
        }else if(player?.objective.type === "destroy"){
            Objective.destroy(warMatch, objective , data)
        }
        
        if(data.defender && data.defender.hasBeenDestroyed()){
            warMatch.removePlayerFromMatch(data.defender)
            if(data.defender.aimer && data.defender.aimer !== data.attacker){
                warMatch.board.resetObjective(warMatch, data.defender.aimer)
            }
            eventsCenter.emit("player-destroyed", data.defender)
        }
    }

    static destroy(warMatch:WarMatch, objective:Objective | undefined, data:{attacker: GamePlayer, defender: GamePlayer, }){
        // alert("rodando destroy")
        /* Se possui o exército da cor ou tiver sido destruído por outro, muda a condição
        
        */
        //Verifica se está na fase de ataque e se a cor do defensor é igual a cor de ataque do atacante
        if(data.attacker){
            if(data.attacker === data.defender.aimer && 
                data.defender.hasBeenDestroyed()){
                data.defender.destroyed = true;
                warMatch.removePlayerFromMatch(data.defender)
                alert(`Player: ${data.attacker.name} ganhou`)
                eventsCenter.emit("game-finished", data.attacker)
            }
        }

    }    

    static conquer(warMatch:WarMatch, objective:Objective | undefined, data:{attacker: GamePlayer, defender: GamePlayer, }){
        // alert("rodando conquer")
        let player:GamePlayer | any = warMatch.getCurrentPlayer()
        if(objective.target === "Continent"){
            let condicao1 = warMatch.board.hasTotality(player, objective.condition.continents[0])
            let condicao2 = warMatch.board.hasTotality(player, objective.condition.continents[1])
            let condicao3
            if(objective.condition.continents[2]){
                condicao3 = (objective.condition.continents[2].find(continent =>{
                    return warMatch.board.hasTotality(player, continent)
                })) > 0
                if(condicao1 && condicao2 && condicao3){
                    // warMatch.gameOver();
                    alert(`Player: ${player.name} ganhou`)
                    eventsCenter.emit("game-finished", player)
                }
            }else{
                if(condicao1 && condicao2){
                    // warMatch.gameOver();
                    alert(`Player: ${player.name} ganhou`)
                    eventsCenter.emit("game-finished", player)
                }
            }
        }else if(objective.target === "Territory"){
            let totalTerritories = warMatch.board.territories.filter(territory=>{
                return (territory.owner === player && territory.armies >= objective.condition.armies)
            }).length
            if(totalTerritories >= objective.condition.territories){
                alert(`Player: ${player.name} ganhou`)
                eventsCenter.emit("game-finished", player)
            }
        }
    }    
}