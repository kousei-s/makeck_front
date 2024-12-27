import Home from './pages/Home';
import FromFirst from './pages/FromFirst';
import CookProcess from './pages/CookProcess';
import MenuConfirmation from './pages/MenuConfirmation';
import StepsDetail from './pages/StepsDetail'
import React from 'react';
import RecipeSelection from './pages/RecipeSelection'
import MaterialList from './pages/MaterialList'

import './styles/index.css';
import './styles/header.css';
import './styles/home.css';
import './styles/cookProcess.css';
import './styles/menuConfirmation.css';
import './styles/stepsDetail.css';
import './styles/footer.css';
import './styles/RecipeSelection.css';
import './styles/modal.css';
import './styles/CustomDialog.css';
import './styles/materialList.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <>
      <Router basename='/app/'>
        {/* ルートの定義 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fromFirst" element={<FromFirst />} />
          <Route path='/cookProcess' element={<CookProcess />} />
          <Route path='/menuConfirmation' element={<MenuConfirmation />}></Route>
          <Route path='/stepsDetail' element={<StepsDetail />}></Route>
          <Route path='/RecipeSelection' element={<RecipeSelection />}></Route>
          <Route path='/materialList' element={<MaterialList />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
