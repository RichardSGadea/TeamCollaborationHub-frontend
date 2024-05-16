
import { useSelector } from 'react-redux';
import './App.css'
import NavigationBar from './components/Navbar/Navbar'
import { Body } from './pages/Body/Body'
import { getUserData } from './app/Slices/userSlice';

function App() {

  const user  = useSelector(getUserData);
  return (
    <>
      {user.token!=="" && <NavigationBar />}
      <Body />
    </>
  )
}

export default App
