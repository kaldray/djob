import { useMovies } from "#src/features/movies/queries.ts";
import { Film } from "./Movie.tsx";

type MovieListProps = {
  page: number;
  itemsPerPage: number;
  category: Set<string>;
};

export function MovieList({ page, itemsPerPage, category }: MovieListProps) {
  const { data } = useMovies(page, itemsPerPage, [...category]);

  return (
    <>
      {data?.paginatedData && data.paginatedData.length > 0 ? (
        data.paginatedData.map((d) => (
          <Film page={page} itemsPerPage={itemsPerPage} key={d.id} selectCategory={category} {...d} />
        ))
      ) : (
        <p className="font-archivo text-lg">Aucune données n'est disponible</p>
      )}
    </>
  );
}
