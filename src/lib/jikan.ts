import { QueryClient } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type Anime = {
  mal_id: string;
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

export async function getTopAnime(params: { page: number }) {
  //TODO: DEFINE DATA RESPONSE
  const response = await fetch(`${BASE_URL}/top/anime?page=${params.page}`);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching data");
    throw error;
  }

  const topAnimeResponse = await response.json();

  return topAnimeResponse as GetTopAnimeResponse;
}
