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
        </div>
    );
}

export default CreateGroupPage;