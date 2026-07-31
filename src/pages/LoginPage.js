import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestJoinPopup from '../components/GuestJoinPopup';
import InviteCodePopup from '../components/InviteCodePopup';
import LoginActions from '../components/LoginActions';
import { inviteGroup } from '../data/mockData';
import './LoginPage.css';

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
                    group={inviteGroup}
                    onClose={closeGuestPopup}
                    onLogin={moveToGroups}
                    onJoin={() => navigate('/groups/schedule')}
                />
            )}
        </div>
    );
}

export default LoginPage;
