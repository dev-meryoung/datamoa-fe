import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import DataMoa from './pages/DataMoa';
import Toilet from './pages/Toilet';
import Lotto from './pages/Lotto';
import Stock from './pages/Stock';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataMoa />} />
          <Route path="/toilet" element={<Toilet />} />
          <Route path="/lotto" element={<Lotto />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
