import { useQuery, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { movies$, type Movies } from "#src/data";

type QueryFnReturnType = {
  paginatedData: Movies;
  isLastPage: boolean;
};

export const moviesOptions = (page: number, itemsPerPage: number) => {
  return queryOptions({
    queryKey: ["movies", page, itemsPerPage],
    queryFn: async () => {
      const response = await movies$;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = response.slice(startIndex, endIndex);
      const isLastPage = paginatedData.length < itemsPerPage;
      return { paginatedData, isLastPage };
    },
  });
};

const useMoviesQuery = <T = QueryFnReturnType>(
  page: number,
  itemsPerPage: number,
  select?: (data: QueryFnReturnType) => T,
) =>
  useQuery({
    ...moviesOptions(page, itemsPerPage),
    placeholderData: keepPreviousData,
    select,
  });

export const useMovies = (page: number, itemsPerPage: number) => useMoviesQuery(page, itemsPerPage, undefined);

export const useMoviesCategories = (page: number, itemsPerPage: number) =>
  useMoviesQuery(page, itemsPerPage, (data) => {
    const unique = new Set(getCategoryFromMovies(data.paginatedData));
    return [...unique];
  });

function getCategoryFromMovies(movies: Movies) {
  return movies.map((d) => d.category);
}
