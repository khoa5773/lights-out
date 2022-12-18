import './Board.css';
import Cell from "./Cell";


function Board({ board, setBoard, isWon, setIsWon }) {

    /** toggleLight: toggles a single light on/off in the state */
    const toggleLight = function (cellIndex) {
        let [cellRowIndex, cellColIndex] = cellIndex.split("");
        cellRowIndex = parseInt(cellRowIndex);
        cellColIndex = parseInt(cellColIndex);

        setBoard(currSt => (
            {
                ...currSt,
                grid: currSt.grid.map(
                    (row, rowIndex) => (rowIndex === cellRowIndex
                        ? row.map((col, colIndex) => colIndex === cellColIndex ? !col : col)
                        : row
                    ))
            }
        ))
    }

    /** toggleAllLights: toggles clicked-on light and its neighbours */
    function toggleAllLights(cellIndex) {
        let [cellRowIndex, cellColIndex] = cellIndex.split("");
        cellRowIndex = parseInt(cellRowIndex);
        cellColIndex = parseInt(cellColIndex);

        toggleLight(cellIndex);                                 //toggle clicked on cell
        toggleLight([cellRowIndex, cellColIndex + 1].join("")); //toggle right
        toggleLight([cellRowIndex, cellColIndex - 1].join("")); //toggle left
        toggleLight([cellRowIndex + 1, cellColIndex].join("")); //toggle down
        toggleLight([cellRowIndex - 1, cellColIndex].join("")); //toggle up

    }

    /** hasWon: checks if all lights are off */
    function hasWon() {
        if (board.grid.every(row => row.every(cell => !cell))) {
            setIsWon(true)
            setBoard({
                grid: [
                    [false, true, false, true, false],
                    [true, false, true, false, true],
                    [true, false, false, false, true],
                    [false, true, false, true, false],
                    [false, false, true, false, false],
                ]
            })
            return true
        }
        return false
    }


    const gridDisplay = board.grid.map(function (row, rowIndex) {
        return (
            <div className="Board-row" key={rowIndex}>
                {row.map((col, colIndex) => (
                    <Cell
                        key={[rowIndex, colIndex].join("")}
                        cellIndex={[rowIndex, colIndex].join("")}
                        isOn={board.grid[rowIndex][colIndex]}
                        toggleLight={toggleAllLights}
                    />
                ))}
            </div>
        );
    });

    return (
        <div className="Board">
            {hasWon() || isWon ? <><div className="Board-hasWon">Congratulations!</div>{gridDisplay}</> : gridDisplay}
        </div>
    )
}

export default Board;