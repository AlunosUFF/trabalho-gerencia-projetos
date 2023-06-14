import { Turn } from "../game/Turn";
import { GamePlayer } from "../model/GamePlayer";
import { Player } from "../model/Player";
import eventsCenter from "../services/EventsCenter";
import { WarMatch } from "../game/WarMatch";
import { Card } from "./Card";
import DisplayScene from "../scenes/DisplayScene";

export default class DeckCartas extends Phaser.GameObjects.Container {
    // public spriteFundo: Phaser.GameObjects.Sprite;
    // public slug: string;
    public warMatch: WarMatch;
    public cards: Card[] = [];
    // cardname: any;
    // textName: Phaser.GameObjects.BitmapText;

    constructor(data: { scene: any; x: number; y: number; fundo: any; warMatch: WarMatch, color: number}) {
        let { scene, x,y,fundo, warMatch, color} = data;
        let spriteFundoAzul = new Phaser.GameObjects.Sprite(scene, 0 ,0, fundo).setOrigin(0).setTintFill(color);
        let spriteElipseFechar = new Phaser.GameObjects.Sprite(scene, 640,10, 'ellipse').setOrigin(0);
        let textFechar = new Phaser.GameObjects.Text(scene,677,45,"❌",{fontSize:"28px", testString: '❌'});
        let spriteElipseTrocar = new Phaser.GameObjects.Sprite(scene, 10,10, 'ellipse').setOrigin(0);
        let textTrocar = new Phaser.GameObjects.Text(scene,45,45,"✔️",{fontSize:"28px", testString: '✔️'}).setTintFill(0x55dd55);
        let retangulos:Phaser.GameObjects.Rectangle[]=[];
        let retanguloMargemTabelaTroca = new Phaser.GameObjects.Rectangle(scene,-250,-340,250,410,color).setOrigin(0)
        retanguloMargemTabelaTroca.setVisible(false)
        let spriteTabelaTroca = new Phaser.GameObjects.Sprite(scene, -240,-330, 'tabela_de_troca').setOrigin(0)
        
        for(let i = 0; i<5;i++){
            retangulos.push(new Phaser.GameObjects.Rectangle(scene,180+(i*100),60,90,110,0x8794a5));
        }

        super(scene,x,y ,[spriteFundoAzul,spriteElipseFechar,spriteElipseTrocar, textFechar, textTrocar,retanguloMargemTabelaTroca,spriteTabelaTroca]);
        retangulos.forEach(retangulo=>{
            this.add(retangulo);
        })
        
        // this.setInteractive();
        this.warMatch = warMatch
        this.showHand();
        spriteElipseFechar.setInteractive({useHandCursor: true});
        spriteElipseTrocar.setInteractive({useHandCursor: true})
        spriteTabelaTroca.setInteractive()

        spriteTabelaTroca.on("pointerover", (pointer, objeto) =>{
            retanguloMargemTabelaTroca.setVisible(true)
        })
        spriteTabelaTroca.on("pointerout", (pointer, objeto) =>{
            retanguloMargemTabelaTroca.setVisible(false)
        })
        
        spriteElipseFechar.on("pointerdown", (pointer, objeto)=>{
            this.scene.sys.displayList.list.find(o=>o.constructor.name==='DeckCartas').setVisible(false);
            this.scene.sys.displayList.list.filter(o=>o.constructor.name!=='DeckCartas').forEach(object=>{
             object.setVisible(true);

            })
        })

        spriteElipseTrocar.on("pointerdown",()=>{
            if(this.warMatch.turn.getCurrentPhaseName()==="Mobilizar"){
                let playerCardsToExchange = this.cards.filter(c=>c.isSelected).map(c=>c.territory);
                let currentPlayer = (this.scene as DisplayScene).warMatch.getCurrentPlayer();

                this.warMatch.board.exchangeCards(currentPlayer, playerCardsToExchange )
                console.log(currentPlayer);
                // (this.scene as DisplayScene).updateArmies();
                (this.scene as DisplayScene).refresh();
            }
        })

        
        
        this.scene.add.existing(this);
        
    }

    showHand(){
        if(this.warMatch.getCurrentPlayer()){
            this.warMatch.getCurrentPlayer().hand.forEach((cardId,index)=>{
                let territory = this.warMatch.board.getTerritoryById(cardId)
                let card = new Card({
                    x:90 + (50*index),
                    y:30,
                    scene: this.scene,
                    card: this.warMatch.board.cardFigures[territory.card],
                    territory,
                    continent: this.warMatch.board.continents[territory.continent]
                })
                this.cards.push(card);
                this.add(card)
            })
        }   
        // console.log(this.warMatch)
        
    }
    
}