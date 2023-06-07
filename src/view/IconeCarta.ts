import { GamePlayer } from "../model/GamePlayer";

export default class IconeCarta extends Phaser.GameObjects.Container {
    // public spriteFundo: Phaser.GameObjects.Sprite;
    public slug: string;
    // cardname: any;
    // textName: Phaser.GameObjects.BitmapText;

    constructor(data: { scene: any; x: number; y: number; fundo: any}) {
        let { scene, x,y,fundo} = data;
        let spriteElipseCarta = new Phaser.GameObjects.Sprite(scene, 640,10, 'ellipse').setOrigin(0);
        let spriteCarta = new Phaser.GameObjects.Sprite(scene, 670, 30, 'carta').setOrigin(0);
        
      
        spriteCarta.setInteractive()

        super(scene,x,y ,[spriteElipseCarta,spriteCarta]);
        spriteCarta.on("pointerover", (pointer, objeto)=>{
            spriteCarta.setAlpha(0.7);  
        })
        spriteCarta.on("pointerout", (pointer, objeto)=>{
            spriteCarta.setAlpha(1);
        })
        spriteCarta.on("pointerdown", (pointer, objeto)=>{
           this.scene.sys.displayList.list.find(o=>o.constructor.name==='DeckCartas').setVisible(true);
           this.scene.sys.displayList.list.filter(o=>o.constructor.name!=='DeckCartas').forEach(object=>{
            object.setVisible(false);
           })
        })
        this.scene.add.existing(this);

    }
}