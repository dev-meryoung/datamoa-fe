import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../config';

const MainMenuListData = () => {
  // 카테고리 정보와 그에 속한 페이지 데이터를 저장하기 위한 State 값
  const [categoryData, setCategoryData] = useState([]);

  // axios 통신을 이용해 카테고리와 페이지 정보를 가져와 저장
  useEffect(() => {
    const getResponse = async () => {
      const category = await axios(API.CATEGORY)
        .then((res) => res.data)
        .then((data) => data.result);
      setCategoryData(category);
    };

    getResponse();
  }, []);

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

export default MainMenuListData;
