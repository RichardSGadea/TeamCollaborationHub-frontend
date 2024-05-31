
import { useSelector } from 'react-redux';
import './App.css'
import NavigationBar from './components/Navbar/Navbar'
import { Body } from './pages/Body/Body'
import { getUserData } from './app/Slices/userSlice';
import CustomToast from './components/CustomToast/CustomToast';
import "./components/CustomToast/CustomToast.css"

function App() {

  const user  = useSelector(getUserData);
  return (
    <>
      {user.token!=="" && <NavigationBar />}
      <CustomToast />
      <Body />
    </>
  )
}

export default App
