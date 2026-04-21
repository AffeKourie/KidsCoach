import { useState, useRef } from 'react';

const STORAGE_KEYS = [
  'kfc-players',
  'kfc-exercises',
  'kfc-sessions',
  'kfc-lineups',
  'kfc-favorites',
  'kfc-data-version',
];

export default function DataManagement({ open, onClose }) {
  const [status, setStatus] = useState(null);
  const fileRef = useRef(null);

  if (!open) return null;

  function handleExport() {
    const data = {};
    for (const key of STORAGE_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw !== null) data[key] = JSON.parse(raw);
    }

    const blob = new Blob(
      [JSON.stringify({ _app: 'kids-football-coach', _exportedAt: new Date().toISOString(), ...data })],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kidscoach-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus({ type: 'success', message: 'Data exporterad!' });
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);

        if (data._app !== 'kids-football-coach') {
          setStatus({ type: 'error', message: 'Ogiltig fil – inte en Kids Football Coach-backup.' });
          return;
        }

        for (const key of STORAGE_KEYS) {
          if (key in data) {
            localStorage.setItem(key, JSON.stringify(data[key]));
          }
        }

        setStatus({ type: 'success', message: 'Data importerad! Sidan laddas om...' });
        setTimeout(() => window.location.reload(), 1200);
      } catch {
        setStatus({ type: 'error', message: 'Kunde inte läsa filen. Kontrollera att det är en giltig JSON-backup.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Hantera data</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          All data sparas lokalt i din webbläsare. Använd export/import för att flytta data mellan enheter eller skapa backup.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <span className="text-lg">📤</span>
            Exportera data (ladda ner JSON)
          </button>

          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <span className="text-lg">📥</span>
            Importera data (läs in backup)
          </button>
          <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
        </div>

        {status && (
          <div className={`mt-4 px-4 py-2.5 rounded-lg text-sm font-medium ${
            status.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}>
            {status.message}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Export innehåller: spelare, övningar, träningspass, uppställningar och favoriter.
        </p>
      </div>
    </div>
  );
}
