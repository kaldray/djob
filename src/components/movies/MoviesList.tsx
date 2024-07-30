import { useMovies } from "#src/features/movies/queries.ts";
import { Film } from "./Movie.tsx";

type MovieListProps = {
  page: number;
  itemsPerPage: number;
};

export function MovieList({ page, itemsPerPage }: MovieListProps) {
  const { data } = useMovies(page, itemsPerPage);
  return (
    <>{data && data.paginatedData.map((d) => <Film page={page} itemsPerPage={itemsPerPage} key={d.id} {...d} />)}</>
  );
}
