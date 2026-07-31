import { useState } from 'react';
import './GuestJoinPopup.css';

/* 게스트가 초대 코드를 입력하는 첫 번째 팝업 */
function InviteCodePopup(props) {
    const [inviteCode, setInviteCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEnter = () => {
        if (!inviteCode.trim()) {
            setErrorMessage('초대 코드를 입력해주세요.');
            return;
        }

        props.onEnter(inviteCode.trim());
    };

    return (
        <div className="guest-popup-backdrop" role="presentation">
            <div
                className="guest-popup guest-code-popup"
                role="dialog"
                aria-modal="true"
                aria-labelledby="invite-code-title"
            >
                <button
                    className="guest-popup-close"
                    onClick={props.onClose}
                    aria-label="초대 코드 팝업 닫기"
                >
                    ✕
                </button>

                <h2 id="invite-code-title">코드 입력</h2>

                <input
                    className="guest-popup-input"
                    type="text"
                    value={inviteCode}
                    onChange={(event) => {
                        setInviteCode(event.target.value);
                        setErrorMessage('');
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') handleEnter();
                    }}
                    placeholder="초대 코드를 입력해주세요"
                    autoFocus
                />

                {errorMessage && (
                    <p className="guest-popup-error">{errorMessage}</p>
                )}

                <button className="guest-popup-primary" onClick={handleEnter}>
                    입장
                </button>
            </div>
        </div>
    );
}

export default InviteCodePopup;
