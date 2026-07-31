import { BrowserRouter, Routes, Route } from "react-router-dom";
// 페이지 이동에 필요한 기능

import LoginPage from "./pages/LoginPage";
import GroupPage from "./pages/GroupPage";
import CreateGroupPage from "./pages/CreateGroupPage";
import CreateGroupSuccessPage from "./pages/CreateGroupSuccessPage";
import GroupSchedulePage from "./pages/GroupSchedulePage";
import "./components/ComponentTheme.css";
// 페이지 불러오기

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/groups" element={<GroupPage />} />

        <Route
          path="/groups/create"
          element={<CreateGroupPage />}
        />

        <Route
          path="/groups/create/success"
          element={<CreateGroupSuccessPage />}
        />

        <Route
          path="/groups/schedule"
          element={<GroupSchedulePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
