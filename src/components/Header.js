function Header(props) {
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center'}}>
                <button>〈</button>
                <span>{props.icon}</span>
                <div>
                    <div>{props.groupName}</div>
                    <div>
                        {props.date}
                        <button>🔗</button>
                    </div>
                </div>
            </div>
            <div>
                <button>설정</button>
            </div>
        </div>
    );
}

export default Header;
