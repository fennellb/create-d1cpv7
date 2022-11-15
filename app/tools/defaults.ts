import {
  IBoardLevel,
  ICSet,
  ICSimple,
  IGridSet,
  IRCSet,
  IRSet,
  IRSimple,
} from './iinternal';

export function getDefaultContainer(): IBoardLevel {
  return {
    level: 0,
    cells: [
      { id: 1, grid: 0, gloc: 0, gR: 0, gC: 0, gSR: 0, gSC: 0, aRow: 0, aCol: 0, val: 0 },
      { id: 2, grid: 0, gloc: 1, gR: 0, gC: 0, gSR: 0, gSC: 1, aRow: 0, aCol: 1, val: 0 },
      { id: 3, grid: 0, gloc: 2, gR: 0, gC: 0, gSR: 0, gSC: 2, aRow: 0, aCol: 2, val: 0 },
      { id: 4, grid: 0, gloc: 3, gR: 0, gC: 0, gSR: 1, gSC: 0, aRow: 1, aCol: 0, val: 0 },
      { id: 5, grid: 0, gloc: 4, gR: 0, gC: 0, gSR: 1, gSC: 1, aRow: 1, aCol: 1, val: 0 },
      { id: 6, grid: 0, gloc: 5, gR: 0, gC: 0, gSR: 1, gSC: 2, aRow: 1, aCol: 2, val: 0 },
      { id: 7, grid: 0, gloc: 6, gR: 0, gC: 0, gSR: 2, gSC: 0, aRow: 2, aCol: 0, val: 0 },
      { id: 8, grid: 0, gloc: 7, gR: 0, gC: 0, gSR: 2, gSC: 1, aRow: 2, aCol: 1, val: 0 },
      { id: 9, grid: 0, gloc: 8, gR: 0, gC: 0, gSR: 2, gSC: 2, aRow: 2, aCol: 2, val: 0 },

      { id: 11, grid: 1, gloc: 0, gR: 0, gC: 1, gSR: 0, gSC: 0, aRow: 0, aCol: 3, val: 0 },
      { id: 12, grid: 1, gloc: 1, gR: 0, gC: 1, gSR: 0, gSC: 1, aRow: 0, aCol: 4, val: 0 },
      { id: 13, grid: 1, gloc: 2, gR: 0, gC: 1, gSR: 0, gSC: 2, aRow: 0, aCol: 5, val: 0 },
      { id: 14, grid: 1, gloc: 3, gR: 0, gC: 1, gSR: 1, gSC: 0, aRow: 1, aCol: 3, val: 0 },
      { id: 15, grid: 1, gloc: 4, gR: 0, gC: 1, gSR: 1, gSC: 1, aRow: 1, aCol: 4, val: 0 },
      { id: 16, grid: 1, gloc: 5, gR: 0, gC: 1, gSR: 1, gSC: 2, aRow: 1, aCol: 5, val: 0 },
      { id: 17, grid: 1, gloc: 6, gR: 0, gC: 1, gSR: 2, gSC: 0, aRow: 2, aCol: 3, val: 0 },
      { id: 18, grid: 1, gloc: 7, gR: 0, gC: 1, gSR: 2, gSC: 1, aRow: 2, aCol: 4, val: 0 },
      { id: 19, grid: 1, gloc: 8, gR: 0, gC: 1, gSR: 2, gSC: 2, aRow: 2, aCol: 5, val: 0 },

      { id: 21, grid: 2, gloc: 0, gR: 0, gC: 2, gSR: 0, gSC: 0, aRow: 0, aCol: 6, val: 0 },
      { id: 22, grid: 2, gloc: 1, gR: 0, gC: 2, gSR: 0, gSC: 1, aRow: 0, aCol: 7, val: 0 },
      { id: 23, grid: 2, gloc: 2, gR: 0, gC: 2, gSR: 0, gSC: 2, aRow: 0, aCol: 8, val: 0 },
      { id: 24, grid: 2, gloc: 3, gR: 0, gC: 2, gSR: 1, gSC: 0, aRow: 1, aCol: 6, val: 0 },
      { id: 25, grid: 2, gloc: 4, gR: 0, gC: 2, gSR: 1, gSC: 1, aRow: 1, aCol: 7, val: 0 },
      { id: 26, grid: 2, gloc: 5, gR: 0, gC: 2, gSR: 1, gSC: 2, aRow: 1, aCol: 8, val: 0 },
      { id: 27, grid: 2, gloc: 6, gR: 0, gC: 2, gSR: 2, gSC: 0, aRow: 2, aCol: 6, val: 0 },
      { id: 28, grid: 2, gloc: 7, gR: 0, gC: 2, gSR: 2, gSC: 1, aRow: 2, aCol: 7, val: 0 },
      { id: 29, grid: 2, gloc: 8, gR: 0, gC: 2, gSR: 2, gSC: 2, aRow: 2, aCol: 8, val: 0 },

      { id: 31, grid: 3, gloc: 0, gR: 1, gC: 0, gSR: 0, gSC: 0, aRow: 3, aCol: 0, val: 0 },
      { id: 32, grid: 3, gloc: 1, gR: 1, gC: 0, gSR: 0, gSC: 1, aRow: 3, aCol: 1, val: 0 },
      { id: 33, grid: 3, gloc: 2, gR: 1, gC: 0, gSR: 0, gSC: 2, aRow: 3, aCol: 2, val: 0 },
      { id: 34, grid: 3, gloc: 3, gR: 1, gC: 0, gSR: 1, gSC: 0, aRow: 4, aCol: 0, val: 0 },
      { id: 35, grid: 3, gloc: 4, gR: 1, gC: 0, gSR: 1, gSC: 1, aRow: 4, aCol: 1, val: 0 },
      { id: 36, grid: 3, gloc: 5, gR: 1, gC: 0, gSR: 1, gSC: 2, aRow: 4, aCol: 2, val: 0 },
      { id: 37, grid: 3, gloc: 6, gR: 1, gC: 0, gSR: 2, gSC: 0, aRow: 5, aCol: 0, val: 0 },
      { id: 38, grid: 3, gloc: 7, gR: 1, gC: 0, gSR: 2, gSC: 1, aRow: 5, aCol: 1, val: 0 },
      { id: 39, grid: 3, gloc: 8, gR: 1, gC: 0, gSR: 2, gSC: 2, aRow: 5, aCol: 2, val: 0 },

      { id: 41, grid: 4, gloc: 0, gR: 1, gC: 1, gSR: 0, gSC: 0, aRow: 3, aCol: 3, val: 0 },
      { id: 42, grid: 4, gloc: 1, gR: 1, gC: 1, gSR: 0, gSC: 1, aRow: 3, aCol: 4, val: 0 },
      { id: 43, grid: 4, gloc: 2, gR: 1, gC: 1, gSR: 0, gSC: 2, aRow: 3, aCol: 5, val: 0 },
      { id: 44, grid: 4, gloc: 3, gR: 1, gC: 1, gSR: 1, gSC: 0, aRow: 4, aCol: 3, val: 0 },
      { id: 45, grid: 4, gloc: 4, gR: 1, gC: 1, gSR: 1, gSC: 1, aRow: 4, aCol: 4, val: 0 },
      { id: 46, grid: 4, gloc: 5, gR: 1, gC: 1, gSR: 1, gSC: 2, aRow: 4, aCol: 5, val: 0 },
      { id: 47, grid: 4, gloc: 6, gR: 1, gC: 1, gSR: 2, gSC: 0, aRow: 5, aCol: 3, val: 0 },
      { id: 48, grid: 4, gloc: 7, gR: 1, gC: 1, gSR: 2, gSC: 1, aRow: 5, aCol: 4, val: 0 },
      { id: 49, grid: 4, gloc: 8, gR: 1, gC: 1, gSR: 2, gSC: 2, aRow: 5, aCol: 5, val: 0 },

      { id: 51, grid: 5, gloc: 0, gR: 1, gC: 2, gSR: 0, gSC: 0, aRow: 3, aCol: 6, val: 0 },
      { id: 52, grid: 5, gloc: 1, gR: 1, gC: 2, gSR: 0, gSC: 1, aRow: 3, aCol: 7, val: 0 },
      { id: 53, grid: 5, gloc: 2, gR: 1, gC: 2, gSR: 0, gSC: 2, aRow: 3, aCol: 8, val: 0 },
      { id: 54, grid: 5, gloc: 3, gR: 1, gC: 2, gSR: 1, gSC: 0, aRow: 4, aCol: 6, val: 0 },
      { id: 55, grid: 5, gloc: 4, gR: 1, gC: 2, gSR: 1, gSC: 1, aRow: 4, aCol: 7, val: 0 },
      { id: 56, grid: 5, gloc: 5, gR: 1, gC: 2, gSR: 1, gSC: 2, aRow: 4, aCol: 8, val: 0 },
      { id: 57, grid: 5, gloc: 6, gR: 1, gC: 2, gSR: 2, gSC: 0, aRow: 5, aCol: 6, val: 0 },
      { id: 58, grid: 5, gloc: 7, gR: 1, gC: 2, gSR: 2, gSC: 1, aRow: 5, aCol: 7, val: 0 },
      { id: 59, grid: 5, gloc: 8, gR: 1, gC: 2, gSR: 2, gSC: 2, aRow: 5, aCol: 8, val: 0 },

      { id: 61, grid: 6, gloc: 0, gR: 2, gC: 0, gSR: 0, gSC: 0, aRow: 6, aCol: 0, val: 0 },
      { id: 62, grid: 6, gloc: 1, gR: 2, gC: 0, gSR: 0, gSC: 1, aRow: 6, aCol: 1, val: 0 },
      { id: 63, grid: 6, gloc: 2, gR: 2, gC: 0, gSR: 0, gSC: 2, aRow: 6, aCol: 2, val: 0 },
      { id: 64, grid: 6, gloc: 3, gR: 2, gC: 0, gSR: 1, gSC: 0, aRow: 7, aCol: 0, val: 0 },
      { id: 65, grid: 6, gloc: 4, gR: 2, gC: 0, gSR: 1, gSC: 1, aRow: 7, aCol: 1, val: 0 },
      { id: 66, grid: 6, gloc: 5, gR: 2, gC: 0, gSR: 1, gSC: 2, aRow: 7, aCol: 2, val: 0 },
      { id: 67, grid: 6, gloc: 6, gR: 2, gC: 0, gSR: 2, gSC: 0, aRow: 8, aCol: 0, val: 0 },
      { id: 68, grid: 6, gloc: 7, gR: 2, gC: 0, gSR: 2, gSC: 1, aRow: 8, aCol: 1, val: 0 },
      { id: 69, grid: 6, gloc: 8, gR: 2, gC: 0, gSR: 2, gSC: 2, aRow: 8, aCol: 2, val: 0 },

      { id: 71, grid: 7, gloc: 0, gR: 2, gC: 1, gSR: 0, gSC: 0, aRow: 6, aCol: 3, val: 0 },
      { id: 72, grid: 7, gloc: 1, gR: 2, gC: 1, gSR: 0, gSC: 1, aRow: 6, aCol: 4, val: 0 },
      { id: 73, grid: 7, gloc: 2, gR: 2, gC: 1, gSR: 0, gSC: 2, aRow: 6, aCol: 5, val: 0 },
      { id: 74, grid: 7, gloc: 3, gR: 2, gC: 1, gSR: 1, gSC: 0, aRow: 7, aCol: 3, val: 0 },
      { id: 75, grid: 7, gloc: 4, gR: 2, gC: 1, gSR: 1, gSC: 1, aRow: 7, aCol: 4, val: 0 },
      { id: 76, grid: 7, gloc: 5, gR: 2, gC: 1, gSR: 1, gSC: 2, aRow: 7, aCol: 5, val: 0 },
      { id: 77, grid: 7, gloc: 6, gR: 2, gC: 1, gSR: 2, gSC: 0, aRow: 8, aCol: 3, val: 0 },
      { id: 78, grid: 7, gloc: 7, gR: 2, gC: 1, gSR: 2, gSC: 1, aRow: 8, aCol: 4, val: 0 },
      { id: 79, grid: 7, gloc: 8, gR: 2, gC: 1, gSR: 2, gSC: 2, aRow: 8, aCol: 5, val: 0 },

      { id: 81, grid: 8, gloc: 0, gR: 2, gC: 2, gSR: 0, gSC: 0, aRow: 6, aCol: 6, val: 0 },
      { id: 82, grid: 8, gloc: 1, gR: 2, gC: 2, gSR: 0, gSC: 1, aRow: 6, aCol: 7, val: 0 },
      { id: 83, grid: 8, gloc: 2, gR: 2, gC: 2, gSR: 0, gSC: 2, aRow: 6, aCol: 8, val: 0 },
      { id: 84, grid: 8, gloc: 3, gR: 2, gC: 2, gSR: 1, gSC: 0, aRow: 7, aCol: 6, val: 0 },
      { id: 85, grid: 8, gloc: 4, gR: 2, gC: 2, gSR: 1, gSC: 1, aRow: 7, aCol: 7, val: 0 },
      { id: 86, grid: 8, gloc: 5, gR: 2, gC: 2, gSR: 1, gSC: 2, aRow: 7, aCol: 8, val: 0 },
      { id: 87, grid: 8, gloc: 6, gR: 2, gC: 2, gSR: 2, gSC: 0, aRow: 8, aCol: 6, val: 0 },
      { id: 88, grid: 8, gloc: 7, gR: 2, gC: 2, gSR: 2, gSC: 1, aRow: 8, aCol: 7, val: 0 },
      { id: 89, grid: 8, gloc: 8, gR: 2, gC: 2, gSR: 2, gSC: 2, aRow: 8, aCol: 8, val: 0 },
    ],
  };
}

