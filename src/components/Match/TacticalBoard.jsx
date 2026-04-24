import { useState, useRef, useCallback, useEffect } from 'react';
import { formations } from '../../data/formations';
import Pitch from './Pitch';

export default function TacticalBoard({ lineup, players, onSave, onNew }) {
  const [name, setName] = useState(lineup?.name || '');
  const [date, setDate] = useState(lineup?.date || new Date().toISOString().split('T')[0]);
  const [formation, setFormation] = useState(lineup?.formation || '3-3-2');
  const [homePlayers, setHomePlayers] = useState(lineup?.homePlayers || []);
  const [subs, setSubs] = useState(lineup?.subs || Array.from({ length: 4 }, (_, i) => ({
    id: `sub-${i}`, playerId: null, playerName: '', playerNumber: '',
  })));
  const [awayPlayers, setAwayPlayers] = useState(lineup?.awayPlayers || []);
  const [ball, setBall] = useState(lineup?.ball || null);
  const [dragging, setDragging] = useState(null);
  const didDrag = useRef(false);
  const [showAssign, setShowAssign] = useState(false);
  const pitchRef = useRef(null);

  useEffect(() => {
    if (lineup) {
      setName(lineup.name || '');
      setDate(lineup.date || new Date().toISOString().split('T')[0]);
      setFormation(lineup.formation || '3-3-2');
      setHomePlayers(lineup.homePlayers || []);
      setSubs(lineup.subs || Array.from({ length: 4 }, (_, i) => ({
        id: `sub-${i}`, playerId: null, playerName: '', playerNumber: '',
      })));
      setAwayPlayers(lineup.awayPlayers || []);
      setBall(lineup.ball || null);
    }
  }, [lineup]);

  function applyFormation(formationKey) {
    setFormation(formationKey);
    const f = formations[formationKey];
    if (!f) return;

    const newHomePlayers = f.positions.map((pos, i) => {
      const existing = homePlayers[i];
      return {
        id: existing?.id || `home-${i}`,
        playerId: existing?.playerId || null,
        playerName: existing?.playerName || '',
        playerNumber: existing?.playerNumber || '',
        x: pos.x,
        y: pos.y,
        role: pos.role,
      };
    });
    setHomePlayers(newHomePlayers);
  }

  function assignPlayer(positionIndex, player) {
    setHomePlayers(homePlayers.map((hp, i) =>
      i === positionIndex
        ? { ...hp, playerId: player.id, playerName: player.name, playerNumber: player.number }
        : hp
    ));
  }

  function clearPlayer(positionIndex) {
    setHomePlayers(homePlayers.map((hp, i) =>
      i === positionIndex
        ? { ...hp, playerId: null, playerName: '', playerNumber: '' }
        : hp
    ));
  }

  function assignSub(subIndex, player) {
    setSubs(subs.map((s, i) =>
      i === subIndex
        ? { ...s, playerId: player.id, playerName: player.name, playerNumber: player.number }
        : s
    ));
  }

  function clearSub(subIndex) {
    setSubs(subs.map((s, i) =>
      i === subIndex
        ? { ...s, playerId: null, playerName: '', playerNumber: '' }
        : s
    ));
  }

  function autoAssignAll() {
    const usedIds = new Set([
      ...homePlayers.filter((hp) => hp.playerId).map((hp) => hp.playerId),
      ...subs.filter((s) => s.playerId).map((s) => s.playerId),
    ]);
    const available = players.filter((p) => !usedIds.has(p.id));
    let idx = 0;
    const newHome = homePlayers.map((hp) => {
      if (hp.playerId) return hp;
      const next = available[idx++];
      if (!next) return hp;
      return { ...hp, playerId: next.id, playerName: next.name, playerNumber: next.number };
    });
    const newSubs = subs.map((s) => {
      if (s.playerId) return s;
      const next = available[idx++];
      if (!next) return s;
      return { ...s, playerId: next.id, playerName: next.name, playerNumber: next.number };
    });
    setHomePlayers(newHome);
    setSubs(newSubs);
  }

  function clearAll() {
    setHomePlayers(homePlayers.map((hp) => ({
      ...hp, playerId: null, playerName: '', playerNumber: '',
    })));
    setSubs(subs.map((s) => ({
      ...s, playerId: null, playerName: '', playerNumber: '',
    })));
  }

  function addAwayPlayer() {
    setAwayPlayers([...awayPlayers, {
      id: `away-${Date.now()}`,
      x: 50,
      y: 85,
    }]);
  }

  function removeAwayPlayer(id) {
    setAwayPlayers(awayPlayers.filter((p) => p.id !== id));
  }

  function toggleBall() {
    setBall(ball ? null : { x: 50, y: 50 });
  }

  const getPosition = useCallback((e) => {
    const rect = pitchRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
  }, []);

  function handlePointerDown(type, id, e) {
    e.preventDefault();
    didDrag.current = false;
    setDragging({ type, id });
  }

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return;
    e.preventDefault();
    didDrag.current = true;
    const pos = getPosition(e);
    if (!pos) return;

    if (dragging.type === 'home') {
      setHomePlayers((prev) => prev.map((p) =>
        p.id === dragging.id ? { ...p, x: pos.x, y: pos.y } : p
      ));
    } else if (dragging.type === 'away') {
      setAwayPlayers((prev) => prev.map((p) =>
        p.id === dragging.id ? { ...p, x: pos.x, y: pos.y } : p
      ));
    } else if (dragging.type === 'ball') {
      setBall(pos);
    }
  }, [dragging, getPosition]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [dragging, handlePointerMove, handlePointerUp]);

  function handleSave() {
    if (!lineup) return;
    onSave({
      ...lineup,
      name: name.trim() || 'Namnlös uppställning',
      date,
      formation,
      homePlayers,
      subs,
      awayPlayers,
      ball,
    });
  }

  if (!lineup) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">🏟️</p>
        <p className="mb-4">Klicka "Ny uppställning" för att börja.</p>
        <button
          onClick={onNew}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          + Ny uppställning
        </button>
      </div>
    );
  }

  const assignedOnField = homePlayers.filter((hp) => hp.playerId).length;
  const assignedOnBench = subs.filter((s) => s.playerId).length;
  const assignedCount = assignedOnField + assignedOnBench;
  const allAssignedIds = [
    ...homePlayers.filter((hp) => hp.playerId).map((hp) => hp.playerId),
    ...subs.filter((s) => s.playerId).map((s) => s.playerId),
  ];
  const unassignedPlayers = players.filter((p) => !allAssignedIds.includes(p.id));

  return (
    <div>
      {/* Match info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Match / namn</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="T.ex. vs Hammarby P11"
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
          <div className="w-36">
            <label className="block text-sm font-medium text-gray-700 mb-1">Formation</label>
            <select
              value={formation}
              onChange={(e) => applyFormation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              {Object.keys(formations).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Player assignment – ABOVE the pitch for visibility */}
      {players.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-center">
          <p className="text-amber-800 font-medium">Inga spelare i truppen ännu</p>
          <p className="text-amber-600 text-sm mt-1">
            Gå till <strong>Spelare</strong>-fliken och lägg till din trupp först, sedan kan du tilldela dem till positioner här.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Tilldelade spelare ({assignedCount} av {homePlayers.length + subs.length})
            </h3>
            <div className="flex gap-2">
              {assignedCount < homePlayers.length + subs.length && (
                <button
                  onClick={autoAssignAll}
                  className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-300 rounded-lg hover:bg-green-100 transition-colors"
                >
                  Fyll i alla från truppen
                </button>
              )}
              {assignedCount > 0 && (
                <button
                  onClick={clearAll}
                  className="px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Rensa alla
                </button>
              )}
              <button
                onClick={() => setShowAssign(!showAssign)}
                className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {showAssign ? 'Dölj positioner' : 'Välj per position'}
              </button>
            </div>
          </div>

          {showAssign && (
            <div className="grid gap-2 mt-2">
              {homePlayers.map((hp, index) => (
                <div key={hp.id} className="flex items-center gap-3">
                  <span className="w-10 text-xs font-semibold text-gray-500">{hp.role}</span>
                  <select
                    value={hp.playerId || ''}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        clearPlayer(index);
                      } else {
                        const p = players.find((pl) => pl.id === e.target.value);
                        if (p) assignPlayer(index, p);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  >
                    <option value="">– Välj spelare –</option>
                    {players.map((p) => (
                      <option key={p.id} value={p.id}>
                        #{p.number} {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-1 pt-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Avbytare</span>
              </div>
              {subs.map((sub, index) => (
                <div key={sub.id} className="flex items-center gap-3">
                  <span className="w-10 text-xs font-semibold text-gray-500">AVB</span>
                  <select
                    value={sub.playerId || ''}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        clearSub(index);
                      } else {
                        const p = players.find((pl) => pl.id === e.target.value);
                        if (p) assignSub(index, p);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  >
                    <option value="">– Välj spelare –</option>
                    {players.map((p) => (
                      <option key={p.id} value={p.id}>
                        #{p.number} {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          {unassignedPlayers.length > 0 && assignedCount > 0 && (
            <p className="text-xs text-gray-400 mt-2">
              Ej tilldelade: {unassignedPlayers.map((p) => `${p.name} (#${p.number})`).join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => applyFormation(formation)}
          className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Återställ formation
        </button>
        <button
          onClick={toggleBall}
          className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
            ball
              ? 'text-amber-600 border-amber-300 bg-amber-50'
              : 'text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
        >
          {ball ? '⚽ Ta bort boll' : '⚽ Lägg ut boll'}
        </button>
        <button
          onClick={addAwayPlayer}
          className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          + Motståndare
        </button>
        {awayPlayers.length > 0 && (
          <button
            onClick={() => setAwayPlayers([])}
            className="px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Rensa motståndare
          </button>
        )}
      </div>

      {/* Pitch + Bench */}
      <div className="flex gap-3">
        {/* Pitch */}
        <div
          ref={pitchRef}
          className="relative select-none touch-none flex-1"
          style={{ aspectRatio: '68 / 95' }}
        >
          <Pitch />

          {homePlayers.map((player, index) => (
            <div
              key={player.id}
              onPointerDown={(e) => handlePointerDown('home', player.id, e)}
              className="absolute flex flex-col items-center cursor-grab active:cursor-grabbing"
              style={{
                left: `${player.x}%`,
                top: `${player.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: dragging?.id === player.id ? 50 : 10,
              }}
            >
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs sm:text-sm font-bold ${
                player.playerId ? 'bg-blue-500' : 'bg-blue-300'
              }`}>
                {player.playerNumber || index + 1}
              </div>
              <span className={`mt-0.5 text-[10px] sm:text-xs font-semibold text-white px-1.5 py-0.5 rounded whitespace-nowrap ${
                player.playerId ? 'bg-blue-600/80' : 'bg-blue-400/70'
              }`}>
                {player.playerName || player.role}
              </span>
            </div>
          ))}

          {awayPlayers.map((player) => (
            <div
              key={player.id}
              onPointerDown={(e) => handlePointerDown('away', player.id, e)}
              className="absolute flex flex-col items-center cursor-grab active:cursor-grabbing"
              style={{
                left: `${player.x}%`,
                top: `${player.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: dragging?.id === player.id ? 50 : 10,
              }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500 border-2 border-white shadow-lg flex items-center justify-center">
                <button
                  onClick={(e) => { e.stopPropagation(); if (!didDrag.current) removeAwayPlayer(player.id); }}
                  className="text-white text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          {ball && (
            <div
              onPointerDown={(e) => handlePointerDown('ball', 'ball', e)}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{
                left: `${ball.x}%`,
                top: `${ball.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: dragging?.id === 'ball' ? 50 : 5,
              }}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400 border-2 border-white shadow-lg flex items-center justify-center text-sm">
                ⚽
              </div>
            </div>
          )}
        </div>

        {/* Substitute bench */}
        <div className="w-16 sm:w-20 flex flex-col items-center pt-4">
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 writing-mode-vertical"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            Avbytare
          </span>
          <div className="flex flex-col gap-4">
            {subs.map((sub, index) => (
              <div key={sub.id} className="flex flex-col items-center">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 shadow-md flex items-center justify-center text-xs sm:text-sm font-bold ${
                  sub.playerId
                    ? 'bg-blue-500 border-white text-white'
                    : 'bg-gray-200 border-gray-300 text-gray-400'
                }`}>
                  {sub.playerNumber || index + 10}
                </div>
                <span className={`mt-0.5 text-[9px] sm:text-[10px] font-medium px-1 py-0.5 rounded whitespace-nowrap max-w-[60px] sm:max-w-[72px] truncate text-center ${
                  sub.playerId
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-400'
                }`}>
                  {sub.playerName || `Avb ${index + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Spara uppställning
        </button>
      </div>
    </div>
  );
}
