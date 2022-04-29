import { useEffect, useState } from 'react';
import Result from './ResultInterface';

const useStats = () => {
    const [results, setResults] = useState<Array<Result>>([]);
    const [month, setMonth] = useState<string>('2022-03');
    const [sortPropertyName, setSortPropertyName] = useState<string>('playingTime');

    const toggleSortPropertyName = () => {
        setSortPropertyName(sortPropertyName === 'playingTime' ? 'numberOfResults' : 'playingTime');
    };

    useEffect(() => {
        const getResults = async () => {
            const response = await fetch('https://wyniczek.herokuapp.com/api/results');
            interface DataObject {
                results: Result[];
                numberOfResults: number;
            }
            const data: DataObject = await response.json();

            setResults(data.results);
        };

        getResults();
    }, [month]);

    interface StatInterface {
        gameName: string;
        numberOfResults: number;
        playingTime: number;
    }

    const getMonthStats = (monthDate: string): Array<StatInterface> => {
        const startDate = new Date(monthDate);
        const endDate = new Date(new Date(monthDate).setMonth(new Date(monthDate).getMonth() + 1));

        const filteredResults = results.filter(
            (result) => new Date(result.date) >= startDate && new Date(result.date) < endDate,
        );

        let stats: Array<StatInterface> = [];
        filteredResults.forEach((result) => {
            stats =
                stats.filter((stat) => stat.gameName === result.game.name).length > 0
                    ? stats.map((stat) =>
                          stat.gameName === result.game.name
                              ? {
                                    ...stat,
                                    numberOfResults: stat.numberOfResults + 1,
                                    playingTime: stat.playingTime + (result.playingTime || 0),
                                }
                              : stat,
                      )
                    : [
                          ...stats,
                          { gameName: result.game.name, numberOfResults: 1, playingTime: result.playingTime || 0 },
                      ];
        });

        if (sortPropertyName === 'playingTime') {
            return stats.sort((a, b) => (a.playingTime === b.playingTime ? 0 : a.playingTime > b.playingTime ? -1 : 1));
        }

        return stats.sort((a, b) =>
            a.numberOfResults === b.numberOfResults ? 0 : a.numberOfResults > b.numberOfResults ? -1 : 1,
        );
    };

    return {
        monthStats: getMonthStats(month),
        month,
        setMonth,
        toggleSortPropertyName,
    };
};

export default useStats;
