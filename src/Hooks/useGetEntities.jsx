import axios from "axios";
import { useEffect } from "react";
import { useArrayEntities } from "./useArrayEntities";
import { useAuth0 } from "@auth0/auth0-react";

export const useGetEntities = (url) => {
  const entities = useArrayEntities(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchEntities = async () => {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
      });
      return response;
    };
    fetchEntities().then(({ data }) => {
      entities.changeContentTo(data);
    });
  }, []);

  return entities;
};
