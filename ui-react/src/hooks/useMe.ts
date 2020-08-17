import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import services from "services";
import userAtoms from "recoil/atoms/user";

const useMe = () => {
  const setMe = useSetRecoilState(userAtoms.me);

  useEffect(() => {
    const get = async () => {
      const me = await services.user.me();

      if (me) setMe(() => me);
    };
    get();
  }, [setMe]);
};

export default useMe;
