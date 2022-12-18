import React, { useState } from "react";
import './App.css';
import Board from './Board';
import Clock from './Clock';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function App() {
    function randomLight() {
        return Math.random() < 0.25;
    }
    const duration = 2;
    const [isCountdown, setIsCountdown] = useState(false)
    const [remainingTurn, setRemainingTurn] = useState(1)
    const [clockKey, setClockKey] = useState(0)
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    const [isWon, setIsWon] = useState(false)
    const [lightsGrid, setLightsGrid] = useState({
        grid: Array.from({ length: 5 }).map(
            row => (row =
                Array.from({ length: 5 }).map(
                    cell => (cell = randomLight())
                )
            )
        )
    })

    const restartBoard = () => {
        setLightsGrid({
            grid: Array.from({ length: 5 }).map(
                row => (row =
                    Array.from({ length: 5 }).map(
                        cell => (cell = randomLight())
                    )
                )
            )
        })
        setClockKey(clockKey + 1)
        setIsCountdown(true)
        setIsBtnDisabled(!isBtnDisabled)
    }

    const checkTurn = () => {
        const currentTurn = remainingTurn - 1
        if (currentTurn < 1) {
            setIsCountdown(false)
            setRemainingTurn(0)
            setIsBtnDisabled(true)
            setLightsGrid({
                grid: [
                    [false, true, false, true, false],
                    [true, false, true, false, true],
                    [true, false, false, false, true],
                    [false, true, false, true, false],
                    [false, false, true, false, false],
                ]
            })
            setIsWon(true)
            // TODO: Pop up alert win game
            return
        }
        setRemainingTurn(currentTurn)
        setIsBtnDisabled(false)
    }

    return (
        <div className="App">
            <h1 className='App-h1'><span className='App-orange'>LIGHTS</span>  <span className="App-blue">OUT</span></h1>
            {!isWon && (<><div className='App-subtitle'>
                <Clock className='Clock' isPlaying={isCountdown} checkTurn={checkTurn} key={clockKey} duration={duration} />
                <div className="App-turnleft">
                    <span>Turn left: </span>
                    {Array(remainingTurn).fill(0).map((_, i) => <><FontAwesomeIcon icon={faHeart} key={i} />{' '}</>)}
                </div>
            </div>
                <Button onClick={restartBoard} disabled={isBtnDisabled} /></>)}
            <Board className='Board' board={lightsGrid} setBoard={setLightsGrid} isWon={isWon} setIsWon={setIsWon} />
        </div>
    );
}

export default App;
