/*global kakao*/
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  return (
    <>
      <KakaoMapWrapper id="map"></KakaoMapWrapper>
    </>
  );
};

const KakaoMapWrapper = styled.div`
  width: 500px;
  height: 500px;
`;

export default KakaoMap;
