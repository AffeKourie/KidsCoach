// Positions as percentages on a pitch (0,0 = top-left, 100,100 = bottom-right)
// Our team attacks downward (keeper at top)
export const formations = {
  '3-3-2': {
    name: '3-3-2',
    positions: [
      { x: 50, y: 5, role: 'MV' },
      { x: 20, y: 22, role: 'VB' },
      { x: 50, y: 18, role: 'CB' },
      { x: 80, y: 22, role: 'HB' },
      { x: 20, y: 45, role: 'VM' },
      { x: 50, y: 42, role: 'CM' },
      { x: 80, y: 45, role: 'HM' },
      { x: 35, y: 68, role: 'VA' },
      { x: 65, y: 68, role: 'HA' },
    ],
  },
  '3-2-3': {
    name: '3-2-3',
    positions: [
      { x: 50, y: 5, role: 'MV' },
      { x: 20, y: 22, role: 'VB' },
      { x: 50, y: 18, role: 'CB' },
      { x: 80, y: 22, role: 'HB' },
      { x: 35, y: 42, role: 'VM' },
      { x: 65, y: 42, role: 'HM' },
      { x: 20, y: 65, role: 'VY' },
      { x: 50, y: 68, role: 'CA' },
      { x: 80, y: 65, role: 'HY' },
    ],
  },
  '2-3-3': {
    name: '2-3-3',
    positions: [
      { x: 50, y: 5, role: 'MV' },
      { x: 35, y: 22, role: 'VB' },
      { x: 65, y: 22, role: 'HB' },
      { x: 20, y: 42, role: 'VM' },
      { x: 50, y: 38, role: 'CM' },
      { x: 80, y: 42, role: 'HM' },
      { x: 20, y: 65, role: 'VY' },
      { x: 50, y: 68, role: 'CA' },
      { x: 80, y: 65, role: 'HY' },
    ],
  },
  '3-4-1': {
    name: '3-4-1',
    positions: [
      { x: 50, y: 5, role: 'MV' },
      { x: 20, y: 22, role: 'VB' },
      { x: 50, y: 18, role: 'CB' },
      { x: 80, y: 22, role: 'HB' },
      { x: 15, y: 45, role: 'VY' },
      { x: 40, y: 42, role: 'VM' },
      { x: 60, y: 42, role: 'HM' },
      { x: 85, y: 45, role: 'HY' },
      { x: 50, y: 68, role: 'CA' },
    ],
  },
};
