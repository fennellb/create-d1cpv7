import { getDefaultCSet, getDefaultCSimple, getDefaultRCSet, getDefaultRSet,  getDefaultRSimple} from './defaults';
import { IBoardLevel, IBoardLevelRelationsRef, IBoardState, ICSet, ICSimple, IGridCell, IGridLocation, IGridRelationsRef, IGridSet, IGridSetLevel, IRCSet, IRSet, IRSimple} from './iinternal';

export function firstFill( bl: IBoardLevel, stv: IRSimple[]): [IBoardLevel, number] {
  let sval: number = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let update: IGridCell = bl.cells.find(x => x.aRow === i && x.aCol === j);
      let idx = bl.cells.indexOf(update);
      bl.cells[idx].val = stv[i].row[j];
      if (stv[i].row[j] == 0) { sval++; }
    }
  }
  return [bl, sval];
}

export function updateRCSetPerGridRC(rcset: IRCSet, bs: IBoardState, gs: IGridSet, i: number, k: number, ll: number, grref: IGridRelationsRef, blrref: IBoardLevelRelationsRef): IRCSet {
  
  let gcs: IGridCell[] = extractGridCells(bs, i, k)
  let cc: number[] = gcs.map(x => x.val)

  let r: number = 0;
  let c: number = 0;

  if (cc[0] > 0 && cc[1] > 0 && cc[2] > 0 && !rcset.r1) { rcset.r1 = true; r++}
  if (cc[3] > 0 && cc[4] > 0 && cc[5] > 0 && !rcset.r2) { rcset.r2 = true; r++}
  if (cc[6] > 0 && cc[7] > 0 && cc[8] > 0 && !rcset.r3) { rcset.r3 = true; r++}

  if (cc[0] > 0 && cc[3] > 0 && cc[6] > 0 && !rcset.c1) { rcset.c1 = true; c++}
  if (cc[1] > 0 && cc[4] > 0 && cc[7] > 0 && !rcset.c2) { rcset.c2 = true; c++}
  if (cc[2] > 0 && cc[5] > 0 && cc[8] > 0 && !rcset.c3) { rcset.c3 = true; c++}

  if (r == 2 && c == 2) { rcset.sl = true; return rcset;}
  
  if (!rcset.r1) { 
    let cl = 0; 
    if (rcset.c1 || cc[0] > 0) { cl++; }
    if (rcset.c2 || cc[1] > 0) { cl++; }
    if (rcset.c3 || cc[2] > 0) { cl++; }
    if (cl == 3) { rcset.r1 = true; }
    // check col grids for eliminations
    if (cl == 1){
      let vk = grref.gr[k].v
      let v1 = gs.gls[vk[0]].vals
      let v2 = gs.gls[vk[1]].vals
      if(v1.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,vk[0],k)
        if(!rcset.c1 && !rct1.c1 && rct1.c2 && rct1.c3){ rcset.c1 = true }
        if(!rcset.c2 && !rct1.c2 && rct1.c1 && rct1.c3){ rcset.c2 = true }
        if(!rcset.c3 && !rct1.c3 && rct1.c1 && rct1.c2){ rcset.c3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
      if(v2.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,vk[1],k)
        if(!rcset.c1 && !rct1.c1 && rct1.c2 && rct1.c3){ rcset.c1 = true }
        if(!rcset.c2 && !rct1.c2 && rct1.c1 && rct1.c3){ rcset.c2 = true }
        if(!rcset.c3 && !rct1.c3 && rct1.c1 && rct1.c2){ rcset.c3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
    }
    // check row 1 for aRow solution.
    if (cl == 2){
      let v1: number[] = getAbsRowMissing(bs.boardlLevels[i].cells,k,0)
      let v2: number[] = gs.gls[k].vals.filter(x => v1.indexOf(x) != -1)
      if(v2.length == 1){
        rcset.r2 = true;
        rcset.r3 = true;
        [rcset.c1, rcset.c2, rcset.c3] = rcEval1([cc[0],cc[1],cc[2]], rcset.c1, rcset.c2, rcset.c3)
        rcset.sl = true;
        return rcset;
      }
    }
  }

  if (!rcset.r2) {
     let cl = 0;
    if (rcset.c1 || cc[3] > 0) { cl++; }
    if (rcset.c2 || cc[4] > 0) { cl++; }
    if (rcset.c3 || cc[5] > 0) { cl++; }
    if (cl == 3) { rcset.r2 = true; }
    // check col grids for eliminations
    if (cl == 1){
      let vk = grref.gr[k].v
      let v1 = gs.gls[vk[0]].vals
      let v2 = gs.gls[vk[1]].vals
      if(v1.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,vk[0],k)
        if(!rcset.c1 && !rct1.c1 && rct1.c2 && rct1.c3){ rcset.c1 = true }
        if(!rcset.c2 && !rct1.c2 && rct1.c1 && rct1.c3){ rcset.c2 = true }
        if(!rcset.c3 && !rct1.c3 && rct1.c1 && rct1.c2){ rcset.c3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
      if(v2.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,vk[1],k)
        if(!rcset.c1 && !rct1.c1 && rct1.c2 && rct1.c3){ rcset.c1 = true }
        if(!rcset.c2 && !rct1.c2 && rct1.c1 && rct1.c3){ rcset.c2 = true }
        if(!rcset.c3 && !rct1.c3 && rct1.c1 && rct1.c2){ rcset.c3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
    }    
    // check row 2 for aRow solution.
    if (cl == 2){
      let v1: number[] = getAbsRowMissing(bs.boardlLevels[i].cells,k,1)
      let v2: number[] = gs.gls[k].vals.filter(x => v1.indexOf(x) != -1)
      if(v2.length == 1){
        rcset.r1 = true;
        rcset.r3 = true;
        [rcset.c1, rcset.c2, rcset.c3] = rcEval1([cc[3],cc[4],cc[5]], rcset.c1, rcset.c2, rcset.c3)
        rcset.sl = true;
        return rcset;
      }
    }
  }

  if (!rcset.r3) {
    let cl = 0;
    if (rcset.c1 || cc[6] > 0) { cl++; }
    if (rcset.c2 || cc[7] > 0) { cl++; }
    if (rcset.c3 || cc[8] > 0) { cl++; }
    if (cl == 3) { rcset.r3 = true; }
    // check col grids for eliminations
    if (cl == 1){
      let vk = grref.gr[k].v
      let v1 = gs.gls[vk[0]].vals
      let v2 = gs.gls[vk[1]].vals
      if(v1.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,vk[0],k)
        if(!rcset.c1 && !rct1.c1 && rct1.c2 && rct1.c3){ rcset.c1 = true }
        if(!rcset.c2 && !rct1.c2 && rct1.c1 && rct1.c3){ rcset.c2 = true }
        if(!rcset.c3 && !rct1.c3 && rct1.c1 && rct1.c2){ rcset.c3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
      if(v2.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,vk[1],k)
        if(!rcset.c1 && !rct1.c1 && rct1.c2 && rct1.c3){ rcset.c1 = true }
        if(!rcset.c2 && !rct1.c2 && rct1.c1 && rct1.c3){ rcset.c2 = true }
        if(!rcset.c3 && !rct1.c3 && rct1.c1 && rct1.c2){ rcset.c3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
    }        
    // check row 3 for aRow solution.
    if (cl == 2){
      let v1: number[] = getAbsRowMissing(bs.boardlLevels[i].cells,k,2)
      let v2: number[] = gs.gls[k].vals.filter(x => v1.indexOf(x) != -1)
      if(v2.length == 1){
        rcset.r1 = true;
        rcset.r2 = true;
        [rcset.c1, rcset.c2, rcset.c3] = rcEval1([cc[6],cc[7],cc[8]], rcset.c1, rcset.c2, rcset.c3)
        rcset.sl = true;
        return rcset;
      }
    }
  }

  if (!rcset.c1) {
    let cl = 0;
    if (rcset.r1 || cc[0] > 0) { cl++; }
    if (rcset.r2 || cc[3] > 0) { cl++; }
    if (rcset.r3 || cc[6] > 0) { cl++; }
    if (cl == 3) { rcset.c1 = true; }
    // check row grids for eliminations
    if (cl == 1){
      let hk = grref.gr[k].h
      let h1 = gs.gls[hk[0]].vals
      let h2 = gs.gls[hk[1]].vals
      if(h1.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,hk[0],k)
        if(!rcset.r1 && !rct1.r1 && rct1.r2 && rct1.r3){ rcset.r1 = true }
        if(!rcset.r2 && !rct1.r2 && rct1.r1 && rct1.r3){ rcset.r2 = true }
        if(!rcset.r3 && !rct1.r3 && rct1.r1 && rct1.r2){ rcset.r3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
      if(h2.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,hk[1],k)
        if(!rcset.r1 && !rct1.r1 && rct1.r2 && rct1.r3){ rcset.r1 = true }
        if(!rcset.r2 && !rct1.r2 && rct1.r1 && rct1.r3){ rcset.r2 = true }
        if(!rcset.r3 && !rct1.r3 && rct1.r1 && rct1.r2){ rcset.r3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
    }    
    // check col 1 for aCol solution.
    if (cl == 2){
      let v1: number[] = getAbsColMissing(bs.boardlLevels[i].cells,k,0)
      let v2: number[] = gs.gls[k].vals.filter(x => v1.indexOf(x) != -1)
      if(v2.length == 1){
        rcset.c2 = true;
        rcset.c3 = true;
        [rcset.r1, rcset.r2, rcset.r3] = rcEval1([cc[0],cc[3],cc[6]], rcset.r1, rcset.r2, rcset.r3)
        rcset.sl = true;
        return rcset;
      }
    }
  }

  if (!rcset.c2) {
    let cl = 0;
    if (rcset.r1 || cc[1] > 0) { cl++; }
    if (rcset.r2 || cc[4] > 0) { cl++; }
    if (rcset.r3 || cc[7] > 0) { cl++; }
    if (cl == 3) { rcset.c2 = true; }
    // check row grids for eliminations
    if (cl == 1){
      let hk = grref.gr[k].h
      let h1 = gs.gls[hk[0]].vals
      let h2 = gs.gls[hk[1]].vals
      if(h1.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,hk[0],k)
        if(!rcset.r1 && !rct1.r1 && rct1.r2 && rct1.r3){ rcset.r1 = true }
        if(!rcset.r2 && !rct1.r2 && rct1.r1 && rct1.r3){ rcset.r2 = true }
        if(!rcset.r3 && !rct1.r3 && rct1.r1 && rct1.r2){ rcset.r3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
      if(h2.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,hk[1],k)
        if(!rcset.r1 && !rct1.r1 && rct1.r2 && rct1.r3){ rcset.r1 = true }
        if(!rcset.r2 && !rct1.r2 && rct1.r1 && rct1.r3){ rcset.r2 = true }
        if(!rcset.r3 && !rct1.r3 && rct1.r1 && rct1.r2){ rcset.r3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
    }        
    // check col 2 for aCol solution.
    if (cl == 2){
      let v1: number[] = getAbsColMissing(bs.boardlLevels[i].cells,k,1)
      let v2: number[] = gs.gls[k].vals.filter(x => v1.indexOf(x) != -1)
      if(v2.length == 1){
        rcset.c1 = true;
        rcset.c3 = true;
        [rcset.r1, rcset.r2, rcset.r3] = rcEval1([cc[1],cc[4],cc[7]], rcset.r1, rcset.r2, rcset.r3)
        rcset.sl = true;
        return rcset;
      }
    }
  }

  if (!rcset.c3) {
    let cl = 0;
    if (rcset.r1 || cc[2] > 0) { cl++; }
    if (rcset.r2 || cc[5] > 0) { cl++; }
    if (rcset.r3 || cc[8] > 0) { cl++; }
    if (cl == 3) { rcset.c3 = true; }
    // check row grids for eliminations
    if (cl == 1){
      let hk = grref.gr[k].h
      let h1 = gs.gls[hk[0]].vals
      let h2 = gs.gls[hk[1]].vals
      if(h1.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,hk[0],k)
        if(!rcset.r1 && !rct1.r1 && rct1.r2 && rct1.r3){ rcset.r1 = true }
        if(!rcset.r2 && !rct1.r2 && rct1.r1 && rct1.r3){ rcset.r2 = true }
        if(!rcset.r3 && !rct1.r3 && rct1.r1 && rct1.r2){ rcset.r3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
      if(h2.filter(x => x === ll).length == 1){
        let rct1: IRCSet = rcEval2(bs.boardlLevels[i].cells,blrref,ll,hk[1],k)
        if(!rcset.r1 && !rct1.r1 && rct1.r2 && rct1.r3){ rcset.r1 = true }
        if(!rcset.r2 && !rct1.r2 && rct1.r1 && rct1.r3){ rcset.r2 = true }
        if(!rcset.r3 && !rct1.r3 && rct1.r1 && rct1.r2){ rcset.r3 = true }
        if(rcEval3Sub(rcset)){
          rcset.sl = true
          return rcset
        }
      }
    }        
    // check col 3 for aCol solution.
    if (cl == 2){
      let v1: number[] = getAbsColMissing(bs.boardlLevels[i].cells,k,2)
      let v2: number[] = gs.gls[k].vals.filter(x => v1.indexOf(x) != -1)
      if(v2.length == 1){
        rcset.c1 = true;
        rcset.c2 = true;
        [rcset.r1, rcset.r2, rcset.r3] = rcEval1([cc[2],cc[5],cc[8]], rcset.r1, rcset.r2, rcset.r3)
        rcset.sl = true;
        return rcset;
      }
    }
  }

  r = 0; c = 0; // r c reset
  if (rcset.r1) { r++; }
  if (rcset.r2) { r++; }
  if (rcset.r3) { r++; }
  if (rcset.c1) { c++; }
  if (rcset.c2) { c++; }
  if (rcset.c3) { c++; }

  if (r == 2 && c == 2) { rcset.sl = true; return rcset;}

  return rcset;
}

export function rcEval1(vals: number[], b1: boolean, b2: boolean, b3: boolean): [boolean,boolean, boolean]{
  if(vals[0]){ b1 = true;}
  if(vals[1]){ b2 = true;}
  if(vals[2]){ b3 = true}
  return [b1,b2,b3]
}

export function rcEval2(cells: IGridCell[], blrref: IBoardLevelRelationsRef, ll: number,vk: number, k: number): IRCSet{

  let rcset: IRCSet = getDefaultRCSet();
  for (let m = 0; m < 4; m++) {
    let xblr = blrref.blr[vk];
    let xbm = Object.keys(xblr)[m];
    let gridloc = xblr[xbm];

    // row check
    if (xbm[0] == 'h') {
      rcset.r1 = checkRow(getSubRow(cells, gridloc, 0), ll, rcset.r1);
      rcset.r2 = checkRow(getSubRow(cells, gridloc, 1), ll, rcset.r2);
      rcset.r3 = checkRow(getSubRow(cells, gridloc, 2), ll, rcset.r3);
    }
    // grid check
    if (xbm[0] == 'v') {
      rcset.c1 = checkCol(getSubCol(cells, gridloc, 0), ll, rcset.c1);
      rcset.c2 = checkCol(getSubCol(cells, gridloc, 1), ll, rcset.c2);
      rcset.c3 = checkCol(getSubCol(cells, gridloc, 2), ll, rcset.c3);
    }
  }

  // find close by combined causes (fill vs rc elimination)
  let cc = cells.filter(x => x.grid === vk).sort((a, b) => (a.gloc > b.gloc ? 1 : -1)).map(x => x.val)
  if(!rcset.r1){ rcset.r1 = rcEval2Sub(rcset.c1, rcset.c2, rcset.c3, cc[0],cc[1],cc[2], rcset.r1) }
  if(!rcset.r2){ rcset.r2 = rcEval2Sub(rcset.c1, rcset.c2, rcset.c3, cc[3],cc[4],cc[5], rcset.r2) }
  if(!rcset.r3){ rcset.r3 = rcEval2Sub(rcset.c1, rcset.c2, rcset.c3, cc[6],cc[7],cc[8], rcset.r3) }
  if(!rcset.c1){ rcset.c1 = rcEval2Sub(rcset.r1, rcset.r2, rcset.r3, cc[0],cc[3],cc[6], rcset.c1) }
  if(!rcset.c2){ rcset.c2 = rcEval2Sub(rcset.r1, rcset.r2, rcset.r3, cc[1],cc[4],cc[7], rcset.c2) }
  if(!rcset.c3){ rcset.c3 = rcEval2Sub(rcset.r1, rcset.r2, rcset.r3, cc[2],cc[5],cc[8], rcset.c3) }

  return rcset
}

export function rcEval2Sub(b1: boolean, b2: boolean, b3: boolean, c1: number, c2: number, c3: number, tf: boolean){
  let bh: [boolean, boolean, boolean] = [false, false, false]
  if(b1 == true){ bh[0] = true}
  if(b2 == true){ bh[1] = true}
  if(b3){ bh[2] = true}
  if(c1 > 0){ bh[0] = true }
  if(c2 > 0){ bh[1] = true }
  if(c3 > 0){ bh[2] = true }

  if(bh[0] == true && bh[1] == true && bh[2] == true){
    return true
  }
  return tf;
}

export function rcEval3Sub(rcs: IRCSet): boolean{
  let r = 0; let c = 0;
  if (rcs.r1) { r++; }
  if (rcs.r2) { r++; }
  if (rcs.r3) { r++; }
  if (rcs.c1) { c++; }
  if (rcs.c2) { c++; }
  if (rcs.c3) { c++; }
  if(r == 2 && c == 2){ return true}
  return false
}


export function extractGridCells(bs: IBoardState, i: number, k: number): IGridCell[] {
  return bs.boardlLevels[i].cells
    .filter((x) => x.grid === k)
    .sort((a, b) => (a.gloc > b.gloc ? 1 : -1));
}

export function getUnsetValues(bs: IBoardState, i: number): IGridSet {
  let unset: IGridSet = { gls: [] };
  for (let j = 0; j < 9; j++) {
    let v1: number[] = gridExtract(bs.boardlLevels[i], j);
    let v2 = gridVals().filter((x) => v1.indexOf(x) === -1);
    let gsl: IGridSetLevel = { idx: j, name: 'gs' + j, vals: v2 };
    unset.gls.push(gsl);
  }
  return unset;
}

export function getGridRelationsRef(): IGridRelationsRef {
  return {
    gr: [
      { i: 0, h: [1, 2], v: [3, 6] },
      { i: 1, h: [0, 2], v: [4, 7] },
      { i: 2, h: [0, 1], v: [5, 8] },
      { i: 3, h: [4, 5], v: [0, 6] },
      { i: 4, h: [3, 5], v: [1, 7] },
      { i: 5, h: [4, 5], v: [2, 8] },
      { i: 6, h: [7, 8], v: [0, 3] },
      { i: 7, h: [6, 8], v: [1, 4] },
      { i: 8, h: [6, 7], v: [2, 5] },
    ],
  };
}

// gR, gC
export function getBoardLevelRelationsRef(): IBoardLevelRelationsRef {

  return {
    blr: [
      { h1: [0, 1], h2: [0, 2], v1: [1, 0], v2: [2, 0] },
      { h1: [0, 0], h2: [0, 2], v1: [1, 1], v2: [2, 1] },
      { h1: [0, 0], h2: [0, 1], v1: [1, 2], v2: [2, 2] },
      { h1: [1, 1], h2: [1, 2], v1: [0, 0], v2: [2, 0] },
      { h1: [1, 0], h2: [1, 2], v1: [0, 1], v2: [2, 1] },      
      { h1: [1, 0], h2: [1, 1], v1: [0, 2], v2: [2, 2] },
      { h1: [2, 1], h2: [2, 2], v1: [0, 0], v2: [1, 0] },
      { h1: [2, 0], h2: [2, 2], v1: [0, 1], v2: [1, 1] },
      { h1: [2, 0], h2: [2, 1], v1: [0, 2], v2: [1, 2] }
    ]
  }
}

export function gridExtract(bl: IBoardLevel, i): number[] {
  let xx: number[] = [];
  let rows: IGridCell[] = bl.cells
    .filter((x) => x.grid === i)
    .sort((a, b) => (a.gloc > b.gloc ? 1 : -1));
  for (let j = 0; j < 9; j++) {
    xx.push(rows[j].val);
  }
  return xx.filter((v, i, a) => a.indexOf(v) === i).filter((x) => x != 0);
}

export function getRowGroup(i: number) {
  return Math.floor(i / 3) + 1;
}

export function getRow(i: number) {
  return i % 3;
}

// i == grid, k == grid row
export function getAbsRowByGridPos(i: number, k){
  switch(i){
    case 0: case 1: case 2: return k;
    case 3: case 4: case 5: return (k + +3)
    case 6: case 7: case 8: return (k + +6)
  }
}

// i == grid, k == grid col
export function getAbsColByGridPos(i: number, k: number){
  switch(i){
    case 0: case 3: case 6: return k;
    case 1: case 4: case 7: return (k + +3)
    case 2: case 5: case 8: return (k + +6)
  }
}

export function getAbsRowMissing(gc: IGridCell[], i: number, k: number){
  let v1: number[] = gc.filter(x => x.aRow === getAbsRowByGridPos(i,k)).map(x => x.val)
  return gridVals().filter((x) => v1.indexOf(x) === -1)
}

export function getAbsColMissing(gc: IGridCell[], i: number, k: number){
  let v1: number[] = gc.filter(x => x.aCol === getAbsColByGridPos(i,k)).map(x => x.val)
  return gridVals().filter((x) => v1.indexOf(x) === -1)
}

export function gridVals() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

export function getSubRow(gc: IGridCell[], loc: number[], row: number) {
  return gc
    .filter((x) => x.gR === loc[0] && x.gC === loc[1] && x.gSR === row)
    .map((x) => x.val);
}

export function getAbsRow(gc: IGridCell[], row: number) {
  return gc
    .filter((x) => x.aRow === row)
    .map((x) => x.val);
}

export function checkRow(bg: number[], k: number, tf: boolean): boolean {
  if (bg.indexOf(k) === -1) {
    return tf;
  }
  return true;
}

export function getSubCol(gc: IGridCell[], loc: number[], col: number) {
  return gc
  .filter((x) => x.gR === loc[0] && x.gC === loc[1] && x.gSC === col)
  .map((x) => x.val);
}

export function getAbsCol(gc: IGridCell[], col: number) {
  return gc
    .filter((x) => x.aCol === col)
    .map((x) => x.val);
}

export function checkCol(bg: number[], k: number, tf: boolean): boolean {
  if (bg.indexOf(k) === -1) {
    return tf;
  }
  return true;
}

export function gridKey(rcs: IRCSet): IGridLocation {
  let gr: IGridLocation = { gSR: 0, gSC: 0 };

  switch (false) {
    case rcs.r1: gr.gSR = 0; break;
    case rcs.r2: gr.gSR = 1; break;
    case rcs.r3: gr.gSR = 2; break;
  }

  switch (false) {
    case rcs.c1: gr.gSC = 0; break;
    case rcs.c2: gr.gSC = 1; break;
    case rcs.c3: gr.gSC = 2; break;
  }

  return gr;
}

export function errCheck(bs: IBoardState): [boolean, string] {
  let gs: IGridSet = getGSValues(bs, 0);
  // inside grid
  for (let i = 0; i < 9; i++) {
    let t1: number[] = gs.gls[i].vals.filter((x) => x != 0);
    let t2 = t1.filter((item, index) => t1.indexOf(item) != index);
    if (t2.length > 0) {
      return [true, 'Duplicates of ' + t2[0] + ' found in grid ' + (i + 1)];
    }
  }
  // inside row
  let rs: IRSet = setRSet(gs);
  for (let i = 0; i < 9; i++) {
    let obr = Object.keys(rs)[i];
    let tr2 = rs[obr].row
      .filter((item, index) => rs[obr].row.indexOf(item) != index)
      .filter((x) => x != 0);
    if (tr2.length > 0) {
      return [true, 'Duplicates of ' + tr2[0] + ' found in row ' + (i + 1)];
    }
  }
  // inside column
  let cs: ICSet = setCSet(gs);
  for (let i = 0; i < 9; i++) {
    let obc = Object.keys(cs)[i];
    let tc2 = cs[obc].col
      .filter((item, index) => cs[obc].col.indexOf(item) != index)
      .filter((x) => x != 0);
    if (tc2.length > 0) {
      return [true, 'Duplicates of ' + tc2[0] + ' found in column ' + (i + 1)];
    }
  }

  return [false, 'No errors found'];
}

// Extract each grid TB:LR
export function getGSValues(bs: IBoardState, i: number): IGridSet {
  let unset: IGridSet = { gls: [] };
  for (let j = 0; j < 9; j++) {
    let v1: number[] = gridExtract2(bs.boardlLevels[i], j);
    let gsl: IGridSetLevel = { idx: j, name: 'gs' + j, vals: v1 };
    unset.gls.push(gsl);
  }
  return unset;
}

export function gridExtract2(bl: IBoardLevel, i: number): number[] {
  let xx: number[] = [];
  let rows: IGridCell[] = bl.cells
    .filter((x) => x.grid === i)
    .sort((a, b) => (a.gloc > b.gloc ? 1 : -1));
  for (let j = 0; j < 9; j++) {
    xx.push(rows[j].val);
  }
  return xx;
}

// build row and participating grids list
export function setRSet(gs: IGridSet): IRSet {
  let rs: IRSet = getDefaultRSet();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let r: number = i * 3 + j;
      let rk = Object.keys(rs)[r];
      let tr: IRSimple = getDefaultRSimple();
      tr.row = [];
      for (let k = 0; k < 3; k++) {
        tr.row.push(gs.gls[i * 3 + k].vals[j * 3]);
        tr.row.push(gs.gls[i * 3 + k].vals[j * 3 + 1]);
        tr.row.push(gs.gls[i * 3 + k].vals[j * 3 + 2]);
      }
      rs[rk] = tr;
    }
  }
  return rs;
}

// build column and participating grids list
export function setCSet(gs: IGridSet) {
  let cs: ICSet = getDefaultCSet();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let c: number = i * 3 + j;
      let ck = Object.keys(cs)[c];
      let tc: ICSimple = getDefaultCSimple();
      tc.col = [];
      for (let k = 0; k < 3; k++) {
        tc.col.push(gs.gls[k * 3 + i].vals[j]);
        tc.col.push(gs.gls[k * 3 + i].vals[j + 3]);
        tc.col.push(gs.gls[k * 3 + i].vals[j + 6]);
      }
      cs[ck] = tc;
    }
  }
  return cs;
}

export function deepCopy(x: any) {
  return JSON.parse(JSON.stringify(x));
}
