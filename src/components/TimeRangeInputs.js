/* 시작 시간과 종료 시간을 함께 입력하는 영역 */
function TimeRangeInputs(props) {
    return (
        <div className="time-input-area">
            <div>
                <span>시작 시간</span>
                <input
                    type="time"
                    value={props.startTime}
                    onChange={(event) => props.onStartTimeChange(event.target.value)}
                />
            </div>
            <div>
                <span>종료 시간</span>
                <input
                    type="time"
                    value={props.endTime}
                    onChange={(event) => props.onEndTimeChange(event.target.value)}
                />
            </div>
        </div>
    );
}

export default TimeRangeInputs;
