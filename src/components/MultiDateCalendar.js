import { useState } from 'react';
import './MultiDateCalendar.css';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const toDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/* 연속되지 않은 여러 날짜를 선택할 수 있는 달력 */
function MultiDateCalendar(props) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [visibleMonth, setVisibleMonth] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );

    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const isCurrentMonth =
        year === today.getFullYear() && month === today.getMonth();

    const calendarCells = [
        ...Array(firstDayIndex).fill(null),
        ...Array.from({ length: lastDate }, (_, index) => index + 1),
    ];

    const toggleDate = (day) => {
        const date = new Date(year, month, day);
        if (date < today) return;

        const dateKey = toDateKey(date);
        const alreadySelected = props.selectedDates.includes(dateKey);

        const nextDates = alreadySelected
            ? props.selectedDates.filter((selectedDate) => selectedDate !== dateKey)
            : [...props.selectedDates, dateKey];

        props.onChange(nextDates.sort());
    };

    return (
        <div className="multi-calendar">
            <div className="multi-calendar-header">
                <button
                    type="button"
                    onClick={() =>
                        setVisibleMonth(new Date(year, month - 1, 1))
                    }
                    disabled={isCurrentMonth}
                    aria-label="이전 달"
                >
                    ‹
                </button>
                <strong>{year}년 {month + 1}월</strong>
                <button
                    type="button"
                    onClick={() =>
                        setVisibleMonth(new Date(year, month + 1, 1))
                    }
                    aria-label="다음 달"
                >
                    ›
                </button>
            </div>

            <div className="multi-calendar-grid">
                {weekDays.map((weekDay) => (
                    <span className="multi-calendar-weekday" key={weekDay}>
                        {weekDay}
                    </span>
                ))}

                {calendarCells.map((day, index) => {
                    if (!day) {
                        return (
                            <span
                                className="multi-calendar-empty"
                                key={`empty-${index}`}
                            />
                        );
                    }

                    const date = new Date(year, month, day);
                    const dateKey = toDateKey(date);
                    const isPast = date < today;
                    const isSelected = props.selectedDates.includes(dateKey);

                    return (
                        <button
                            className={`multi-calendar-day${
                                isSelected ? ' is-selected' : ''
                            }`}
                            type="button"
                            key={dateKey}
                            disabled={isPast}
                            onClick={() => toggleDate(day)}
                            aria-pressed={isSelected}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            <p className="multi-calendar-summary">
                {props.selectedDates.length > 0
                    ? `${props.selectedDates.length}일 선택됨`
                    : '날짜를 선택해주세요'}
            </p>
        </div>
    );
}

export default MultiDateCalendar;
