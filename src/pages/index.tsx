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
import { Anime, GetTopAnimeResponse, getTopAnime } from "@/lib/jikan";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

type Props = {
  initialData: GetTopAnimeResponse;
};

export default function Home({ initialData }: Props) {
  const router = useRouter();
  console.log(router.query);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["animes", 2],
    queryFn: () => getTopAnime({ page: 2 }),
    initialData: initialData,
  });

  if (isError) return <p>Error</p>;
  return (
    <main className="container">
      {isFetching && <p>Loading...</p>}
      <ul className="flex flex-wrap justify-evenly">
        {data.data.map((item) => (
          <li key={item.mal_id} className="">
            <AnimeCard anime={item} />
          </li>
        ))}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/page/${data.pagination.current_page - 1 < 1 ? 1 : data.pagination.current_page - 1}`}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {data.pagination.current_page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              {data.pagination.current_page + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              {data.pagination.current_page + 2}
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
    revalidate: 1800,
  };
}
