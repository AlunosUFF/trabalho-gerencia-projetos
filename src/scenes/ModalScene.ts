export default class ModalScene extends Phaser.Scene {
    public Message: Phaser.GameObjects.Text;
    MessageText: string = '';
    constructor() {
        super("ModalScene")
    }
    init(data:{msg:string}){
        this.MessageText = data.msg
    }
    create(data:{msg:string}){
        this.add.rectangle(600,200,400,350, 0x000000, 0.7)
        this.add.rectangle(600,200,350,300, 0x000000, 0.9)
        this.Message = this.add.text(440, 80,
        `${this.MessageText}`,{wordWrap:{width:300}, color: "white", align:"center", fontSize: "18px"})
        let imageBotaoX = this.add.image(750,70,'botao_x').setScale(0.5).setInteractive({useHandCursor:true})

        imageBotaoX.on('pointerdown',()=>{
            this.scene.stop("ModalScene")
        })
        imageBotaoX.on('pointerover',()=>{
            imageBotaoX.setAlpha(0.8)
        })
        imageBotaoX.on('pointerout',()=>{
           imageBotaoX.setAlpha(1)
        })
    }

}