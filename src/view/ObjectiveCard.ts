export class ObjetiveCard extends Phaser.GameObjects.Container {
    public isSelected: boolean = false;
    public cardRectangle: Phaser.GameObjects.Rectangle;
    public territory: any;
    public id: number;

    constructor(data: any) {
        let {x,y, scene,objective,color} = data
        
        // let cardText = new Phaser.GameObjects.BitmapText(x , y, scene, "pressstart", territory.name, 12, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        let cardRectangle = new Phaser.GameObjects.Rectangle(scene, x, y, 600, 800, color).setOrigin(0.5).setAlpha(1) 
        let cardRectangle2 = new Phaser.GameObjects.Rectangle(scene, x, y, 560, 700, 0x000000).setOrigin(0.5).setAlpha(0.8)          

        let headerText = new Phaser.GameObjects.Text(scene,x - 50,-150,"Esse é o seu objetivo", {color: "white", align:"center", fontSize: "32px"}).setOrigin(0.5).setStroke('#fff',1)

        
        let imageBotaoX = new Phaser.GameObjects.Sprite(scene,630,-150,'botao_x').setScale(0.7).setInteractive({useHandCursor:true})
        let objectiveText = new Phaser.GameObjects.Text(scene, x, y + 40, objective.description , {wordWrap:{width:500}, color: "white", align:"center", fontSize: "64px"}).setOrigin(0.5)
        

        super(scene, x, y, [cardRectangle, cardRectangle2, objectiveText, headerText, imageBotaoX ])
        this.setScale(0.5)
        this.cardRectangle = cardRectangle
        
        imageBotaoX.on('pointerdown',()=>{
            this.setVisible(false);
        })

        this.scene.add.existing(this)
    }
}