export interface Continent{
    x:number,
    y:number,
    textX:number,
    textY: number,
    id: number,
    name:string,
    totality: 5,
    color:string,
    slug:string
}

export interface Distance{
    [index:number]: number
}

export interface Visited{
    [index:string | number]: boolean
}
