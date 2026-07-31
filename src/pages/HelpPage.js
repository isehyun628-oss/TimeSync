import { useNavigate } from 'react-router-dom';
import './PlaceholderPage.css';

function HelpPage() {
    const navigate = useNavigate();

    return (
        <main className="placeholder-page">
            <section className="placeholder-card">
                <span className="placeholder-icon">ℹ️</span>
                <h1>도움말</h1>
                <p>도움말 내용은 추후 추가될 예정입니다.</p>
                <button onClick={() => navigate(-1)}>이전 화면으로 돌아가기</button>
            </section>
        </main>
    );
}

export default HelpPage;
