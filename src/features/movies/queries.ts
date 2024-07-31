import { useQuery, keepPreviousData, queryOptions } from "@tanstack/react-query";
import { movies$, type Movies } from "#src/data";

type QueryFnReturnType = {
  paginatedData: Movies;
  isLastPage: boolean;
};

export const moviesOptions = (page: number, itemsPerPage: number, category: string) => {
  return queryOptions({
    queryKey: ["movies", page, itemsPerPage, category],
    queryFn: async () => {
      const response = await movies$;
      const filteredMovies =
        category && category !== "all" ? response.filter((movie) => movie.category === category) : response;
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
  category: string,
  select?: (data: QueryFnReturnType) => T,
) =>
  useQuery({
    ...moviesOptions(page, itemsPerPage, category),
    placeholderData: keepPreviousData,
    select,
  });

export const useMovies = (page: number, itemsPerPage: number, category: string) =>
  useMoviesQuery(page, itemsPerPage, category, undefined);

export const useMoviesCategories = (page: number, itemsPerPage: number, category: string) =>
  useMoviesQuery(page, itemsPerPage, category, (data) => {
    const unique = new Set(getCategoryFromMovies(data.paginatedData));
    return [...unique];
  });

function getCategoryFromMovies(movies: Movies) {
  return movies.map((d) => d.category);
}
