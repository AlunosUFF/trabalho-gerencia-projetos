import { V4Options } from "uuid";
import {  InputEvent } from "../../shared/interfaces/events.model";
import eventsCenter from "../../shared/services/EventsCenter";
import { v4 as uuidv4 } from 'uuid';


const PLAYER_TYPES: {icone: string}[] = [{icone: "🚫"}, {icone: "🤖"}, {icone: "👩‍💻"}] 

export default class PlayerContainer extends Phaser.GameObjects.Container {
    public color: number;
    public activeType: number = 0;
    public displayType: Phaser.GameObjects.Text;
    public inputPlayerName: Phaser.GameObjects.DOMElement;
    public displayPlayerName: Phaser.GameObjects.BitmapText;
    public playerName: string = "";
    public playerID: number;
    public uuid: V4Options; 
    public index: number;
    public isEditing: boolean = true
    public inputName: any;
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
        .setVisible(false).setTintFill(color).setInteractive({useHandCursor: true})

        
        let inputPlayerName = new Phaser.GameObjects.DOMElement(scene,72,10,'input',styleInput,'alguma coisa').setOrigin(0)
        .setVisible(false)

        let leftButton = new Phaser.GameObjects.Text(scene, 50,40,"<",{color: `#${color.toString(16)}`, fontSize: "24px"}).setInteractive({useHandCursor: true})
        let rightButton = new Phaser.GameObjects.Text(scene, 215,40,">",{color: `#${color.toString(16)}`, fontSize: "24px"}).setInteractive({useHandCursor: true})
        
        super(scene,x,y,[spritePlayerContainer, inputPlayerName, leftButton, rightButton, spriteType, displayPlayerName])
        this.color = color
        this.displayType = spriteType
        this.inputName = document.querySelector(`#game-container > div > input:nth-child(${index + 1})`)  
        this.inputPlayerName = inputPlayerName;
        this.displayPlayerName = displayPlayerName
        this.index = index 
        this.playerID = index + 1;
        
        

        
        leftButton.on("pointerdown", () =>{
            this.changeActiveType(-1)
            this.updateText()
            this.emitUpdate()
        })

        rightButton.on("pointerdown", () =>{
            this.changeActiveType(1)
            this.updateText()
            this.emitUpdate()
        })

        this.displayType.on("pointerdown", ()=>{
            if(this.activeType > 0 && this.inputName.value !== ""){
                this.isEditing = !this.isEditing
                this.updateText()
                this.emitUpdate()
            }
        })

        this.inputPlayerName.addListener("keyup")

        this.inputPlayerName.on("keyup", ()=>{
            let element:HTMLInputElement | null = document.querySelector(`#game-container > div > input:nth-child(${this.index + 1})`)
            this.playerName = this.inputName.value || ""
            this.emitUpdate();
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

    updateText(){
        if(this.playerName){
            this.inputName.value = this.playerName
            this.displayPlayerName.setText(this.playerName)
        }
        this.displayType.setText(PLAYER_TYPES[this.activeType].icone)
        this.displayPlayerName.setVisible(!this.isEditing)
        if(this.activeType > 0){
            this.inputPlayerName.setVisible(this.isEditing)
        }else{
            this.inputPlayerName.setVisible(false)
            this.displayPlayerName.setVisible(false)
        }
    }

    exchangeDisplay(){
      
    }

    updateDisplay(playerContainer:PlayerContainer){
        this.playerName = playerContainer.playerName;
        this.activeType = playerContainer.activeType;
        this.isEditing = playerContainer.isEditing;
        this.updateText();
    }

    emitUpdate(){
        eventsCenter.emit(InputEvent.update, {
            color: this.color,
            activeType: this.activeType,
            playerName: this.playerName,
            playerID: this.playerID,
            index: this.index,
            isEditing: this.isEditing,                
        })
    }
}