import { useNavigate } from "react-router-dom";
// 페이지 이동 기능 불러오기

import "./LoginPage.css";
// css 불러오는 코드, css에서 작성한 디자인 적용

function LoginPage() {
    const navigate = useNavigate();
    // 다른 페이지로 이동하기 위한 기능

    const handleGoogleLogin = () => {
        navigate("/groups");
    };
    // 구글 로그인 API 연결 전에는 바로 그룹 목록 페이지로 이동

    const handleGuestLogin = () => {
        navigate("/groups");
    };
    // 게스트 로그인 버튼을 누르면 그룹 목록 페이지로 이동

    return (
        // 화면에 보여줄 내용을 적는 곳
        <div className="login-container">
            <div className="logo">
                🗓️
            </div>

            <h1 className="title">
                TimeSync
            </h1>

            <button
                className="google-btn"
                onClick={handleGoogleLogin}
            >
                Google 계정으로 로그인
            </button>

            <button
                className="guest-btn"
                onClick={handleGuestLogin}
            >
                게스트로 로그인
            </button>

            <button className="help-btn">
                i
            </button>
        </div>
    );
}

export default LoginPage;
// 이 컴포넌트를 다른 파일에서도 사용할 수 있게 내보내는 코드