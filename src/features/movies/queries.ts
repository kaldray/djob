import { useQuery, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { movies$, type Movies } from "#src/data";

export const moviesOptions = (page?: number) => {
  return queryOptions({
    queryKey: ["movies", page],
    queryFn: async () => movies$,
  });
};

const useMoviesQuery = <T = Movies>(select?: (data: Movies) => T, page?: number) =>
  useQuery({
    ...moviesOptions(page),
    placeholderData: keepPreviousData,
    select,
  });

export const useMovies = (page: number) => useMoviesQuery(undefined, page);

export const useMoviesCategories = (page: number) =>
  useMoviesQuery((data) => {
    const unique = new Set(getCategoryFromMovies(data));
    return [...unique];
  }, page);

function getCategoryFromMovies(movies: Movies) {
  return movies.map((d) => d.category);
}
