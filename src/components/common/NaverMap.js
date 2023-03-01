import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import userLocation from '../../assets/imgs/user_location.png';
import toiletMarker from '../../assets/imgs/toilet_marker.png';

const { naver } = window;

const NaverMap = () => {
  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);

  // 기본 맵 초기화 과정
  useEffect(() => {
    // 오류 없이 현재 위치를 불러왔을 경우 해당 좌표를 중심으로 설정하는 함수
    const successMapSetting = (position) => {
      const { latitude, longitude } = position.coords;
      const location = new naver.maps.LatLng(latitude, longitude);
      const map = new naver.maps.Map('map', {
        center: location,
        zoom: 16,
      });

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
      const map = new naver.maps.Map('map', {
        center: location,
        zoom: 16,
      });

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
    const test = debounce(() => {
      const location = new naver.maps.LatLng(bounds.sw.lat, bounds.sw.lng);

      const markerOptions = {
        position: location,
        map: map,
        icon: { url: toiletMarker, scaledSize: [40, 50] },
      };

      new naver.maps.Marker(markerOptions);
    }, 300);

    if (bounds) {
      test();
      return test.cancel;
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
