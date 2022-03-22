import './App.css';
import Landingpage from './Components/landingpage'
import Mainpage from './Components/mainpage';
import Activityform from './Components/activityform';
import  Country  from './Components/country';
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
      <Routes>
        <Route exact path='/' element={<Landingpage/>}/>
        <Route exact path='/countries' element={<Mainpage/>}/> 
        <Route exact path='/activities' element={<Activityform/>}/>
        <Route exact path='/countries/:id' element={<Country/>}/>
      </Routes>
  );
}

export default App;
