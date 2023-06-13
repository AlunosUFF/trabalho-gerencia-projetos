import { Territory } from "../model/Territory";

export default class LocalizadorContinente extends Phaser.GameObjects.Container{

    constructor(data: {scene: Phaser.Scene, continent: any, territorio:any}) {
        let {scene, continent,territorio} = data;

        let localizador = new Phaser.GameObjects.Sprite(scene,continent.textX,continent.textY,'localizador')
        let continentText = new Phaser.GameObjects.Text(scene, 0,0, 
            `${continent.name} +${continent.totality}`,{wordWrap:{width:120}})
        // console.log(localizador)
        super(scene, continent.x, continent.y, [localizador,continentText])
        // console.log(continent.id)
        // console.log(territorio[0])
        localizador.setInteractive({useHandCursor: true})
        localizador.on("pointerdown", (pointer, objeto)=>{
            // console.log(continent.id)
        })
        
        this.scene.add.existing(this)

        
    }
}