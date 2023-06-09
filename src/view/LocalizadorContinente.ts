export default class LocalizadorContinente extends Phaser.GameObjects.Container{

    constructor(data: {scene: Phaser.Scene, continent}) {
        let {scene, continent} = data;

        let localizador = new Phaser.GameObjects.Sprite(scene,continent.textX,continent.textY,'localizador')
        let continentText = new Phaser.GameObjects.Text(scene, 0,0, 
            `${continent.name} +${continent.totality}`,{wordWrap:{width:120}})
        console.log(localizador)
        super(scene, continent.x, continent.y, [localizador,continentText])

        console.log(this.scene)
        this.scene.add.existing(this)
    }
}