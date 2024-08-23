import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateLayout from "./view/private";
import DeviceCode from "./view/DeviceCode";
import usePusher from "./hooks/usePusher";
const queryClient = new QueryClient();
function App() {
  const { isPaired } = usePusher();

  return (
    <QueryClientProvider client={queryClient}>
      {isPaired ? <DeviceCode /> : <PrivateLayout />}
    </QueryClientProvider>
  );
}

export default App;
