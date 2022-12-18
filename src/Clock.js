import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "./Clock.css";

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
        return <div className="timer">End...</div>;
    }

    return (
        <div className="timer">
            {/* <div className="text">Remaining</div> */}
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
        </div>
    );
};

const Clock = ({ isPlaying, checkTurn, key, duration }) => (
    <CountdownCircleTimer
        isPlaying={isPlaying}
        size={120}
        duration={duration}
        key={key}
        strokeWidth={8}
        colors={["#03fc45", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[120, 90, 30, 0]}
        onComplete={() => {
            checkTurn()
            return
        }}
    >
        {renderTime}
    </CountdownCircleTimer>
)

export default Clock;
