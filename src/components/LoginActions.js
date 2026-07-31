/* 로그인 방법을 선택하는 버튼 묶음 */
function LoginActions(props) {
    return (
        <>
            <button className="google-btn" onClick={props.onGoogleLogin}>
                Google 계정으로 로그인
            </button>
            <button className="guest-btn" onClick={props.onGuestLogin}>
                게스트로 로그인
            </button>
        </>
    );
}

export default LoginActions;
