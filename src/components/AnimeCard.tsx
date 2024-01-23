import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Anime } from "@/lib/jikan";
import Image from "next/image";

type Props = {
  anime: Anime;
};

export default function AnimeCard({ anime }: Props) {
  return (
    <Card className="w-44 hover:cursor-pointer">
      <CardHeader>
        <CardTitle>{anime.title}</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <Image
          src={anime.images.webp.image_url}
          alt={anime.title}
          width={50}
          height={50}
        /> */}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
