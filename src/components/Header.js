/* Header.css 파일을 불러와서 디자인 적용 */
import './Header.css';

/* props를 받는 Header 컴포넌트 */
function Header(props) {
    return (

        /* 헤더 전체 컨테이너 */
        <div className="header-container">

            {/* 왼쪽 묶음: 뒤로가기 버튼 + 아이콘 + 그룹명/날짜 + 공유 버튼 */}
            <div className="header-left">

                {/* 뒤로가기 버튼: 이전 페이지로 이동 (기능 나중에 추가) */}
                <button className="header-btn">〈</button>

                {/* 그룹 아이콘: 부모에서 받은 이모지 표시 */}
                <span>{props.icon}</span>

                {/* 그룹명과 날짜를 세로로 묶는 컨테이너 */}
                <div>
                    {/* 그룹명 텍스트 */}
                    <div className="header-group-name">{props.groupName}</div>
                    
                    {/* 날짜와 공유 버튼을 가로로 묶는 컨테이너 */}
                    <div className="header-date-row">
                        {/* 날짜/시간 텍스트 */}
                        <span className="header-date">{props.date}</span>
                        {/* 공유 버튼: 누르면 초대링크/초대코드 팝업 표시 (기능 나중에 추가) */}
                        <button className="header-btn">🔗</button>
                    </div>
                </div>
            </div>

            {/* 오른쪽 설정 버튼 */}
            <div>
                {/* 설정 버튼: 누르면 설정 팝업 표시 (기능 나중에 추가) */}
                <button className="header-btn">설정</button>
            </div>

        </div>
    );
}

/* 이 컴포넌트를 다른 파일에서도 사용할 수 있게 내보내는 코드 */
export default Header;
