import { useMovies } from "#src/features/movies/queries";

type PaginationProps = {
  page: number;
  itemsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  category: string;
};

export function Pagination({ page, itemsPerPage, setPage, category }: PaginationProps) {
  const { data } = useMovies(page, itemsPerPage, category);

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
