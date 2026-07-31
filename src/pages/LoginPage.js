import { useNavigate } from 'react-router-dom';
import LoginActions from '../components/LoginActions';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const moveToGroups = () => navigate('/groups');

    return (
        <div className="login-container">
            <div className="logo">⏰</div>
            <h1 className="title">TimeSync</h1>

            <LoginActions
                onGoogleLogin={moveToGroups}
                onGuestLogin={moveToGroups}
            />

            <button className="help-btn">i</button>
        </div>
    );
}

export default LoginPage;
