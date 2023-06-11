// import { FirstGameScene } from './first-scene';
import Phaser from 'phaser';
// import './reset.css';
// import  MainGameScene  from './client/scenes/MainGameScene';
import PreloadScene from './client/scenes/PreloadScene';
import MainGameScene from './client/scenes/MainGameScene';
import InitGameScene from './client/scenes/InitGameScene'
import ShowUIScene from './client/scenes/ShowUIScene';
import DisplayScene from './client/scenes/DisplayScene';
import FundoScene from './client/scenes/FundoScene';
import MenuScene from './client/scenes/MenuScene';
import LobbyScene from './client/scenes/LobbyScene';
import ManualScene from './client/scenes/ManualScene';
import OutScene from './client/scenes/OutScene';

const config: Phaser.Types.Core.GameConfig = {
    width: 1227,
    height: 628,
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#B4CDFF',
    dom: {
      createContainer: true,
    },
    scene: [PreloadScene, FundoScene, MenuScene, LobbyScene, ManualScene, MainGameScene, InitGameScene, ShowUIScene, DisplayScene, OutScene]
  };

export class WarGame extends Phaser.Game{
    constructor(config:Phaser.Types.Core.GameConfig) {
      super(config); 
    }
}

new WarGame(config);



