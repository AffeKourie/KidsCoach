import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultExercises } from './data/exercises';
import Navigation from './components/Layout/Navigation';
import TrainingPage from './components/Training/TrainingPage';
import MatchPage from './components/Match/MatchPage';
import PlayersPage from './components/Players/PlayersPage';

const EXERCISE_DATA_VERSION = 2;

function App() {
  const [activeTab, setActiveTab] = useState('training');
  const [players, setPlayers] = useLocalStorage('kfc-players', []);
  const [exercises, setExercises] = useLocalStorage('kfc-exercises', defaultExercises);
  const [sessions, setSessions] = useLocalStorage('kfc-sessions', []);
  const [lineups, setLineups] = useLocalStorage('kfc-lineups', []);
  const [favorites, setFavorites] = useLocalStorage('kfc-favorites', []);
  const [dataVersion, setDataVersion] = useLocalStorage('kfc-data-version', 0);

  useEffect(() => {
    if (dataVersion < EXERCISE_DATA_VERSION) {
      const customExercises = exercises.filter((e) => e.isCustom);
      setExercises([...defaultExercises, ...customExercises]);
      setDataVersion(EXERCISE_DATA_VERSION);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">⚽ Kids Football Coach</h1>
          <p className="text-green-200 text-sm mt-0.5">9-mannafotboll · 9–12 år</p>
        </div>
      </header>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'training' && (
          <TrainingPage
            exercises={exercises}
            setExercises={setExercises}
            sessions={sessions}
            setSessions={setSessions}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
        {activeTab === 'match' && (
          <MatchPage
            players={players}
            lineups={lineups}
            setLineups={setLineups}
          />
        )}
        {activeTab === 'players' && (
          <PlayersPage players={players} setPlayers={setPlayers} />
        )}
      </main>
    </div>
  );
}

export default App;
