/* ParticipantPopup.css 파일을 불러와서 디자인 적용 */
import './ParticipantPopup.css';

/* useState 기능 불러오기 */
import { useState } from 'react';

/* props를 받는 ParticipantPopup 컴포넌트 */
function ParticipantPopup(props) {
    
    /* 나중에 props.participants로 교체 예정 (현재는 하드코딩) */
    const participants = [
        { id: 1, name: '참가자1' },
        { id: 2, name: '참가자2' },
        { id: 3, name: '참가자3' },
        { id: 4, name: '참가자4' },
    ];

    /* 체크된 참가자 id 목록 */
    const [checkedIds, setCheckedIds] = useState([]);

    /* 모두 되는 시간 체크 여부: 모든 참가자가 체크됐을 때 자동으로 true */
    const isAllChecked = checkedIds.length === participants.length;

    /* 참가자 체크박스 클릭 */
    const handleParticipantCheck = (id) => {
        if (checkedIds.includes(id)) {
            /* 이미 체크됐으면 해제 */
            setCheckedIds(checkedIds.filter(checkedId => checkedId !== id));
        } else {
            /* 체크 안 됐으면 추가 */
            setCheckedIds([...checkedIds, id]);
        }
    };

    /* 모두 되는 시간 체크박스 클릭 */
    const handleAllCheck =() => {
        if (isAllChecked) {
            /* 모두 체크된 상태면 전부 해제 */
            setCheckedIds([]);
        } else {
            /* 아니면 전부 체크 */
            setCheckedIds(participants.map(p => p.id));
        }
    };

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
                    <input type="checkbox"
                    checked={isAllChecked}
                    onChange={handleAllCheck}
                    />
                    <span>모두 되는 시간</span>
                </div>

                {/* 참가자 목록 */}
                {/* map: 배열의 각 항목을 JSX로 변환하는 함수 */}
                {participants.map((participant) => (
                    <div key={participant.id} className="participant-item">
                        <input
                            type="checkbox"
                            checked={checkedIds.includes(participant.id)}
                            onChange={() => handleParticipantCheck(participant.id)}
                        />
                        <span>{participant.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );   
}

/* 이 컴포넌트를 다른 파일에서도 사용할 수 있게 내보내는 코드 */
export default ParticipantPopup;