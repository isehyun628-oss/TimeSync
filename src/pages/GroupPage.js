import { useState } from "react";
// react의 useState 불러오기

import { useNavigate } from "react-router-dom";
// 라우터 불러오기

import "./GroupPage.css";
// css 불러오기

function GroupPage() {
    const navigate = useNavigate();
    // 페이지 이동

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // 드롭다운 설정

    const [searchText, setSearchText] = useState("");
    // 검색 기능

    const handleCreateGroup = () => {
        navigate("/groups/create");
    };
    // 그룹 생성 페이지로 이동

    const groups = [
        {
            id: 1,
            icon: "🎸",
            name: "기타 스터디",
            members: 4,
            startDate: "26/04/30",
            endDate: "26/05/01",
        },
        {
            id: 2,
            icon: "📘",
            name: "알고리즘 스터디",
            members: 5,
            startDate: "26/05/03",
            endDate: "26/05/10",
        },
    ];
    // 그룹 배열

    const filteredGroups = groups.filter((group) =>
        group.name.includes(searchText)
    );
    // 검색어가 포함된 그룹만 필터링

    return (
        // 그룹 전체 페이지
        <div className="group-page">

            {/* 그룹 헤더 (로고, 이름) */}
            <header className="group-header">
                <div className="profile-area">
                    <div className="profile-image">로고</div>
                    <span className="profile-name">이름</span>
                </div>

                <button className="menu-button">☰</button>
            </header>

            {/* 그룹 목록 메인 영역 */}
            <main className="group-main">
                <div className="group-top-area">
                    <h1>참여 중인 그룹</h1>

                    {/* 그룹 검색창 */}
                    <input
                        className="group-search"
                        type="text"
                        placeholder="검색"
                        value={searchText}
                        onChange={(event) =>
                            setSearchText(event.target.value)
                        }
                    />

                    {/* 그룹 생성 및 참가 영역 */}
                    <div className="group-create-area">
                        <button
                            className="group-create-button"
                            onClick={() =>
                                setIsDropdownOpen(!isDropdownOpen)
                            }
                        >
                            + 그룹 생성/참가
                        </button>

                        {/* 그룹 생성/참가 버튼을 누르면 드롭다운 표시 */}
                        {isDropdownOpen && (
                            <div className="group-dropdown">
                                <button onClick={handleCreateGroup}>
                                    새 그룹 만들기
                                </button>

                                <button>
                                    초대코드로 참가하기
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 참여 중인 그룹 목록 */}
                <section className="group-list">
                    {filteredGroups.length > 0 ? (
                        filteredGroups.map((group) => (
                            <div
                                className="group-card"
                                key={group.id}
                            >
                                <div className="group-icon">
                                    {group.icon}
                                </div>

                                <div className="group-info">
                                    <h2>{group.name}</h2>

                                    <p>
                                        {group.members}명 ·{" "}
                                        {group.startDate} ~{" "}
                                        {group.endDate}
                                    </p>
                                </div>

                                <button className="leave-button">
                                    ↪
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="no-group-message">
                            검색 결과가 없습니다.
                        </p>
                    )}
                </section>
            </main>
        </div>
    );
}

export default GroupPage;