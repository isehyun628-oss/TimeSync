import "./LoginPage.css";
// css 불러오는 코드, css에서 작성한 디자인 적용

function LoginPage() {
    return ( // 화면에 보여줄 내용을 적는 곳
        <div className="login-container">
            <div className="logo">
                🗓️
            </div>

            <h1 className="title">
                TimeSync
            </h1>

            <button className="google-btn">
                Google 계정으로 로그인
            </button>

            <button className="help-btn">
                도움말
            </button>

        </div>
    );
}

export default LoginPage;
// 이 컴포넌트를 다일 파일에서도 사용할 수 있게 내보내는 코드
