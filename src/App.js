import { Provider } from 'react-redux'
import './App.css'
import MainPage from './components/MainPage/MainPage'
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainPage />
      </div>
    </Provider>
  )
}

export default App
