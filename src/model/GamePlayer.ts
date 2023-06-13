import { WarMatch } from "../game/WarMatch";
import Objective from "./Objective";
import PlayerType, { Player } from "./Player";
import { Territory } from "./Territory";

export enum playerCOLORS {
    'black' = 0x4f4f4d,
    'green' = 0x13a95b,
    'yellow' = 0xe9ae02,
    'blue' = 0x1a54a5,
    'pink' = 0xde2587,
    'red' = 0xec3829,
}

export enum Continent {
    All = 0,
    SouthAmerica = 1,
    Asia = 2,
    Oceania = 3,
    Africa = 4,
    NorthAmerica = 5,
    Europe = 6
}

export interface Placeble {
    [key: string]: number;
}

export function getContinentFromString(continentString: string): Continent {
    switch (continentString) {
      case 'south-america':
        return Continent.SouthAmerica;
      case 'asia':
        return Continent.Asia;
      case 'oceania':
        return Continent.Oceania;
      case 'africa':
        return Continent.Africa;
      case 'north-america':
        return Continent.NorthAmerica;
      case 'europe':
        return Continent.Europe;
      case 'all':
        return Continent.All;
      default:
        console.error("erro ao converter string para continent");
        throw new Error(`Continent inválido: ${continentString}`);
    }
  }
  

export class GamePlayer extends Player {

    // public cards: Array<Car
    public color: number;
    public totalArmies: number;
    public totalTerritories: number;
    public playerText: Phaser.GameObjects.Text;
    public destroyed = false;

    public placed: Placeble = {
        [Continent.All]: 0,
        [Continent.SouthAmerica]: 0,
        [Continent.Asia]: 0,
        [Continent.Oceania]: 0,
        [Continent.Africa]: 0,
        [Continent.NorthAmerica]: 0,
        [Continent.Europe]: 0
    }
    public placeble: Placeble = {
        [Continent.All]: 0,
        [Continent.SouthAmerica]: 0,
        [Continent.Asia]: 0,
        [Continent.Oceania]: 0,
        [Continent.Africa]: 0,
        [Continent.NorthAmerica]: 0,
        [Continent.Europe]: 0
    }
    public gainedTerritory = false;
    public hand: number[] = []
    public warMatch: WarMatch;
    public objective: Objective;
    public aimer: GamePlayer;


    // public ia: boolean;
    constructor(data: PlayerType, color: number, warMatch: WarMatch, ia: boolean, totalArmies: number, totalTerritories: number, playerText: Phaser.GameObjects.Text,
        objective: Objective, aimer: GamePlayer) {
        super(data);
        this.color = color;
        this.warMatch = warMatch;
        this.ia = data.ia;
        this.totalArmies = totalArmies;
        this.totalTerritories = totalTerritories;
        this.playerText = playerText;
        this.objective = objective;
        this.aimer = aimer;
    }

    destroyPlayerText() {
        this.playerText.destroy()
    }

    showGamePlayer(x: number, y: number, currentPlayerId: number, scene: Phaser.Scene) {
        let isCurrentPlayer = currentPlayerId === this.id;
        this.playerText = scene.add.text(x, y, `${this.name} ⚒: ${this.totalArmies} ⦻: ${this.totalTerritories}`)
            .setColor(`#${this.color.toString(16)}`)
        if (isCurrentPlayer) {
            this.playerText.setBackgroundColor("#ffffff55")
        }
        this.playerText.setInteractive({ useHandCursor: true });

        this.playerText.on("pointerdown", () => {
            //Mostrar os dados do jog, etc
        })
    }

    isCurrentPlayer() {
        return this.id === this.warMatch.turn.getCurrentPlayerId()
    }

    setPlaceble(type: string, quantity: number) {
        var continent = getContinentFromString(type)
        this.placeble[continent] = quantity;
    }

    addPlaceble(type: string, quantity: number) {
        var continent = getContinentFromString(type)
        this.placeble[continent] += quantity;
    }

    placeArmie(type: string, quantity: number) {
        var continent = getContinentFromString(type)
        if (this.hasArmiesToPlace()) {
            this.placeble[continent] -= quantity;
            this.placed[continent] += quantity;
        }
    }

    updateTotalTerritories() {
        this.totalTerritories = this.warMatch.getPlayerTerritories(this).length;
    }

    unplaceArmie(type: string, quantity: number) {
        var continent = getContinentFromString(type)
        this.placeble[continent] += quantity;
        this.placed[continent] -= quantity;
    }

    clearPlaced() {
        Object.keys(this.placed).forEach(key => {
            this.placeble[key] = 0;
            this.placed[key] = 0;
        })
    }

    hasArmiesToPlace() {
        let placesToPlace = Object.keys(this.placeble).filter(key => {
            return this.placeble[key] > 0
        }).length

        return placesToPlace > 0
    }

    isOwner(territory: Territory) {
        return this.id === territory.owner?.id
    }

    hasBeenDestroyed() {
        return this.totalTerritories === 0
    }

    resetPlaces() {

    }
}