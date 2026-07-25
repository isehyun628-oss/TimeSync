/* ParticipantPopup.css 파일을 불러와서 디자인 적용 */
import './ParticipantPopup.css';

/* props를 받는 ParticipantPopup 컴포넌트 */
function ParticipantPopup(props) {
    
    /* 나중에 props.participants로 교체 예정 (현재는 하드코딩) */
    const participants = [
        { id: 1, name: '참가자1' },
        { id: 2, name: '참가자2' },
        { id: 3, name: '참가자3' },
        { id: 4, name: '참가자4' },
    ];

    return (

        /* 팝업 전체 컨테이너 */
        <div className="participant-popup-container">

            {/* 팝업 상단: 제목 텍스트 + 닫기 버튼 */}
            <div className="participant-popup-header">
                {/* 팝업 제목 */}
                <span className="participant-popup-title">참가자 보기</span>
                {/* 닫기 버튼: 누르면 팝업 닫기 */}
                <button className="participant-close-btn" onClick={props.onClose}>✕</button>
            </div>

            {/* 참가자 목록 */}
            <div className="participant-list">

                {/* 모두 되는 시간 항목 */}
                <div className="participant-item">
                    <input type="checkbox" />
                    <span>모두 되는 시간</span>
                </div>

                {/* 참가자 목록 반복 출력 */}
                {/* map: 배열의 각 항목을 JSX로 변환하는 함수 */}
                {participants.map((participant) => (
                    <div key={participant.id} className="participant-item">
                        <input type="checkbox" />
                        <span>{participant.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );   
}

/* 이 컴포넌트를 다른 파일에서도 사용할 수 있게 내보내는 코드 */
export default ParticipantPopup;