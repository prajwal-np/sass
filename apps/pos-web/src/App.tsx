import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import DeviceCode from "./view/DeviceCode";
import Home from "./view/home";
import PrivateLayout from "./view/private";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <DeviceCode /> */}
      <PrivateLayout />
    </QueryClientProvider>
  );
}

export default App;
