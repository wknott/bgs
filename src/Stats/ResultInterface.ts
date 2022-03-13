import Game from './GameInterface';
import Score from './ScoreInterface';

export default interface Result {
    _id: string;
    game: Game;
    scores: Score[];
    author: string;
    date: Date;
    playingTime: number;
    __v: number;
}
