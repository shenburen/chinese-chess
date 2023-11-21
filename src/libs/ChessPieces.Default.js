import ChessesType from "./ChessPieces.Type";

const DefaultChessPieces = [
  // 红方
  {
    name: "帥",
    pos: [0, 4],
    type: ChessesType.BOSS,
    faction: "red",
  },
  {
    name: "仕",
    pos: [0, 3],
    type: ChessesType.SHI,
    faction: "red",
  },
  {
    name: "仕",
    pos: [0, 5],
    type: ChessesType.SHI,
    faction: "red",
  },
  {
    name: "相",
    pos: [0, 2],
    type: ChessesType.XIANG,
    faction: "red",
  },
  {
    name: "相",
    pos: [0, 6],
    type: ChessesType.XIANG,
    faction: "red",
  },
  {
    name: "馬",
    pos: [0, 1],
    type: ChessesType.MA,
    faction: "red",
  },
  {
    name: "馬",
    pos: [0, 7],
    type: ChessesType.MA,
    faction: "red",
  },
  {
    name: "車",
    pos: [0, 0],
    type: ChessesType.JU,
    faction: "red",
  },
  {
    name: "車",
    pos: [0, 8],
    type: ChessesType.JU,
    faction: "red",
  },
  {
    name: "砲",
    pos: [2, 1],
    type: ChessesType.PAO,
    faction: "red",
  },
  {
    name: "砲",
    pos: [2, 7],
    type: ChessesType.PAO,
    faction: "red",
  },
  {
    name: "兵",
    pos: [3, 0],
    type: ChessesType.DIDI,
    faction: "red",
  },
  {
    name: "兵",
    pos: [3, 2],
    type: ChessesType.DIDI,
    faction: "red",
  },
  {
    name: "兵",
    pos: [3, 4],
    type: ChessesType.DIDI,
    faction: "red",
  },
  {
    name: "兵",
    pos: [3, 6],
    type: ChessesType.DIDI,
    faction: "red",
  },
  {
    name: "兵",
    pos: [3, 8],
    type: ChessesType.DIDI,
    faction: "red",
  },
  // 黑方
  {
    name: "將",
    pos: [9, 4],
    type: ChessesType.BOSS,
    faction: "black",
  },
  {
    name: "士",
    pos: [9, 3],
    type: ChessesType.SHI,
    faction: "black",
  },
  {
    name: "士",
    pos: [9, 5],
    type: ChessesType.SHI,
    faction: "black",
  },
  {
    name: "象",
    pos: [9, 2],
    type: ChessesType.XIANG,
    faction: "black",
  },
  {
    name: "象",
    pos: [9, 6],
    type: ChessesType.XIANG,
    faction: "black",
  },
  {
    name: "馬",
    pos: [9, 1],
    type: ChessesType.MA,
    faction: "black",
  },
  {
    name: "馬",
    pos: [9, 7],
    type: ChessesType.MA,
    faction: "black",
  },
  {
    name: "車",
    pos: [9, 0],
    type: ChessesType.JU,
    faction: "black",
  },
  {
    name: "車",
    pos: [9, 8],
    type: ChessesType.JU,
    faction: "black",
  },
  {
    name: "炮",
    pos: [7, 1],
    type: ChessesType.PAO,
    faction: "black",
  },
  {
    name: "炮",
    pos: [7, 7],
    type: ChessesType.PAO,
    faction: "black",
  },
  {
    name: "卒",
    pos: [6, 0],
    type: ChessesType.DIDI,
    faction: "black",
  },
  {
    name: "卒",
    pos: [6, 2],
    type: ChessesType.DIDI,
    faction: "black",
  },
  {
    name: "卒",
    pos: [6, 4],
    type: ChessesType.DIDI,
    faction: "black",
  },
  {
    name: "卒",
    pos: [6, 6],
    type: ChessesType.DIDI,
    faction: "black",
  },
  {
    name: "卒",
    pos: [6, 8],
    type: ChessesType.DIDI,
    faction: "black",
  },
];

export default DefaultChessPieces;
