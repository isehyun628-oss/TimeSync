import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestJoinPopup from '../components/GuestJoinPopup';
import InviteCodePopup from '../components/InviteCodePopup';
import LoginActions from '../components/LoginActions';
import './LoginPage.css';

/* 백엔드 연결 전 사용하는 임시 그룹 데이터 */
const mockGroup = {
    id: 1,
    name: '테스트 그룹',
    icon: '⭐',
    ownerNickname: '생성자 닉네임',
    participants: [
        { id: 1, name: '참가자1' },
        { id: 2, name: '참가자2' },
        { id: 3, name: '참가자3' },
    ],
};

function LoginPage() {
    const navigate = useNavigate();
    const [guestStep, setGuestStep] = useState(null);
    const [inviteCode, setInviteCode] = useState('');
    const moveToGroups = () => navigate('/groups');
    const closeGuestPopup = () => {
        setGuestStep(null);
        setInviteCode('');
    };

    return (
        <div className="login-container">
            <div className="logo">⏰</div>
            <h1 className="title">TimeSync</h1>

            <LoginActions
                onGoogleLogin={moveToGroups}
                onGuestLogin={() => setGuestStep('code')}
            />

            <button className="help-btn">i</button>

            {guestStep === 'code' && (
                <InviteCodePopup
                    onClose={closeGuestPopup}
                    onEnter={(code) => {
                        setInviteCode(code);
                        setGuestStep('details');
                    }}
                />
            )}

            {guestStep === 'details' && (
                <GuestJoinPopup
                    inviteCode={inviteCode}
                    group={mockGroup}
                    onClose={closeGuestPopup}
                    onLogin={moveToGroups}
                    onJoin={() => navigate('/groups/schedule')}
                />
            )}
        </div>
    );
}

export default LoginPage;
