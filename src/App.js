import Header from "./components/Header"
import './App.scss';
import logo from "./assets/hepsiburada-logo.png"

const App = () => {
  return (
    <div className="App">
      <Header logo={logo} />
        <div className="content-container">
            <div className="content-header-row">
                <div className="content-header-title">
                    <h1>TİTLE</h1>
                    <h2>Aranan Kelime: <span>ihopne 11</span></h2>
                </div>
                <div className="content-header-order">ORDER</div>
            </div>
        </div>
    </div>
  );
}

export default App;
