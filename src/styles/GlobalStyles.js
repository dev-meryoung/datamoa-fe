import { createGlobalStyle } from 'styled-components';

import Pretendard from '../assets/fonts/Pretendard.woff2';

import selectArrow from '../assets/imgs/select_arrow.png';

const GlobalStyles = createGlobalStyle`

  // 폰트 추가
  @font-face {
    font-family: 'Pretendard';
    src: url(${Pretendard});
  }


  :root{
    /* 색상 */
    --color-main-blue: #466cff;
    --color-black: #000000;
    --color-grey: #616161;
    --color-light-grey: #7c7979;
    --color-map-grey: #686868;
    --color-back-grey: #ECECEC;
    --color-white: #ffffff;
    --color-middle-white: #f2f2f2;
    --color-dark-white: #bdbdbd;
    --color-red: #ff0000;

    /* 모바일 폰트 크기 */ 
    @media (max-width: 768px) {
      --font-large: 33px;
      --font-medium: 20px;
      --font-regular: 14px;
      --font-small: 12px;
      --font-micro: 11px;
      --font-super-micro: 10px;
    }
    
    /* PC 폰트 크기 */ 
    @media (min-width: 768px) {
      --font-large: 40px;
      --font-medium: 25px;
      --font-regular: 16px;
      --font-small: 14px;
      --font-micro: 12px;
      --font-super-micro: 10px;
    }
  }

  // 모바일 버전
  @media (max-width: 768px) {
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
      text-decoration: none;
      color: var(--color-black);

      &:hover {
        color: var(--color-main-blue);
      }
    }

    i {
      color: var(--color-black);
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;

      &:active {
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

    button {
      border: 1px solid var(--color-dark-white);
      border-radius: 0.5rem;
      cursor: pointer;

      &:hover {
        color: var(--color-main-blue);
        border: 2px solid var(--color-main-blue);
      }
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      appearance: none;
      background: url(${selectArrow}) no-repeat 95%;
      background-size: 0.7rem;
      padding: 0 2rem 0 1rem;
      border: 1px solid var(--color-dark-white);
      border-radius: 0.5rem;
      font-size: var(--font-small);

      &:focus {
        border: 2px solid var(--color-main-blue);
        outline: none;
      }
    }

    option {
      font-size: var(--font-small);
    }

    textarea {
      border: 1px solid var(--color-dark-white);
      border-radius: 0.5rem;
      resize: none;
      box-sizing: border-box;
      padding: 1rem;
      font-size: var(--font-small);

      &:focus {
        border: 2px solid var(--color-main-blue);
        outline: none;
      }
    }

    input {
      &::placeholder {
        opacity: 0.5;
      }
    }

    .freeze {
      height: 100%;
      overflow: hidden;
    }
  }

  // PC 버전
  @media (min-width: 768px) {
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
      text-decoration: none;
      color: var(--color-black);

      &:hover {
        color: var(--color-main-blue);
      }
    }

    i {
      color: var(--color-black);
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;

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

    button {
      border: 1px solid var(--color-dark-white);
      border-radius: 0.5rem;
      cursor: pointer;

      &:hover {
        color: var(--color-main-blue);
        border: 2px solid var(--color-main-blue);
      }
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      appearance: none;
      background: url(${selectArrow}) no-repeat 95%;
      background-size: 0.7rem;
      padding: 0 2rem 0 1rem;
      border: 1px solid var(--color-dark-white);
      border-radius: 0.5rem;
      font-size: var(--font-small);

      &:focus {
        border: 2px solid var(--color-main-blue);
        outline: none;
      }
    }

    option {
      font-size: var(--font-small);
    }

    textarea {
      border: 1px solid var(--color-dark-white);
      border-radius: 0.5rem;
      resize: none;
      box-sizing: border-box;
      padding: 1rem;
      font-size: var(--font-small);

      &:focus {
        border: 2px solid var(--color-main-blue);
        outline: none;
      }
    }

    input {
      &::placeholder {
        opacity: 0.5;
      }
    }

    input.text {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    }

    .freeze {
      height: 100%;
      overflow: hidden;
    }
  }
`;

export default GlobalStyles;
