export interface IGridCell {
  id: number;
  grid: number; // 0 - 8 tialed tb:lr
  gloc: number; // 0 - 8 grid location tb:lr
  gR: number; // 0 - 2 three across
  gC: number; // 0 - 2 three vertical
  gSR: number; // 0 - 2 which row of the grid tb
  gSC: number; // 0 - 2 which column of the grid lr
  aRow: number; // 0 - 8 which absolute row
  aCol: number; // 0 - 8 which absolute column
  val: number; // 0 - 9 cell state
}

export interface IRSimple {
  row: number[];
  gi: string[]; // grid intersect
}

export interface IRSet {
  r1: IRSimple;
  r2: IRSimple;
  r3: IRSimple;
  r4: IRSimple;
  r5: IRSimple;
  r6: IRSimple;
  r7: IRSimple;
  r8: IRSimple;
  r9: IRSimple;
}

export interface ICSimple {
  col: number[];
  gi: string[]; // grid intersect
}

export interface ICSet {
  c1: ICSimple;
  c2: ICSimple;
  c3: ICSimple;
  c4: ICSimple;
  c5: ICSimple;
  c6: ICSimple;
  c7: ICSimple;
  c8: ICSimple;
  c9: ICSimple;
}

export interface IPuzzle {
  name: string;
  puzzle: IRSimple[];
}

export interface IGridSet {
  gls: IGridSetLevel[];
}

export interface IGridSetLevel {
  idx: number;
  name: string;
  vals: number[];
}

export interface IGridRelations {
  i: number;
  h: number[];
  v: number[];
}

export interface IGridRelationsRef {
  gr: IGridRelations[];
}

export interface IGridLocation {
  gSR: number; // 0 - 2 which row of the grid tb
  gSC: number; // 0 - 2 which column of the grid lr
}

export interface IBoardLevelRelations {
  h1: number[];
  h2: number[];
  v1: number[];
  v2: number[];
}

export interface IBoardLevelRelationsRef {
  blr: IBoardLevelRelations[];
}

export interface IBoardLevel {
  level: number;
  cells: IGridCell[];
}

export interface IBoardState {
  step: number;
  boardlLevels: Array<IBoardLevel>;
}

export interface IStateHolder {
  boardStates: IBoardState[];
}

export interface IRCSet {
  r1: boolean;
  r2: boolean;
  r3: boolean;
  c1: boolean;
  c2: boolean;
  c3: boolean;
  sl: boolean;
}
