import RootNavigation from "./src/routes/RootNavigation"
import { Provider } from "react-redux"
import  store  from "./src/store/store"
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <Provider store = {store}>
        <RootNavigation/>
      </Provider>
      <Toast/>
    </>
  )
}

export default App