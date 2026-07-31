import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSection from '../components/FormSection';
import TimeRangeInputs from '../components/TimeRangeInputs';
import './CreateGroupPage.css';

function CreateGroupPage(props) {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [nickname, setNickname] = useState('');

    const handleCreate = () => {
        if (!groupName || !startTime || !endTime || !nickname) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (startTime >= endTime) {
            alert('종료 시간은 시작 시간보다 늦어야 합니다.');
            return;
        }

        console.log('생성할 그룹 정보:', {
            groupName,
            startTime,
            endTime,
            nickname,
        });

        props.onCreateGroup({
            name: groupName,
            ownerNickname: nickname,
            startTime,
            endTime,
        });

        alert('그룹이 생성되었습니다.');
        navigate('/groups/create/success', { state: { groupName } });
    };

    return (
        <div className="create-group-page">
            <button className="back-button" onClick={() => navigate(-1)}>
                ←
            </button>

            <h1>새 그룹 만들기</h1>

            <FormSection label="그룹 이름" htmlFor="groupName">
                <input
                    id="groupName"
                    type="text"
                    placeholder="그룹 이름을 입력해주세요"
                    value={groupName}
                    onChange={(event) => setGroupName(event.target.value)}
                />
            </FormSection>

            <FormSection label="날짜 선택">
                <div className="calendar-placeholder">
                    달력 기능은 추후 추가
                </div>
            </FormSection>

            <FormSection label="시간 선택">
                <TimeRangeInputs
                    startTime={startTime}
                    endTime={endTime}
                    onStartTimeChange={setStartTime}
                    onEndTimeChange={setEndTime}
                />
            </FormSection>

            <FormSection label="생성자 닉네임" htmlFor="nickname">
                <input
                    id="nickname"
                    type="text"
                    placeholder="닉네임을 입력해주세요"
                    value={nickname}
                    onChange={(event) => setNickname(event.target.value)}
                />
            </FormSection>

            <button className="create-button" onClick={handleCreate}>
                생성하기
            </button>
        </div>
    );
}

export default CreateGroupPage;
