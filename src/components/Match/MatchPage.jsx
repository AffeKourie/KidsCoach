import { useState } from 'react';
import { formations } from '../../data/formations';
import TacticalBoard from './TacticalBoard';
import LineupList from './LineupList';

export default function MatchPage({ players, lineups, setLineups }) {
  const [view, setView] = useState('board');
  const [editingLineup, setEditingLineup] = useState(null);

  function handleNewLineup() {
    const defaultFormation = '3-3-2';
    const f = formations[defaultFormation];
    const homePlayers = f.positions.map((pos, i) => ({
      id: `home-${i}`,
      playerId: null,
      playerName: '',
      playerNumber: '',
      x: pos.x,
      y: pos.y,
      role: pos.role,
    }));

    const subs = Array.from({ length: 4 }, (_, i) => ({
      id: `sub-${i}`,
      playerId: null,
      playerName: '',
      playerNumber: '',
    }));

    setEditingLineup({
      id: crypto.randomUUID(),
      name: '',
      date: new Date().toISOString().split('T')[0],
      formation: defaultFormation,
      homePlayers,
      subs,
      awayPlayers: [],
      ball: null,
    });
    setView('board');
  }

  function handleEditLineup(lineup) {
    setEditingLineup({ ...lineup });
    setView('board');
  }

  function handleSaveLineup(lineup) {
    const exists = lineups.find((l) => l.id === lineup.id);
    if (exists) {
      setLineups(lineups.map((l) => (l.id === lineup.id ? lineup : l)));
    } else {
      setLineups([lineup, ...lineups]);
    }
    setEditingLineup(null);
    setView('saved');
  }

  function handleDeleteLineup(id) {
    setLineups(lineups.filter((l) => l.id !== id));
  }

  const subTabs = [
    { id: 'board', label: 'Taktiktavla' },
    { id: 'saved', label: 'Sparade uppställningar' },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === tab.id
                  ? 'bg-white text-green-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleNewLineup}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          + Ny uppställning
        </button>
      </div>

      {view === 'board' && (
        <TacticalBoard
          lineup={editingLineup}
          players={players}
          onSave={handleSaveLineup}
          onNew={handleNewLineup}
        />
      )}
      {view === 'saved' && (
        <LineupList
          lineups={lineups}
          onEdit={handleEditLineup}
          onDelete={handleDeleteLineup}
          onNew={handleNewLineup}
        />
      )}
    </div>
  );
}
