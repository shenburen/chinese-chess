import ChessInit from "./libs/ChessInit";
import ChessBoard from "./libs/ChessBoard";
import ChessPieces from "./libs/ChessPieces";
import ChessActives from "./libs/ChessActives";

const chessInit = new ChessInit();
const chessBoard = new ChessBoard(chessInit);
const chessPieces = new ChessPieces(chessInit);
const chessActives = new ChessActives(chessInit, chessPieces);

console.info(`
* * * * * * * * * * * * * * * * * * * * * * * * * * 
*                                                 * 
*   Chinese Chess                                 * 
*                                                 * 
*           ┌─┐       ┌─┐                         *
*        ┌──┘ ┴───────┘ ┴──┐                      *
*        │                 │                      *
*        │       ───       │                      *
*        │  ─┬┘       └┬─  │                      *
*        │                 │                      *
*        │       ─┴─       │                      *
*        │                 │                      *
*        └───┐         ┌───┘                      *
*            │         │                          *
*            │         │                          *
*            │         │                          *
*            │         └──────────────┐           *
*            │                        │           *
*            │                        ├─┐         *
*            │                        ┌─┘         *    
*            │                        │           *
*            └─┐  ┐  ┌───────┬──┐  ┌──┘           *       
*              │ ─┤ ─┤       │ ─┤ ─┤              *     
*              └──┴──┘       └──┴──┘              *
*                                                 *
*                                Create by Shen   *
*                                                 *
* * * * * * * * * * * * * * * * * * * * * * * * * *
`);
