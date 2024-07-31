import { useMovies } from "#src/features/movies/queries.ts";
import { Film } from "./Movie.tsx";

type MovieListProps = {
  page: number;
  itemsPerPage: number;
  category: string;
};

export function MovieList({ page, itemsPerPage, category }: MovieListProps) {
  const { data } = useMovies(page, itemsPerPage, category);

  return (
    <>
      {data &&
        data.paginatedData.map((d) => (
          <Film page={page} itemsPerPage={itemsPerPage} key={d.id} selectCategory={category} {...d} />
        ))}
    </>
  );
}
