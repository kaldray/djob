import { useMovies } from "#src/features/movies/queries.ts";
import { Film } from "./Movie.tsx";

export function MovieList() {
  const { data } = useMovies(1);
  return <>{data && data.map((d) => <Film key={d.id} {...d} />)}</>;
}
