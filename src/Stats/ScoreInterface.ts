import User from './UserInterface';

export default interface Score {
    points: Array<number | null>;
    user: User;
    _id: string;
}