export function getDefaultGridSet(): IGridSet {
  return {
    gls: [],
  };
}

export function getDefaultRCSet(): IRCSet {
  return {
    r1: false,
    r2: false,
    r3: false,
    c1: false,
    c2: false,
    c3: false,
    sl: false,
  };
}

export function getDefaultRSimple(): IRSimple {
  return { row: [0, 0, 0, 0, 0, 0, 0, 0, 0], gi: [] };
}

export function getDefaultRSet(): IRSet {
  return {
    r1: getDefaultRSimple(),
    r2: getDefaultRSimple(),
    r3: getDefaultRSimple(),
    r4: getDefaultRSimple(),
    r5: getDefaultRSimple(),
    r6: getDefaultRSimple(),
    r7: getDefaultRSimple(),
    r8: getDefaultRSimple(),
    r9: getDefaultRSimple(),
  };
}

export function getDefaultCSimple(): ICSimple {
  return { col: [0, 0, 0, 0, 0, 0, 0, 0, 0], gi: [] };
}

export function getDefaultCSet(): ICSet {
  return {
    c1: getDefaultCSimple(),
    c2: getDefaultCSimple(),
    c3: getDefaultCSimple(),
    c4: getDefaultCSimple(),
    c5: getDefaultCSimple(),
    c6: getDefaultCSimple(),
    c7: getDefaultCSimple(),
    c8: getDefaultCSimple(),
    c9: getDefaultCSimple(),
  };
}
