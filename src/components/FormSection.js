/* 그룹 생성 폼의 공통 입력 영역 */
function FormSection(props) {
    return (
        <div className="form-section">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    );
}

export default FormSection;
