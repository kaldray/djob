import { useMovies } from "#src/features/movies/queries";
import type { PropsWithChildren } from "react";

type PaginationProps = {
  page: number;
  itemsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
} & PropsWithChildren;

export function Pagination({ page, itemsPerPage, setPage }: PaginationProps) {
  const { data } = useMovies(page, itemsPerPage);
  return (
    <>
      <button
        className="rounded-md border-2 p-3 text-center disabled:cursor-not-allowed"
        disabled={page === 1}
        aria-disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}>
        Précédent
      </button>
      <button
        className="rounded-md border-2 p-3 text-center disabled:cursor-not-allowed"
        disabled={data?.isLastPage}
        aria-disabled={data?.isLastPage}
        onClick={() => setPage((prev) => prev + 1)}>
        Suivant
      </button>
    </>
  );
}
