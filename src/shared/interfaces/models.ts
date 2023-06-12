import { Socket } from "socket.io";
import SocketIOClient from "socket.io-client";
import { Territory } from '../client/model/Territory';

export interface Comet {
    id: string;
}

export interface SpaceShip {
    name: string;
    id: string;
    x: number;
    y: number;
    ammo: number;
}

export interface Coordinates {
    x: number;
    y: number;
}

interface playerActions {
    r: number;
    a: number;
    f: boolean;
    m: boolean;
}

export interface Player {
    id: string;
    uuid?: string;
    ammo: number;
    name: string;
    x: number;
    y: number;
    player?: Player;
    coors?: Coordinates & playerActions;
}

export interface Window {
    socket: SocketIOClient.Emitter;
    location: {
        reload(forceReload: boolean): void;
    };
    innerHeight: number;
    innerWidth: number;
}

export interface DomainSocket extends Socket {
    comet: {
        id: string;
    };
    player: Player;
}

export interface WarMatch {
    players: Array<GamePlayer>;
    turn: Turn;
    board: Board;
    status: number
}

export interface Turn {

}
export interface Board {

}

export interface Territory{
    id: number;
    owner?: GamePlayer;
    name: string;
    armies: number;
    scene: Phaser.Scene;
    slug: string;
    spriteTerritory: Phaser.GameObjects.Sprite;
    armiesText: Phaser.GameObjects.BitmapText;
    neighbors: number[];
    isSelected: boolean;
    isHighlighted:boolean;
    continent: number;
    card: number;
}

export interface GamePlayer{
    color: number;
    totalArmies: number;
    totalTerritories: number;
    playerText: Phaser.GameObjects.Text;
    armies: number;
    destroyed:boolean;
    placed: Placeble;
    placeble: Placeble;
    gainedTerritory: boolean;
    hand: number[];
    warMatch: WarMatch;
    objective: Objective;
    aimer: GamePlayer;
}

export interface Objective{
    owner: GamePlayer;
    warMatch: WarMatch;
    id: number;
    description: string;
    target: "continent" | "gamePlayer" | "territory";
    condition: {};
    type: "conquer" | "destroy";
    slug: string;
}



export interface Placeble{
    "all": number,
    "south-america": number,
    "asia": number,
    "oceania": number,
    "africa": number,
    "north-america": number,
    "europe": number
}

export interface ExchangeTable{
    "1": number,
    "2": number
    "3": number
    "4": number
    "5": number
    "6": number
    "all": number
}

export interface PlayerType{
    id: number,
    uuid: string,
    name: string,
    ia: boolean,
    color: string
}
