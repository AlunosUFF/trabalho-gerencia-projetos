import { GameEvent, InputEvent } from "../../shared/events.model";
import { playerCOLORS } from "../model/GamePlayer";
import eventsCenter from "../services/EventsCenter";


const PLAYER_TYPES: {icone: string}[] = [{icone: "🚫"}, {icone: "🤖"}, {icone: "👩‍💻"}] 

export default class PlayerContainer extends Phaser.GameObjects.Container {
    public color: string;
    public activeType: number = 0;
    public spriteType: Phaser.GameObjects.Text;
    public inputPlayerName: Phaser.GameObjects.DOMElement;
    public displayPlayerName: Phaser.GameObjects.BitmapText;
    public index: number;
    public isEditing: boolean = true
    constructor(color:number, x:number, y:number, scene: Phaser.Scene, index:number){
        const styleInput = {
            background: '#csecse', 
            outline:"none",
            border: `solid 3px #${color.toString(16)}`,
            borderRadius: "10px",
            color: `#${color.toString(16)}`,
            textAlign: "center"
        }
        const input = `<input id=\"${color}\"style="outline: none; border: 3px solid rgb(233, 174, 2); z-index: 0; display: block; position: absolute; opacity: 1; pointer-events: auto; mix-blend-mode: normal; transform: matrix(1, 0, 0, 1, 260, 340) skew(0rad, 0rad) rotate3d(0, 0, 0, 0deg); transform-origin: 0% 0%;">`
        let spritePlayerContainer  = new Phaser.GameObjects.Sprite(scene, 0 ,0, 'player_container').setOrigin(0).setScale(0.8)

        let spriteType  = new Phaser.GameObjects.Text(scene, 125,40, PLAYER_TYPES[0].icone,{fontSize: "32px", fontFamily: "Comic Sans"}).setOrigin(0).setScale(0.8)
        .setInteractive({useHandCursor:true})

        let displayPlayerName = new Phaser.GameObjects.BitmapText(scene, 50 , 20, 'pressstart','',28, Phaser.GameObjects.BitmapText.ALIGN_CENTER).setScale(0.8)
        .setVisible(true).setTintFill(color)

        
        let inputPlayerName = new Phaser.GameObjects.DOMElement(scene,72,10,'input',styleInput,'alguma coisa').setOrigin(0)
        .setVisible(true)

        let leftButton = new Phaser.GameObjects.Text(scene, 50,40,"<",{color: `#${color.toString(16)}`, fontSize: "24px"}).setInteractive({useHandCursor: true})
        let rightButton = new Phaser.GameObjects.Text(scene, 215,40,">",{color: `#${color.toString(16)}`, fontSize: "24px"}).setInteractive({useHandCursor: true})
        
        super(scene,x,y,[spritePlayerContainer, inputPlayerName, leftButton, rightButton, spriteType, displayPlayerName])
        this.color = playerCOLORS[color]
        this.spriteType = spriteType
        this.inputPlayerName = inputPlayerName   
        this.displayPlayerName = displayPlayerName
        this.index = index 
        

        
        leftButton.on("pointerdown", () =>{
            this.changeActiveType(-1)
            this.updateDisplay()
        })

        rightButton.on("pointerdown", () =>{
            this.changeActiveType(1)
            this.updateDisplay()
        })

        spriteType.on("pointerdown", ()=>{
            this.updateDisplay()
        })

        inputPlayerName.addListener("keyup")

        inputPlayerName.on("keyup", ()=>{
                    // if(this.activeType > 0){
            let element:HTMLInputElement | null = document.querySelector(`#game-container > div > input:nth-child(${this.index + 1})`)
        //     eventsCenter.emit(GameEvent.authentication, {index: this.index, text: element?.value, type:this.activeType});
        // }
            console.log(element?.value)
            
        })

        this.scene.add.existing(this);
    }

    changeActiveType(value: number){
        this.activeType += value;
        if(this.activeType < 0){
            this.activeType = 2;
        }
        this.activeType %= PLAYER_TYPES.length
    }

    updateText(data:{text: string, type: number ,index: number, isEditing: true}){

    }

    exchangeDisplay(){

    }

    updateDisplay(){
        // if(this.activeType > 0){
        let element:HTMLInputElement | null = document.querySelector(`#game-container > div > input:nth-child(${this.index + 1})`)
        // eventsCenter.emit(GameEvent.authentication, {index: this.index, text: element?.value, type:this.activeType});
        eventsCenter.emit(InputEvent.update, {text: this.inputPlayerName, index: this.index, type:this.activeType, isEditing: this.isEditing});
    }
}