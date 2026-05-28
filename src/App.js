import Header from './components/Header';

function App() {
  return (
    <div>
      <Header
        icon="🎯"
        groupName="테스트 그룹"
        date="2026.05.28 ~ 2026.06.04"
      />
      <div style={{display:'flex'}}>
        <div style={{border:'1px solid black', width:'50%'}}>왼쪽 캘린더</div>
        <div style={{border:'1px solid black', width:'50%'}}>오른쪽 캘린더</div>
      </div>
    </div>
  );
}

export default App;
