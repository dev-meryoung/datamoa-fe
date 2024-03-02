import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled, { keyframes } from 'styled-components';
import search from '../../assets/imgs/search.png';
import objectInfo from '../../assets/imgs/object_info.png';
import direction from '../../assets/imgs/direction.png';
import toiletMarker from '../../assets/imgs/toilet_marker.png';
import totoMarker from '../../assets/imgs/toto_marker.png';
import protoLogo from '../../assets/imgs/proto_logo.png';
import lottoLogo from '../../assets/imgs/lotto_logo.png';
import pensionLogo from '../../assets/imgs/pension_logo.png';
import speedoLogo from '../../assets/imgs/speedo_logo.png';
import defaultAxios from '../../utils/defaultAxios';
import lastIndexOfUtil from '../../utils/lastIndexOfUtil';
import useEscKeyClose from '../../utils/useEscKeyClose';

const MapInfoList = (props) => {
  // 현재 접속한 URL의 경로명 확인
  const nowPathname = window.location.pathname;
  let marker = '';

  // 경로명에 따라 marker의 이미지 선택
  if (nowPathname === '/toilet') {
    marker = toiletMarker;
  } else if (nowPathname === '/toto') {
    marker = totoMarker;
  }

  // 사용자의 현 위치 좌표를 저장하기 위한 값
  const userCoord = props.userCoord;

  // 네이버 지도의 중심으로 특정 좌표를 이동하기 위해 좌표 값을 설정하는 set 함수
  const setCenterCoord = props.setCenterCoord;

  // axios 통신으로 받아온 데이터를 담는 변수
  const markerData = props.markerData;

  // 목록에서 클릭한 컴포넌트를 강조하기 위한 핸들러
  const objectClickHandler = props.clickHandler;

  // 현재 클릭된 컴포넌트를 확인하기 위한 변수
  const clicked = props.clicked;

  // 검색 창의 클릭에 따른 이벤트를 적용하기 위한 핸들러
  const textClickHandler = props.textClickHandler;

  // 검색 기능 이후에 특정 장소를 클릭한 이후 UI를 변경하는 핸들러
  const enterTextHandler = props.enterTextHandler;

  // 검색 창의 키워드를 담기 위한 state 값
  const [searchKeyword, setSearchKeyword] = useState('');

  // 검색 결과를 담기 위한 state 값
  const [searchResult, setSearchResult] = useState([]);

  // 검색했을 경우 검색 목록을 나타나게 할 state 값
  const [renderSearchList, setRenderSearchList] = useState('none');

  // 검색 결과가 없을 경우 메시지를 나타나게 할 state 값
  const [renderNoData, setRenderNoData] = useState('none');

  // 상세정보 버튼의 클릭 결과를 담기 위한 state 값
  const [infoClicked, setInfoClicked] = useState(false);

  // 상세정보 모달을 닫기 위한 state 값
  const [viewInfo, setViewInfo] = useState('none');

  // 특정 컴포넌트 외의 클릭을 감지하기 위한 ref 값
  const excludedRef = useRef(null);

  // 목록 컴포넌트를 식별하기 위한 ref 값
  const objectListRef = useRef(null);

  // 목록의 특정 컴포넌트를 식별하기 위한 ref 값
  const objectRef = useRef([]);

  // ESC 키를 눌렀을 때 모달 창을 닫도록 하는 HOOK
  useEscKeyClose(setInfoClicked);

  // 검색 창의 키워드를 담는 함수
  const onChangeContent = (e) => {
    setSearchKeyword(e.target.value);
  };

  // 검색 창에서 엔터 키를 눌렀을 때 동작할 함수
  const EnterKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  // 검색 창의 키워드와 Kakao api를 사용해 검색 결과를 가져오는 함수
  const searchHandler = () => {
    let query;
    if (!searchKeyword.trim()) {
      setRenderNoData('flex');
      setRenderSearchList('flex');
      setSearchResult([]);
    } else {
      query = searchKeyword;
      defaultAxios
        .get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
            },
          }
        )
        .then((res) => res.data)
        .then((data) => {
          setSearchResult(data.documents);
          if (data.documents.length < 1) {
            setRenderSearchList('flex');
            setRenderNoData('flex');
          } else {
            setRenderSearchList('flex');
            setRenderNoData('none');
          }
          setSearchKeyword('');
        });
    }
  };

  // 검색 목록에서 컴포넌트를 클릭했을 때 실행할 핸들러
  const searchResultClickHandler = (lat, lng) => {
    setCenterCoord({ lat: lat, lng: lng });
    setRenderSearchList('none');
    enterTextHandler();
  };

  // 상세정보 버튼을 클릭했을 때 토글 동작을 실행할 핸들러
  const infoClickHandler = () => {
    setInfoClicked(!infoClicked);
  };

  // 길찾기 버튼을 클릭했을 때 동작을 실행할 핸들러
  const directionClickHandler = useCallback(
    (id) => {
      if (nowPathname === '/toilet') {
        markerData.forEach((e) => {
          if (e.id !== id) return;
          window.open(
            `http://map.naver.com/index.nhn?slng=${userCoord.lng}&slat=${userCoord.lat}&stext=내 위치&elng=${e.lng}&elat=${e.lat}&etext=${e.nameArray[0]}&menu=route&pathType=3`,
            'noopener, noreferrer'
          );
        });
      } else if (nowPathname === '/toto') {
        markerData.forEach((e) => {
          if (e.id !== id) return;
          window.open(
            `http://map.naver.com/index.nhn?slng=${userCoord.lng}&slat=${userCoord.lat}&stext=내 위치&elng=${e.lng}&elat=${e.lat}&etext=${e.name}&menu=route&pathType=3`,
            'noopener, noreferrer'
          );
        });
      }
    },
    [markerData, userCoord, nowPathname]
  );

  // 배열에서 첫 번째 요소만 제외하고 나머지 요소들을 정리 후 출력하는 함수
  const remainArray = (e) => {
    const arr = [...e.nameArray];
    arr.shift();
    return arr;
  };

  // 상세정보를 렌더링하기 위한 함수
  const renderInfo = (e) => {
    // 화장실 관련 상세정보일 경우
    if (nowPathname === '/toilet') {
      return (
        <InfoForm>
          <InfoTopWrapper>
            <InfoCloseBtn
              className="fa-solid fa-xmark fa-3x"
              onClick={infoClickHandler}
            />
            <InfoTitleWrapper>
              {e.nameArray.length < 2 ? (
                <InfoTitle>{e.nameArray[0]}</InfoTitle>
              ) : (
                <>
                  <InfoTitle>{e.nameArray[0]}</InfoTitle>
                  <InfoTitleNum>
                    +{e.nameArray.length - 1}
                    <InfoTitleNumExpWrapper>
                      {remainArray(e).map((title) => (
                        <InfoTitleNumExp>{title}</InfoTitleNumExp>
                      ))}
                    </InfoTitleNumExpWrapper>
                  </InfoTitleNum>
                </>
              )}
            </InfoTitleWrapper>
          </InfoTopWrapper>
          <InfoDataWrapper>
            <InfoDataAttributeWrapper>
              <h3>주소</h3>
            </InfoDataAttributeWrapper>
            <InfoDataValueWrapper>
              <InfoDataValue>
                <p>
                  (지번) {e.address !== null ? e.address : '-'}
                  <br />
                  (도로명) {e.roadAddress !== null ? e.roadAddress : '-'}
                </p>
              </InfoDataValue>
            </InfoDataValueWrapper>
          </InfoDataWrapper>
          <InfoDataWrapper>
            <InfoDataAttributeWrapper>
              <h3>운영시간</h3>
            </InfoDataAttributeWrapper>
            <InfoDataValueWrapper>
              <p>{e.openTime !== null ? e.openTime : '-'}</p>
            </InfoDataValueWrapper>
          </InfoDataWrapper>
          <InfoDataWrapper>
            <InfoDataAttributeWrapper>
              <h3>전화번호</h3>
            </InfoDataAttributeWrapper>
            <InfoDataValueWrapper>
              <p>{e.phoneNumber !== null ? e.phoneNumber : '-'}</p>
            </InfoDataValueWrapper>
          </InfoDataWrapper>
        </InfoForm>
      );
    } else if (nowPathname === '/toto') {
      return (
        <InfoForm>
          <InfoTopWrapper>
            <InfoCloseBtn
              className="fa-solid fa-xmark fa-3x"
              onClick={infoClickHandler}
            />
            <InfoTitleWrapper>
              <InfoTitle>{e.name}</InfoTitle>
            </InfoTitleWrapper>
          </InfoTopWrapper>
          <InfoDataWrapper>
            <InfoDataAttributeWrapper>
              <h3>주소</h3>
            </InfoDataAttributeWrapper>
            <InfoDataValueWrapper>
              <InfoDataValue>
                <p>
                  (지번) {e.address !== null ? e.address : '-'}
                  <br />
                  (도로명) {e.roadAddress !== null ? e.roadAddress : '-'}
                </p>
              </InfoDataValue>
            </InfoDataValueWrapper>
          </InfoDataWrapper>
          <InfoDataWrapper>
            <InfoDataAttributeWrapper>
              <h3>판매품목</h3>
            </InfoDataAttributeWrapper>
            <InfoDataValueWrapper>
              {e.typeArray.indexOf('toto') > -1 ? (
                <InfoDataValue>
                  <InfoDataImg src={protoLogo} />
                </InfoDataValue>
              ) : (
                ''
              )}
              {e.typeArray.indexOf('lotto') > -1 ? (
                <InfoDataValue>
                  <InfoDataImg src={lottoLogo} />
                </InfoDataValue>
              ) : (
                ''
              )}
              {e.typeArray.indexOf('pension') > -1 ? (
                <InfoDataValue>
                  <InfoDataImg src={pensionLogo} />
                </InfoDataValue>
              ) : (
                ''
              )}
              {e.typeArray.indexOf('speedo') > -1 ? (
                <InfoDataValue>
                  <InfoDataImg src={speedoLogo} />
                </InfoDataValue>
              ) : (
                ''
              )}
            </InfoDataValueWrapper>
          </InfoDataWrapper>
          <InfoDataWrapper>
            <InfoDataAttributeWrapper>
              <h3>전화번호</h3>
            </InfoDataAttributeWrapper>
            <InfoDataValueWrapper>
              <p>{e.phoneNumber !== null ? e.phoneNumber : '-'}</p>
            </InfoDataValueWrapper>
          </InfoDataWrapper>
        </InfoForm>
      );
    }
  };

  // infoClicked 값의 변화에 따라 배경 고정
  useEffect(() => {
    if (infoClicked) {
      setViewInfo('flex');
      document.body.classList.add('freeze');
    } else {
      setViewInfo('none');
      document.body.classList.remove('freeze');
    }
  }, [infoClicked]);

  // 특정 컴포넌트의 클릭을 감지하여 검색 관련 컴포넌트가 맞는지 확인 후 동작 실행
  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (excludedRef.current && excludedRef.current.contains(e.target)) {
        return;
      }

      // 만약 검색 관련 컴포넌트 바깥을 클릭했을 경우 검색 리스트 숨김
      setRenderSearchList('none');
    };

    document.addEventListener('click', outsideClickHandler);
    return () => document.removeEventListener('click', outsideClickHandler);
  }, [excludedRef]);

  // 클릭한 대상이 새롭게 생기면 해당 객체를 목록에서 최상단으로 이동
  useLayoutEffect(() => {
    if (clicked === '') return;
    setTimeout(() => {
      objectRef.current[clicked].scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, [clicked]);

  // 새로운 데이터를 가져왔다면 스크롤을 최상단으로 이동
  useEffect(() => {
    objectListRef.current.scrollTo(0, 0);
  }, [markerData]);

  return (
    <Wrapper>
      <SearchWrapper ref={excludedRef}>
        <SearchBtn onClick={searchHandler} />
        <SearchText
          placeholder={'장소, 주소 검색'}
          onChange={onChangeContent}
          value={searchKeyword}
          onKeyDown={EnterKeyDownHandler}
          onClick={textClickHandler}
        ></SearchText>
        <SearchListWrapper display={renderSearchList}>
          <NoDataWrapper display={renderNoData}>
            <NoDataMessage>검색 결과 없음</NoDataMessage>
          </NoDataWrapper>
          {searchResult.map((e) => (
            <SearchResult
              key={e.id}
              onClick={() => searchResultClickHandler(e.y, e.x)}
            >
              <PlaceTitleWrapper>
                <PlaceTitle>
                  {e.place_name}
                  <PlaceCategory>
                    {lastIndexOfUtil(e.category_name, '>')}
                  </PlaceCategory>
                </PlaceTitle>
              </PlaceTitleWrapper>
              <PlaceAddressWrapper>
                <PlaceAddress>
                  (지번) {e.address_name !== '' ? e.address_name : '-'}
                  <br />
                  (도로명){' '}
                  {e.road_address_name !== '' ? e.road_address_name : '-'}
                </PlaceAddress>
              </PlaceAddressWrapper>
            </SearchResult>
          ))}
        </SearchListWrapper>
      </SearchWrapper>
      <ObjectListWrapper ref={objectListRef}>
        {nowPathname === '/toilet' && markerData.length > 0
          ? markerData.map((e) => (
              <Object
                key={e.id}
                ref={(obj) => (objectRef.current[e.id] = obj)}
                onClick={() => {
                  objectClickHandler(e.id);
                }}
                clicked={e.id === clicked}
              >
                <ObjectImg src={marker} />
                <ObjectToiletTitleWrapper>
                  {e.nameArray.length < 2 ? (
                    <ObjectToiletTitle>{e.nameArray[0]}</ObjectToiletTitle>
                  ) : (
                    <>
                      <ObjectToiletTitle>{e.nameArray[0]}</ObjectToiletTitle>
                      <ObjectToiletTitleAddNum>
                        +{e.nameArray.length - 1}
                      </ObjectToiletTitleAddNum>
                    </>
                  )}
                </ObjectToiletTitleWrapper>
                <BtnWrapper>
                  <DirectionBtnWrapper>
                    <DirectionBtn
                      src={direction}
                      onClick={() => directionClickHandler(e.id)}
                    />
                  </DirectionBtnWrapper>
                  <ObjectInfoBtnWrapper>
                    <ObjectInfoBtn
                      src={objectInfo}
                      onClick={infoClickHandler}
                    />
                  </ObjectInfoBtnWrapper>
                </BtnWrapper>
                {clicked === e.id && viewInfo === 'flex' ? (
                  <InfoWrapper display={viewInfo}>{renderInfo(e)}</InfoWrapper>
                ) : (
                  ''
                )}
              </Object>
            ))
          : ''}
        {nowPathname === '/toto' && markerData.length > 0
          ? markerData.map((e) => (
              <Object
                key={e.id}
                ref={(obj) => (objectRef.current[e.id] = obj)}
                onClick={() => {
                  objectClickHandler(e.id);
                }}
                clicked={e.id === clicked}
              >
                <ObjectImg src={marker} />
                <ObjectTotoTitleWrapper>
                  <ObjectTotoTitle>
                    <ObjectTotoTitleText>{e.name}</ObjectTotoTitleText>
                    <ObjectTotoDescriptionWrapper>
                      <ObjectTotoDescription
                        exist={e.typeArray.indexOf('toto')}
                      >
                        프로토
                      </ObjectTotoDescription>
                      <ObjectTotoDescription
                        exist={e.typeArray.indexOf('lotto')}
                      >
                        로또
                      </ObjectTotoDescription>
                      <ObjectTotoDescription
                        exist={e.typeArray.indexOf('pension')}
                      >
                        연금복권
                      </ObjectTotoDescription>
                      <ObjectTotoDescription
                        exist={e.typeArray.indexOf('speedo')}
                      >
                        스피또
                      </ObjectTotoDescription>
                    </ObjectTotoDescriptionWrapper>
                  </ObjectTotoTitle>
                </ObjectTotoTitleWrapper>
                <BtnWrapper>
                  <DirectionBtnWrapper>
                    <DirectionBtn
                      src={direction}
                      onClick={() => directionClickHandler(e.id)}
                    />
                  </DirectionBtnWrapper>
                  <ObjectInfoBtnWrapper>
                    <ObjectInfoBtn
                      src={objectInfo}
                      onClick={infoClickHandler}
                    />
                  </ObjectInfoBtnWrapper>
                </BtnWrapper>
                {clicked === e.id && viewInfo === 'flex' ? (
                  <InfoWrapper display={viewInfo}>{renderInfo(e)}</InfoWrapper>
                ) : (
                  ''
                )}
              </Object>
            ))
          : ''}
        {clicked ? (
          <InfoBackground display={viewInfo} onClick={infoClickHandler} />
        ) : (
          ''
        )}
      </ObjectListWrapper>
    </Wrapper>
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

const Wrapper = styled.div`
  height: 100%;
  position: relative;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 3.3rem;
  border: 2px solid var(--color-main-blue);
  border-radius: 0.5rem;
  box-sizing: border-box;
`;

const SearchBtn = styled.button`
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  margin-left: 0.5rem;
  background: url(${search}) no-repeat 95%;
  background-size: 1.5rem;
  background-position: center;

  &:hover {
    border: none;
    outline: none;
  }
`;

const SearchText = styled.input`
  width: 80%;
  height: 2rem;
  border: 0;
  margin: 0rem 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);

  &:focus {
    outline: none;
  }
`;

const SearchListWrapper = styled.div`
  position: absolute;
  display: ${(props) => props.display || 'none'};
  top: 3.3rem;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid var(--color-dark-white);
  border-radius: 0.5rem;
  background-color: var(--color-white);
  box-sizing: border-box;
  overflow-y: scroll;
  animation: ${fadeIn} 500ms ease;
  z-index: 2;

  @media (max-width: 768px) {
    height: 77%;
  }

  @media (min-width: 768px) {
    max-height: 88%;
  }

  & > div:not(:last-child) {
    border-bottom: 1px solid var(--color-dark-white);
  }
`;

const NoDataWrapper = styled.div`
  display: ${(props) => props.display || 'none'};
  width: 100%;
  height: 10rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NoDataMessage = styled.h3``;

const SearchResult = styled.div`
  display: block;
  width: 100%;
  height: 8rem;
  flex-direction: column;
  text-align: start;
  padding: 1.2rem 3rem;
  box-sizing: border-box;

  &:hover {
    background-color: var(--color-middle-white);
    cursor: pointer;
  }
`;

const PlaceTitleWrapper = styled.div`
  display: inline-block;
  width: 100%;
  align-items: baseline;
  margin-bottom: 1rem;
`;

const PlaceTitle = styled.h3`
  color: var(--color-main-blue);
  margin: 0 0.7rem 0 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const PlaceCategory = styled.p`
  color: var(--color-light-grey);
  font-size: var(--font-micro);
  font-weight: normal;
  margin: 0;
`;

const PlaceAddressWrapper = styled.div`
  display: inline-block;
  width: 100%;
  margin: 0;
`;

const PlaceAddress = styled.p`
  font-size: var(--font-micro);
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ObjectListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  width: 100%;
  height: calc(100% - 3.8rem);
  border-top: 1px solid var(--color-dark-white);
  margin-top: 0.5rem;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const Object = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  margin-top: 0.5rem;
  border: ${(props) =>
    props.clicked
      ? '2px solid var(--color-main-blue)'
      : '1.5px solid var(--color-dark-white)'};
  border-radius: 0.5rem;
  box-sizing: border-box;

  &:hover {
    cursor: auto;
  }
`;

const ObjectImg = styled.img`
  width: 2rem;
`;

const ObjectToiletTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  max-width: 43%;
`;

const ObjectToiletTitle = styled.h3`
  display: inline;
  flex-shrink: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    cursor: default;
  }
`;

const ObjectToiletTitleAddNum = styled.h3`
  display: inline;
  color: var(--color-white);
  border: 1px solid var(--color-main-blue);
  border-radius: 0.5rem;
  background-color: var(--color-main-blue);
  margin-left: 0.3rem;
  padding: 0 0.2rem;
`;

const ObjectTotoTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  max-width: 43%;
`;

const ObjectTotoTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 98%;
`;

const ObjectTotoTitleText = styled.h3`
  display: inline;
  flex-shrink: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0.5rem 0 0.1rem 0;

  &:hover {
    cursor: default;
  }
`;

const ObjectTotoDescriptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  margin: 0.3rem 0 0 0;
`;

const ObjectTotoDescription = styled.p`
  display: inline;
  color: ${({ exist }) =>
    exist > -1 ? 'var(--color-main-blue)' : 'var(--color-light-grey)'};
  border-radius: 0.5rem;
  margin: 0;
  padding: 0 0.2rem;
  font-size: var(--font-super-micro);
  font-weight: bold;
  opacity: 0.85;
  z-index: 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 5rem;
  flex-shrink: 0;
  gap: 0.3rem;
`;

const ObjectInfoBtnWrapper = styled.div``;

const ObjectInfoBtn = styled.img`
  width: 3rem;
  &:hover {
    cursor: pointer;
  }
`;

const DirectionBtnWrapper = styled.div``;

const DirectionBtn = styled.img`
  width: 3rem;
  &:hover {
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  display: ${(props) => props.display || 'flex'};
  position: fixed;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 0.5rem;
  z-index: 5;
  animation: ${fadeIn} 500ms ease;

  @media (max-width: 768px) {
    width: 100%;
    height: 70%;
  }

  @media (min-width: 768px) {
    width: 30rem;
    height: 25rem;
  }

  &:hover {
    cursor: auto;
  }
`;

const InfoForm = styled.div`
  @media (max-width: 768px) {
    width: 90%;
    height: 90%;
  }

  @media (min-width: 768px) {
    width: 95%;
    height: 95%;
  }
`;

const InfoTopWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-dark-white);
`;

const InfoCloseBtn = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1.1rem 1.5rem;
`;

const InfoTitleWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 3rem;
  padding: 1rem 0 1rem 2rem;
  justify-content: left;
  align-items: center;
`;

const InfoTitle = styled.h2`
  display: inline;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const InfoTitleNumExpWrapper = styled.div`
  display: none;
  flex-wrap: wrap;
  position: absolute;
  overflow-y: scroll;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--color-main-blue);
  border-radius: 0.5rem;
  background-color: var(--color-main-blue);
  padding: 0.5rem 0;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 700ms ease;

  @media (max-width: 768px) {
    width: 50vh;
    height: 3rem;
    top: 3.7rem;
  }

  @media (min-width: 768px) {
    width: 20rem;
    height: 3rem;
    top: 3.9rem;
  }
`;

const InfoTitleNumExp = styled.h3`
  width: 70%;
  margin: 0.3rem 0;
  padding: 0.5rem 0;
  align-items: center;
  &:hover {
    color: var(--color-main-blue);
    background-color: var(--color-white);
  }
`;

const InfoTitleNum = styled.h2`
  display: inline;
  position: relative;
  color: var(--color-white);
  border: 1px solid var(--color-main-blue);
  border-radius: 0.5rem;
  background-color: var(--color-main-blue);
  margin-left: 0.3rem;
  padding: 0 0.2rem;

  &:hover {
    cursor: pointer;
    color: var(--color-main-blue);
    background-color: var(--color-white);
  }

  &:hover ${InfoTitleNumExpWrapper} {
    display: flex;
    cursor: auto;
    color: var(--color-white);
  }
`;

const InfoDataWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 21%;
  margin: 1rem 0;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const InfoDataAttributeWrapper = styled.div`
  display: flex;
  width: 25%;
  height: 100%;
  border: 1px solid var(--color-dark-white);
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

  &:hover {
    border: 1px solid var(--color-main-blue);
  }
`;

const InfoDataValueWrapper = styled.div`
  display: flex;
  width: 70%;
  height: 100%;
  border: 1px solid var(--color-dark-white);
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:hover {
    border: 1px solid var(--color-main-blue);
  }
`;

const InfoDataValue = styled.div`
  display: flex;
  text-align: start;
  margin: 0.5rem;
`;

const InfoDataImg = styled.img`
  display: inline-block;
  height: 0.9rem;
`;

const InfoBackground = styled.div`
  display: ${(props) => props.display || 'flex'};
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${fadeIn} 500ms ease;
`;

export default MapInfoList;
