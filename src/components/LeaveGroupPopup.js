import './LeaveGroupPopup.css';

/* 참여 중인 그룹에서 나가기 전 확인하는 팝업 */
function LeaveGroupPopup(props) {
    return (
        <div className="leave-popup-backdrop" role="presentation">
            <div
                className="leave-popup"
                role="dialog"
                aria-modal="true"
                aria-labelledby="leave-popup-title"
            >
                <button
                    className="leave-popup-close"
                    onClick={props.onCancel}
                    aria-label="나가기 팝업 닫기"
                >
                    ✕
                </button>

                <div className="leave-popup-group">
                    <span>{props.group.icon}</span>
                    <strong>{props.group.name}</strong>
                </div>

                <h2 id="leave-popup-title">그룹을 나가시겠습니까?</h2>

                <button className="leave-popup-confirm" onClick={props.onConfirm}>
                    나가기
                </button>
                <button className="leave-popup-cancel" onClick={props.onCancel}>
                    취소
                </button>
            </div>
        </div>
    );
}

export default LeaveGroupPopup;
