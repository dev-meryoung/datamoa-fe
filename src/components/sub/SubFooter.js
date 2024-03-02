import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useEscKeyClose from '../../utils/useEscKeyClose';

import VocModal from '../common/VocModal';

const SubFooter = () => {
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
      <>
        <VocModal clicked={vocClicked} fx={vocClickedHandler} />{' '}
        <IconWrapper>
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
          　|　
          <i className="fa-solid fa-headset" onClick={vocClickedHandler}></i>
        </IconWrapper>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;
  border: 1px solid var(--color-dark-white);
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    height: 2rem;
  }

  @media (min-width: 768px) {
    height: 4rem;
  }
`;

const IconWrapper = styled.div``;

export default SubFooter;
