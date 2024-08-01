import { useMoviesCategories } from "#src/features/movies/queries";

type SearchProps = {
  page: number;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export function Search({ page, itemsPerPage, setItemsPerPage, setCategory, category }: SearchProps) {
  const { data } = useMoviesCategories(page, itemsPerPage, category);

  return (
    <>
      <form id="filters">
        <div className="flex flex-wrap justify-center gap-11">
          <div className="flex flex-col gap-3">
            <label className="font-archivo" htmlFor="category-select">
              Filtrer par catégorie
            </label>
            <select
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow-neoB font-archivo rounded-lg border-2 border-black bg-[#3300FF] p-3 text-sm text-white"
              id="category-select"
              name="category">
              <option value="all">Choisir une catégorie</option>
              {data &&
                data.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-archivo" htmlFor="limit-select">
              Nombre de film par page
            </label>
            <select
              defaultValue={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="shadow-neoB font-archivo rounded-lg border-2 border-black bg-[#3300FF] p-3 text-sm text-white"
              id="limit-select"
              name="limit">
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
      </form>
    </>
  );
}
