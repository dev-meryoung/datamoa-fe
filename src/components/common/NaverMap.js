import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { debounce } from 'lodash';
import axios from 'axios';
import userLocation from '../../assets/imgs/user_location.png';
import toiletMarker from '../../assets/imgs/toilet_marker.png';
import toiletFocusMarker from '../../assets/imgs/toilet_focus_marker.png';
import { API } from '../../config';

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
  }

  // 맵 객체 저장을 위한 state 값
  const [map, setMap] = useState(null);

  // 현재 보고 있는 맵의 넓이를 확인하기 위한 bounds를 저장하는 state 값
  const [bounds, setBounds] = useState(null);

  // 사용자의 현 위치 좌표를 저장하기 위한 state 값
  const [userCoord, setUserCoord] = useState({ lat: 37.5006, lng: 126.8677 });

  // 줌 레벨 관련 메시지 모달을 닫기 위한 State 값
  const [zoomMessage, setZoomMessage] = useState('none');

  // 맵에 표현된 마커의 목록을 관리하기 위한 ref 변수
  const markerDataList = useRef([]);

  // 줌 레벨 관련 메시지 모달을 띄우는 시간을 관리하기 위한 ref 변수
  const timer = useRef('');

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

  // axios 통신을 이용해 데이터를 받아오는 함수
  const getMarkerData = useCallback(async () => {
    const data = await axios
      .get(
        `${API.TOILET_INFO}?location_lat=${userCoord.lat}&location_lng=${userCoord.lng}&sw_lat=${bounds.sw.lat}&sw_lng=${bounds.sw.lng}&ne_lat=${bounds.ne.lat}&ne_lng=${bounds.ne.lng}`
      )
      .then((res) => res.data)
      .then((data) => {
        return data.result;
      });

    return data;
  }, [bounds, userCoord.lat, userCoord.lng]);

  // 맵 이동 시에 동작하는 함수
  const mapMovingHandler = useCallback(async () => {
    // 지도의 확대 레벨이 16 이상일 때만, axios 통신을 이용해 마커 정보를 가져와 state 변수에 설정
    if (map.getZoom() >= 15) {
      setMarkerData(await getMarkerData());

      // 기존에 클릭됐던 마커 설정을 초기화
      setClicked('');
    }
  }, [map, setMarkerData, getMarkerData, setClicked]);

  // 줌 레벨 관련 메시지를 표시하기 위한 함수
  const openZoomMessage = useCallback(() => {
    setZoomMessage('flex');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setZoomMessage('none');
    }, 2500);
  }, [setZoomMessage]);

  // markerData 값이 변경되었을 때 기존의 마커를 삭제하고 새로운 마커를 나타내는 로직
  useEffect(() => {
    // 만약 이전에 markerData를 불러와 마커를 만들었다면 지도에서 해당 마커를 모두 비움
    if (markerDataList.current.length > 0) {
      markerDataList.current.forEach((e) => {
        e.setMap(null);
      });
    }

    // 만약 받아온 markerData가 있을 경우 지도 상에 마커로 모두 나타냄
    if (markerData.length > 0) {
      const newMarkerDataList = markerData.map((data) => {
        const location = new naver.maps.LatLng(data.lat, data.lng);

        const markerOptions = {
          position: location,
          map: map,
          icon: { url: defaultMarker, scaledSize: [35, 50] },
        };

        const marker = new naver.maps.Marker(
          Object.assign({}, markerOptions, { id: data.id })
        );

        naver.maps.Event.addListener(marker, 'click', () => {
          markerClickHandler(marker.id);
        });

        return marker;
      });

      // 마커 리스트 목록에 현재의 마커 목록을 최신화함 (새로운 데이터를 받아올 때 삭제하기 위해)
      markerDataList.current = newMarkerDataList;
    }
  }, [map, markerData, markerClickHandler, defaultMarker]);

  // 특정 마커가 클릭되었을 때 해당 마커 활성화
  useEffect(() => {
    markerDataList.current.forEach((marker) => {
      if (marker.id === clicked) {
        marker.setIcon({ url: focusMarker, scaledSize: [35, 50] });
      }
    });
  }, [clicked, focusMarker]);

  // props로 받아온 검색 목록의 좌표가 변경될 때마다 지도의 중심 좌표를 변경
  useEffect(() => {
    if (map && centerCoord) {
      const location = new naver.maps.LatLng(centerCoord.lat, centerCoord.lng);
      map.panTo(location);
    }
  }, [map, centerCoord]);

  // 기본 맵 초기화 과정
  useEffect(() => {
    // 오류 없이 현재 위치를 불러왔을 경우 해당 좌표를 중심으로 설정하는 함수
    const successMapSetting = (position) => {
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

      new naver.maps.Marker(markerOptions);

      setMap(map);
    };

    // 오류가 존재하거나 위치 제공을 거부한 경우 기본으로 설정된 좌표를 중심으로 설정하는 함수
    const failMapSetting = () => {
      setUserCoord({ lat: 37.5006, lng: 126.8677 });
      const location = new naver.maps.LatLng(37.5006, 126.8677);
      const mapOptions = {
        center: location,
        zoom: 17,
        zoomControl: true,
      };
      const map = new naver.maps.Map('map', mapOptions);

      const markerOptions = {
        position: location,
        map: map,
        icon: { url: userLocation, scaledSize: [20, 20] },
        zIndex: 1,
      };

      new naver.maps.Marker(markerOptions);

      setMap(map);
    };

    // 위치 제공에 동의한 경우, 네이버 지도 중심 좌표 및 마커 설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          successMapSetting(position);
        },
        (error) => {
          failMapSetting();
        }
      );
    } else {
      failMapSetting();
    }
  }, []);

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
        // 줌 레벨이 15보다 작을 경우, 지도의 모든 마커를 지우고 가져온 데이터를 삭제한 뒤 알림 메시지 출력
        if (map.getZoom() < 15) {
          if (markerDataList.current.length > 0) {
            markerDataList.current.forEach((e) => {
              e.setMap(null);
            });
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

        // 줌 레벨이 15보다 작을 경우, 지도의 모든 마커를 지우고 가져온 데이터를 삭제한 뒤 알림 메시지 출력
        if (map.getZoom() < 15) {
          if (markerDataList.current.length > 0) {
            markerDataList.current.forEach((e) => {
              e.setMap(null);
            });
          }
          setMarkerData([]);

          openZoomMessage();
        }
      });

      return () => {
        naver.maps.Event.removeListener(listener);
      };
    }
  }, [map, setMarkerData, openZoomMessage]);

  // 확대, 축소, 지도의 이동 등의 이벤트로 bounds 값이 변경되면 실행할 동작
  useEffect(() => {
    const debounceMapMovingHandler = debounce(mapMovingHandler, 300);
    if (bounds) {
      debounceMapMovingHandler();
      return debounceMapMovingHandler.cancel;
    }
  }, [map, bounds, mapMovingHandler]);

  return (
    <>
      <MapWrapper id="map">
        <ConfirmWrapper display={zoomMessage}>
          <ConfirmCenterDescription>
            화장실 위치 정보 확인을 위해 지도를 확대해 주세요.
          </ConfirmCenterDescription>
        </ConfirmWrapper>
      </MapWrapper>
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
  display: ${(props) => props.display || 'flex'};
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
  animation: ${animation} 500ms ease;
`;

const ConfirmCenterDescription = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-small);
  font-weight: bold;
  cursor: default;
`;

export default NaverMap;
