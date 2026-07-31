import { useState } from 'react';
import GuestParticipantList from './GuestParticipantList';
import './GuestJoinPopup.css';

/* 게스트가 그룹 정보를 확인하고 참여 정보를 입력하는 두 번째 팝업 */
function GuestJoinPopup(props) {
    const { group } = props;
    const [nickname, setNickname] = useState(props.initialNickname || '');
    const [password, setPassword] = useState('');
    const [participantOpen, setParticipantOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleJoin = () => {
        if (!nickname.trim()) {
            setErrorMessage('닉네임을 입력해주세요.');
            return;
        }

        props.onJoin({
            inviteCode: props.inviteCode,
            groupId: group.id,
            nickname: nickname.trim(),
            password,
        });
    };

    return (
        <div className="guest-popup-backdrop" role="presentation">
            <div
                className="guest-popup guest-detail-popup"
                role="dialog"
                aria-modal="true"
                aria-labelledby="guest-group-title"
            >
                <button
                    className="guest-popup-close"
                    onClick={props.onClose}
                    aria-label="그룹 참여 팝업 닫기"
                >
                    ✕
                </button>

                <div className="guest-group-title" id="guest-group-title">
                    <span className="guest-group-icon">{group.icon}</span>
                    <strong>{group.name}</strong>
                </div>

                <div className="guest-group-meta">
                    <span>생성: {group.ownerNickname}</span>
                    <div className="guest-participant-area">
                        <button
                            className="guest-participant-button"
                            onClick={() => setParticipantOpen(!participantOpen)}
                        >
                            참가자 {group.participants.length}명
                        </button>

                        {participantOpen && (
                            <div className="guest-participant-popup">
                                <GuestParticipantList
                                    participants={group.participants}
                                    onClose={() => setParticipantOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="guest-popup-field">
                    <label htmlFor="guestNickname">닉네임</label>
                    <input
                        id="guestNickname"
                        className="guest-popup-input"
                        type="text"
                        value={nickname}
                        onChange={(event) => {
                            setNickname(event.target.value);
                            setErrorMessage('');
                        }}
                        placeholder="닉네임을 입력해주세요"
                        autoFocus
                    />
                </div>

                <div className="guest-popup-field">
                    <label htmlFor="guestPassword">비밀번호</label>
                    <input
                        id="guestPassword"
                        className="guest-popup-input"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="선택사항"
                    />
                </div>

                {errorMessage && (
                    <p className="guest-popup-error">{errorMessage}</p>
                )}

                {props.showLoginGuide !== false && (
                    <div className="guest-login-guide">
                        <span>이미 계정이 있으신가요?</span>
                        <button onClick={props.onLogin}>로그인하기</button>
                    </div>
                )}

                <button className="guest-popup-primary" onClick={handleJoin}>
                    참여
                </button>
            </div>
        </div>
    );
}

export default GuestJoinPopup;
