import styled from 'styled-components';
import axios from 'axios';
import { API } from '../config';

import Layout from '../components/layout/Layout';

const DataMoa = () => {
  const categoryData = [
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
    {
      categoryId: 3,
      categoryTitle: '테스트 2',
      pageIdArray: [
        {
          pageId: 4,
        },
      ],
    },
  ];

  const subPageData = [
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
    {
      pageId: 4,
      pageTitle: '주가 확인이라고용',
      pageUrl: '/stock',
      pageDescription: '주식 확인 페이지 설명입니다.',
      categoryId: 3,
    },
    {
      pageId: 5,
      pageTitle: '주가 확인',
      pageUrl: '/stock',
      pageDescription: '주식 확인 페이지 설명입니다.',
      categoryId: 2,
    },
  ];

  // 사이드바 메뉴를 구성하기 위한 데이터를 가공하는 함수
  const getSideBarMenuData = (categoryData, subPageData) => {
    const sideBarMenuData = [];

    categoryData.forEach((ce) => {
      const sideBarMenu = {
        categoryId: '',
        categoryTitle: '',
        pageTitle: [],
        pageUrl: [],
      };
      sideBarMenu.categoryId = ce.categoryId;
      sideBarMenu.categoryTitle = ce.categoryTitle;
      subPageData.forEach((se) => {
        if (se.categoryId === ce.categoryId) {
          sideBarMenu.pageTitle.push(se.pageTitle);
          sideBarMenu.pageUrl.push(se.pageUrl);
        }
      });
      sideBarMenuData.push(sideBarMenu);
    });

    return sideBarMenuData;
  };

  return (
    <Layout sideBarMenuData={getSideBarMenuData(categoryData, subPageData)}>
      <Wrapper>
        <Content>
          <h1>메인페이지</h1>
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
