import { useNavigate } from 'react-router-dom';
import './PlaceholderPage.css';

function AccountSettingsPage() {
    const navigate = useNavigate();

    return (
        <main className="placeholder-page">
            <section className="placeholder-card">
                <span className="placeholder-icon">⚙️</span>
                <h1>계정 설정</h1>
                <p>계정 설정 화면은 추후 구현될 예정입니다.</p>
                <button onClick={() => navigate('/groups')}>
                    참여 중인 그룹으로 돌아가기
                </button>
            </section>
        </main>
    );
}

export default AccountSettingsPage;
