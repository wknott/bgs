import useStats from './useStats';

const Stats = () => {
    const { monthStats, month, setMonth, toggleSortPropertyName } = useStats();
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
            <button onClick={toggleSortPropertyName}>Przełącz sortowanie</button>
            <span className="validity"></span>
            <h2>Statystyki</h2>
            <table>
                <tr>
                    <th>Lp</th>
                    <th>Nazwa</th>
                    <th>Ilość partii</th>
                    <th>Czas gry</th>
                </tr>
                {monthStats?.map(({ gameName, numberOfResults, playingTime }, index) => (
                    <tr key={gameName}>
                        <td>{index + 1}</td>
                        <td>{gameName}</td>
                        <td>{numberOfResults}</td>
                        <td>{playingTime}</td>
                    </tr>
                ))}
            </table>
            {`Łączny czas gry: ${(playingTime / 60).toFixed()} godzin ${playingTime % 60} minut`}
        </section>
    );
};

export default Stats;
