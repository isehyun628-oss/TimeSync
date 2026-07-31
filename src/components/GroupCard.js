/* 그룹 목록에 표시되는 한 개의 그룹 카드 */
function GroupCard(props) {
    const { group } = props;

    return (
        <div className="group-card">
            <div className="group-icon">{group.icon}</div>
            <div className="group-info">
                <h2>{group.name}</h2>
                <p>{group.members}명 · {group.startDate} ~ {group.endDate}</p>
            </div>
            {group.isOwner ? (
                <span className="owner-badge">
                    만든
                    <br />
                    그룹
                </span>
            ) : (
                <button
                    className="leave-button"
                    aria-label={`${group.name} 나가기`}
                    onClick={() => props.onLeave(group)}
                >
                    ↪
                </button>
            )}
        </div>
    );
}

export default GroupCard;
