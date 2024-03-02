import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { debounce } from 'lodash';
import myLocation from '../../assets/imgs/my_location.png';
import userLocation from '../../assets/imgs/user_location.png';
import toiletMarker from '../../assets/imgs/toilet_marker.png';
import toiletFocusMarker from '../../assets/imgs/toilet_focus_marker.png';
import totoMarker from '../../assets/imgs/toto_marker.png';
import totoFocusMarker from '../../assets/imgs/toto_focus_marker.png';
import { API } from '../../config';
import defaultAxios from '../../utils/defaultAxios';
import authorAPI from '../../utils/authorAPI';
import LoadingSpinner from './LoadingSpinner';

const { naver } = window;

const NaverMap = (props) => {
  // 현재 접속한 URL의 경로명 확인
  const nowPathname = window.location.pathname;
  let defaultMarker = '';
  let focusMarker = '';

  // 경로명에 따라 marker의 이미지 선택
  if (nowPathname === '/toilet') {
    defaultMarker = toiletMarker;
    focusMarker = toiletFocusMarker;
  } else if (nowPathname === '/toto') {
    defaultMarker = totoMarker;
    focusMarker = totoFocusMarker;
  }

  // 맵 객체 저장을 위한 state 값
  const [map, setMap] = useState(null);

  // 현재 보고 있는 맵의 넓이를 확인하기 위한 bounds를 저장하는 state 값
  const [bounds, setBounds] = useState(null);

  // 줌 레벨 관련 메시지 모달을 닫기 위한 state 값
  const [zoomMessage, setZoomMessage] = useState(false);

  // 줌 레벨 관련 애니메이션을 위한 state 값
  const [zoomVisible, setZoomVisible] = useState(false);

  // 해당 지역에 데이터가 없을 경우 나타낼 메시지 모달을 관리하기 위한 state 값
  const [noDataMessage, setNoDataMessage] = useState(false);

  // 데이터가 없을 경우 나타낼 메시지 모달 관련 애니메이션을 위한 state 값
  const [noDataVisible, setNoDataVisible] = useState(false);

  // 로딩 스피너를 나타내고 관리하기 위한 state 값
  const [isLoading, setIsLoading] = useState(false);

  // 맵에 표현된 마커의 목록을 관리하기 위한 state 값
  const [markerDataList, setMarkerDataList] = useState([]);

  // 복권방 페이지에서 체크박스를 관리하기 위한 state 값
  const [totoTypeCheckValue, setTotoTypeCheckValue] = useState({
    프로토: true,
    로또: true,
    연금복권: true,
    스피또: true,
  });

  // 사용자의 현 위치 마커를 관리하기 위한 ref 변수
  const userMarker = useRef('');

  // 줌 레벨 관련 메시지 모달을 띄우는 시간을 관리하기 위한 ref 변수
  const zTimer = useRef('');

  // 해당 지역에 데이터가 없을 경우 나타낼 메시지 모달을 띄우는 시간을 관리하기 위한 ref 변수
  const ndTimer = useRef('');

  // 마지막 axios 통신에 사용된 좌측 하단 lat 값을 기억하기 위한 ref 변수
  const lastLat = useRef('');

  // 마지막 axios 통신에 사용된 좌측 하단 lng 값을 기억하기 위한 ref 변수
  const lastLng = useRef('');

  // 검색 목록에서 클릭한 장소 및 주소로 지도를 이동하기 위한 중심 좌표 값
  const centerCoord = props.centerCoord;

  // axios 통신으로 받아온 데이터를 담기 위한 함수
  const setMarkerData = props.setMarkerData;

  // axios 통신으로 받아온 데이터를 담는 state 변수
  const markerData = props.markerData;

  // 목록에서 클릭한 마커를 강조하기 위한 핸들러
  const markerClickHandler = props.clickHandler;

  // 현재 클릭된 마커 확인하기 위한 변수
  const clicked = props.clicked;

  // 현재 클릭된 마커를 설정하기 위한 함수
  const setClicked = props.setClicked;

  // 사용자의 현 위치 좌표를 저장하기 위한 값
  const userCoord = props.userCoord;

  // 사용자의 현 위치 좌표를 저장하는 함수
  const setUserCoord = props.setUserCoord;

  // 줌 레벨 관련 메시지를 표시하기 위한 함수
  const openZoomMessage = useCallback(() => {
    setZoomMessage(true);
    setZoomVisible(true);
    clearTimeout(zTimer.current);
    zTimer.current = setTimeout(() => {
      setZoomVisible(false);
      setTimeout(() => {
        setZoomMessage(false);
      }, 1000);
    }, 2000);
  }, [setZoomMessage]);

  // 해당 지역에 데이터가 없을 경우 나타낼 메시지를 표시하기 위한 함수
  const openNoDataMessage = useCallback(() => {
    setNoDataMessage(true);
    setNoDataVisible(true);
    clearTimeout(ndTimer.current);
    ndTimer.current = setTimeout(() => {
      setNoDataVisible(false);
      setTimeout(() => {
        setNoDataMessage(false);
      }, 1000);
    }, 2000);
  }, [setNoDataMessage]);

  // axios 통신을 이용해 데이터를 받아오는 함수
  const getMarkerData = useCallback(async () => {
    // 화장실 위치찾기 페이지에서 요청하는 데이터
    if (nowPathname === '/toilet') {
      const data = await defaultAxios
        .get(
          `${API.TOILET_INFO}?location_lat=${userCoord.lat}&location_lng=${userCoord.lng}&sw_lat=${bounds.sw.lat}&sw_lng=${bounds.sw.lng}&ne_lat=${bounds.ne.lat}&ne_lng=${bounds.ne.lng}`,
          { headers: authorAPI('GET', '/toilet/map/info') }
        )
        .then((res) => res.data)
        .then((data) => {
          if (data.result.length < 1) {
            openNoDataMessage();
          }
          return data.result;
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data.message);
            if (markerDataList.length > 0) {
              markerDataList.forEach((e) => {
                e.setMap(null);
              });
              setMarkerDataList([]);
            }
            return '';
          } else {
            alert(error);
            if (markerDataList.length > 0) {
              markerDataList.forEach((e) => {
                e.setMap(null);
              });
              setMarkerDataList([]);
            }
            return '';
          }
        });
      return data;
    }
    // 복권방 위치찾기 페이지에서 요청하는 데이터
    else if (nowPathname === '/toto') {
      // 복권방 페이지의 체크 여부를 관리하는 객체에서 체크되어 있는 key 값만 추출하는 로직
      const checkKeysArray = Object.entries(totoTypeCheckValue)
        .filter(([key, value]) => value === true)
        .map(([key, value]) =>
          key === '프로토'
            ? 'toto'
            : key === '로또'
            ? 'lotto'
            : key === '연금복권'
            ? 'pension'
            : key === '스피또'
            ? 'speedo'
            : ''
        );

      const data = await defaultAxios
        .get(
          `${API.TOTO_INFO}?location_lat=${userCoord.lat}&location_lng=${userCoord.lng}&sw_lat=${bounds.sw.lat}&sw_lng=${bounds.sw.lng}&ne_lat=${bounds.ne.lat}&ne_lng=${bounds.ne.lng}&typeArray=${checkKeysArray}`,
          { headers: authorAPI('GET', '/toto/map/info') }
        )
        .then((res) => res.data)
        .then((data) => {
          if (data.result.length < 1) {
            openNoDataMessage();
          }
          return data.result;
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data.message);
            if (markerDataList.length > 0) {
              markerDataList.forEach((e) => {
                e.setMap(null);
              });
              setMarkerDataList([]);
            }
            return '';
          } else {
            alert(error);
            if (markerDataList.length > 0) {
              markerDataList.forEach((e) => {
                e.setMap(null);
              });
              setMarkerDataList([]);
            }
            return '';
          }
        });

      return data;
    }
  }, [
    bounds,
    nowPathname,
    userCoord.lat,
    userCoord.lng,
    openNoDataMessage,
    totoTypeCheckValue,
    markerDataList,
  ]);

  // 맵 이동 시에 동작하는 함수
  const mapMovingHandler = useCallback(async () => {
    if (bounds) {
      // 가장 마지막 통신에 사용한 중심 좌표가 현재 좌표와 같다면 return시킴
      if (
        bounds.sw.lat === lastLat.current &&
        bounds.sw.lng === lastLng.current
      )
        return;

      setIsLoading(true);
      // 지도의 확대 레벨이 14 이상일 때만, axios 통신을 이용해 마커 정보를 가져와 state 변수에 설정
      if (map.getZoom() >= 14) {
        setMarkerData(await getMarkerData());

        // 기존에 클릭됐던 마커 설정을 초기화
        setClicked('');

        // 마지막 통신에 사용된 좌측 하단 좌표를 저장
        lastLat.current = bounds.sw.lat;
        lastLng.current = bounds.sw.lng;
      }

      setIsLoading(false);
    }
  }, [map, setMarkerData, getMarkerData, setClicked, bounds]);

  const checkChangeHandler = useCallback(async () => {
    if (bounds) {
      setIsLoading(true);
      // 지도의 확대 레벨이 14 이상일 때만, axios 통신을 이용해 마커 정보를 가져와 state 변수에 설정
      if (map.getZoom() >= 14) {
        setMarkerData(await getMarkerData());

        // 기존에 클릭됐던 마커 설정을 초기화
        setClicked('');
      }
      setIsLoading(false);
    }
  }, [bounds, getMarkerData, map, setClicked, setMarkerData]);

  // 오류 없이 현재 위치를 불러왔을 경우 해당 좌표를 중심으로 설정하는 함수
  const initSuccessMapSetting = useCallback(
    (position) => {
      if (userMarker.current) {
        userMarker.current.setMap(null);
      }
      const { latitude, longitude } = position.coords;
      setUserCoord({ lat: latitude, lng: longitude });
      const location = new naver.maps.LatLng(latitude, longitude);
      const mapOptions = {
        center: location,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.RIGHT_TOP,
        },
      };

      const map = new naver.maps.Map('map', mapOptions);

      const markerOptions = {
        position: location,
        map: map,
        icon: { url: userLocation, scaledSize: [20, 20] },
        zIndex: 1,
      };

      userMarker.current = new naver.maps.Marker(markerOptions);

      setMap(map);
    },
    [setUserCoord]
  );

  // 오류가 존재하거나 위치 제공을 거부한 경우 기본으로 설정된 좌표를 중심으로 설정하는 함수
  const initFailMapSetting = useCallback(() => {
    if (userMarker.current) {
      userMarker.current.setMap(null);
    }
    setUserCoord({ lat: 37.5006, lng: 126.8677 });
    const location = new naver.maps.LatLng(37.5006, 126.8677);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_TOP,
      },
    };
    const map = new naver.maps.Map('map', mapOptions);

    const markerOptions = {
      position: location,
      map: map,
      icon: { url: userLocation, scaledSize: [20, 20] },
      zIndex: 1,
    };

    userMarker.current = new naver.maps.Marker(markerOptions);

    setMap(map);
  }, [setUserCoord]);

  // 내 위치로 이동 아이콘을 클릭했을 경우 동작할 핸들러 함수
  const myLocationHandler = () => {
    if (map) {
      // 위치 제공에 동의한 경우, 새로운 위치에 네이버 지도 중심 좌표 및 마커 설정
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (userMarker.current) {
              userMarker.current.setMap(null);
            }
            const { latitude, longitude } = position.coords;
            setUserCoord({ lat: latitude, lng: longitude });
            const location = new naver.maps.LatLng(latitude, longitude);

            const markerOptions = {
              position: location,
              map: map,
              icon: { url: userLocation, scaledSize: [20, 20] },
              zIndex: 1,
            };

            userMarker.current = new naver.maps.Marker(markerOptions);
          },
          (error) => {
            if (userMarker.current) {
              userMarker.current.setMap(null);
            }
            setUserCoord({ lat: 37.5006, lng: 126.8677 });
            const location = new naver.maps.LatLng(37.5006, 126.8677);

            const markerOptions = {
              position: location,
              map: map,
              icon: { url: userLocation, scaledSize: [20, 20] },
              zIndex: 1,
            };

            userMarker.current = new naver.maps.Marker(markerOptions);
          }
        );
      } else {
        if (userMarker.current) {
          userMarker.current.setMap(null);
        }
        setUserCoord({ lat: 37.5006, lng: 126.8677 });
        const location = new naver.maps.LatLng(37.5006, 126.8677);

        const markerOptions = {
          position: location,
          map: map,
          icon: { url: userLocation, scaledSize: [20, 20] },
          zIndex: 1,
        };

        userMarker.current = new naver.maps.Marker(markerOptions);
      }

      const location = new naver.maps.LatLng(userCoord.lat, userCoord.lng);
      map.panTo(location);
    }
  };

  // 복권방 페이지의 체크 버튼의 클릭을 관리하는 핸들러 함수
  const totoTypeChangeHandler = (e) => {
    const { value, checked } = e.target;

    setTotoTypeCheckValue((prevState) => ({
      ...prevState,
      [value]: checked,
    }));

    const checkedCount =
      Object.values(totoTypeCheckValue).filter(Boolean).length;

    if (checkedCount === 1) {
      e.target.checked = true;
      setTotoTypeCheckValue((prevState) => ({
        ...prevState,
        [value]: true,
      }));
    }
  };

  // markerData 값이 변경되었을 때 기존의 마커를 삭제하고 새로운 마커를 나타내는 로직
  useEffect(() => {
    if (markerDataList.length === markerData.length) return;
    if (markerData.length > 0) {
      // 만약 받아온 markerData가 있을 경우 기존에 나타내지 않았다면 지도 상에 마커로 모두 표현
      const newMarkerDataList = markerData.reduce((acc, data) => {
        const exists = markerDataList.some((m) => m.id === data.id);
        if (!exists) {
          const location = new naver.maps.LatLng(data.lat, data.lng);
          const markerOptions = {
            position: location,
            map: map,
            icon:
              data.id !== clicked
                ? { url: defaultMarker, scaledSize: [25, 35] }
                : { url: focusMarker, scaledSize: [25, 35] },
          };

          const marker = new naver.maps.Marker(
            Object.assign({}, markerOptions, { id: data.id })
          );

          // 마커에 클릭 이벤트에 대한 리스너 추가
          naver.maps.Event.addListener(marker, 'click', () => {
            markerClickHandler(marker.id);
          });

          acc.push(marker);
        }
        return acc;
      }, []);

      // 새로 가져온 데이터와 기존에 나타낸 마커를 비교해 없는 값과 마커는 제거
      markerDataList.forEach((m) => {
        const exists = markerData.some((data) => data.id === m.id);
        if (!exists) {
          const findIndex = markerDataList.indexOf(m);
          if (findIndex > -1) {
            markerDataList.splice(findIndex, 1);
          }
          m.setMap(null);
        }
      });

      // 가장 최신화된 마커 정보를 업데이트
      setMarkerDataList([...markerDataList, ...newMarkerDataList]);
    }
  }, [
    map,
    markerData,
    markerDataList,
    clicked,
    markerClickHandler,
    defaultMarker,
    focusMarker,
    openNoDataMessage,
  ]);

  // 특정 마커가 클릭되었을 때 해당 마커 활성화
  useEffect(() => {
    markerDataList.forEach((marker) => {
      if (marker.id === clicked) {
        marker.setIcon({
          url: focusMarker,
          scaledSize: [25, 35],
        });
        marker.setZIndex(100);
      } else {
        marker.setIcon({
          url: defaultMarker,
          scaledSize: [25, 35],
        });
      }
    });
  }, [clicked, markerDataList, focusMarker, defaultMarker]);

  // props로 받아온 검색 목록의 좌표가 변경될 때마다 지도의 중심 좌표를 변경
  useEffect(() => {
    if (map && centerCoord) {
      const location = new naver.maps.LatLng(centerCoord.lat, centerCoord.lng);
      map.panTo(location);
    }
  }, [map, centerCoord]);

  // 기본 맵 초기화 과정
  useEffect(() => {
    // 위치 제공에 동의한 경우, 네이버 지도 중심 좌표 및 마커 설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          initSuccessMapSetting(position);
        },
        (error) => {
          initFailMapSetting();
        }
      );
    } else {
      initFailMapSetting();
    }
  }, [initSuccessMapSetting, initFailMapSetting]);

  // 초기화된 맵이 생성되면 사용자가 바라보는 지도의 좌측 하단 및 우측 상단 좌표 계산
  useEffect(() => {
    if (map) {
      // 맵 자체 이벤트 부여 로직
      // 초기 생성 시
      map.addListener('tilesloaded', () => {
        const bounds = map.getBounds();
        setBounds({
          sw: {
            lat: bounds.getSW().lat(),
            lng: bounds.getSW().lng(),
          },
          ne: {
            lat: bounds.getNE().lat(),
            lng: bounds.getNE().lng(),
          },
        });
      });

      // 줌 레벨 변경 시
      map.addListener('zoom_changed', () => {
        // 줌 레벨이 14보다 작을 경우, 지도의 모든 마커를 지우고 가져온 데이터를 삭제한 뒤 알림 메시지 출력
        if (map.getZoom() < 14) {
          if (markerDataList.length > 0) {
            markerDataList.forEach((e) => {
              e.setMap(null);
            });
            setMarkerDataList([]);
          }
          setMarkerData([]);

          openZoomMessage();
        }
      });

      // 지도의 이동 및 크기 변경이 생겼을 시
      const listener = map.addListener('bounds_changed', () => {
        const bounds = map.getBounds();
        setBounds({
          sw: {
            lat: bounds.getSW().lat(),
            lng: bounds.getSW().lng(),
          },
          ne: {
            lat: bounds.getNE().lat(),
            lng: bounds.getNE().lng(),
          },
        });

        // 줌 레벨이 14보다 작을 경우, 지도의 모든 마커를 지우고 가져온 데이터를 삭제한 뒤 알림 메시지 출력
        if (map.getZoom() < 14) {
          if (markerDataList.length > 0) {
            markerDataList.forEach((e) => {
              e.setMap(null);
            });
            setMarkerDataList([]);
          }
          setMarkerData([]);

          openZoomMessage();
        }
      });

      return () => {
        naver.maps.Event.removeListener(listener);
      };
    }
  }, [map, markerDataList, setMarkerData, openZoomMessage]);

  // 확대, 축소, 지도의 이동 등의 이벤트로 bounds 값이 변경되면 실행할 동작
  useEffect(() => {
    const debounceMapMovingHandler = debounce(mapMovingHandler, 300);
    if (bounds) {
      debounceMapMovingHandler(bounds);
      return debounceMapMovingHandler.cancel;
    }
  }, [map, bounds, mapMovingHandler]);

  useEffect(() => {
    checkChangeHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totoTypeCheckValue]);

  return (
    <>
      <MapWrapper id="map">
        {zoomMessage && (
          <ConfirmWrapper view={zoomMessage} visible={zoomVisible}>
            <ConfirmCenterDescription>
              위치 정보 확인을 위해 지도를 확대해 주세요.
            </ConfirmCenterDescription>
          </ConfirmWrapper>
        )}
        {noDataMessage && (
          <ConfirmWrapper view={noDataMessage} visible={noDataVisible}>
            <ConfirmCenterDescription>
              해당하는 지역에 위치 정보가 없습니다.
            </ConfirmCenterDescription>
          </ConfirmWrapper>
        )}
        {map ? (
          <MyLocationWrapper>
            <MyLocationBtn src={myLocation} onClick={myLocationHandler} />
          </MyLocationWrapper>
        ) : (
          ''
        )}
        {map && nowPathname === '/toto' ? (
          <TotoTypeWrapper>
            {['프로토', '로또', '연금복권', '스피또'].map((value) => (
              <TotoTypeLabel key={value}>
                <TotoTypeCheck
                  type="checkbox"
                  value={value}
                  onChange={totoTypeChangeHandler}
                  checked={totoTypeCheckValue[value]}
                />
                {value}
              </TotoTypeLabel>
            ))}
          </TotoTypeWrapper>
        ) : (
          ''
        )}
      </MapWrapper>
      {isLoading && <LoadingSpinner />}
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

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  z-index: 0;

  &:focus {
    outline: none;
  }
`;

const ConfirmWrapper = styled.div`
  display: ${({ view }) => (view ? 'flex' : 'none')};
  position: absolute;
  white-space: pre-line;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 2rem;
  background-color: var(--color-white);
  bottom: 5%;
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
  cursor: default;
`;

const TotoTypeWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-evenly;
  align-items: center;
  height: 28px;
  margin: 10px;
  border: 1px solid var(--color-map-grey);
  background-color: var(--color-white);
  box-sizing: content-box !important;
  user-select: none;
  top: 0;
  left: 0;

  @media (max-width: 768px) {
    width: 230px;
  }

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const TotoTypeLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-small);
  font-weight: bold;
`;

const TotoTypeCheck = styled.input.attrs({ type: 'checkbox' })`
  &:checked {
    background-color: var(--color-main-blue);
  }
`;

const MyLocationWrapper = styled.div`
  position: absolute;
  z-index: 100;
  width: 28px;
  margin: 10px;
  border: 1px solid var(--color-map-grey);
  box-sizing: content-box !important;
  user-select: none;
  top: 60px;
  right: 0;
`;

const MyLocationBtn = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export default NaverMap;
