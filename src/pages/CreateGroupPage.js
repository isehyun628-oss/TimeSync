import { useNavigate } from "react-router-dom";
import "./CreateGroupPage.css";

function CreateGroupPage() {
  const navigate = useNavigate();
  // 페이지 이동

  return (
    <div className="create-group-page">
      <button
        className="create-group-back-button"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <h1>새 그룹 만들기</h1>
      <p>그룹 정보를 설정해주세요.</p>
    </div>
  );
}

export default CreateGroupPage;