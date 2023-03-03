import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import userLocation from '../../assets/imgs/user_location.png';
import toiletMarker from '../../assets/imgs/toilet_marker.png';

const { naver } = window;

const NaverMap = (props) => {
  // 맵 객체 저장을 위한 state 값
  const [map, setMap] = useState(null);

  // 현재 보고 있는 맵의 넓이를 확인하기 위한 bounds를 저장하기 위한 state 값
  const [bounds, setBounds] = useState(null);

  // 맵에 표현한 마커의 목록을 관리하기 위한 배열
  const markerDataList = [];

  // axios 통신으로 받아온 데이터를 담는 변수
  const markerData = props.markerData;

  // axios 통신으로 받아온 데이터를 담기 위한 함수
  const setMarkerData = props.setMarkerData;

  // 화장실 관련 데이터를 처리하기 위한 함수
  const toiletDataProcessing = (data) => {
    const dataArray = data.result;
    dataArray.forEach((e) => {
      const location = new naver.maps.LatLng(e.lat, e.lng);

      const markerOptions = {
        position: location,
        map: map,
        icon: { url: toiletMarker, scaledSize: [35, 50] },
      };
      const marker = new naver.maps.Marker(markerOptions);
      markerDataList.push(marker);
    });
  };

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
        zoom: 16,
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
        zoom: 16,
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
    // debounce 함수를 사용해 동일한 이벤트가 발생할 경우 가장 마지막에 일어난 이벤트만 실행
    const mapMovingHandler = debounce(() => {
      if (markerDataList.length !== 0) {
        markerDataList.forEach((e) => {
          console.log(e);
          e.setMap(null);
        });
        // markerDataList 배열 초기화
        markerDataList.length = 0;
      }

      console.log(markerDataList);

      setMarkerData({
        result: [
          {
            id: 1,
            category: '공공화장실',
            nameArray: ['부천1'],
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
            nameArray: ['부천2'],
            region: '경기도 부천시',
            address: '원미구 중동',
            management: '김대영',
            phoneNumber: '010-7797-7497',
            openTime: '24시간',
            lat: 37.494475,
            lng: 126.7648915,
          },
          {
            id: 3,
            category: '공공화장실',
            nameArray: ['부천3'],
            region: '경기도 부천시',
            address: '원미구 중동',
            management: '김대영',
            phoneNumber: '010-7797-7497',
            openTime: '24시간',
            lat: 37.48405941562548,
            lng: 126.78321947937603,
          },
          {
            id: 4,
            category: '공공화장실',
            nameArray: ['부천4'],
            region: '경기도 부천시',
            address: '원미구 중동',
            management: '김대영',
            phoneNumber: '010-7797-7497',
            openTime: '24시간',
            lat: 37.48152852084354,
            lng: 126.79380935478635,
          },
        ],
      });

      if (Object.keys(markerData).length !== 0) {
        toiletDataProcessing(markerData);
      }
    }, 300);

    if (bounds) {
      mapMovingHandler();
      return mapMovingHandler.cancel;
    }
  }, [map, bounds]);

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
