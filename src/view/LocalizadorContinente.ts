import { MainGameScene } from "../main-scene";
import { Territory } from "../model/Territory";
import eventsCenter from "../services/EventsCenter";
import { GameEvent, PlayerEvent, TurnEvent } from "../shared/events.model";
import { Continent } from '../shared/models';

export default class LocalizadorContinente extends Phaser.GameObjects.Container{
    continentPlacebleQuantity: number;
    continent: any;
    continentText: Phaser.GameObjects.BitmapText;

    constructor(data: {scene: Phaser.Scene, continent: any, territorio:Territory}) {
        let {scene, continent} = data;

        let localizador = new Phaser.GameObjects.Sprite(scene,continent.numberX,continent.numberY,'localizador')
        .setTint(0xffc100)

        let continentText = new Phaser.GameObjects.Text(scene, continent.textX, continent.textY,``,
        {fontSize:"16px", wordWrap:{width:120}})
        .setTint(0xffffff).setText(`${continent.name} +${continent.totality}`)

        let continentTotalityDisplay = new Phaser.GameObjects.BitmapText(scene, 
            continent.numberX - 6, continent.numberY + 20, 
            'pressstart',`${0}`,20).setTint(0x000000).setAlpha(0.7)
        
        

        super(scene, continent.x, continent.y, [localizador,continentTotalityDisplay, continentText])
        localizador.setInteractive({useHandCursor: true})
        // localizador.on("pointerdown", (pointer, objeto)=>{
        //     // console.log(continent.id)
        // })
        this.continentPlacebleQuantity = 0;
        this.continentText = continentTotalityDisplay
        this.continent = continent

        this.scene.add.existing(this)

        eventsCenter.on(PlayerEvent.mobilizing, (data:{continentSlug: string, quantity: number})=>{
            this.atualizaTexto(data)
        })

        eventsCenter.on(TurnEvent.mobilize, ()=>{
            let quantity = (this.scene as MainGameScene).warMatch.getCurrentPlayer().placeble[this.continent.slug]
            this.atualizaTexto({ quantity: quantity, continentSlug: this.continent.slug})
        })
    }

    atualizaTexto(data:{continentSlug: string, quantity: number}){
        // console.log(territory)
        // if(this.continent.slug ==){
            //  this.continent.slug)
        // }
        if(this.continent.slug === data.continentSlug){
            this.continentPlacebleQuantity = data.quantity;
            this.continentText.setText(data.quantity.toString())
        }
    }
}