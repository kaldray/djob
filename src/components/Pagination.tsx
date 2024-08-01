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
        className="hover:enabled:shadow-neoB-hover shadow-neoB font-archivo rounded-md border-2 border-black bg-[#3300FF] p-3 text-center text-white transition-shadow active:enabled:scale-90 disabled:cursor-not-allowed disabled:bg-[#ccc] disabled:text-black"
        disabled={page === 1}
        aria-disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}>
        Précédent
      </button>
      <button
        className="hover:enabled:shadow-neoB-hover shadow-neoB font-archivo rounded-md border-2 border-black bg-[#3300FF] p-3 text-center text-white transition-shadow active:enabled:scale-90 disabled:cursor-not-allowed disabled:bg-[#ccc] disabled:text-black"
        disabled={data?.isLastPage}
        aria-disabled={data?.isLastPage}
        onClick={() => setPage((prev) => prev + 1)}>
        Suivant
      </button>
    </>
  );
}
