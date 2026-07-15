import { useLocation, useNavigate } from "react-router-dom";
import "./CreateGroupSuccessPage.css";

function CreateGroupSuccessPage() {
    const navigate = useNavigate();
    // 페이지 이동

    const location = useLocation();
    // 이전 페이지에서 전달한 정보 받기

    const groupName = location.state?.groupName || "새 그룹";
    // 전달받은 그룹 이름이 없으면 새 그룹으로 표시

    const inviteLink = "https://timesync.com/invite/12345";
    // 임시 초대 링크

    const inviteCode = "TIME1234";
    // 임시 초대 코드

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert("복사되었습니다.");
    };
    // 초대 링크 또는 코드를 클립보드에 복사

    const handleConfirm = () => {
        navigate("/groups");
    };
    // 확인 버튼을 누르면 그룹 목록 페이지로 이동

    return (
        <div className="success-page">
            <div className="success-card">
                <div className="success-icon">✓</div>

                <h1>{groupName}</h1>

                <h2>그룹 생성 완료</h2>

                <div className="invite-row">
                    <span>초대 링크</span>

                    <input
                        type="text"
                        value={inviteLink}
                        readOnly
                    />

                    <button onClick={() => handleCopy(inviteLink)}>
                        복사
                    </button>
                </div>

                <div className="invite-row">
                    <span>초대 코드</span>

                    <input
                        type="text"
                        value={inviteCode}
                        readOnly
                    />

                    <button onClick={() => handleCopy(inviteCode)}>
                        복사
                    </button>
                </div>

                <button
                    className="confirm-button"
                    onClick={handleConfirm}
                >
                    확인
                </button>
            </div>
        </div>
    );
}

export default CreateGroupSuccessPage;