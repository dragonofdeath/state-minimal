import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type SquareValue = 'X' | 'O' | null;

export const TickTackToe: React.FC = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<SquareValue>(null);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setWinner(calculateWinner(newSquares));
    setIsXNext(!isXNext);
  };

  return (
    <div className="text-center">
      <Board squares={squares} onClick={handleClick} />
      <p className="mt-4 flex flex-col items-center justify-center">
        <Badge className="" variant="outline">
          {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
        </Badge>
        <Button
          className="bg-red-800 m-1"
          onClick={() => {
            setSquares(Array(9).fill(null));
            setIsXNext(true);
          }}
        >
          Reset game
        </Button>
      </p>
    </div>
  );
};

const Square: React.FC<{
  onClick: () => void;
  value: SquareValue;
}> = ({ onClick, value }) => (
  <button
    onClick={onClick}
    className="w-[100%] h-12 border border-gray-400 flex items-center justify-center"
  >
    {value}
  </button>
);

const Board: React.FC<{
  onClick: (i: number) => void;
  squares: SquareValue[];
}> = ({ onClick, squares }) => (
  <div className="grid grid-cols-3 gap-2">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
