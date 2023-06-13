import { WarMatch } from "../../shared/game/WarMatch";
import { GameEvent, InputEvent } from '../../shared/interfaces/events.model';
import { DomainSocket } from "../../shared/interfaces/models";
import { playerCOLORS } from "../../shared/model/GamePlayer";
import eventsCenter from "../../shared/services/EventsCenter";
import PlayerContainer from "../view/PlayerContainer"

export default class LobbyScene extends Phaser.Scene {
    public playersContainers: PlayerContainer[]=[]
    public warMatch?: WarMatch;
    public socket?: DomainSocket;
    constructor() {
        super("LobbyScene")
    }

    init(data:{warMatch:WarMatch, socket:DomainSocket}){
        this.warMatch = data.warMatch
        this.socket = data.socket
    }

    destroy(){
        if(this.playersContainers.length > 0){
            this.playersContainers.forEach(playerContainer =>playerContainer.destroy())
        }
    }

    create(){
        this.destroy()
        this.add.rectangle(600,300,1000,550, 0x000000, 0.5)
        this.add.rectangle(600,300,950,500, 0x000000, 0.7)
        let imageBotaoX = this.add.image(1040,80,'botao_x').setScale(0.7).setInteractive({useHandCursor:true})
        let imageBotaoVoltar = this.add.image(400,500,'botao_voltar').setScale(0.7).setInteractive({useHandCursor:true})
        let imageBotaoComecar = this.add.image(800,500,'botao_comecar').setScale(0.7).setInteractive({useHandCursor:true})
        
        let counter = 0
        
        Object.values(playerCOLORS).splice(0,6).forEach((key: string | playerCOLORS, index:number) =>{
            this.playersContainers.push(
                new PlayerContainer(
                    playerCOLORS[key],
                    260 + (400 * (counter % 2)),
                    100 + (120 * (Math.floor(counter / 2))),
                    this,
                    index
                )
            )
            counter++;
        })

        
        imageBotaoX.on('pointerdown',()=>{
            this.scene.start("MenuScene")
        })
        imageBotaoVoltar.on('pointerdown',()=>{
            this.scene.start("MenuScene")
        })
        imageBotaoComecar.on('pointerdown',()=>{
            this.scene.stop("FundoScene")
            this.scene.start("MainGameScene")
        })

        imageBotaoX.on('pointerover',()=>{
            imageBotaoX.setAlpha(0.8)
        })
        imageBotaoX.on('pointerout',()=>{
            imageBotaoX.setAlpha(1)
        })
        imageBotaoVoltar.on('pointerover',()=>{
            imageBotaoVoltar.setAlpha(0.8)
        })
        imageBotaoVoltar.on('pointerout',()=>{
            imageBotaoVoltar.setAlpha(1)
        })
        imageBotaoComecar.on('pointerover',()=>{
            imageBotaoComecar.setAlpha(0.8)
        })
        imageBotaoComecar.on('pointerout',()=>{
            imageBotaoComecar.setAlpha(1)
        })

        this.socket?.on(GameEvent.lobby,(data:{hasLobbed:boolean, warMatch: WarMatch, containers:PlayerContainer[]})=>{
            if(data.hasLobbed){
                this.warMatch = data.warMatch;
                console.log(this.warMatch)
            }
            
            console.log(data.containers)
            this.playersContainers.forEach((playerContainer:PlayerContainer, index:number) =>{
                playerContainer.updateDisplay(data.containers[index])
            })
            // this.destroy()
        })

        this.socket?.emit(GameEvent.lobby, {warMatch:this.warMatch});

        eventsCenter.on(InputEvent.update, (playerContainer:PlayerContainer)=>{
            this.socket?.emit(InputEvent.update, playerContainer);
        })

        this.socket?.on(InputEvent.update, (playerContainer:PlayerContainer)=>{
            this.playersContainers[playerContainer.index].updateDisplay(playerContainer)
        })
    }
}