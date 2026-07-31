import './SharePopup.css';

/* 초대코드와 초대링크를 보여주는 공통 컴포넌트 */
function SharePopup(props) {
    const inviteCode = props.inviteCode || 'ABC123';
    const inviteLink = props.inviteLink || 'https://timesync.com/invite/abc123';
    const isInline = props.variant === 'inline';

    const handleCopy = (value) => {
        if (props.onCopy) {
            props.onCopy(value);
            return;
        }
        navigator.clipboard.writeText(value);
    };

    return (
        <div className={`sharepopup-container${isInline ? ' sharepopup-inline' : ''}`}>
            {!isInline && (
                <button className="delete-btn" onClick={props.onClose}>✕</button>
            )}
            <div className="sharepopup-content">
                <div className="sharepopup-invite-row">
                    <span className="invite-text">
                        {isInline ? '초대 코드' : '초대코드:'} {inviteCode}
                    </span>
                    <button className="copy-btn" onClick={() => handleCopy(inviteCode)}>
                        {isInline ? '복사' : '🖨️'}
                    </button>
                </div>
                <div className="sharepopup-invite-row">
                    <span className="invite-text">
                        {isInline ? '초대 링크' : '초대링크:'} {inviteLink}
                    </span>
                    <button className="copy-btn" onClick={() => handleCopy(inviteLink)}>
                        {isInline ? '복사' : '🖨️'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SharePopup;
