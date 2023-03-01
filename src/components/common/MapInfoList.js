import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import search from '../../assets/imgs/search.png';
import objectInfo from '../../assets/imgs/object_info.png';
import direction from '../../assets/imgs/direction.png';
import toiletMarker from '../../assets/imgs/toilet_marker.png';
import lastIndexOfUtil from '../../utils/lastIndexOfUtil';

const MapInfoList = () => {
  // 현재 접속한 URL의 경로명 확인
  const nowPathname = window.location.pathname;
  let marker = '';

  // 경로명에 따라 marker의 이미지 선택
  if (nowPathname === '/toilet') {
    marker = toiletMarker;
  }

  // 검색 창의 키워드를 담기 위한 state 값
  const [searchKeyword, setSearchKeyword] = useState('');

  // 검색 결과를 담기 위한 state 값
  const [searchResult, setSearchResult] = useState([]);

  // 검색했을 경우 검색 목록을 나타나게 할 state 값
  const [renderSearchList, setRenderSearchList] = useState('none');

  // 검색 결과가 없을 경우 메시지를 나타나게 할 state 값
  const [renderNoData, setRenderNoData] = useState('none');

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
      axios
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
        });
    }
  };

  return (
    <Wrapper>
      <SearchWrapper>
        <SearchBtn onClick={searchHandler} />
        <SearchText
          placeholder={'장소, 주소 검색'}
          onChange={onChangeContent}
          value={searchKeyword}
          onKeyDown={EnterKeyDownHandler}
        ></SearchText>
        <SearchListWrapper display={renderSearchList}>
          <NoDataWrapper display={renderNoData}>
            <NoDataMessage>검색 결과 없음</NoDataMessage>
          </NoDataWrapper>
          {searchResult.map((e) => (
            <SearchResult key={e.id}>
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
                  (지번) {e.address_name}
                  <br />
                  (도로명){' '}
                  {e.road_address_name !== '' ? e.road_address_name : '-'}
                </PlaceAddress>
              </PlaceAddressWrapper>
            </SearchResult>
          ))}
        </SearchListWrapper>
      </SearchWrapper>
      <ObjectListWrapper>
        <Object>
          <ObjectImg src={marker} />
          <ObjectTitleWrapper>
            <ObjectTitle>부천역</ObjectTitle>
          </ObjectTitleWrapper>
          <BtnWrapper>
            <DirectionBtnWrapper>
              <DirectionBtn src={direction} />
            </DirectionBtnWrapper>
            <ObjectInfoBtnWrapper>
              <ObjectInfoBtn src={objectInfo} />
            </ObjectInfoBtnWrapper>
          </BtnWrapper>
        </Object>
      </ObjectListWrapper>
    </Wrapper>
  );
};

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

  &:focus {
    outline: none;
  }
`;

const SearchListWrapper = styled.div`
  position: absolute;
  display: ${(props) => props.display || 'none'};
  top: 3.3rem;
  width: 100%;
  max-height: 88%;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid var(--color-dark-white);
  border-radius: 0.5rem;
  background-color: var(--color-white);
  box-sizing: border-box;
  overflow-y: scroll;

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
  height: 85%;
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
  border: 1.5px solid var(--color-dark-white);
  border-radius: 0.5rem;
  box-sizing: border-box;
`;

const ObjectImg = styled.img`
  width: 2.5rem;
`;

const ObjectTitleWrapper = styled.div`
  display: inline-block;
  width: 50%;
`;

const ObjectTitle = styled.h3`
  margin: 0 0.5rem;
  flex-shrink: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

export default MapInfoList;
