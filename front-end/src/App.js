import './App.css';
import Login from './components/Login';
import Nav from './components/Nav';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const isLoggedIn = true;

  return (
    <div className="App">
      {isLoggedIn ?
        <>
          <Nav></Nav>
          <div className="jumbotron text-left">
            <h1 className="display-4">Streaming Service for Hafamily</h1>
            <p className="lead">반갑습니다. 이곳은 하페밀리들을 위한 스트리밍 서버입니다.</p>
            <hr className="my-4"/>
            <p>
              상단에 있는 메뉴에서 원하는 항목을 시청하고, 없는 경우 하단의 버튼을 클릭하여 영상을 신청해주세요
            </p>
            <button className="btn btn-primary btn-lg disabled" href="#" role="button">
              신청하기
            </button>
          </div>
        </>
        :
        <Login/>
      }
    </div>
  );
}

export default App;
