export default class OutScene extends Phaser.Scene {
    constructor() {
        super("OutScene")
    }
    create(){

        
        let spriteIconeSair  = this.add.image(1180,100,'botao_sair').setScale(0.7).setInteractive({useHandCursor:true})
       
        spriteIconeSair.on('pointerdown',()=>{
            this.scene.stop("MainGameScene")
            this.scene.stop("DisplayScene")
            this.scene.start("FundoScene")
        })
        spriteIconeSair.on('pointerover',()=>{
            spriteIconeSair.setAlpha(0.8)
        })
        spriteIconeSair.on('pointerout',()=>{
            spriteIconeSair.setAlpha(1)
        })
       
    }

}