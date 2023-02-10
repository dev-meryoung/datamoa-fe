import { useEffect } from 'react';

// ESC 키가 눌렸을 때 특정 창을 닫기 위한 커스텀 훅
const useEscKeyClose = (closeThing) => {
  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeThing();
      }
    };
    window.addEventListener('keydown', escKeyModalClose);
    return () => window.removeEventListener('keydown', escKeyModalClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useEscKeyClose;
