import { BrowserRouter, Routes, Route } from "react-router-dom";
// 페이지 이동에 필요한 기능
import GroupPage from "./pages/GroupPage";
import CreateGroupPage from "./pages/CreateGroupPage";
// 페이지 불러오기

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GroupPage />} />

        <Route
          path="/groups/create"
          element={<CreateGroupPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;