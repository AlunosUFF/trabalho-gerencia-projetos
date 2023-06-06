import { playerCOLORS } from "../model/GamePlayer";


const PLAYER_TYPES: {icone: string}[] = [{icone: "🚫"}, {icone: "🤖"}, {icone: "👩‍💻"}] 

export default class PlayerContainer extends Phaser.GameObjects.Container {
    public color: string;
    public activeType: number = 0;
    public spriteType: Phaser.GameObjects.Text;
    constructor(color:number, x:number, y:number, scene: Phaser.Scene){
        const styleInput = {
            background: '#csecse', 
            outline:"none",
            border: `solid 3px #${color.toString(16)}`,
            borderRadius: "10px",
            color: `#${color.toString(16)}`,
            textAlign: "center",
        }
        const input = `<input style="outline: none; border: 3px solid rgb(233, 174, 2); z-index: 0; display: block; position: absolute; opacity: 1; pointer-events: auto; mix-blend-mode: normal; transform: matrix(1, 0, 0, 1, 260, 340) skew(0rad, 0rad) rotate3d(0, 0, 0, 0deg); transform-origin: 0% 0%;">`
        let spritePlayerContainer  = new Phaser.GameObjects.Sprite(scene, 0 ,0, 'player_container').setOrigin(0).setScale(0.8)

        let spriteType  = new Phaser.GameObjects.Text(scene, 125,40, PLAYER_TYPES[0].icone,{fontSize: "32px", fontFamily: "Comic Sans"}).setOrigin(0).setScale(0.8)
        
        let inputPlayerName = new Phaser.GameObjects.DOMElement(scene,72,10,'input',styleInput,'alguma coisa').setOrigin(0)
        let leftButton = new Phaser.GameObjects.Text(scene, 50,40,"<",{color: `#${color.toString(16)}`, fontSize: "24px"}).setInteractive({useHandCursor: true})
        let rightButton = new Phaser.GameObjects.Text(scene, 215,40,">",{color: `#${color.toString(16)}`, fontSize: "24px"}).setInteractive({useHandCursor: true})
        
        super(scene,x,y,[spritePlayerContainer, inputPlayerName, leftButton, rightButton, spriteType])
        this.color = playerCOLORS[color]
        this.spriteType = spriteType
        this.inputPlayerName = inputPlayerName

        leftButton.on("pointerdown", () =>{
            this.changeActiveType(-1)

        })

        rightButton.on("pointerdown", () =>{
            this.changeActiveType(1)
        })

        this.scene.add.existing(this);
    }

    changeActiveType(value: number){
        this.activeType += value;
        this.activeType %= PLAYER_TYPES.length
        this.spriteType.setText(PLAYER_TYPES[Math.abs(this.activeType)].icone)

    }


}