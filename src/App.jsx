import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultExercises } from './data/exercises';
import defaultPlayers from './data/players.json';
import Navigation from './components/Layout/Navigation';
import DataManagement from './components/Layout/DataManagement';
import TrainingPage from './components/Training/TrainingPage';
import MatchPage from './components/Match/MatchPage';
import PlayersPage from './components/Players/PlayersPage';

const EXERCISE_DATA_VERSION = 2;
const PLAYER_DATA_VERSION = 4;

function App() {
  const [activeTab, setActiveTab] = useState('training');
  const [players, setPlayers] = useLocalStorage('kfc-players', defaultPlayers);
  const [exercises, setExercises] = useLocalStorage('kfc-exercises', defaultExercises);
  const [sessions, setSessions] = useLocalStorage('kfc-sessions', []);
  const [lineups, setLineups] = useLocalStorage('kfc-lineups', []);
  const [favorites, setFavorites] = useLocalStorage('kfc-favorites', []);
  const [dataVersion, setDataVersion] = useLocalStorage('kfc-data-version', 0);
  const [playerDataVersion, setPlayerDataVersion] = useLocalStorage('kfc-player-data-version', 0);
  const [showDataPanel, setShowDataPanel] = useState(false);

  useEffect(() => {
    if (dataVersion < EXERCISE_DATA_VERSION) {
      const customExercises = exercises.filter((e) => e.isCustom);
      setExercises([...defaultExercises, ...customExercises]);
      setDataVersion(EXERCISE_DATA_VERSION);
    }
    if (playerDataVersion < PLAYER_DATA_VERSION) {
      setPlayers(defaultPlayers);
      setPlayerDataVersion(PLAYER_DATA_VERSION);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">⚽ Kids Football Coach</h1>
            <p className="text-green-200 text-sm mt-0.5">9-mannafotboll · 9–12 år</p>
          </div>
          <button
            onClick={() => setShowDataPanel(true)}
            className="p-2 rounded-lg hover:bg-green-600 transition-colors"
            title="Hantera data"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
        </div>
      </header>

      <DataManagement open={showDataPanel} onClose={() => setShowDataPanel(false)} />

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
