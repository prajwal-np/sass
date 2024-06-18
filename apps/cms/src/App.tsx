import { Provider } from "react-redux";
import "./App.css";
import Router from "./router";
import { store } from "./redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  );
}

export default App;
