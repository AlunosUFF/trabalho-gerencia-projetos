import { Territory } from "../model/Territory";

export class TerritoryFactory{
    static loadCountries(scene:Phaser.Scene):Array<Territory>{
    // const territorios = scene.add.group();
    const territorios:Territory[] = []
    const territories = scene.cache.json.get('territories').territories
    const territoriosData = scene.cache.json.get('frame').frames;
    territories.forEach((territory: {
        slug: string;
        name: string; id: number; neighbors: number[]
        }) => {
            let territorio = new Territory(
                {
                    scene: scene,
                    id: territory.id,
                    x: 0, 
                    y: 0,
                    armies: 1,
                    spriteSource: territoriosData[territory.slug].spriteSourceSize,
                    neighbors: territory.neighbors,
                    name: territory.name,
                    slug: territory.slug    
                }
            )  
            territorios.push(territorio)
            // territorios.add(territorio);
        });
        return territorios;
    }
}