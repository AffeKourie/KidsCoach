import { useState } from 'react';

export default function PlayersPage({ players, setPlayers }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [editingId, setEditingId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      setPlayers(players.map((p) =>
        p.id === editingId ? { ...p, name: name.trim(), number: number.trim() } : p
      ));
      setEditingId(null);
    } else {
      setPlayers([...players, {
        id: crypto.randomUUID(),
        name: name.trim(),
        number: number.trim(),
      }]);
    }
    setName('');
    setNumber('');
  }

  function handleEdit(player) {
    setName(player.name);
    setNumber(player.number);
    setEditingId(player.id);
  }

  function handleDelete(id) {
    setPlayers(players.filter((p) => p.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setName('');
      setNumber('');
    }
  }

  function handleCancel() {
    setEditingId(null);
    setName('');
    setNumber('');
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Spelartrupp</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Namn</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Förnamn"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="w-24">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nummer</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="#"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              {editingId ? 'Uppdatera' : 'Lägg till'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Avbryt
              </button>
            )}
          </div>
        </div>
      </form>

      {players.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">👥</p>
          <p>Inga spelare ännu. Lägg till din trupp ovan.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">{players.length} spelare</span>
          </div>
          <ul className="divide-y divide-gray-100">
            {players.map((player) => (
              <li key={player.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center text-sm">
                    {player.number || '–'}
                  </span>
                  <span className="font-medium text-gray-800">{player.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(player)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Redigera
                  </button>
                  <button
                    onClick={() => handleDelete(player.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Ta bort
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
