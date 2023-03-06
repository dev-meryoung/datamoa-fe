import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import userLocation from '../../assets/imgs/user_location.png';
import toiletMarker from '../../assets/imgs/toilet_marker.png';

const { naver } = window;

const NaverMap = (props) => {
  // 맵 객체 저장을 위한 state 값
  const [map, setMap] = useState(null);

  // 현재 보고 있는 맵의 넓이를 확인하기 위한 bounds를 저장하는 state 값
  const [bounds, setBounds] = useState(null);

  // 맵에 표현된 마커의 목록을 관리하기 위한 ref 변수
  const markerDataList = useRef([]);

  // axios 통신으로 받아온 데이터를 담기 위한 함수
  const setMarkerData = props.setMarkerData;

  // axios 통신으로 받아온 데이터를 담는 state 변수
  const markerData = props.markerData;

  // axios 통신을 이용해 데이터를 받아오는 함수
  const getMarkerData = async () => {
    const data = [
      {
        id: 1,
        category: '공공화장실',
        nameArray: [`부천${Math.floor(Math.random() * 10) + 1}`],
        region: '경기도 부천시',
        address: '원미구 중동',
        management: '김대영',
        phoneNumber: '010-7797-7497',
        openTime: '24시간',
        lat: 37.4941134,
        lng: 126.7647429,
      },
      {
        id: 2,
        category: '공공화장실',
        nameArray: [`부천${Math.floor(Math.random() * 10) + 1}`],
        region: '경기도 부천시',
        address: '원미구 중동',
        management: '김대영',
        phoneNumber: '010-7797-7497',
        openTime: '24시간',
        lat: 37.494475,
        lng: 126.7648915,
      },
    ];

    return data;
  };

  // 맵 이동 시에 동작하는 함수
  const mapMovingHandler = useCallback(async () => {
    // axios 통신을 이용해 마커 정보를 가져와 state 변수에 설정
    setMarkerData(await getMarkerData());
  }, [setMarkerData]);

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
          icon: { url: toiletMarker, scaledSize: [35, 50] },
        };

        const marker = new naver.maps.Marker(markerOptions);

        return marker;
      });

      // 마커 리스트 목록에 현재의 마커 목록을 최신화함 (새로운 데이터를 받아올 때 삭제하기 위해)
      markerDataList.current = newMarkerDataList;
    }
  }, [map, markerData]);

  // props로 받아온 검색 목록의 좌표가 변경될 때마다 지도의 중심 좌표를 변경
  useEffect(() => {
    if (map && props.centerCoord) {
      const location = new naver.maps.LatLng(
        props.centerCoord.lat,
        props.centerCoord.lng
      );
      map.panTo(location);
    }
  }, [map, props.centerCoord]);

  // 기본 맵 초기화 과정
  useEffect(() => {
    // 오류 없이 현재 위치를 불러왔을 경우 해당 좌표를 중심으로 설정하는 함수
    const successMapSetting = (position) => {
      const { latitude, longitude } = position.coords;
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

  // 초기화된 맵이 생성되면 사용자가 바라보는 지도의 좌측 하단 좌표 계산
  useEffect(() => {
    if (map) {
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
      });
      return () => {
        naver.maps.Event.removeListener(listener);
      };
    }
  }, [map]);

  // 확대, 축소, 지도의 이동 등의 이벤트로 bounds 값이 변경되면 실행할 동작
  useEffect(() => {
    const debounceMapMovingHandler = debounce(mapMovingHandler, 300);
    if (bounds) {
      debounceMapMovingHandler();
      return debounceMapMovingHandler.cancel;
    }
  }, [map, bounds, mapMovingHandler]);

  return <MapWrapper id="map"></MapWrapper>;
};

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  z-index: 0;

  &:focus {
    outline: none;
  }
`;

export default NaverMap;
