import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getDefaultContainer, getDefaultRCSet } from './tools/defaults';
import {
  IBoardLevelRelationsRef,
  IBoardState,
  IGridCell,
  IGridLocation,
  IGridRelationsRef,
  IGridSet,
  IPuzzle,
  IRCSet,
  IStateHolder,
} from './tools/iinternal';
import { displayBoardLevel } from './tools/output';
import { Puzzles } from './tools/puzzles';
import {
  checkCol,
  checkRow,
  deepCopy,
  errCheck,
  firstFill,
  getBoardLevelRelationsRef,
  getGridRelationsRef,
  getSubCol,
  getSubRow,
  getUnsetValues,
  gridKey,
  updateRCSetPerGridRC,
} from './tools/util-functions';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  boardHolder: IStateHolder[] = [
    {
      boardStates: [{ step: 0, boardlLevels: [getDefaultContainer()] }],
    },
  ];

  display: string = '';

  solutions: number = 0;
  solutionsPre: number = 0;
  startTF: boolean = true;
  step: number = 0;

  sZeroes: number = 0;
  solved: number = 0;

  // ********************** Set puzzle here **********************
  selectedPuzzle: IPuzzle = Puzzles.SDKWPChallenge;
  // ********************** Set puzzle here **********************

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    try {
      [this.boardHolder[0].boardStates[0].boardlLevels[0], this.sZeroes] =
        firstFill(
          this.boardHolder[0].boardStates[0].boardlLevels[0],
          this.selectedPuzzle.puzzle
        );
      console.log('before while loop');

      // help
          if(this.selectedPuzzle.name == "WPChallenge"){
            this.boardHolder[0].boardStates[0].boardlLevels[0].cells[12].val = 1 // advanced - not a guess.
            this.boardHolder[0].boardStates[0].boardlLevels[0].cells[29].val = 7 // guess
            this.solved +=2;
          }
      // help

      while (
        (this.solutions > 0 || this.solutionsPre > 0 || this.startTF) &&
        this.step < 100
      ) {
        console.log(
          'this.solutions: ' +
            this.solutions +
            ', this.solutionsPre: ' +
            this.solutionsPre
        );
        this.process();
        this.startTF = false;
      }
      let lerr: [boolean, string] = errCheck(
        this.boardHolder[0].boardStates[
          this.boardHolder[0].boardStates.length - 1
        ]
      );
      this.display = displayBoardLevel(
        this.boardHolder[0].boardStates[
          this.boardHolder[0].boardStates.length - 1
        ],
        this.sZeroes,
        this.solved,
        this.selectedPuzzle.name,
        lerr
      );
    } catch (err) {
      console.error('Catch hit.');
      this.display = err;
    }
  }

  async process(): Promise<any> {
    console.log('process1 hit.');
    this.solutionsPre = deepCopy(this.solutions);
    this.solutions = 0;

    // load ref objects:
    let grref: IGridRelationsRef = getGridRelationsRef(); // adjacent r/c objects per grid
    let blrref: IBoardLevelRelationsRef = getBoardLevelRelationsRef(); // coordinates of adjacent grids

    // get values from 3x3
    let bs: IBoardState =
      this.boardHolder[0].boardStates[
        this.boardHolder[0].boardStates.length - 1
      ];

    let bsstepp = bs.step + +1;
    let bsn: IBoardState = {
      step: bsstepp,
      boardlLevels: deepCopy(bs.boardlLevels),
    };

    // rc placement checks
    for (let i = 0; i < bs.boardlLevels.length; i++) {
      let grid: IGridSet = getUnsetValues(bsn, i);

      for (let k = 0; k < 9; k++) {
        for (let l = 0; l < grid.gls[k].vals.length; l++) {
          let ll = grid.gls[k].vals[l];
          let xblr = blrref.blr[k];
          let rcset: IRCSet = getDefaultRCSet();

          for (let m = 0; m < 4; m++) {
            let xbm = Object.keys(xblr)[m];
            let cells = bsn.boardlLevels[i].cells;
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
          let rcset2: IRCSet = updateRCSetPerGridRC(rcset,bsn,grid,i,k,ll,grref,blrref);
          if (rcset2.sl) {
            let gloc: IGridLocation = gridKey(rcset);
            // grid = k

            let update: IGridCell = bsn.boardlLevels[i].cells.find(
              (x) => x.grid === k && x.gSR === gloc.gSR && x.gSC === gloc.gSC
            );
            let idx: number = bsn.boardlLevels[i].cells.indexOf(update);
            bsn.boardlLevels[i].cells[idx].val = ll;
            this.solutions++;
            this.solved++;
            grid.gls[k].vals = grid.gls[k].vals.filter(x => x != ll)
          }
        }
      }
    }


    this.step = deepCopy(bsn.step);
    console.log('bsn.step: ' + bsn.step);
    this.boardHolder[0].boardStates.push(bsn);

    return await Promise.resolve('complete')
  }
}
