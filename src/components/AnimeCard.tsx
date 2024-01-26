import React from "react";
import { Anime } from "@/lib/jikan";
import Image from "next/image";
import Link from "next/link";

type Props = {
  anime: Anime;
};

export default function AnimeCard({ anime }: Props) {
  return (
    <li className="flex items-center justify-center">
      <div>
        <Link href={`/${anime.mal_id}`}>
          <div className="overflow-hidden rounded-md">
            <Image
              src={anime.images.webp.image_url}
              alt={anime.title}
              width={200}
              height={200}
            ></Image>
          </div>
        </Link>
        <p>
          {anime.title.length > 15
            ? anime.title.substring(0, 15) + "..."
            : anime.title}
        </p>
      </div>
    </li>
  );
}
