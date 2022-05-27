function randomSquare() {
  return Math.floor(Math.random() * 64);
}

function generateFen(pieces) {
  let fen = [];
  let squareNumber;
  let emptySquareCount = 0;

  for (let row=0; row < 8; row++) {
    let fenRow = '';
    for (let column=0; column < 8; column++) {
      squareNumber = 8 * row + column;
      let pieceSymbol = pieces[squareNumber];
      if (pieceSymbol) {
        // there is a piece on this square
        if (emptySquareCount > 0) {
          fenRow += emptySquareCount;
          emptySquareCount = 0;
        }
        fenRow += pieceSymbol;
      } else {
        emptySquareCount++;
      }
    }

    if (emptySquareCount > 0) {
      fenRow += emptySquareCount;
    }

    fen.push(fenRow);
    emptySquareCount = 0;
  }

  return `${fen.join('/')} w - - 0 1`;
}

function randomFenWithBishopKnight() {
  let squares = [];

  while (squares.length < 4) {
    let sq = randomSquare();
    if (!squares.includes(sq)) {
      squares.push(sq);
    }
  }

  let pieces = {
    [squares[0]]: 'k', // black king
    [squares[1]]: 'K', // white king
    [squares[2]]: 'B', // white bishop
    [squares[3]]: 'N', // white knight
  }

  return generateFen(pieces);
}
