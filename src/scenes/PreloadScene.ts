export default class PreloadScene extends Phaser.Scene{
    constructor() {
        super('PreloadScene')
    }

    preload(){
        //Carregando os territórios
        // let territorios = this.load.aseprite('territorios', 
        // '../assets/images/mapa_war.png',
        // '../assets/images/mapa_war.json')
         //Carregando os territórios
         let territorios = this.load.aseprite('territorios', 
         '../assets/images/mapa_war.png',
         '../assets/images/mapa_war.json')    

        //Carregando a fonte
        this.load.bitmapFont('pressstart', 'assets/fonts/pressstart.png','assets/fonts/pressstart.fnt') 
        
        // //Carregando dados do mapa
        this.load.json('frame', 'assets/images/mapa_war.json');
        this.load.json('territories', 'assets/data/territories.json');
        this.load.json('continents', 'assets/data/continents.json');
        this.load.json('cards', 'assets/data/cards.json');
        this.load.json('objectives', 'assets/data/objectives.json');
        // console.log(territories)

        
        this.load.image('barra_azul', 'assets/images/icon_retangulo_azul.png');
        this.load.image('ellipse', 'assets/images/ellipse.png');
        this.load.image('carta', 'assets/images/cartas-de-jogar.png');
        this.load.image('computer', 'assets/images/icon_computer.png');
        this.load.image('musica', 'assets/images/icon_musica.png');
        this.load.image('objetivo', 'assets/images/icon_objetivo.png');
        this.load.image('retangulo_pequeno', 'assets/images/icon_retangulo_pequeno.png');
        this.load.image('sair', 'assets/images/icon_sair.png');
        this.load.image('seguranca', 'assets/images/icon_seguranca.png');
        this.load.image('volume', 'assets/images/icon_volume.png');
        this.load.image('retangulo_arredondado', 'assets/images/retangulo_arredondado.png');
        this.load.image('retangulo_branco', 'assets/images/Retangulo_branco.png');
        this.load.image('pessoa', 'assets/images/pessoa.png');
        this.load.image('linha_vertical', 'assets/images/linha_vertical.png');
        this.load.image('localizador', 'assets/images/localizador.png');
        this.load.image('fundo_inicial', 'assets/images/fundo_inicial.png');
        this.load.image('war', 'assets/images/war.png');
        this.load.image('tanque_guerra', 'assets/images/tanque-de-guerra.png');
        this.load.image('botao_jogar', 'assets/images/botao_jogar.png');
        this.load.image('botao_manual', 'assets/images/botao_manual.png');
        this.load.image('botao_comecar', 'assets/images/botao_comecar.png');
        this.load.image('botao_x', 'assets/images/botao_x.png');
        this.load.image('botao_voltar', 'assets/images/botao_voltar.png');
        this.load.image('player_container', 'assets/images/player_container.png');
        this.load.image('tabela_de_troca', 'assets/images/tabela_de_troca.png');

    }

    create(){
        this.scene.start('MainGameScene')
    }
}