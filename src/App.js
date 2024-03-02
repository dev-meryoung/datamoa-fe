import { Route, Routes, BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import DataMoa from './pages/DataMoa';
import Toilet from './pages/Toilet';
import Toto from './pages/Toto';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataMoa />} />
          <Route path="/toilet" element={<Toilet />} />
          <Route path="/toto" element={<Toto />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
