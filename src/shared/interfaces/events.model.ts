export class GameEvent {
    public static readonly authentication: string = "authentication:successful";
    public static readonly lobby: string = "game:lobby";
    public static readonly end: "game:over";
    public static readonly start: "game:start";
    public static readonly drop: string = "drop";
}

export class ServerEvent {
    public static readonly connected: string = "connection";
    public static readonly disconnected: string = "disconnect";
}

export class PlayerEvent {
    public static readonly joined: string = "player:joined";
    public static readonly protagonist: string = "player:protagonist";
    public static readonly players: string = "actors:collection";
    public static readonly quit: string = "player:left";
    public static readonly pickup: string = "player:pickup";
    public static readonly hit: string = "player:hit";
    public static readonly coordinates: string = "player:coordinates";
}

export class InputEvent {
    public static readonly jooined: string = "player:joined";
    public static readonly update: string = "player:joined";
    // public static readonly protagonist: string = "player:protagonist";
    // public static readonly players: string = "actors:collection";
    // public static readonly quit: string = "player:left";
    // public static readonly pickup: string = "player:pickup";
    // public static readonly hit: string = "player:hit";
    // public static readonly coordinates: string = "player:coordinates";
}

export class LobbyEvents {
    public static readonly joined: string = "player:joined";
    // public static readonly update: string = "player:joined";
    // public static readonly protagonist: string = "player:protagonist";
    // public static readonly players: string = "actors:collection";
    // public static readonly quit: string = "player:left";
    // public static readonly pickup: string = "player:pickup";
    // public static readonly hit: string = "player:hit";
    // public static readonly coordinates: string = "player:coordinates";
}
