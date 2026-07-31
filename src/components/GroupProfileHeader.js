/* 그룹 목록 페이지 상단의 사용자 정보와 메뉴 */
function GroupProfileHeader(props) {
    return (
        <header className="group-header">
            <div className="profile-area">
                <div className="profile-image">{props.profileImage}</div>
                <span className="profile-name">{props.profileName}</span>
            </div>
            <button className="menu-button" aria-label="메뉴 열기">⋮</button>
        </header>
    );
}

export default GroupProfileHeader;
