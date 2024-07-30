import { useMovies } from "#src/features/movies/queries.ts";
import { Film } from "./Movie.tsx";

export function MovieList({ page }: { page: number }) {
  const { data } = useMovies(page);
  return <>{data && data.map((d) => <Film key={d.id} {...d} />)}</>;
}
