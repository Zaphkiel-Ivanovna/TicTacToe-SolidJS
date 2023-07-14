import { createSignal, Component } from "solid-js";

const TicTacToe: Component = () => {
  // Créez l'état du plateau de jeu.
  const [board, setBoard] = createSignal<Array<Array<string | null>>>(Array(3).fill(Array(3).fill(null)));
  // Créez l'état du joueur actuel.
  const [currentPlayer, setCurrentPlayer] = createSignal<string>("X");
  // Créez l'état du jeu (en cours, victoire, égalité)
  const [status, setStatus] = createSignal<string>("En cours");

  const resetGame = () => {
    setBoard(Array(3).fill(Array(3).fill(null)));
    setCurrentPlayer("X");
    setStatus("En cours");
  };

  const winningLines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  const checkWin = (newBoard: Array<Array<string | null>>) => {
    for(let line of winningLines){
      if(newBoard[line[0][0]][line[0][1]] && newBoard[line[0][0]][line[0][1]] === newBoard[line[1][0]][line[1][1]] && newBoard[line[0][0]][line[0][1]] === newBoard[line[2][0]][line[2][1]]){
        return newBoard[line[0][0]][line[0][1]];
      }
    }
    return null;
  };

  const checkDraw = (newBoard: Array<Array<string | null>>) => {
    return newBoard.flat().every(cell => cell !== null);
  };

  // Créez une fonction pour gérer les clics sur les cases.
  const handleClick = (row: number, col: number) => () => {
    const newBoard = [...board().map(row => [...row])];
    if (newBoard[row][col] === null && status() === "En cours") {
      newBoard[row][col] = currentPlayer();
      setBoard(newBoard);
      const winner = checkWin(newBoard);
      if (winner) {
        setStatus(`Victoire: ${winner}`);
      } else if (checkDraw(newBoard)) {
        setStatus('Égalité');
      } else {
        setCurrentPlayer(currentPlayer() === "X" ? "O" : "X");
      }
    }
  };

  return (
    <div class="container">
      <h1 class="text-center my-4">Jeu de Morpion</h1>
      <div class="row g-0">
        {board().map((row, rowIndex) => (
          <div class="col-12">
            <div class="row">
              {row.map((cell, colIndex) => (
                <div class="col-4">
                  <button
                    class={`btn btn-outline-primary m-2 ${cell ? 'disabled' : ''}`}
                    style="width: 100%; height: 100px; font-size: 2rem"
                    onClick={handleClick(rowIndex, colIndex)}
                    disabled={!!cell}
                  >
                    {cell}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div class="text-center mt-4">
        <h2 class={`status ${status() === "Victoire: X" || status() === "Victoire: O" ? "victory" : ""}`}>Statut : {status()}</h2>
        <h2>Joueur devant jouer : {currentPlayer()}</h2>
        <button class="btn btn-secondary mt-3" onClick={resetGame}>
          Réinitialiser le jeu
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
