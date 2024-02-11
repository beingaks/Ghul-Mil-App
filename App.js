import RootNavigation from "./src/routes/RootNavigation"
import { Provider } from "react-redux"
import  store  from "./src/store/store"

const App = () => {
  return (
    <Provider store = {store}>
      <RootNavigation/>
    </Provider>
  )
}

export default App