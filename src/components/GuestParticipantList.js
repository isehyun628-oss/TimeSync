/* 게스트 참여 전 그룹 참가자 이름만 보여주는 목록 */
function GuestParticipantList(props) {
    return (
        <div className="guest-participant-list" role="dialog" aria-label="참가자 목록">
            <div className="guest-participant-list-header">
                <strong>참가자</strong>
                <button onClick={props.onClose} aria-label="참가자 목록 닫기">
                    ✕
                </button>
            </div>

            <ul>
                {props.participants.map((participant) => (
                    <li key={participant.id}>{participant.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default GuestParticipantList;
