import { QueryClient } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type Anime = {
  mal_id: number;
  title: string;
  images: {
    webp: { image_url: string };
  };
};

export type GetTopAnimeResponse = {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
};

export const queryClient = new QueryClient();

//TODO: HANDLE ERROR
export async function getTopAnime(params: { page: number }) {
  const response = await fetch(`${BASE_URL}/top/anime?page=${params.page}`);

  const topAnimeResponse = await response.json();

  return topAnimeResponse as GetTopAnimeResponse;
}

export async function getAnimeFullById(params: { animeId: string }) {
  const response = await fetch(`${BASE_URL}/anime/${params.animeId}/full`);

  const { data } = await response.json();

  return data as Anime;
}
