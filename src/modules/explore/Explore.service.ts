import { useQuery, useQueryClient } from "react-query";
import { client } from "../services/api";
import { IPandaVideos } from "./Explore.type";

export function getVideos(page: number, limit: number ) : Promise<IPandaVideos|Error>{

  return new Promise((resolve, reject) => {
    client.get(`/videos?page=${page}&limit=${limit}`)
      .then(({data}) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      })
    });
}

export function useRequestProcessor() {
  const queryClient = useQueryClient();

  function query(key, queryFunction, options = {}){
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options, 
    })
  }
  return {query}
}