export default class FundoScene extends Phaser.Scene {
    constructor() {
        super("FundoScene")
    }
    create(){
        this.add.image(0,0,'fundo_inicial').setOrigin(0).setScale(0.9);
        this.add.image(380,10,'war').setOrigin(0).setScale(0.6);
        this.add.image(300,60,'tanque_guerra').setOrigin(0).setScale(0.7);
        this.scene.launch('LobbyScene')        
    }

}