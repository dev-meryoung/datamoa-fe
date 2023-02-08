import { createGlobalStyle } from 'styled-components';
import PretendardWoff from '../assets/fonts/Pretendard-Regular.woff';
import PretendardWoff2 from '../assets/fonts/Pretendard-Regular.woff2';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardWoff}), url(${PretendardWoff2});
  }

  :root{
    /* 색상 */
    --color-main-blue: #466CFF;
    --color-dark-white: #bdbdbd;
    --color-grey: #616161;
    --color-light-grey: #7c7979;

    /* 폰트 크기 */ 
    --font-large: 40px;
    --font-medium: 25px;
    --font-regular: 16px;
    --font-small: 14px;
    --font-micro: 12px;
  }

  *{
    font-family: 'Pretendard';
    font-size: var(--font-regular);
  }

  h1 {
    font-size: var(--font-large);
  }

  h2 {
    font-size: var(--font-medium);
  }

  h3 {
    font-size: var(--font-regular);
  }

  p {
    font-size: var(--font-small);
  }

  a {
    color: black;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      color: var(--color-main-blue);
    }
  }

  img{
    vertical-align: middle;
    max-width: 100%;
  }

  ul {
    list-style: none;
    padding-inline-start: 0px;
  }

  li {
    margin-top: 0.5rem;
  }

  .freeze {
    height: 100%;
    overflow: hidden;
  }
`;

export default GlobalStyles;
