import { useState } from 'react';
import { CATEGORIES } from '../../data/exercises';
import ExerciseForm from './ExerciseForm';
import ExerciseDiagram from './ExerciseDiagram';

const categoryColors = {
  'Uppvärmning': 'bg-orange-100 text-orange-700',
  'Teknik': 'bg-blue-100 text-blue-700',
  'Spelövning': 'bg-purple-100 text-purple-700',
  'Avslutning': 'bg-green-100 text-green-700',
};

export default function ExerciseLibrary({ exercises, setExercises, favorites, setFavorites }) {
  const [filter, setFilter] = useState('Alla');
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const categories = ['Alla', 'Favoriter', ...Object.values(CATEGORIES)];

  const filtered = filter === 'Favoriter'
    ? exercises.filter((e) => favorites.includes(e.id))
    : filter === 'Alla'
      ? exercises
      : exercises.filter((e) => e.category === filter);

  function toggleFavorite(e, exerciseId) {
    e.stopPropagation();
    if (favorites.includes(exerciseId)) {
      setFavorites(favorites.filter((id) => id !== exerciseId));
    } else {
      setFavorites([...favorites, exerciseId]);
    }
  }

  function handleAddExercise(exercise) {
    setExercises([...exercises, { ...exercise, id: crypto.randomUUID(), isCustom: true }]);
    setShowForm(false);
  }

  function handleDeleteExercise(id) {
    setExercises(exercises.filter((e) => e.id !== id));
    setFavorites(favorites.filter((fid) => fid !== id));
  }

  const favCount = favorites.length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                filter === cat
                  ? cat === 'Favoriter' ? 'bg-amber-500 text-white' : 'bg-green-600 text-white'
                  : cat === 'Favoriter'
                    ? 'bg-white text-amber-600 border border-amber-300 hover:bg-amber-50'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat === 'Favoriter' ? `★ Favoriter${favCount > 0 ? ` (${favCount})` : ''}` : cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1.5 text-sm text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
        >
          {showForm ? 'Avbryt' : '+ Egen övning'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <ExerciseForm onSave={handleAddExercise} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="grid gap-3">
        {filtered.map((exercise) => {
          const isFav = favorites.includes(exercise.id);
          return (
            <div
              key={exercise.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === exercise.id ? null : exercise.id)}
                className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={(e) => toggleFavorite(e, exercise.id)}
                    className={`text-lg leading-none transition-colors ${
                      isFav ? 'text-amber-400 hover:text-amber-500' : 'text-gray-300 hover:text-amber-400'
                    }`}
                    title={isFav ? 'Ta bort favorit' : 'Markera som favorit'}
                  >
                    {isFav ? '★' : '☆'}
                  </button>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${categoryColors[exercise.category] || 'bg-gray-100 text-gray-600'}`}>
                    {exercise.category}
                  </span>
                  <span className="font-medium text-gray-800">{exercise.name}</span>
                  {exercise.isCustom && (
                    <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">Egen</span>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {exercise.setup && <span className="text-xs text-green-600 hidden sm:inline">Diagram</span>}
                  <span className="text-sm text-gray-500 whitespace-nowrap">{exercise.duration} min</span>
                  <span className="text-gray-400">{expanded === exercise.id ? '▲' : '▼'}</span>
                </div>
              </button>
              {expanded === exercise.id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className={`mt-3 ${exercise.setup || exercise.imageUrl ? 'sm:flex sm:gap-4' : ''}`}>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exercise.description}</p>
                      {exercise.link && (
                        <a
                          href={exercise.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          Extern källa →
                        </a>
                      )}
                    </div>

                    {(exercise.setup || exercise.imageUrl) && (
                      <div className="mt-3 sm:mt-0 sm:w-64 flex-shrink-0">
                        {exercise.setup && <ExerciseDiagram setup={exercise.setup} />}
                        {exercise.imageUrl && (
                          <img
                            src={exercise.imageUrl}
                            alt={exercise.name}
                            className="w-full rounded-lg border border-gray-200"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {exercise.isCustom && (
                    <button
                      onClick={() => handleDeleteExercise(exercise.id)}
                      className="mt-3 text-xs text-red-500 hover:text-red-700"
                    >
                      Ta bort övning
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-8 text-gray-400">
          {filter === 'Favoriter' ? 'Inga favoriter ännu. Klicka ☆ på en övning för att markera den.' : 'Inga övningar i denna kategori.'}
        </p>
      )}
    </div>
  );
}
