/* 필요한 컴포넌트 불러오기 */
import Header from '../components/Header';
import ParticipantPopup from '../components/ParticipantPopup';
import SettingPopup from '../components/SettingPopup';
import TimeTable from '../components/TimeTable';
import CellPopup from '../components/CellPopup';

/* GroupSchedulePage.css 파일을 불러와서 디자인 적용 */
import './GroupSchedulePage.css';

/* useState: 팝업 열림/닫힘 상태를 저장하기 위해 불러옴 */
import { useState } from 'react';


/* 그룹 일정 페이지 */
function GroupSchedulePage() {

    /* participantOpen: 참가자 보기 팝업이 열렸는지(true) 닫혔는지(false) 저장하는 상태 */
    /* 초기값은 false(닫힘) */
    const [participantOpen, setParticipantOpen] = useState(false);

    /* settingOpen: 설정 팝업이 열렸는지(true) 닫혔는지(false) 저장 */
    const [settingOpen, setSettingOpen] = useState(false);

    /* isOwner: 생성자 버전(true) 사용자 버전 (false) */
    /* 나중에 실제 데이터로 연결 예정 (현재는 하드코딩) */
    const isOwner = true;

    /* 저장된 내 일정 선택 칸 */
    const [mySelectedCells, setMySelectedCells] = useState({});

    /* 수정 모드 */
    const [editOpen, setEditOpen] = useState(false);

    /* 수정 중인 임시 선택 칸 */
    const [tempSelectedCells, setTempSelectedCells] = useState({});

    /* 칸 팝업 상태 */
    const [cellPopup, setCellPopup] = useState(null);

    /* 그룹 생성 시 설정한 날짜 배열 (하드코딩) */
    const dates = [
        '2026-05-03', '2026-05-04', '2026-05-05',
        '2026-05-06', '2026-05-07', '2026-05-08',
        '2026-05-09', '2026-05-10',
    ];

    /* 그룹 생성 시 설정한 시간 (하드코딩) */
    const startTime = 16;   /* 08:00 */
    const endTime = 40;     /* 20:00 */

    /* 하드코딩된 참가자 데이터 (나중에 백엔드로 교체) */
    const participants = [
        { name: '참가자1', selectedCells: { '2026-05-03-16': true, '2026-05-03-17': true } },
        { name: '참가자2', selectedCells: { '2026-05-03-16': true } },
        { name: '참가자3', selectedCells: { '2026-05-04-16': true } },
        { name: '참가자4', selectedCells: {} },
    ];

    /* 칸 클릭시 가능/불가 사람 계산 */
    const handleCellClick = (dateKey, timeIndex) => {
        const cellKey = `${dateKey}-${timeIndex}`;
        /* 이미 열린 팝업 칸을 다시 누르면 닫힘 */
        if (cellPopup && cellPopup.cellKey === cellKey) {
            setCellPopup(null);
            return;
        }
        setCellPopup({ cellKey, dateKey, timeIndex });
    };

    /* 현재 팝업 칸의 가능/불가 사람 목록 계산 */
    const getCellParticipants = (cellKey) => {
        const available = [];
        const unavailable = [];
        participants.forEach(p => {
            if (p.selectedCells[cellKey]) {
                available.push(p.name);
            } else {
                unavailable.push(p.name);
            }
        });
        return { available, unavailable };
    };

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
                onSettingClick={() => {setSettingOpen(true) }}
            />

            {/* 설정 팝업: settingOpen이 true일 때만 표시 */}
            {settingOpen && (
                <div style={{
                    position: 'fixed',  /* 화면 기준으로 위치 고정 */
                    top: '50%',        /* 헤더 바로 아래 */
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 100         /* 다른 요소 위에 표시 */
                }}>
                    <SettingPopup
                        onClose={() => { setSettingOpen(false) }}
                        isOwner={isOwner}
                    />
                </div>
            )}
            
            {/* 캘린더 두 개를 가로로 나열하는 컨테이너 */}
            <div className="calender-container" style={{position: 'relative'}}> {/* ParticipantPopup 위치 기준점 */}

                {/* 왼쪽: 내 일정 캘린더 */}
                <div className="calender-wrapper">

                    {/* 캘린더 상단: 제목 텍스트 + 수정 버튼 */}
                    <div className="calender-header">
                        <span>내 일정</span>
                        {editOpen ? (
                            /* 수정 모드일 때: 초기화 + 완료 버튼 */
                            <div style={{display:'flex', gap:'8px'}}>
                                <button onClick={() => { setTempSelectedCells({}); }}>초기화</button>
                                <button onClick={() => {
                                    setMySelectedCells({...tempSelectedCells});
                                    setEditOpen(false);
                                }}>완료</button>
                            </div>
                        ) : (
                            /* 일반 모드일 때: 수정 버튼 */
                            <button onClick={() => {
                                setTempSelectedCells({...mySelectedCells});
                                setEditOpen(true);
                            }}>수정</button>
                        )}
                    </div>

                    {/* 캘린더 본체: 타임블럭이 들어갈 영역 (나중에 추가) */}
                    <div className="calender-body">
                        <TimeTable
                            dates={dates}
                            startTime={startTime}
                            endTime={endTime}
                            readOnly={!editOpen} /* 보기 전용 */
                            selectedCells={editOpen ? tempSelectedCells : mySelectedCells} /* 저장된 선택 칸 */
                            onSelectedCellsChange={setTempSelectedCells}
                        />
                    </div>
                </div>

                {/* 오른쪽: 전체 캘린더 */}
                <div className="calender-wrapper" style={{ position: 'relative' }}>

                    {/* 캘린더 상단: 제목 텍스트 + 참가자 보기 버튼 */}
                    <div className="calender-header">
                        <span>전체</span>
                        {/* 참가자 보기 버튼: 누르면 참가자 목록 팝업 (기능 나중에 추가) */}
                        <button onClick={() => { setParticipantOpen(true) }}>참가자 보기</button>
                    </div>

                    {/* 캘린더 본체: 타임블럭이 들어갈 영역 (나중에 추가) */}
                    <div className="calender-body">
                        <TimeTable
                            dates={dates}
                            startTime={startTime}
                            endTime={endTime}
                            readOnly={true} /* 보기 전용 */
                            selectedCells={mySelectedCells}
                            onCellClick={handleCellClick}
                        />
                    </div>

                    {/* 칸 클릭 팝업 */}
                    {cellPopup && (() => {
                        const { available, unavailable } = getCellParticipants(cellPopup.cellKey);
                        return (
                            <div style={{
                                position: 'absolute',
                                top: '50px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 100
                            }}>
                                <CellPopup
                                    available={available}
                                    unavailable={unavailable}
                                    onClose={() => { setCellPopup(null); }}
                                />
                            </div>
                        );
                    })()}
                    
                </div>

                {/* participantOpen이 true일 때만 ParticipantPopup 표시 */}
                {participantOpen && (
                    <div style={{
                        position: 'absolute',   /* calender-container 기준으로 위치 고정 */
                        top: '0px',    /* 헤더 파로 아래 */
                        right: '0px',  /* 공유버튼 위치에 맞게 조절 */
                        zIndex: 100     /* 다른 요소 위에 표시 */
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