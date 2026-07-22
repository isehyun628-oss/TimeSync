/* SharePopup.css 파일을 불러와서 디자인 적용 */
import './SharePopup.css';

/* props를 받는 SharePopup 컴포넌트 */
function SharePopup(props) {
    return (

        /* 팝업 전체 컨테이너 */
        <div className="sharepopup-container">

            {/* 없애기 버튼 */}
            <button className="delete-btn" onClick={props.onClose}>✕</button>

            {/* 초대코드 + 초대링크 컨테이너 */}
            <div>
                
                {/* 초대코드 텍스트 + 복사 버튼 */}
                <div className="invite-row">
                    {/* 초대코드: 나중에 백엔드 데이터로 교체 예정 (현재는 하드코딩) */}
                    <span className="invite-text">초대코드: ABC123</span>
                    {/* 복사 버튼: 누르면 초대코드 복사 (기능 나중에 추가) */}
                    <button className="copy-btn">🖨️</button>
                </div>

                {/* 초대링크 텍스트 + 복사 버튼 */}
                <div className="invite-row">
                    {/* 초대링크: 나중에 백엔드 데이터로 교체 예정 (현재는 하드코딩) */}
                    <span className="invite-text">초대링크: https://timesync.com/invite/abc123</span>
                    {/* 복사 버튼: 누르면 초대코드 복사 (기능 나중에 추가) */}
                    <button className="copy-btn">🖨️</button>
                </div>

            </div>
        </div>
    );
}

/* 이 컴포넌트를 다른 파일에서도 사용할 수 있게 내보내는 코드 */
export default SharePopup;