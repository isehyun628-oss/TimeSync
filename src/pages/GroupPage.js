import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupCard from '../components/GroupCard';
import GroupProfileHeader from '../components/GroupProfileHeader';
import GroupToolbar from '../components/GroupToolbar';
import './GroupPage.css';

const groups = [
    {
        id: 1,
        icon: '📝',
        name: '기획 스터디',
        members: 4,
        startDate: '26/04/30',
        endDate: '26/05/01',
    },
    {
        id: 2,
        icon: '📖',
        name: '알고리즘 스터디',
        members: 5,
        startDate: '26/05/03',
        endDate: '26/05/10',
    },
];

function GroupPage() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const filteredGroups = groups.filter((group) =>
        group.name.includes(searchText)
    );

    return (
        <div className="group-page">
            <GroupProfileHeader profileImage="로고" profileName="이름" />

            <main className="group-main">
                <GroupToolbar
                    searchText={searchText}
                    onSearchChange={setSearchText}
                    isDropdownOpen={isDropdownOpen}
                    onToggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
                    onCreateGroup={() => navigate('/groups/create')}
                />

                <section className="group-list">
                    {filteredGroups.length > 0 ? (
                        filteredGroups.map((group) => (
                            <GroupCard group={group} key={group.id} />
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
