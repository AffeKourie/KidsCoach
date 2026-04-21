export default function LineupList({ lineups, onEdit, onDelete, onNew }) {
  if (lineups.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">🏟️</p>
        <p className="mb-4">Inga sparade uppställningar ännu.</p>
        <button
          onClick={onNew}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Skapa din första uppställning
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {lineups.map((lineup) => (
        <div key={lineup.id} className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-800">{lineup.name || 'Namnlös uppställning'}</h3>
            <p className="text-sm text-gray-500">
              {lineup.date} · Formation: {lineup.formation} · {lineup.homePlayers?.length || 0} spelare
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(lineup)}
              className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Öppna
            </button>
            <button
              onClick={() => onDelete(lineup.id)}
              className="px-3 py-1.5 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Ta bort
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
