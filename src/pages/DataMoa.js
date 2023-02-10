import styled from 'styled-components';
import axios from 'axios';

import { API } from '../config';

import Layout from '../components/layout/Layout';

const DataMoa = () => {
  // AXIOS 통신을 이용해 메인 페이지 UI 구현에 필요한 데이터를 가져와 get 함수에 연결

  // axios
  //   .get(API.CATEGORY)
  //   .then((response) => response.data)
  //   .then((data) => console.log(data.result));
  // 결과
  const cResult = [
    {
      categoryId: 1,
      categoryTitle: '위치 찾기',
      pageIdArray: [
        {
          pageId: 1,
        },
        {
          pageId: 2,
        },
      ],
    },
    {
      categoryId: 2,
      categoryTitle: '테스트 1',
      pageIdArray: [
        {
          pageId: 3,
        },
      ],
    },
  ];

  // axios
  //   .get(API.SUBPAGE)
  //   .then((response) => response.data)
  //   .then((data) => console.log(data.result));
  // 결과
  const sResult = [
    {
      pageId: 1,
      pageTitle: '화장실 찾기',
      pageUrl: '/toilet',
      pageDescription: '화장실 위치 찾기 페이지 설명입니다.',
      categoryId: 1,
    },
    {
      pageId: 2,
      pageTitle: '복권방 찾기',
      pageUrl: '/lotto',
      pageDescription: '복권방 위치 찾기 페이지 설명입니다.',
      categoryId: 1,
    },
    {
      pageId: 3,
      pageTitle: '주가 확인',
      pageUrl: '/stock',
      pageDescription: '주식 확인 페이지 설명입니다.',
      categoryId: 2,
    },
  ];

  return (
    <Layout>
      <Wrapper>
        <Content>
          <p>{}</p>
        </Content>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.main``;

export default DataMoa;
