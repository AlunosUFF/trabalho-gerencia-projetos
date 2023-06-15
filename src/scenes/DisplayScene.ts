import { WarMatch } from "../game/WarMatch";
import eventsCenter from "../services/EventsCenter";
import ContadorExercitos from "../view/ContadorExercitos";
import StatusJogador from "../view/StatusJogador";
import ObjetivoJogador from "../view/ObjetivoJogador";
import IconeCarta from "../view/IconeCarta";
import { ObjetiveCard } from "../view/ObjectiveCard";
import DeckCartas from "../view/DeckCartas";
import { GameEvent, PlayerEvent } from "../shared/events.model";
import { Phases } from "../game/Turn";
import DicePlay from "../view/DicePlay";

export default class DisplayScene extends Phaser.Scene {
    public warMatch!: WarMatch;
    public isOpen: boolean = false;
    public INITIALX: number = 20;
    public INITIALY: number = 450;
    finishPhaseButton!: Phaser.GameObjects.Text;
    displayPhase!: Phaser.GameObjects.Text;
    displayMessage!: Phaser.GameObjects.Text;
    contadores: ContadorExercitos[]=[];
    statusJogador!: StatusJogador;
    objetivo: any;
    iconCarta: any;
    objetivoCard!: ObjetiveCard;
    deckCartas!: DeckCartas;
    iconSair: any;
    dicePlay: DicePlay;


    constructor() {
        super("DisplayScene")
    }
    

    init(data: { warMatch: WarMatch; }){
        let {warMatch} = data;
        this.warMatch = warMatch;

    }

    nextPhase(){
        this.warMatch.turn.nextPhase();
        // this.statusJogador.mode = Phases[this.warMatch.turn.getCurrentPhaseName()]
        eventsCenter.emit(GameEvent.nextPhase,this.warMatch.getCurrentPlayer());
        this.refresh();
    }

    destroy(){
        if(this.contadores.length>0){
            this.contadores.forEach(contador=>contador.destroy())
        }
        if(this.statusJogador){
            this.statusJogador.destroy();
        }
        if(this.objetivo){
            this.objetivo.destroy();
        }
        if(this.iconCarta){
            this.iconCarta.destroy();
        }
        if(this.deckCartas){
            this.deckCartas.destroy();
        }
        if(this.dicePlay){
            this.dicePlay.destroy();
        }

    }

    refresh(){
        this.destroy();
        this.scene.launch('OutScene');
        
        let count = 0;
        this.warMatch.turn.playersOrders.forEach(playerId =>{
            let player = this.warMatch.getPlayerById(playerId)
            this.warMatch.setPlayerTotalArmies(player)
            this.warMatch.setPlayerTotalTerritories(player)
            this.contadores.push(new ContadorExercitos({
                scene:this,
                x: 0,
                y: 50 + (90*count),
                fundo: 'retangulo_arredondado',
                player: player,
            }));
            if(player === this.warMatch.getCurrentPlayer()){
                this.contadores[this.contadores.length -1].highlight()
            }
            count++;
        })

      
        this.statusJogador = new StatusJogador({
            scene:this,
            x: 250,
            y: 500,
            fundo: 'barra_azul',
            warMatch: this.warMatch,
                
        });

        
        this.objetivo = new ObjetivoJogador({
            scene:this,
            x: 0,
            y: 0,
            fundo: 'ellipse',
            objective: this.warMatch.getCurrentPlayer().objective,
            color: this.warMatch.getCurrentPlayer().color
        });


        this.iconCarta = new IconeCarta({
            scene:this,
            x: 250,
            y: 500,
            fundo: 'carta',
          
        });

        this.deckCartas = new DeckCartas({
            scene:this,
            x: 250,
            y: 500,
            fundo: 'barra_azul',
            warMatch: this.warMatch,
            color: this.warMatch.getCurrentPlayer().color
          
        }).setVisible(false);

        this.dicePlay = new DicePlay({
            x: 1100,
            y: 560,
            scene: this
        }).setVisible(false)

        // eventsCenter.on(PlayerEvent.dicePlay, function(data:{attackResult: number[], defenseResult: number[], scene:Phaser.Scene}){
            
        //     // this.dicePlay.setVisible(true);
        //     // (scene.get("DiplayScene") as DisplayScene).dicePlay.playDice(data.attackResult, data.defenseResult);
        // })

    }

    updateArmies(){
        // let placedArmies = this.warMatch.turn.getCurrentPlayer(this.warMatch.players)?.placed["all"]
        // let placebleArmies = this.warMatch.turn.getCurrentPlayer(this.warMatch.players)?.placeble["all"]
        // this.displayMessage.setText(
        //     `Exércitos Disponíveis: ${placebleArmies} Exércitos alocados: ${placedArmies}`
        // )
    }

    create(){
        this.refresh();

    }
}