import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import DataMoa from './pages/DataMoa';
import Toilet from './pages/Toilet';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataMoa />} />
          <Route path="/toilet" element={<Toilet />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
