export default class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene")
    }
    create(){
        this.add.rectangle(600,400,400,350, 0x000000, 0.5)
        this.add.rectangle(600,400,350,300, 0x000000, 0.7)
        let imageBotaoJogar = this.add.image(600,350,'botao_jogar').setScale(0.7).setInteractive({useHandCursor:true})
        let imageBotaoManual = this.add.image(600,450,'botao_manual').setScale(0.7).setInteractive({useHandCursor:true})
        
        imageBotaoJogar.on('pointerdown',()=>{
            this.scene.start("LobbyScene")
        })
        imageBotaoManual.on('pointerdown',()=>{
            this.scene.start("ManualScene")
        })
        imageBotaoManual.on('pointerover',()=>{
            imageBotaoManual.setAlpha(0.8)
        })
        imageBotaoManual.on('pointerout',()=>{
            imageBotaoManual.setAlpha(1)
        })
        imageBotaoJogar.on('pointerover',()=>{
            imageBotaoJogar.setAlpha(0.8)
        })
        imageBotaoJogar.on('pointerout',()=>{
            imageBotaoJogar.setAlpha(1)
        })
    }

}