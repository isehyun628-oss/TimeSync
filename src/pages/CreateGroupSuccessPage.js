import { useLocation, useNavigate } from 'react-router-dom';
import SharePopup from '../components/SharePopup';
import './CreateGroupSuccessPage.css';

function CreateGroupSuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const groupName = location.state?.groupName || '새 그룹';
    const inviteLink = 'https://timesync.com/invite/12345';
    const inviteCode = 'TIME1234';

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert('복사되었습니다.');
    };

    return (
        <div className="success-page">
            <div className="success-card">
                <div className="success-icon">✓</div>
                <h1>{groupName}</h1>
                <h2>그룹 생성 완료</h2>
                <SharePopup
                    variant="inline"
                    inviteLink={inviteLink}
                    inviteCode={inviteCode}
                    onCopy={handleCopy}
                />
                <button
                    className="confirm-button"
                    onClick={() => navigate('/groups')}
                >
                    확인
                </button>
            </div>
        </div>
    );
}

export default CreateGroupSuccessPage;
