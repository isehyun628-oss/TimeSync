const timeOptions = Array.from({ length: 48 }, (_, index) => {
    const hour = String(Math.floor(index / 2)).padStart(2, '0');
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
});
const endTimeOptions = [...timeOptions, '24:00'];

/* 시작 시간과 종료 시간을 30분 단위로 선택하는 영역 */
function TimeRangeInputs(props) {
    const handleStartTimeChange = (nextStartTime) => {
        props.onStartTimeChange(nextStartTime);

        if (props.endTime && props.endTime <= nextStartTime) {
            props.onEndTimeChange('');
        }
    };

    return (
        <div className="time-input-area">
            <div>
                <label htmlFor="startTime">시작 시간</label>
                <select
                    id="startTime"
                    value={props.startTime}
                    onChange={(event) => handleStartTimeChange(event.target.value)}
                >
                    <option value="">시간 선택</option>
                    {timeOptions.map((time) => (
                        <option value={time} key={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="endTime">종료 시간</label>
                <select
                    id="endTime"
                    value={props.endTime}
                    onChange={(event) => props.onEndTimeChange(event.target.value)}
                    disabled={!props.startTime}
                >
                    <option value="">시간 선택</option>
                    {endTimeOptions.map((time) => (
                        <option
                            value={time}
                            key={time}
                            disabled={time <= props.startTime}
                        >
                            {time}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default TimeRangeInputs;
