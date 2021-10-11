import "./App.css";
import { MainView } from "./pages/MainView";
import { Footer } from "./components/Footer/Footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="page-container">
            <div className="content-wrap">
              <MainView />
            </div>
          </div>
        </PersistGate>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;
