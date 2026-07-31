import { useEffect, useRef, useState } from 'react';
import ProfileMenu from './ProfileMenu';

/* 그룹 목록 페이지 상단의 사용자 정보와 메뉴 */
function GroupProfileHeader(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuAreaRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!menuAreaRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const selectMenu = (callback) => {
        setMenuOpen(false);
        callback();
    };

    return (
        <header className="group-header">
            <div className="profile-area">
                <div className="profile-image">{props.profileImage}</div>
                <span className="profile-name">{props.profileName}</span>
            </div>
            <div className="profile-menu-area" ref={menuAreaRef}>
                <button
                    className="menu-button"
                    aria-label="사용자 메뉴 열기"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ⋮
                </button>

                {menuOpen && (
                    <ProfileMenu
                        onGroups={() => selectMenu(props.onGroups)}
                        onAccountSettings={() =>
                            selectMenu(props.onAccountSettings)
                        }
                        onHelp={() => selectMenu(props.onHelp)}
                    />
                )}
            </div>
        </header>
    );
}

export default GroupProfileHeader;
