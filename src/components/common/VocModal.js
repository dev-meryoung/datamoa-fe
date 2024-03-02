import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { API } from '../../config';
import defaultAxios from '../../utils/defaultAxios';
import authorAPI from '../../utils/authorAPI';

const VocModal = (props) => {
  // 현재 접속한 url의 경로명 확인
  const nowPathname = window.location.pathname;

  const vocClicked = props.clicked;
  const vocClickedHandler = props.fx;

  // 문의 모달을 출력을 관리하기 위한 State 값
  const [viewVoc, setViewVoc] = useState(false);

  // 문의 전송 확인 모달을 닫기 위한 State 값
  const [confirmMessage, setConfirmMessage] = useState(false);

  // 문의 전송 확인 모달 관련 애니메이션을 위한 state 값
  const [confirmVisible, setConfirmVisible] = useState(false);

  // 문의 전송 오류 모달을 닫기 위한 State 값
  const [errorMessage, setErrorMessage] = useState(false);

  // 문의 전송 오류 모달 관련 애니메이션을 위한 state 값
  const [errorVisible, setErrorVisible] = useState(false);

  // vocClicked 값의 변화에 따라 배경 고정
  useEffect(() => {
    if (vocClicked) {
      setViewVoc(true);
      document.body.classList.add('freeze');
    } else {
      setViewVoc(false);
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

  // 문의 모달창의 전송 결과에 따른 출력 메시지를 담기 위한 State 값
  const [confirmText, setConfirmText] = useState('');

  // 문의 모달창의 전송이 실패했을 경우 오류 코드를 담기 위한 State 값
  const [errorCode, setErrorCode] = useState('');

  // 일정 시간이 경과하면 전송 확인 알림창을 닫도록 하는 로직
  const openConfirm = () => {
    setConfirmMessage(true);
    setConfirmVisible(true);
    setTimeout(() => {
      setConfirmVisible(false);
      setTimeout(() => {
        setConfirmMessage(false);
      }, 1000);
    }, 2000);
  };

  // 일정 시간이 경과하면 전송 오류 알림창을 닫도록 하는 로직
  const openError = () => {
    setErrorMessage(true);
    setErrorVisible(true);
    setTimeout(() => {
      setErrorVisible(false);
      setTimeout(() => {
        setErrorMessage(false);
      }, 1000);
    }, 2000);
  };

  // 문의 모달창의 전송 버튼이 눌렸을 때 실행할 동작
  const vocSendHandler = () => {
    // 전송할 데이터
    const data = {
      pageUrl: nowPathname,
      vocCategoryId: vocCategoryId,
      vocContent: vocContent,
    };

    // POST 전송
    defaultAxios
      .post(API.VOC, data, { headers: authorAPI('POST', '/voc') })
      .then((res) => res.data)
      .then((data) => {
        // 성공적으로 전송 시
        if (data.success) {
          setConfirmText('문의가 성공적으로 전송되었습니다. 감사합니다.');
          closeModal();
          openConfirm();
        }
      })
      // 오류 발생 시
      .catch((err) => {
        setErrorCode('Error code : ' + err.response.data.message);
        closeModal();
        openError();
        setTimeout(() => {
          setErrorCode('');
        }, 3000);
      });
  };

  // 문의 모달창을 닫고 양식을 모두 비워주는 함수
  const closeModal = () => {
    vocClickedHandler();
    setVocCategoryId('1');
    setVocContent('');
  };

  // 문의 모달창의 카테고리 목록을 저장하기 위한 State 값
  const [vocCategoryList, setVocCategoryList] = useState([]);

  // axios 통신을 통해 문의 모달창의 카테고리 목록을 가져옴
  useEffect(() => {
    const getResponse = async () => {
      const vocCategory = await defaultAxios(API.VOC_CATEGORY, {
        headers: authorAPI('GET', '/voc/category'),
      })
        .then((res) => res.data)
        .then((data) => data.result);
      setVocCategoryList(vocCategory);
    };

    getResponse();
  }, []);

  // 문의 모달창의 카테고리 목록을 렌더링하는 함수
  const RenderVocCategoryList = ({ vocCategoryList }) => {
    return (
      <>
        {vocCategoryList.map((e) => (
          <option key={e.vocCategoryId} value={e.vocCategoryId}>
            {e.vocCategoryTitle}
          </option>
        ))}
      </>
    );
  };

  return (
    <>
      <VocWrapper view={viewVoc}>
        <VocForm>
          <VocFormDescription>문의 종류</VocFormDescription>
          <VocFormSelectBox onChange={onChangeCategoryId} value={vocCategoryId}>
            <RenderVocCategoryList vocCategoryList={vocCategoryList} />
          </VocFormSelectBox>
          <VocFormDescriptionWrapper>
            <VocFormDescription>내용</VocFormDescription>
            <VocFormDescriptionLength vocLength={vocLength}>
              ({vocLength}/500)
            </VocFormDescriptionLength>
          </VocFormDescriptionWrapper>
          <VocFormTextarea
            maxLength={499}
            placeholder={'문의 내용'}
            onChange={onChangeContent}
            value={vocContent}
          ></VocFormTextarea>
          <VocFormCenterDescription>
            회신이 필요한 경우 이메일 주소로 문의 바랍니다.
          </VocFormCenterDescription>
          <a href="mailto:datamoa.voc@gmail.com">
            <EmailText>datamoa.voc@gmail.com</EmailText>
          </a>
          <VocFormBtn onClick={vocSendHandler}>전송</VocFormBtn>
        </VocForm>
      </VocWrapper>
      <ConfirmWrapper view={confirmMessage} visible={confirmVisible}>
        <ConfirmCenterDescription>{confirmText}</ConfirmCenterDescription>
      </ConfirmWrapper>
      <ConfirmWrapper view={errorMessage} visible={errorVisible}>
        <ConfirmCenterDescription>{errorCode}</ConfirmCenterDescription>
      </ConfirmWrapper>
      <VocModalBackground onClick={closeModal} view={viewVoc} />
    </>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const VocWrapper = styled.div`
  display: ${({ view }) => (view ? 'flex' : 'none')};
  position: fixed;
  justify-content: center;
  background-color: var(--color-white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 0.5rem;
  z-index: 1;
  animation: ${fadeIn} 500ms ease-in-out forwards;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (min-width: 768px) {
    width: 25rem;
    height: 30rem;
  }
`;

const VocForm = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 0rem;
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
    if (props.vocLength >= 500) {
      return 'var(--color-red)';
    }
  }};
`;

const VocFormCenterDescription = styled.p`
  display: flex;
  justify-content: center;
  font-size: var(--font-small);
  margin-bottom: 0.5rem;
`;

const EmailText = styled.span`
  font-size: var(--font-small);
  font-weight: bold;
  text-decoration: underline;
  margin-top: 0;
`;

const VocFormSelectBox = styled.select`
  width: 80%;
  height: 3rem;
  margin-bottom: 0.5rem;
  color: var(--color-black);
`;

const VocFormTextarea = styled.textarea`
  width: 80%;
  height: 10rem;
  margin-bottom: 0.5rem;
`;

const VocFormBtn = styled.button`
  width: 80%;
  height: 3rem;
  margin-top: 1.5rem;
  font-size: var(--font-small);
  color: var(--color-black);
`;

const ConfirmWrapper = styled.div`
  display: ${({ view }) => (view ? 'flex' : 'none')};
  position: fixed;
  white-space: pre-line;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 7rem;
  background-color: var(--color-white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 0.5rem;
  overflow: hidden;
  z-index: 2;
  ${({ visible }) =>
    visible
      ? css`
          animation: ${fadeIn} 500ms ease-in-out forwards;
        `
      : css`
          animation: ${fadeOut} 500ms ease-in-out forwards;
        `}
`;

const ConfirmCenterDescription = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-small);
  font-weight: bold;
`;

const VocModalBackground = styled.div`
  display: ${({ view }) => (view ? 'flex' : 'none')};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${fadeIn} 500ms ease-in-out forwards;
`;

export default VocModal;
