import Home from './pages/Home';
import FromFirst from './pages/FromFirst';
import ProtoGanttChart from './pages/ProtoGanttChart';
import MenuConfirmation from './pages/MenuConfirmation';
import StepsDetail from './pages/StepsDetail'
import React from 'react';

import './styles/index.css';
import './styles/header.css';
import './styles/home.css';
import './styles/protoGanttChart.css';
import './styles/menuConfirmation.css';
import './styles/stepsDetail.css';
import './styles/footer.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        {/* ルートの定義 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fromFirst" element={<FromFirst />} />
          <Route path='/ganttChart' element={<ProtoGanttChart />} />
          <Route path='/menuConfirmation' element={<MenuConfirmation />}></Route>
          <Route path='/stepsDetail' element={<StepsDetail />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
