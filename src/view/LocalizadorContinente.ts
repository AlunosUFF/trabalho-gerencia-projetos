export default class LocalizadorContinente extends Phaser.GameObjects.Container{

    constructor(data: {scene: Phaser.Scene, continent: any, territorio:any, alocaveis: number}) {
        let {scene, continent, territorio, alocaveis} = data;

        let localizador = new Phaser.GameObjects.Sprite(scene,continent.textX,continent.textY,'localizador')
        .setTint(0xffc100)
        let continentText = new Phaser.GameObjects.Text(scene, continent.textX ,continent.textY,`${alocaveis}`,{fontSize:"24px"})
        .setTint(0x000)
        super(scene, continent.x, continent.y, [localizador,continentText])
        localizador.setInteractive({useHandCursor: true})
        // localizador.on("pointerdown", (pointer, objeto)=>{
        //     // console.log(continent.id)
        // })

        this.scene.add.existing(this)
       
    }
}