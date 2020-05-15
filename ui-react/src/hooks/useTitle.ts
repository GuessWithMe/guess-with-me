import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import appTitleState from "recoil/atoms/app/title";

const useTitle = (title: string) => {
  const setAppTitle = useSetRecoilState(appTitleState);

  useEffect(() => {
    setAppTitle(title);
  }, []);
};

export default useTitle;
