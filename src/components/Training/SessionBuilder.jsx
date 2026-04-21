import { useState } from 'react';

const categoryColors = {
  'Uppvärmning': 'bg-orange-100 text-orange-700',
  'Teknik': 'bg-blue-100 text-blue-700',
  'Spelövning': 'bg-purple-100 text-purple-700',
  'Avslutning': 'bg-green-100 text-green-700',
};

export default function SessionBuilder({ session, allExercises, onSave, onCancel }) {
  const [name, setName] = useState(session.name);
  const [date, setDate] = useState(session.date);
  const [selected, setSelected] = useState(session.exercises);
  const [showPicker, setShowPicker] = useState(false);

  const totalMinutes = selected.reduce((sum, ex) => sum + ex.duration, 0);

  function handleAdd(exercise) {
    setSelected([...selected, { ...exercise, _uid: crypto.randomUUID() }]);
  }

  function handleRemove(uid) {
    setSelected(selected.filter((e) => e._uid !== uid));
  }

  function handleMoveUp(index) {
    if (index === 0) return;
    const arr = [...selected];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    setSelected(arr);
  }

  function handleMoveDown(index) {
    if (index === selected.length - 1) return;
    const arr = [...selected];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    setSelected(arr);
  }

  function handleSave() {
    if (!name.trim()) return;
    onSave({ ...session, name: name.trim(), date, exercises: selected });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {session.name ? 'Redigera pass' : 'Nytt träningspass'}
        </h2>
        <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700">
          ← Tillbaka
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Namn på passet</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="T.ex. Teknikträning tisdag"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div className="w-40">
            <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            Övningar ({selected.length})
          </span>
          <span className={`text-sm font-semibold ${totalMinutes > 90 ? 'text-red-600' : 'text-green-600'}`}>
            Totalt: {totalMinutes} min
          </span>
        </div>

        {selected.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>Inga övningar ännu. Klicka "Lägg till övning" för att börja.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {selected.map((exercise, index) => (
              <li key={exercise._uid} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm w-6">{index + 1}.</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[exercise.category] || 'bg-gray-100 text-gray-600'}`}>
                    {exercise.category}
                  </span>
                  <span className="text-sm font-medium text-gray-800">{exercise.name}</span>
                  <span className="text-xs text-gray-500">{exercise.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleMoveUp(index)} className="p-1 text-gray-400 hover:text-gray-600" title="Flytta upp">↑</button>
                  <button onClick={() => handleMoveDown(index)} className="p-1 text-gray-400 hover:text-gray-600" title="Flytta ner">↓</button>
                  <button onClick={() => handleRemove(exercise._uid)} className="p-1 text-red-400 hover:text-red-600 ml-1" title="Ta bort">✕</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="px-4 py-2 text-sm text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
        >
          {showPicker ? 'Dölj övningar' : '+ Lägg till övning'}
        </button>
      </div>

      {showPicker && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Välj övning att lägga till:</h3>
          <div className="grid gap-2 max-h-64 overflow-y-auto">
            {allExercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => handleAdd(exercise)}
                className="text-left px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-colors flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[exercise.category] || 'bg-gray-100 text-gray-600'}`}>
                    {exercise.category}
                  </span>
                  <span className="text-sm text-gray-800">{exercise.name}</span>
                </div>
                <span className="text-xs text-gray-500">{exercise.duration} min</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={!name.trim() || selected.length === 0}
          className="px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Spara pass
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
        >
          Avbryt
        </button>
      </div>
    </div>
  );
}
