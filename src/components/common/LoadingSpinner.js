import styled from 'styled-components';
import DotLoader from 'react-spinners/DotLoader';

const LoadingSpinner = () => {
  return (
    <>
      <LoadingWrapper>
        <DotLoader color="#466cff" size={100} />
      </LoadingWrapper>
      <LoadingBackground />
    </>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 1000;
  width: 7rem;
  height: 7rem;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const LoadingBackground = styled.div`
  display: flex;
  position: fixed;
  z-index: 500;
  background-color: rgba(0, 0, 0, 0);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default LoadingSpinner;
