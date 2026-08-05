import './DeleteGroupPopup.css';

function DeleteGroupPopup(props) {
    return (
        <div className="delete-popup-backdrop">
            <div className="delete-popup">
                <button className="delete-popup-close" onClick={props.onCancel}>✕</button>

                <div className="delete-popup-group">
                    <span>{props.group.icon}</span>
                    <strong>{props.group.name}</strong>
                </div>

                <h2>그룹을 삭제하시겠습니까?</h2>

                {/* 주의 문구 */}
                <p className="delete-popup-warning">
                    ⚠️ 그룹을 삭제하면 모든 참가자가 자동으로 퇴장되며, 모든 일정 데이터가 삭제됩니다.
                </p>

                <button className="delete-popup-confirm" onClick={props.onConfirm}>삭제하기</button>
                <button className="delete-popup-cancel" onClick={props.onCancel}>취소</button>
            </div>
        </div>
    );
}

export default DeleteGroupPopup;