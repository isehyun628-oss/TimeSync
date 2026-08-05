/* useState, useEffect, useRef 기능 가져오기 */
import { useState, useEffect, useRef } from 'react';

/* CSS 파일 가져오기 */
import './TimeTable.css';

/* 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환 */
const toDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/* 시간을 'HH:MM' 형식의 문자열로 변환 */
const toTimeKey = (timeIndex) => {
    const hour = String(Math.floor(timeIndex / 2)).padStart(2, '0');
    const minute = timeIndex % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
};

function TimeTable(props) {

    /* 현재 보여주는 날짜 시작 인덱스 (가로 화살표) */
    const [dateStartIndex, setDateStartIndex] = useState(0);

    /* 현재 보여주는 시간 시작 인덱스 (세로 화살표) */
    const [timeStartIndex, setTimeStartIndex] = useState(0);

    /* 드래그 관련 상태 */
    const [isDragging, setIsDragging] = useState(false);    // 드래그 중인지
    const [dragStart, setDragStart] = useState(null);       // 드래그 시작 칸
    const [internalselectedCells, setInternalSelectedCells] = useState({}); // 선택된 칸들
    const [isErasing, setIsErasing] = useState(false);      // 지우기 모드

    const selectedCells = props.selectedCells !== undefined
        ? props.selectedCells
        : internalselectedCells;

    const setSelectedCells = (newCells) => {
        if (props.onSelectedCellsChange) {
            if (typeof newCells === 'function') {
                props.onSelectedCellsChange(newCells(selectedCells));
            } else {
                props.onSelectedCellsChange(newCells);
            }
        } else {
            setInternalSelectedCells(newCells);
        }
    };

    /* 현재 컨테이너 너비에 따라 보여줄 날짜/시간 수 */
    const [visibleDateCount, setVisibleDateCount] = useState(7);
    const [visibleTimeCount, setVisibleTimeCount] = useState(12);

    /* 컨테이너 너비를 측정하기 위한 ref */
    const containerRef = useRef(null);
    const gridRef = useRef(null);

    /* 컨테이너 너비가 바뀔 때마다 날짜/시간 수 자동 조절 */
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver((entries) => {
            const width = container.clientWidth;
            const height = container.clientHeight;

            /* 너비에 따라 날짜 수 계산 */
            /* 각 날짜 셀 최소 너비를 60px로 가정 */
            const timeAxisWidth = 52;   /* 시간 라벨 너비 */
            const arrowWidth = 40;      /* 화살표 버튼 너비 */
            const available = width - timeAxisWidth - arrowWidth * 2;
            const count = Math.max(1, Math.min(7, Math.floor(available / 60)));
            setVisibleDateCount(count);

            /* 높이에 따라 시간 수 계산 */
            /* 각 시간 셀 최소 높이를 36px로 가정 */
            const headerHeight = 44;
            const navHeight = 32 * 2;   /* 위아래 화살표 */
            const availableHeight = height - headerHeight - navHeight;
            const timeCount = Math.max(4, Math.floor(availableHeight / 36));
            setVisibleTimeCount(timeCount);
        });

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    /* 전체 시간 인덱스 배열 */
    const totalTimeIndices = Array.from(
        { length: props.endTime - props.startTime },
        (_, i) => props.startTime + i
    );

    /* 한 화면에 보여줄 시간 칸 수 (12시간 = 24칸) */
    const VISIBLE_TIME_COUNT = Math.min(visibleTimeCount, totalTimeIndices.length);

    /* 현재 화면에 보여줄 시간 인덱스 */
    const visibleTimeIndices = totalTimeIndices.slice(
        timeStartIndex,
        timeStartIndex + VISIBLE_TIME_COUNT
    );

    /* visibleDateCount 사용 */
    const visibleDates = props.dates.slice(dateStartIndex, dateStartIndex + visibleDateCount);

    /* 이전 7일로 이동 (가로) */
    const handleDatePrev = () => {
        if (dateStartIndex > 0) {
            setDateStartIndex(dateStartIndex - visibleDateCount);
        }
    };

    /* 다음 7일로 이동 (가로) */
    const handleDateNext = () => {
        if (dateStartIndex + visibleDateCount < props.dates.length) {
            setDateStartIndex(dateStartIndex + visibleDateCount);
        }
    };

    /* 이전 시간으로 이동 (세로) */
    const handleTimeUp = () => {
        if (timeStartIndex > 0) setTimeStartIndex(timeStartIndex - 1);
    };

    /* 이후 시간으로 이동 (세로) */
    const handleTimeDown = () => {
        if (timeStartIndex + VISIBLE_TIME_COUNT < totalTimeIndices.length) {
            setTimeStartIndex(timeStartIndex + 1);
        }
    };

    /* 드래그 시작: 마우스 누를 때 */
    const handleMouseDown = (dateKey, timeIndex) => {
        if (props.readOnly) {   /* 보기 전용 */
            if (props.onCellClick) props.onCellClick(dateKey, timeIndex);
            return;
        }
        const cellKey = `${dateKey}-${timeIndex}`;
        const isSelected = !!selectedCells[cellKey];
        setIsErasing(isSelected);   /* 이미 선택된 칸이면 지우기 모드 */
        setIsDragging(true);
        setDragStart({ dateKey, timeIndex });

        setSelectedCells(prev => ({
            ...prev,
            [cellKey]: !isSelected
        }));
    };

    /* 드래그 중: 마우스 움직일 때 */
    const handleMouseEnter = (dateKey, timeIndex) => {
        if (props.readOnly) return;     /* 보기 전용이면 아무것도 안 함 */
        if (!isDragging || !dragStart) return;

        /* 드래그 시작점과 현재 위치 사이의 모든 칸 선택 */
        const startDateIdx = props.dates.indexOf(dragStart.dateKey);
        const endDateIdx = props.dates.indexOf(dateKey);
        const startTimeIdx = dragStart.timeIndex;
        const endTimeIdx = timeIndex;

        const minDateIdx = Math.min(startDateIdx, endDateIdx);
        const maxDateIdx = Math.max(startDateIdx, endDateIdx);
        const minTimeIdx = Math.min(startTimeIdx, endTimeIdx);
        const maxTimeIdx = Math.max(startTimeIdx, endTimeIdx);

        const newCells = { ...selectedCells };  /* 기존 선택 유지 */
        for (let d = minDateIdx; d <= maxDateIdx; d++) {
            for (let t = minTimeIdx; t <= maxTimeIdx; t++) {
                const cellKey = `${props.dates[d]}-${t}`;
                newCells[cellKey] = !isErasing;
            }
        }
        setSelectedCells(newCells);
    };

    /* 드래그 종료: 마우스 뗄 때 */
    const handleMouseUp = () => {
        setIsDragging(false);
        setDragStart(null);
    };

    return (
        /* 캘린더 전체 컨테이너 */
        /* onMouseUp: 캘린더 밖에서 마우스를 떼도 드래그 종료 */
        <div
            className="timetable-container"
            ref={containerRef}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >

            {/* 날짜/시간 전체를 하나의 그리드로 구성 */}
            <div className="timetable-grid-wrapper">

                {/* 1행: 빈칸 + 날짜 헤더 행 */}
                <div className="timetable-header-row">
                    {/* 좌측 상단 빈칸 (시간축 너비만큼) */}
                    <div className="timetable-corner" />
                    {/* 좌우 화살표 + 날짜 헤더 */}
                    <div className="timetable-date-row">
                        <button className="timetable-arrow" onClick={handleDatePrev}>
                            {dateStartIndex === 0 ? '◁' : '◀'}
                        </button>
                        {visibleDates.map((dateKey) => (
                            <div key={dateKey} className="timetable-date-header">
                                {dateKey.slice(5).replace('-', '/')}
                            </div>
                        ))}
                        <button className="timetable-arrow" onClick={handleDateNext}>
                            {dateStartIndex + visibleDateCount >= props.dates.length ? '▷' : '▶'}
                        </button>
                    </div>
                </div>

                {/* 2행: 위 화살표 + 빈칸 */}
                <div className="timetable-nav-row">
                    <div className="timetable-corner">
                        <button className="timetable-arrow" onClick={handleTimeUp}>
                            {timeStartIndex === 0 ? '△' : '▲'}
                        </button>
                    </div>
                    {/* 날짜 헤더 너비만큼 빈칸 */}
                    <div className="timetable-nav-empty" />
                </div>

                {/* 3행: 시간 라벨 + 셀들 */}
                <div className="timetable-body-row">
                    {/* 시간 라벨 */}
                    <div className="timetable-time-axis">
                        {visibleTimeIndices.map((timeIndex) => (
                            <div key={timeIndex} className="timetable-time-label">
                                {toTimeKey(timeIndex)}
                            </div>
                        ))}
                    </div>
                    {/* 셀 그리드 */}
                    <div className="timetable-cells">
                        {visibleTimeIndices.map((timeIndex) => (
                            <div key={timeIndex} className="timetable-row">
                                {/* 좌측 화살표 너비만큼 빈칸 */}
                                <div className="timetable-arrow-placeholder" />
                                {visibleDates.map((dateKey) => {
                                    const cellKey = `${dateKey}-${timeIndex}`;
                                    const isSelected = !! selectedCells[cellKey];
                                    return (
                                        <div
                                            key={cellKey}
                                            className={`timetable-cell ${isSelected ? (props.readOnly ? 'is-selected-readonly' : 'is-selected') : ''}`}
                                            onMouseDown={() => handleMouseDown(dateKey, timeIndex)}
                                            onMouseEnter={() => handleMouseEnter(dateKey, timeIndex)}
                                        />
                                    );
                                })}
                                {/* 우측 화살표 너비만큼 빈칸 */}
                                <div className="timetable-arrow-placeholder" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4행: 아래 화살표 + 빈칸 */}
                <div className="timetable-nav-row">
                    <div className="timetable-corner">
                        <button className="timetable-arrow" onClick={handleTimeDown}>
                            {timeStartIndex + VISIBLE_TIME_COUNT >= totalTimeIndices.length ? '▽' : '▼'}
                        </button>
                    </div>
                    <div className="timetable-nav-empty" />
                </div>

            </div>
        </div>
    );
}

export default TimeTable;