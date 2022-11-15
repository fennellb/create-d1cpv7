import { getDefaultRSimple } from './defaults';
import { IBoardState, IRSimple } from './iinternal';

export function displayBoardLevel(
  input: IBoardState,
  sZero: number,
  solved: number,
  name: string,
  lerr: [boolean, string]
): string {
  let x: IRSimple[] = [];
  for (let j = 0; j < 9; j++) {
    let r: IRSimple = getDefaultRSimple();
    r.row[0] = input.boardlLevels[0].cells.find(x => x.aRow === j && x.aCol === 0).val;
    r.row[1] = input.boardlLevels[0].cells.find(x => x.aRow === j && x.aCol === 1).val;
    r.row[2] = input.boardlLevels[0].cells.find(x => x.aRow === j && x.aCol === 2).val;
    r.row[3] = input.boardlLevels[0].cells.find(x => x.aRow === j && x.aCol === 3).val;
    r.row[4] = input.boardlLevels[0].cells.find(x => x.aRow === j && x.aCol === 4).val;
    r.row[5] = input.boardlLevels[0].cells.find(x => x.aRow === j && x.aCol === 5).val;
    r.row[6] = input.boardlLevels[0].cells.find(x => x.aRow === j && x.aCol === 6).val;
    r.row[7] = input.boardlLevels[0].cells.find(x => x.aRow === j && x.aCol === 7).val;
    r.row[8] = input.boardlLevels[0].cells.find(x => x.aRow === j && x.aCol === 8).val;
    x.push(r);
  }

  return (
    '<div style="white-space: pre; font-size: 14px;"><span style="color: #00c; font-weight: 600">Solved </span><span style="color: #a00; font-weight: 600;">' +
    solved +
    '</span><span style="color: #00c; font-weight: 600"> of </span><span style="color: #a00; font-weight: 600;">' +
    sZero +
    '</span><span style="color: #00c; font-weight: 600"> on </span><span style="color: #040; font-weight: 600;">' +
    name +
    '</span><span style="color: #00c; font-weight: 600"> puzzle.</span>' +
    '<br/><br/><span style="color: #00c; font-weight: 600">Last step: </span><span style="color: #a00; font-weight: 600;">' +
    input.step +
    '</span><span style="color: #00c; font-weight: 600;">, board results: </span><br/><br/><br/>' +
    '<span style="font-weight: bold;">' +
    '<style>' +
    'table { border-collapse: collapse; font-family: Calibri, sans-serif; font-size: 16px; }' +
    'colgroup, tbody { border: solid medium #bbb; }' +
    'td { border: solid thin #bbb; height: 2em; width: 2em; text-align: center; padding: 0; color: #00c; }' +
    '</style>' +
    '<table>' +
    '  <colgroup><col><col><col>' +
    '  <colgroup><col><col><col>' +
    '  <colgroup><col><col><col>' +
    '<tbody>' +
    lineRoll(x[0]) +
    lineRoll(x[1]) +
    lineRoll(x[2]) +
    '<tbody>' +
    lineRoll(x[3]) +
    lineRoll(x[4]) +
    lineRoll(x[5]) +
    '<tbody>' +
    lineRoll(x[6]) +
    lineRoll(x[7]) +
    lineRoll(x[8]) +
    '</table>' +
    '</span>' +
    '<span style="color: #a00; font-weight: 600;">' +
    (lerr[0] == true ? '<br/><br/>Warning:  ' + lerr[1] : '') +
    '</span>' +
    '</div>'
  );
}

function lineRoll(r: IRSimple): string {
  return (
    '<tr> <td>' +
    (r.row[0] == 0 ? '' : r.row[0]) +
    ' <td>' +
    (r.row[1] == 0 ? '' : r.row[1]) +
    ' <td>' +
    (r.row[2] == 0 ? '' : r.row[2]) +
    ' <td>' +
    (r.row[3] == 0 ? '' : r.row[3]) +
    ' <td>' +
    (r.row[4] == 0 ? '' : r.row[4]) +
    ' <td>' +
    (r.row[5] == 0 ? '' : r.row[5]) +
    ' <td>' +
    (r.row[6] == 0 ? '' : r.row[6]) +
    ' <td>' +
    (r.row[7] == 0 ? '' : r.row[7]) +
    ' <td>' +
    (r.row[8] == 0 ? '' : r.row[8])
  );
}
