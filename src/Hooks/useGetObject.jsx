import axios from "axios";
import { useEffect } from "react";
import { useObject } from "./useObject";
import { useAuth0 } from "@auth0/auth0-react";

export const useGetObject = (url) => {
  const object = useObject();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchObject = async () => {
      return await axios.get(url, {
        headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
      });
    };
    fetchObject().then(({ data }) => {
      object.changeContentTo(data);
    });
  }, []);

  return object;
};
