import Image from "next/image";
import s from "./styles/MovieInfo.module.scss";
import { Sepearator } from "@/components/ui/Separator";
import { ExtendedMovieType } from "@/types/movies";

interface MovieInfoProps {
  movie: ExtendedMovieType;
}

export const MovieInfo = ({ movie }: MovieInfoProps) => {
  const trailer = movie.videos?.results?.filter((vid) => vid.type === "Trailer")?.[0]
  return (
    <section className={s.container}>
      <div>
        <h2>Trailer</h2>
        {trailer ? (
          <iframe
            width="500"
            height="281"
            src={
              process.env.NEXT_PUBLIC_YOUTUBE_URL + trailer.key
            }
          ></iframe>
        ) : (
          "No trailer 😢"
        )}
      </div>
      <Sepearator className={s.separator} />
      <div className={s.description}>
        <h2>Description</h2>
        <p>{movie.overview ? movie.overview : "No description 😢"} </p>
      </div>
      <Sepearator className={s.separator} />
      <div className={s.production}>
        <h2>Production</h2>
        <div>
          {movie.production_companies.map((comp) => (
            <div key={comp.id} className={s.prod_item}>
              <div className={s.prod_image}>
                <Image
                  src={comp.logo_path ? process.env.NEXT_PUBLIC_IMAGES_URL+comp.logo_path : "/images/no_prod_img.svg"}
                  alt="prod"
                  width={40}
                  height={40}
                />
              </div>
              <p>{comp.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
