/* 그룹 검색과 생성/참가 메뉴 */
function GroupToolbar(props) {
    return (
        <div className="group-top-area">
            <h1>참여 중인 그룹</h1>
            <input
                className="group-search"
                type="text"
                placeholder="검색"
                value={props.searchText}
                onChange={(event) => props.onSearchChange(event.target.value)}
            />
            <div className="group-create-area">
                <button className="group-create-button" onClick={props.onToggleDropdown}>
                    + 그룹 생성/참가
                </button>
                {props.isDropdownOpen && (
                    <div className="group-dropdown">
                        <button onClick={props.onCreateGroup}>새 그룹 만들기</button>
                        <button onClick={props.onJoinGroup}>초대코드로 참가하기</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GroupToolbar;
