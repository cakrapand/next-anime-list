import AnimeCard from "@/components/AnimeCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Anime,
  GetTopAnimeResponse,
  getAnimeFullById,
  getTopAnime,
} from "@/lib/jikan";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

type Props = {
  initialData: GetTopAnimeResponse;
};

export default function Home({ initialData }: Props) {
  return (
    <main className="container">
      {!initialData && <p>Failed Fetching Data</p>}
      <ul className="grid grid-cols-3 lg:grid-cols-5">
        {initialData.data.map((item) => (
          <AnimeCard key={item.mal_id} anime={item} />
        ))}
      </ul>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/page/${initialData.pagination.current_page - 1 < 1 ? 1 : initialData.pagination.current_page - 1}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`/page/${initialData.pagination.current_page}`}
              isActive
            >
              {initialData.pagination.current_page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              {initialData.pagination.current_page + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              {initialData.pagination.current_page + 2}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}

export async function getStaticProps() {
  const initialData = await getTopAnime({ page: 1 });

  return {
    props: {
      initialData: initialData,
    },
    revalidate: 18000,
  };
}
