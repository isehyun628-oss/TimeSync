import './ProfileMenu.css';

/* 점 3개 버튼에서 열리는 사용자 메뉴 */
function ProfileMenu(props) {
    return (
        <div className="profile-menu" role="menu">
            <button
                className="profile-menu-item is-active"
                role="menuitem"
                onClick={props.onGroups}
            >
                참여 중인 그룹
            </button>
            <button
                className="profile-menu-item"
                role="menuitem"
                onClick={props.onAccountSettings}
            >
                계정 설정
            </button>
            <button
                className="profile-menu-item"
                role="menuitem"
                onClick={props.onHelp}
            >
                도움말
            </button>
        </div>
    );
}

export default ProfileMenu;
