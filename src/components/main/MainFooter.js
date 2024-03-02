import styled from 'styled-components';

const MainFooter = () => {
  return (
    <Wrapper>
      <Copyrights>
        Copyrights © 2023 All Rights Reserved by 팀디케이 Inc.
      </Copyrights>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  width: 100%;
  height: 5rem;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-top: 1px solid var(--color-dark-white);
`;

const Copyrights = styled.p`
  margin: 2rem 1rem 2rem 0;
`;

export default MainFooter;
