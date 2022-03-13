import useStats from './useStats';

const Stats = () => {
    const { monthStats, month, setMonth } = useStats();
    const playingTime = monthStats.reduce((a, b) => a + b.playingTime, 0);
    return (
        <section>
            <label htmlFor="month">What month would you like to visit (June to Sept.)?</label>
            <input
                id="month"
                type="month"
                name="month"
                value={month}
                onChange={(e) => {
                    setMonth(e.target.value);
                }}
                required
                pattern="[0-9]{4}-[0-9]{2}"
            />
            <span className="validity"></span>
            <h2>Statystyki</h2>
            <ol>
                {monthStats?.map((stat) => (
                    <li
                        key={stat.gameName}
                    >{`${stat.gameName}: ilość gier - ${stat.numberOfResults} łączny czas gry - ${stat.playingTime}min`}</li>
                ))}
            </ol>
            {`Łączny czas gry: ${(playingTime / 60).toFixed()} godzin ${playingTime % 60} minut`}
        </section>
    );
};

export default Stats;
