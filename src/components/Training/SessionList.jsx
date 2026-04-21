const categoryColors = {
  'Uppvärmning': 'bg-orange-100 text-orange-700',
  'Teknik': 'bg-blue-100 text-blue-700',
  'Spelövning': 'bg-purple-100 text-purple-700',
  'Avslutning': 'bg-green-100 text-green-700',
};

export default function SessionList({ sessions, onEdit, onDuplicate, onDelete, onNew }) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">📋</p>
        <p className="mb-4">Inga sparade träningspass ännu.</p>
        <button
          onClick={onNew}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Skapa ditt första pass
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {sessions.map((session) => {
        const totalMinutes = session.exercises.reduce((sum, ex) => sum + ex.duration, 0);
        return (
          <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-semibold text-gray-800">{session.name}</h3>
                <p className="text-sm text-gray-500">
                  {session.date} · {session.exercises.length} övningar · {totalMinutes} min
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(session)}
                  className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Redigera
                </button>
                <button
                  onClick={() => onDuplicate(session)}
                  className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Kopiera
                </button>
                <button
                  onClick={() => onDelete(session.id)}
                  className="px-3 py-1.5 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Ta bort
                </button>
              </div>
            </div>
            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {session.exercises.map((ex, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[ex.category] || 'bg-gray-100 text-gray-600'}`}
                >
                  {ex.name}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
