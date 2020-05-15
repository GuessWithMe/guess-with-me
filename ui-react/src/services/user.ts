import { User } from "commonTypes";
import config from "config";
import http from "lib/api";

class UserService {
  public me = async () => {
    const res = await http<{ me: User }>(`${config.apiUrl}/users/me`);
    return res.me;
  };

  public signOut = async () => {
    await http(`${config.apiUrl}/auth/logout`);
  };
}

export default new UserService();
