import styled from 'styled-components';
import Footer from '../Footer';
import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

export default Layout;
