const Timer = (props) => {
    const formatTime = (currTime) => {
        const getSeconds = `0${currTime % 60}`.slice(-2)
        const minutes = `${Math.floor(currTime / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)

        return `${getMinutes} : ${getSeconds}`
    }

    return (
        <div id="Timer">
            <h1>{formatTime(props.time)}</h1>
        </div>
    )
}

export default Timer
