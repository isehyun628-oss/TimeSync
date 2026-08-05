/* CellPopup.css 파일 불러오기 */
import './CellPopup.css';

function CellPopup(props) {
    return (
        /* 팝업 전체 컨테이너 */
        <div className="cell-popup-container">

            {/* 팝업 상단: 닫기 버튼 */}
            <div className="cell-popup-header">
                <button className="cell-popup-close-btn" onClick={props.onClose}>✕</button>
            </div>

            {/* 가능한 사람 목록 */}
            <div className="cell-popup-section">
                <span className="cell-popup-label">가능</span>
                <div className="cell-popup-names">
                    {/* 가능한 사람이 없으면 '-' 표시 */}
                    {props.available.length > 0
                        ? props.available.map((name, index) => (
                            <span key={index} className="cell-popup-name available">{name}</span>
                        ))
                        : <span className="cell-popup=empty">-</span>
                    }
                </div>
            </div>

            {/* 불가능한 사람 목록 */}
            <div className="cell-popup-section">
                <span className="cell-popup-label">불가</span>
                <div className="cell-popup-names">
                    {/* 불가능한 사람이 없으면 '-' 표시 */}
                    {props.unavailable.length > 0
                        ? props.unavailable.map((name, index) => (
                            <span key={index} className="cell-popup-name unavailable">{name}</span>
                        ))
                        : <span className="cell-popup-empty">-</span>
                    }
                </div>
            </div>

        </div>
    );
}

/* 이 컴포넌트를 다른 파일에서도 사용할 수 있게 내보내는 코드 */
export default CellPopup;