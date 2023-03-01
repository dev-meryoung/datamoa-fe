// 특정 문자열을 뒤에서부터 찾아 그 이후의 문자열만 사용하는 메소드
const lastIndexOfUtil = (str, e) => {
  const idx = str.lastIndexOf(e);
  const result = str.substring(idx + 1);

  return result;
};

export default lastIndexOfUtil;
