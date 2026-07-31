import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 페이지 이동에 필요한 기능

import LoginPage from "./pages/LoginPage";
import GroupPage from "./pages/GroupPage";
import CreateGroupPage from "./pages/CreateGroupPage";
import CreateGroupSuccessPage from "./pages/CreateGroupSuccessPage";
import GroupSchedulePage from "./pages/GroupSchedulePage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import HelpPage from "./pages/HelpPage";
import "./components/ComponentTheme.css";
import { currentUser, initialGroups } from "./data/mockData";
// 페이지 불러오기

function App() {
  const [groups, setGroups] = useState(initialGroups);

  const handleJoinGroup = (group) => {
    setGroups((currentGroups) => {
      if (currentGroups.some((currentGroup) => currentGroup.id === group.id)) {
        return currentGroups;
      }

      return [
        ...currentGroups,
        {
          id: group.id,
          icon: group.icon,
          name: group.name,
          members: group.participants.length + 1,
          startDate: group.startDate,
          endDate: group.endDate,
          isOwner: false,
        },
      ];
    });
  };

  const handleCreateGroup = (group) => {
    setGroups((currentGroups) => [
      ...currentGroups,
      {
        ...group,
        id: Date.now(),
        icon: "⭐",
        members: 1,
        startDate: "미정",
        endDate: "미정",
        isOwner: true,
      },
    ]);
  };

  const handleLeaveGroup = (groupId) => {
    setGroups((currentGroups) =>
      currentGroups.filter((group) => group.id !== groupId)
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/account/settings" element={<AccountSettingsPage />} />

        <Route path="/help" element={<HelpPage />} />

        <Route
          path="/groups"
          element={
            <GroupPage
              groups={groups}
              currentUser={currentUser}
              onJoinGroup={handleJoinGroup}
              onLeaveGroup={handleLeaveGroup}
            />
          }
        />

        <Route
          path="/groups/create"
          element={<CreateGroupPage onCreateGroup={handleCreateGroup} />}
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
