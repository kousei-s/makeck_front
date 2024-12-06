import Home from './pages/Home';
import FromFirst from './pages/FromFirst';
import ProtoGanttChart from './pages/ProtoGanttChart';
import MenuConfirmation from './pages/MenuConfirmation';
import StepsDetail from './pages/StepsDetail'
import React from 'react';

import './style/index.css';
import './style/header.css';
import './style/home.css';
import './style/protoGanttChart.css';
import './style/menuConfirmation.css';
import './style/stepsDetail.css';
import './style/footer.css';

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
