import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateGroupPage.css";

function CreateGroupPage() {
    const navigate = useNavigate();
    // 페이지 이동

    const [groupName, setGroupName] = useState("");
    // 그룹 이름 저장

    const [startTime, setStartTime] = useState("");
    // 시작 시간 저장

    const [endTime, setEndTime] = useState("");
    // 종료 시간 저장

    const [nickname, setNickname] = useState("");
    // 생성자 닉네임 저장

    const handleCreate = () => {
        // 입력하지 않은 항목이 있는지 확인
        if (!groupName || !startTime || !endTime || !nickname) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        // 종료 시간이 시작 시간보다 빠른지 확인
        if (startTime >= endTime) {
            alert("종료 시간은 시작 시간보다 늦어야 합니다.");
            return;
        }

        const groupData = {
            groupName: groupName,
            startTime: startTime,
            endTime: endTime,
            nickname: nickname,
        };
        // 입력한 그룹 정보를 하나의 객체로 정리

        console.log("생성할 그룹 정보:", groupData);
        // 개발자 도구 콘솔에서 입력값 확인

        alert("그룹이 생성되었습니다.");

        navigate("/");
        // 그룹 목록 페이지로 이동
    };

    return (
        <div className="create-group-page">
            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ←
            </button>

            <h1>새 그룹 만들기</h1>

            <div className="form-section">
                <label htmlFor="groupName">그룹 이름</label>

                <input
                    id="groupName"
                    type="text"
                    placeholder="그룹 이름을 입력해주세요"
                    value={groupName}
                    onChange={(event) =>
                        setGroupName(event.target.value)
                    }
                />
            </div>

            <div className="form-section">
                <label>날짜 선택</label>

                <div className="calendar-placeholder">
                    달력 기능은 추후 추가
                </div>
            </div>

            <div className="form-section">
                <label>시간 선택</label>

                <div className="time-input-area">
                    <div>
                        <span>시작 시간</span>

                        <input
                            type="time"
                            value={startTime}
                            onChange={(event) =>
                                setStartTime(event.target.value)
                            }
                        />
                    </div>

                    <div>
                        <span>종료 시간</span>

                        <input
                            type="time"
                            value={endTime}
                            onChange={(event) =>
                                setEndTime(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <label htmlFor="nickname">생성자 닉네임</label>

                <input
                    id="nickname"
                    type="text"
                    placeholder="닉네임을 입력해주세요"
                    value={nickname}
                    onChange={(event) =>
                        setNickname(event.target.value)
                    }
                />
            </div>

            <button
                className="create-button"
                onClick={handleCreate}
            >
                생성하기
            </button>
        </div>
    );
}

export default CreateGroupPage;