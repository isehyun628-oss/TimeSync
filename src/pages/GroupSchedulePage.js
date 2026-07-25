/* 필요한 컴포넌트 불러오기 */
import Header from '../components/Header';
import ParticipantPopup from '../components/ParticipantPopup';

/* GroupSchedulePage.css 파일을 불러와서 디자인 적용 */
import './GroupSchedulePage.css';

/* useState: 팝업 열림/닫힘 상태를 저장하기 위해 불러옴 */
import { useState } from 'react';


/* 그룹 일정 페이지 */
function GroupSchedulePage() {

    /* participantOpen: 참가자 보기 팝업이 열렸는지(true) 닫혔는지(false) 저장하는 상태 */
    /* 초기값은 false(닫힘) */
    const [participantOpen, setParticipantOpen] = useState(false);

    return (
        /* 페이지 전체 컨테이너 */
        <div className="group-schedule-container">

            {/* 상단 헤더 컴포넌트*/}
            {/* icon, groupName, date는 Header.js에 props로 전달 */}
            {/* 나중에 백엔드 데이터로 교체 예정 (현재는 하드코딩) */}
            <Header
                icon="⭐"
                groupName="테스트 그룹"
                date="2026.05.28 ~ 2026.06.04"
            />

            {/* 캘린더 두 개를 가로로 나열하는 컨테이너 */}
            <div className="calender-container" style={{position: 'relative'}}> {/* ParticipantPopup 위치 기준점 */}

                {/* 왼쪽: 내 일정 캘린더 */}
                <div className="calender-wrapper">

                    {/* 캘린더 상단: 제목 텍스트 + 수정 버튼 */}
                    <div className="calender-header">
                        <span>내 일정</span>
                        {/* 수정 버튼: 누르면 캘린더 수정 가능 (기능 나중에 추가) */}
                        <button>수정</button>
                    </div>

                    {/* 캘린더 본체: 타임블럭이 들어갈 영역 (나중에 추가) */}
                    <div className="calender-body">
                    </div>

                </div>

                {/* 오른쪽: 전체 캘린더 */}
                <div className="calender-wrapper">

                    {/* 캘린더 상단: 제목 텍스트 + 참가자 보기 버튼 */}
                    <div className="calender-header">
                        <span>전체</span>
                        {/* 참가자 보기 버튼: 누르면 참가자 목록 팝업 (기능 나중에 추가) */}
                        <button onClick={() => { setParticipantOpen(true) }}>참가자 보기</button>
                    </div>

                    {/* 캘린더 본체: 타임블럭이 들어갈 영역 (나중에 추가) */}
                    <div className="calender-body">
                    </div>

                </div>

                {/* participantOpen이 true일 때만 ParticipantPopup 표시 */}
                {participantOpen && (
                    <div style={{
                        position: 'absolute',   /* calender-container 기준으로 위치 고정 */
                        top: '0px',    /* 헤더 파로 아래 */
                        right: '0px',  /* 공유버튼 위치에 맞게 조절 */
                        zIndex: 100
                    }}>
                        <ParticipantPopup onClose={() => { setParticipantOpen(false) }} />
                    </div>
                )}

            </div>
        </div>
    );
}

/* 이 컴포넌트를 다른 파일에서도 사용할 수 있게 내보내는 코드 */
export default GroupSchedulePage;