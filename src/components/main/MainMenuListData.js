import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultAxios from '../../utils/defaultAxios';
import { API } from '../../config';
import authorAPI from '../../utils/authorAPI';

const MainMenuListData = (props) => {
  // 카테고리 정보와 그에 속한 페이지 데이터를 저장하기 위한 State 값
  const [categoryData, setCategoryData] = useState([]);

  // axios 통신을 이용해 카테고리와 페이지 정보를 가져와 저장
  useEffect(() => {
    const getResponse = async () => {
      const category = await defaultAxios(API.CATEGORY, {
        headers: authorAPI('GET', '/category'),
      })
        .then((res) => res.data)
        .then((data) => data.result);
      setCategoryData(category);
    };

    getResponse();
  }, []);

  // 소개 버튼 클릭 시 동작할 핸들러 함수
  const infoBtnHandler = () => {
    props.setInfoView(true);
    props.closeSideBarHandler();
  };

  // 사이드바의 페이지 목록을 불러오는 함수
  const RenderMenuList = ({ categoryId }) => {
    const menu = categoryData.filter((ce) => ce.categoryId === categoryId);
    return (
      <>
        {menu.map((me) =>
          me.pageDataArray.map((pe) => (
            <SideBarMenuPage key={pe.pageId}>
              <Link to={pe.pageUrl}>─ {pe.pageTitle}</Link>
            </SideBarMenuPage>
          ))
        )}
      </>
    );
  };

  return (
    <>
      <DatamoaPageLink href="https://datamoa.kr/">
        <SideBarMenuCategory>데이터모아</SideBarMenuCategory>
      </DatamoaPageLink>
      <SideBarMenuPage>
        <DatamoaPageLink onClick={infoBtnHandler}>─ 소개</DatamoaPageLink>
      </SideBarMenuPage>
      {categoryData.map((ce) => (
        <div key={ce.categoryId}>
          <SideBarMenuCategory key={ce.categoryId}>
            {ce.categoryTitle}
          </SideBarMenuCategory>
          <RenderMenuList categoryId={ce.categoryId} />
        </div>
      ))}
    </>
  );
};

const SideBarMenuCategory = styled.h2`
  margin-top: 3rem;
  margin-bottom: 0;
`;

const SideBarMenuPage = styled.li``;

const DatamoaPageLink = styled.a`
  font-weight: normal;
  text-decoration: none;
  color: var(--color-black);
  margin: 0;

  &:hover {
    color: var(--color-main-blue);
    cursor: pointer;
  }
`;

export default MainMenuListData;
