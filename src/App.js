import "./App.css";
import { MainView } from "./pages/MainView";
import { Footer } from "./components/Footer/Footer";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div className="page-container">
          <div className="content-wrap">
            <MainView />
          </div>
        </div>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;
