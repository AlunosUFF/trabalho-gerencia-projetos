export default class Graph {

    static setDistance(territory:Territory, territories:(Territory | undefined)[]) {
        let queue = [territory]
        let visited: {[index:number]:boolean} = {}
        visited[territory.id] = true
        let currentVertex:Territory | undefined;
        while (queue.length) {
            currentVertex = queue.shift();
            currentVertex?.neighbors.forEach(neighborId => {
                let neighbor = territories[neighborId];
                if (!visited[neighborId]) {
                    if(territory.distance && currentVertex){
                        territory.distance[neighborId as keyof Distance]++;
                        territory.distance[neighborId] += territory.distance[currentVertex.id];
                        visited[neighborId] = true;
                        if(neighbor){
                            queue.push(neighbor);
                        }
                    }
                }
            })
        }
    }

    static getMaxContinuosTerritories(owner: GamePlayer, territories: Territory[]):(Territory | undefined)[][]{
        let maxContinuosTerritories:(Territory | undefined)[][] = [];
        let territoriesOwned =  territories.filter((territory:Territory) =>{
            return territory?.owner?.id === owner.id
        })
        let visited:Visited = {}
        territoriesOwned.forEach((territory:Territory) =>{
            if(visited[territory.id]){
                return;
            }
            const queue = [territory];
            let result = [];
            visited[territory.id] = true;
            let currentVertex:Territory | undefined;
            while (queue.length) {
                currentVertex = queue.shift();
                result.push(currentVertex);
                // let currentTerritory = territories.find(territory => (territory.slug === currentVertex))
                currentVertex?.neighbors.forEach(neighborId => {
                    let neighbor = territories.find(territory =>(neighborId === territory.id))
                    if(!visited[neighbor?.id as keyof Visited] && neighbor?.owner === owner){
                        visited[neighbor?.id as keyof Visited] = true;
                        if(neighbor){
                            queue.push(neighbor)
                        }
                    }
                })
            };
            if(maxContinuosTerritories[0] && result.length > maxContinuosTerritories[0].length){
                maxContinuosTerritories = []
                maxContinuosTerritories.push(result)
            }else if(maxContinuosTerritories[0] && (result.length === maxContinuosTerritories[0].length)){
                maxContinuosTerritories.push(result)
            }else if(maxContinuosTerritories.length === 0){
                maxContinuosTerritories.push(result)
            }
           
        })
        return maxContinuosTerritories
    }

    static getBorderNeighbors(owner: GamePlayer, territories: Territory[]):Territory[]{
        const borderNeighbors:Territory[] = []
        const territoriesOwned =  territories.filter((territory:Territory) =>{
            return territory?.owner?.id === owner.id
        })

        const ownedVisited:Visited = {};
        territoriesOwned.forEach((territory:Territory) =>{
            if(ownedVisited[territory.id]){
                return
            }
            const neighborVisited:Visited = {};
            const queue: Territory[] = [territory];
            ownedVisited[territory.id] = true
            let currentVertex:Territory | undefined;
            while(queue.length){
                currentVertex = queue.shift();
                currentVertex?.neighbors.forEach(neighborId=>{
                    let neighbor = territories[neighborId];
                    if(!owner || !neighbor) return
                    if(neighbor.owner === owner && !ownedVisited[neighborId]){
                        queue.push(neighbor);
                        ownedVisited[neighborId] = true;
                    }else if(neighbor.owner !== owner && !neighborVisited[neighborId]){
                        borderNeighbors.push(neighbor);
                        neighborVisited[neighborId] = true;
                    }
                })
            }
        })
        return borderNeighbors
    }

    

}