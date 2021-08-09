import "./App.css";
import { MainView } from "./pages/MainView";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainView />
      </Provider>
    </div>
  );
}

export default App;
