import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

import { API } from '../../config';

const VocModal = (props) => {
  // 현재 접속한 url의 경로명 확인
  const nowPathname = window.location.pathname;

  const vocClicked = props.clicked;
  const vocClickedHandler = props.fx;

  // 문의 모달을 닫기 위한 State 값
  const [closeVoc, setCloseVoc] = useState('none');

  // vocClicked 값의 변화에 따라 배경 고정
  useEffect(() => {
    if (vocClicked) {
      setCloseVoc('flex');
      document.body.classList.add('freeze');
    } else {
      setCloseVoc('none');
      document.body.classList.remove('freeze');
    }
  }, [vocClicked]);

  // 문의 모달창의 문의 종류를 담기위한 State 값
  const [vocCategoryId, setVocCategoryId] = useState('1');

  // 문의 모달창의 문의 종류를 담는 함수
  const onChangeCategoryId = (e) => {
    setVocCategoryId(e.target.value);
  };

  // 문의 모달창의 문의 내용을 담기위한 State 값
  const [vocContent, setVocContent] = useState('');

  // 문의 모달창의 문의 내용을 담는 함수
  const onChangeContent = (e) => {
    setVocContent(e.target.value);
  };

  // 문의 내용 길이
  const vocLength = vocContent.replace(/<br\s*\/?>/gm, '\n').length;

  // 문의 모달창의 전송 버튼이 눌렸을 때 실행할 동작
  const VocSendHandler = () => {
    console.log(vocCategoryId);
    console.log(vocContent);

    const data = {
      pageUrl: nowPathname,
      vocCategoryId: vocCategoryId,
      vocContent: vocContent,
    };

    console.log(data);
  };

  // 문의 모달창을 닫고 양식을 모두 비워주는 함수
  const closeModal = () => {
    vocClickedHandler();
    setVocCategoryId('1');
    setVocContent('');
  };

  return (
    <>
      <VocWrapper display={closeVoc}>
        <VocForm>
          <VocFormDescription>문의 종류</VocFormDescription>
          <VocFormSelectBox onChange={onChangeCategoryId} value={vocCategoryId}>
            <option value={1}>오류 제보</option>
            <option value={2}>개선 사항</option>
            <option value={3}>기타</option>
          </VocFormSelectBox>
          <VocFormDescriptionWrapper>
            <VocFormDescription>내용</VocFormDescription>
            <VocFormDescriptionLength vocLength={vocLength}>
              ({vocLength}/500)
            </VocFormDescriptionLength>
          </VocFormDescriptionWrapper>
          <VocFormTextarea
            maxLength={500}
            placeholder={'문의 내용'}
            onChange={onChangeContent}
            value={vocContent}
          ></VocFormTextarea>
          <VocFormCenterDescription>
            회신이 필요한 경우 이메일 주소로 문의 바랍니다.
          </VocFormCenterDescription>
          <a href="mailto:dev.meryoung@gmail.com">
            <EmailText>dev.meryoung@gmail.com</EmailText>
          </a>
          <VocFormBtn onClick={VocSendHandler}>전송</VocFormBtn>
        </VocForm>
      </VocWrapper>
      <VocModalBackground onClick={closeModal} display={closeVoc} />
    </>
  );
};

const animation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const VocWrapper = styled.div`
  display: ${(props) => props.display || 'flex'};
  position: fixed;
  justify-content: center;
  width: 25rem;
  height: 30rem;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 0.5rem;
  z-index: 1;
  animation: ${animation} 500ms ease;
`;

const VocForm = styled.div`
  width: 100%;
  padding-top: 1rem;
`;

const VocFormDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VocFormDescription = styled.p`
  display: flex;
  margin: 1rem 0 0.5rem 2.7rem;
  font-size: var(--font-micro);
`;

const VocFormDescriptionLength = styled.p`
  margin: 1rem 2.7rem 0.5rem 2.7rem;
  font-size: var(--font-super-micro);
  color: ${(props) => {
    if (props.vocLength === 500) {
      return 'red';
    }
  }};
`;

const VocFormCenterDescription = styled.p`
  display: flex;
  justify-content: center;
  font-size: var(--font-small);
  margin-bottom: 0.5rem;
`;

const EmailText = styled.p`
  font-size: var(--font-small);
  text-decoration: underline;
  margin-top: 0;
`;

const VocFormSelectBox = styled.select`
  width: 80%;
  height: 3rem;
  margin-bottom: 0.5rem;
`;

const VocFormTextarea = styled.textarea`
  width: 80%;
  height: 10rem;
  margin-bottom: 0.5rem;
`;

const VocFormBtn = styled.button`
  width: 80%;
  height: 3rem;
  margin-top: 1rem;
  font-size: var(--font-small);
`;

const VocModalBackground = styled.div`
  display: ${(props) => props.display || 'flex'};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${animation} 500ms ease;
`;

export default VocModal;
