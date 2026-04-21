import { useState, useRef, useEffect } from 'react';

const STORAGE_KEYS = [
  'kfc-players',
  'kfc-exercises',
  'kfc-sessions',
  'kfc-lineups',
  'kfc-favorites',
  'kfc-data-version',
];

const GIST_API = 'https://api.github.com/gists';
const GIST_FILENAME = 'kidscoach-data.json';

function collectData() {
  const data = {};
  for (const key of STORAGE_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw !== null) data[key] = JSON.parse(raw);
  }
  return { _app: 'kids-football-coach', _syncedAt: new Date().toISOString(), ...data };
}

function restoreData(data) {
  for (const key of STORAGE_KEYS) {
    if (key in data) {
      localStorage.setItem(key, JSON.stringify(data[key]));
    }
  }
}

export default function DataManagement({ open, onClose }) {
  const [status, setStatus] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('kfc-gist-token') || '');
  const [tokenInput, setTokenInput] = useState('');
  const [gistId, setGistId] = useState(() => localStorage.getItem('kfc-gist-id') || '');
  const [lastSynced, setLastSynced] = useState(() => localStorage.getItem('kfc-gist-last-synced') || '');
  const [showTokenSetup, setShowTokenSetup] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (open) {
      setToken(localStorage.getItem('kfc-gist-token') || '');
      setGistId(localStorage.getItem('kfc-gist-id') || '');
      setLastSynced(localStorage.getItem('kfc-gist-last-synced') || '');
    }
  }, [open]);

  if (!open) return null;

  function saveToken() {
    const trimmed = tokenInput.trim();
    if (!trimmed) return;
    localStorage.setItem('kfc-gist-token', trimmed);
    setToken(trimmed);
    setTokenInput('');
    setShowTokenSetup(false);
    setStatus({ type: 'success', message: 'Token sparad!' });
  }

  function removeToken() {
    localStorage.removeItem('kfc-gist-token');
    localStorage.removeItem('kfc-gist-id');
    localStorage.removeItem('kfc-gist-last-synced');
    setToken('');
    setGistId('');
    setLastSynced('');
    setStatus({ type: 'success', message: 'Token och molnkoppling borttagen.' });
  }

  async function handleCloudPush() {
    setSyncing(true);
    setStatus(null);
    try {
      const payload = {
        description: 'Kids Football Coach – data backup',
        public: false,
        files: { [GIST_FILENAME]: { content: JSON.stringify(collectData(), null, 2) } },
      };

      let res;
      if (gistId) {
        res = await fetch(`${GIST_API}/${gistId}`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(GIST_API, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }

      const result = await res.json();
      localStorage.setItem('kfc-gist-id', result.id);
      setGistId(result.id);
      const now = new Date().toISOString();
      localStorage.setItem('kfc-gist-last-synced', now);
      setLastSynced(now);
      setStatus({ type: 'success', message: 'Data synkad till molnet!' });
    } catch (err) {
      setStatus({ type: 'error', message: `Kunde inte synka: ${err.message}` });
    } finally {
      setSyncing(false);
    }
  }

  async function handleCloudPull() {
    if (!gistId) {
      setStatus({ type: 'error', message: 'Ingen molndata hittad. Synka upp först från en enhet som har data.' });
      return;
    }
    setSyncing(true);
    setStatus(null);
    try {
      const res = await fetch(`${GIST_API}/${gistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }

      const result = await res.json();
      const file = result.files?.[GIST_FILENAME];
      if (!file) throw new Error('Hittade ingen data i Gist:en.');

      const data = JSON.parse(file.content);
      if (data._app !== 'kids-football-coach') throw new Error('Ogiltig data i Gist:en.');

      restoreData(data);
      const now = new Date().toISOString();
      localStorage.setItem('kfc-gist-last-synced', now);
      setStatus({ type: 'success', message: 'Data hämtad! Sidan laddas om...' });
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      setStatus({ type: 'error', message: `Kunde inte hämta: ${err.message}` });
    } finally {
      setSyncing(false);
    }
  }

  function handleExport() {
    const blob = new Blob(
      [JSON.stringify(collectData(), null, 2)],
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
        restoreData(data);
        setStatus({ type: 'success', message: 'Data importerad! Sidan laddas om...' });
        setTimeout(() => window.location.reload(), 1200);
      } catch {
        setStatus({ type: 'error', message: 'Kunde inte läsa filen. Kontrollera att det är en giltig JSON-backup.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const hasToken = token.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Hantera data</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>

        {/* Cloud sync section */}
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Molnsynk</h3>
        <p className="text-sm text-gray-500 mb-3">
          Synka data mellan enheter via ditt GitHub-konto.
        </p>

        {!hasToken ? (
          <div className="mb-4">
            {!showTokenSetup ? (
              <button
                onClick={() => setShowTokenSetup(true)}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors"
              >
                Koppla GitHub-konto för molnsynk
              </button>
            ) : (
              <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">
                  Skapa en token på{' '}
                  <a href="https://github.com/settings/tokens/new?scopes=gist&description=KidsCoach" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    github.com/settings/tokens
                  </a>
                  {' '}med bara <strong>gist</strong>-behörighet.
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Klistra in token..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyDown={(e) => e.key === 'Enter' && saveToken()}
                  />
                  <button
                    onClick={saveToken}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Spara
                  </button>
                </div>
                <button onClick={() => setShowTokenSetup(false)} className="text-xs text-gray-400 hover:text-gray-600">
                  Avbryt
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            <div className="flex gap-2">
              <button
                onClick={handleCloudPush}
                disabled={syncing}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <span className="text-lg">☁️</span>
                {syncing ? 'Synkar...' : 'Synka upp'}
              </button>
              <button
                onClick={handleCloudPull}
                disabled={syncing}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <span className="text-lg">📲</span>
                {syncing ? 'Hämtar...' : 'Hämta data'}
              </button>
            </div>
            {lastSynced && (
              <p className="text-xs text-gray-400">
                Senast synkad: {new Date(lastSynced).toLocaleString('sv-SE')}
              </p>
            )}
            {gistId && (
              <p className="text-xs text-gray-400">
                Gist-ID: {gistId.slice(0, 8)}…
                <button onClick={removeToken} className="ml-2 text-red-400 hover:text-red-600 underline">
                  Koppla bort
                </button>
              </p>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-4" />

        {/* Local backup section */}
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Lokal backup</h3>
        <p className="text-sm text-gray-500 mb-3">
          Ladda ner eller läs in en JSON-fil manuellt.
        </p>

        <div className="space-y-2">
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <span>📤</span>
            Exportera (ladda ner fil)
          </button>

          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center gap-3 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <span>📥</span>
            Importera (läs in fil)
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
      </div>
    </div>
  );
}
