import { useMoviesCategories } from "#src/features/movies/queries";

export function Search() {
  const { data } = useMoviesCategories();

  return (
    <>
      <div className="flex flex-wrap">
        <form id="filters">
          <div className="flex flex-col gap-3">
            <label htmlFor="category-select">Filtrer par catégorie</label>
            <select className="rounded-lg border-gray-300 text-sm text-gray-900" id="category-select" name="category">
              {data &&
                data.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>
          </div>
        </form>
      </div>
    </>
  );
}
