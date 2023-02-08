import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <a href="mailto:dev.meryoung@gmail.com">
        <FooterDiscription>
          <i className="fa-solid fa-envelope"></i> dev.meryoung@gmail.com
        </FooterDiscription>
      </a>
      <FooterDiscription>
        Copyrights © 2023 All Rights Reserved by 팀디케이 Inc.
      </FooterDiscription>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: 1px solid var(--color-dark-white);
`;

const FooterDiscription = styled.p`
  margin: 2rem;
`;

export default Footer;
