import { Territory } from "../model/Territory";
import LocalizadorContinente from "../view/LocalizadorContinente";

export class TerritoryFactory{
    static loadCountries(scene:Phaser.Scene):Array<Territory>{
    // const territorios = scene.add.group();
    const territorios:Territory[] = []
    const territories = scene.cache.json.get('territories').territories
    const territoriosData = scene.cache.json.get('frame').frames;
    
    this.AddLines(scene)

    territories.forEach((territory: {
        slug: string;
        name: string; id: number; 
        neighbors: number[];
        continent: number,
        card: number
        }) => {
            let territorio = new Territory(
                {
                    scene: scene,
                    id: territory.id,
                    x: 0, 
                    y: 0,
                    armies: 0,
                    card: territory.card,
                    continent: territory.continent,
                    spriteSource: territoriosData[territory.slug].spriteSourceSize,
                    neighbors: territory.neighbors,
                    name: territory.name,
                    slug: territory.slug    
                }
            ) 
            territorios.push(territorio)
            // territorios.add(territorio);
        });



        // console.log(scene.continentsData)
        Object.keys(scene.continentsData).forEach(continentId =>{
            new LocalizadorContinente({scene, 
                continent: scene.continentsData[continentId],
                territorio:territorios
            })
        })

        this.AddLines(scene)
        
        return territorios;
    }
    static AddLines(scene: Phaser.Scene) {
        let lineAlaskaVladivostok = new Phaser.GameObjects.Line(scene,0,0,150,70,221,71,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineAlaskaVladivostok)

        let lineVladivostokAlaska = new Phaser.GameObjects.Line(scene,0,0,1116,69,1150,70,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineVladivostokAlaska)

        let lineMackenzieGroenlandia = new Phaser.GameObjects.Line(scene,0,0, 440,50,526,30,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineMackenzieGroenlandia)
        
        let lineLabradorGroenlandia = new Phaser.GameObjects.Line(scene,0,0,475,85,530,50,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineLabradorGroenlandia)

        let lineBrasilArgelia = new Phaser.GameObjects.Line(scene,0,0,526,312,591,248,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineBrasilArgelia)

        let lineGroenlandiaIslandia = new Phaser.GameObjects.Line(scene,0,0,578,49,600,61,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineGroenlandiaIslandia)

        let lineIslandiaInglaterra = new Phaser.GameObjects.Line(scene,0,0,603,66,623,96,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineIslandiaInglaterra)

        let lineIslandiaSuecia = new Phaser.GameObjects.Line(scene,0,0,617,59,680,63,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineIslandiaSuecia)

        let lineFrancaArgelia = new Phaser.GameObjects.Line(scene,0,0,651,142,652,159,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineFrancaArgelia)

        let lineFrancaInglaterra = new Phaser.GameObjects.Line(scene,0,0,644,107,645,114,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineFrancaInglaterra)

        let lineInglaterraSuecia = new Phaser.GameObjects.Line(scene,0,0,647,96,667,82,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineInglaterraSuecia)

        let lineAlemanhaSuecia = new Phaser.GameObjects.Line(scene,0,0,667,82,667,100,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineAlemanhaSuecia)

        let lineAlemanhaInglaterra = new Phaser.GameObjects.Line(scene,0,0,647,96,667,100,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineAlemanhaInglaterra)

        let lineItaliaArgelia = new Phaser.GameObjects.Line(scene,0,0,680,136,672,158,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineItaliaArgelia)

        let lineItaliaEgito = new Phaser.GameObjects.Line(scene,0,0,715,158,714,173,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineItaliaEgito)

        let lineMadasgascarAfricaDoSul = new Phaser.GameObjects.Line(scene,0,0,786, 374, 759, 375,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineMadasgascarAfricaDoSul)

        let lineMadasgascarSudao = new Phaser.GameObjects.Line(scene,0,0,808, 338, 784, 294,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineMadasgascarSudao)

        let lineOrienteMedioSudao = new Phaser.GameObjects.Line(scene,0,0,780, 221, 774, 234,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineOrienteMedioSudao)

        let lineOrienteMedioItalia = new Phaser.GameObjects.Line(scene,0,0,724, 143, 728,146,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineOrienteMedioItalia)

        let lineIndiaSumatra = new Phaser.GameObjects.Line(scene,0,0,909, 246, 963, 272,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineIndiaSumatra)

        let lineVietnaBorneo = new Phaser.GameObjects.Line(scene,0,0,1005, 250, 1032, 268,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineVietnaBorneo)

        let lineBorneoAustralia = new Phaser.GameObjects.Line(scene,0,0,1029, 303, 1058, 344,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineBorneoAustralia)

        let lineSumatraAustralia = new Phaser.GameObjects.Line(scene,0,0,1019, 319, 1034, 365,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineSumatraAustralia)

        let lineBorneoNovaGuine = new Phaser.GameObjects.Line(scene,0,0,1054, 294, 1081, 295,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineBorneoNovaGuine)

        let lineNovaGuineAustralia = new Phaser.GameObjects.Line(scene,0,0,1103, 320, 1093, 335,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineNovaGuineAustralia)

        let lineJapaoMongolia = new Phaser.GameObjects.Line(scene,0,0,1070, 160, 1042, 143,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineJapaoMongolia)

        let lineJapaoVladivostok = new Phaser.GameObjects.Line(scene,0,0,1077, 132, 1084, 94,0x000).setAlpha(0.2).setOrigin(0)
        scene.add.existing(lineJapaoVladivostok)
        
    }
}