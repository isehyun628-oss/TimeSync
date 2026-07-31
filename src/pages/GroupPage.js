import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestJoinPopup from '../components/GuestJoinPopup';
import GroupCard from '../components/GroupCard';
import GroupProfileHeader from '../components/GroupProfileHeader';
import GroupToolbar from '../components/GroupToolbar';
import InviteCodePopup from '../components/InviteCodePopup';
import LeaveGroupPopup from '../components/LeaveGroupPopup';
import { inviteGroup } from '../data/mockData';
import './GroupPage.css';

function GroupPage(props) {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [joinStep, setJoinStep] = useState(null);
    const [inviteCode, setInviteCode] = useState('');
    const [leaveGroup, setLeaveGroup] = useState(null);

    const filteredGroups = props.groups.filter((group) =>
        group.name.includes(searchText)
    );

    const closeJoinPopup = () => {
        setJoinStep(null);
        setInviteCode('');
    };

    return (
        <div className="group-page">
            <GroupProfileHeader
                profileImage="로고"
                profileName={props.currentUser.nickname}
                onGroups={() => {}}
                onAccountSettings={() => navigate('/account/settings')}
                onHelp={() => navigate('/help')}
            />

            <main className="group-main">
                <GroupToolbar
                    searchText={searchText}
                    onSearchChange={setSearchText}
                    isDropdownOpen={isDropdownOpen}
                    onToggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
                    onCreateGroup={() => navigate('/groups/create')}
                    onJoinGroup={() => {
                        setIsDropdownOpen(false);
                        setJoinStep('code');
                    }}
                />

                <section className="group-list">
                    {filteredGroups.length > 0 ? (
                        filteredGroups.map((group) => (
                            <GroupCard
                                group={group}
                                key={group.id}
                                onLeave={setLeaveGroup}
                                onOpen={(selectedGroup) =>
                                    navigate('/groups/schedule', {
                                        state: { group: selectedGroup },
                                    })
                                }
                            />
                        ))
                    ) : (
                        <p className="no-group-message">
                            검색 결과가 없습니다.
                        </p>
                    )}
                </section>
            </main>

            {joinStep === 'code' && (
                <InviteCodePopup
                    onClose={closeJoinPopup}
                    onEnter={(code) => {
                        setInviteCode(code);
                        setJoinStep('details');
                    }}
                />
            )}

            {joinStep === 'details' && (
                <GuestJoinPopup
                    inviteCode={inviteCode}
                    group={inviteGroup}
                    initialNickname={props.currentUser.nickname}
                    showLoginGuide={false}
                    onClose={closeJoinPopup}
                    onJoin={() => {
                        props.onJoinGroup(inviteGroup);
                        closeJoinPopup();
                    }}
                />
            )}

            {leaveGroup && (
                <LeaveGroupPopup
                    group={leaveGroup}
                    onCancel={() => setLeaveGroup(null)}
                    onConfirm={() => {
                        props.onLeaveGroup(leaveGroup.id);
                        setLeaveGroup(null);
                    }}
                />
            )}
        </div>
    );
}

export default GroupPage;
