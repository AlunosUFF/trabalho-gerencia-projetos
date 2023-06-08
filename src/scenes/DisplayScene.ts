import { WarMatch } from "../game/WarMatch";
import eventsCenter from "../services/EventsCenter";
import ContadorExercitos from "../view/ContadorExercitos";
import { Player } from "../model/Player";
import StatusJogador from "../view/StatusJogador";
import ObjetivoJogador from "../view/ObjetivoJogador";
import IconeCarta from "../view/IconeCarta";
import { playerCOLORS } from "../model/GamePlayer";
import { ObjetiveCard } from "../view/ObjectiveCard";
import DeckCartas from "../view/DeckCartas";
import LocalizadorContinente from "../view/LocalizadorContinente";
import IconeSair from "../view/IconeSair";
export default class ShowUIScene extends Phaser.Scene {
    public warMatch: WarMatch;
    public isOpen: boolean = false;
    public INITIALX: number = 20;
    public INITIALY: number = 450;
    finishPhaseButton: Phaser.GameObjects.Text;
    displayPhase: Phaser.GameObjects.Text;
    displayMessage: Phaser.GameObjects.Text;
    contadores: ContadorExercitos[]=[];
    statusJogador: StatusJogador;
    objetivo: any;
    iconCarta: any;
    objetivoCard: ObjetiveCard;
    deckCartas: DeckCartas;
    iconSair: any;


    constructor() {
        super("DisplayScene")
    }
    

    init(data: { warMatch: WarMatch; }){
        let {warMatch} = data;
        this.warMatch = warMatch;
    }
    nextPhase(){
        this.warMatch.turn.nextPhase();
        eventsCenter.emit("next-phase",this.warMatch.getCurrentPlayer());
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

        //Criação dos localizadores de continent com as totalidades
        // Object.keys(this.warMatch.board.continents).forEach(continentId =>{
        //     new LocalizadorContinente({scene: this, 
        //         continent: this.warMatch.board.continents[continentId]})
        // })
    }

    updateArmies(){
        let placedArmies = this.warMatch.turn.getCurrentPlayer(this.warMatch.players)?.placed["all"]
        let placebleArmies = this.warMatch.turn.getCurrentPlayer(this.warMatch.players)?.placeble["all"]
        this.displayMessage.setText(
            `Exércitos Disponíveis: ${placebleArmies} Exércitos alocados: ${placedArmies}`
        )
    }

    create(){
        this.refresh();

    }
}