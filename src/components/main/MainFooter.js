import { useState } from 'react';
import styled from 'styled-components';

import useEscKeyClose from '../../utils/useEscKeyClose';

import VocModal from '../common/VocModal';

const Footer = () => {
  // 문의 모달 버튼의 클릭을 감지하기 위한 State 값
  const [vocClicked, setVocClicked] = useState(false);

  // ESC 키를 눌렀을 때 모달 창을 닫도록 하는 HOOK
  useEscKeyClose(setVocClicked);

  // 문의 모달 버튼이 클릭되면 vocClicked의 값을 토글
  const vocClickedHandler = () => {
    setVocClicked(!vocClicked);
  };

  return (
    <Wrapper>
      <VocModal clicked={vocClicked} fx={vocClickedHandler} />
      <Copyrights>
        Copyrights © 2023 All Rights Reserved by 팀디케이 Inc.
      </Copyrights>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  text-align: center;
  justify-content: center;
  border-top: 1px solid var(--color-dark-white);
`;

const Copyrights = styled.p`
  margin: 2rem 1rem 2rem 0;
`;

export default Footer;
