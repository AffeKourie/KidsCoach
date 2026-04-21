import { useState } from 'react';
import ExerciseLibrary from './ExerciseLibrary';
import SessionBuilder from './SessionBuilder';
import SessionList from './SessionList';

export default function TrainingPage({ exercises, setExercises, sessions, setSessions, favorites, setFavorites }) {
  const [view, setView] = useState('library');
  const [editingSession, setEditingSession] = useState(null);

  function handleNewSession() {
    setEditingSession({
      id: crypto.randomUUID(),
      name: '',
      date: new Date().toISOString().split('T')[0],
      exercises: [],
    });
    setView('builder');
  }

  function handleEditSession(session) {
    setEditingSession({ ...session, exercises: [...session.exercises] });
    setView('builder');
  }

  function handleDuplicateSession(session) {
    const duplicate = {
      ...session,
      id: crypto.randomUUID(),
      name: `${session.name} (kopia)`,
      date: new Date().toISOString().split('T')[0],
      exercises: [...session.exercises],
    };
    setSessions([duplicate, ...sessions]);
  }

  function handleDeleteSession(id) {
    setSessions(sessions.filter((s) => s.id !== id));
  }

  function handleSaveSession(session) {
    const exists = sessions.find((s) => s.id === session.id);
    if (exists) {
      setSessions(sessions.map((s) => (s.id === session.id ? session : s)));
    } else {
      setSessions([session, ...sessions]);
    }
    setEditingSession(null);
    setView('sessions');
  }

  function handleCancelEdit() {
    setEditingSession(null);
    setView('library');
  }

  const subTabs = [
    { id: 'library', label: 'Övningsbibliotek' },
    { id: 'sessions', label: 'Mina pass' },
  ];

  return (
    <div>
      {view === 'builder' ? (
        <SessionBuilder
          session={editingSession}
          allExercises={exercises}
          onSave={handleSaveSession}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
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
              onClick={handleNewSession}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              + Nytt träningspass
            </button>
          </div>

          {view === 'library' && (
            <ExerciseLibrary exercises={exercises} setExercises={setExercises} favorites={favorites} setFavorites={setFavorites} />
          )}
          {view === 'sessions' && (
            <SessionList
              sessions={sessions}
              onEdit={handleEditSession}
              onDuplicate={handleDuplicateSession}
              onDelete={handleDeleteSession}
              onNew={handleNewSession}
            />
          )}
        </>
      )}
    </div>
  );
}
