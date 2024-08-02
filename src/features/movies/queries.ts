import { useSuspenseQuery, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { movies$, type Movies } from "#src/data";

type QueryFnReturnType = {
  paginatedData: Movies;
  isLastPage: boolean;
};

export const moviesOptions = (page: number, itemsPerPage: number, category: Array<string>) => {
  return queryOptions({
    queryKey: ["movies", page, itemsPerPage, ...category],
    queryFn: async () => {
      const response = await movies$;
      const filteredMovies = category.includes("all")
        ? response
        : response.filter((movie) => category.includes(movie.category));
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filteredMovies.slice(startIndex, endIndex);
      const isLastPage = paginatedData.length < itemsPerPage;
      return { paginatedData, isLastPage };
    },
  });
};

const useMoviesQuery = <T = QueryFnReturnType>(
  page: number,
  itemsPerPage: number,
  category: Array<string>,
  select?: (data: QueryFnReturnType) => T,
) =>
  useSuspenseQuery({
    ...moviesOptions(page, itemsPerPage, category),
    select,
  });

export const useMovies = (page: number, itemsPerPage: number, category: Array<string>) =>
  useMoviesQuery(page, itemsPerPage, category, undefined);

export const useMoviesCategories = (page: number, itemsPerPage: number, category: Array<string>) =>
  useMoviesQuery(page, itemsPerPage, category, (data) => {
    const unique = new Set(getCategoryFromMovies(data.paginatedData));
    return [...unique];
  });

function getCategoryFromMovies(movies: Movies) {
  return movies.map((d) => d.category);
}
