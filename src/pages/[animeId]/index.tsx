import { Anime, getAnimeFullById, getTopAnime } from "@/lib/jikan";
import { GetStaticPropsContext } from "next";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  anime: Anime;
};

export default function Index({ anime }: Props) {
  if (!anime) return <p>Error Fecthing Data</p>;
  return <div>AAAAAAAAAA {anime.title}</div>;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const animeId = context.params?.animeId;
  const anime = await getAnimeFullById({ animeId: animeId });

  if (!anime) return { notFound: true };

  return {
    props: {
      anime: anime,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const { data } = await getTopAnime({ page: 2 });

  const paths = data.map((anime) => ({
    params: { animeId: anime.mal_id.toString() },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}
