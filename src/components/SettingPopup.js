/* SettingPopup.css 파일을 불러와서 디자인 적용 */
import './SettingPopup.css';

/* props를 받는 SettingPopup 컴포넌트 */
function SettingPopup(props) {

    // 로그인 상태 표시 (나중에 연동)
    // isLoggedIn이 true면 계정 표시, false면 로그인 버튼 표시
    // 나중에 실제 로그인 상태로 교체 예정 (현재는 하드코딩)
    const isLoggedIn = false;

    return (

        /* 팝업 전체 컨테이너 */
        <div className="setting-popup-container">

            {/* 팝업 상단: 닫기 버튼 */}
            <div className="setting-popup-header">
                <button className="setting-close-btn" onClick={props.onClose}>✕</button>
            </div>

            {/* props.isOwner가 true면 생성자 버전, false면 사용자 버전 표시 */}
            {props.isOwner ? (

                /* 생성자 버전 */
                <div className="setting-popup-body">

                    {/* 닉네임 입력 */}
                    <div className="setting-row">
                        <span className="setting-label">닉네임</span>
                        <input className="setting-input" type="text" placeholder="닉네임 입력" />
                    </div>

                    {/* 그룹명 수정 */}
                    <div className="setting-row">
                        <span className="setting-label">날짜</span>
                        <input className="setting-input" type="text" placeholder="날짜 수정" />
                    </div>

                    {/* 시간 수정 */}
                    <div className="setting-row">
                        <span className="setting-label">시간</span>
                        <input className="setting-input" type="text" placeholder="시간 수정" />
                    </div>

                    {/* 하단 버튼들 */}
                    <div className="setting-popup-footer">
                        {/* 그룹 삭제하기 버튼 (기능 나중에 추가) */}
                        <button className="setting-delete-btn">그룹 삭제하기</button>
                        {/* 완료 버튼 (기능 나중에 추가) */}
                        <button className="setting-confirm-btn">완료</button>
                    </div>
                
                </div>

            ) : (

                /* 사용자 버전 */
                <div className="setting-popup-body">

                    {/* 로그인 상태 표시 (나중에 데이터 연동) */}
                    <div className="setting-login-status">
                        {isLoggedIn ? (
                            <span>OOO님의 계정</span>
                        ) : (
                            <button className="setting-login-btn">로그인하기</button>
                        )}
                    </div>

                    {/* 닉네임 입력 */}
                    <div className="setting-row">
                        <span className="setting-label">닉네임</span>
                        <input className="setting-input" type="text" placeholder="닉네임 입력" />
                    </div>

                    {/* 하단 버튼들 */}
                    <div className="setting-popup-footer">
                        {/* 그룹 나가기 버튼 (기능 나중에 추가) */}
                        <button className="setting-leave-btn">그룹 나가기</button>
                        {/* 완료 버튼 (기능 나중에 추가) */}
                        <button className="setting-confirm-btn">완료</button>
                    </div>
                </div>

            )}

        </div>
    );
}

/* 이 컴포넌트를 다른 파일에서도 사용할 수 있게 내보내는 코드 */
export default SettingPopup;