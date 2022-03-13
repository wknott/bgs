export default interface Game {
    pointFields: string[];
    _id: string;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    imgUrl: string;
    bggId: number;
    thumbnailUrl: string;
    __v: number;
    bddId?: number;
}
