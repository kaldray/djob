import { useMoviesCategories } from "#src/features/movies/queries";
import * as React from "react";

type SearchProps = {
  page: number;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  category: Set<string>;
  setCategory: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export function Search({ page, itemsPerPage, setItemsPerPage, setCategory, category }: SearchProps) {
  const [selectedOptions, setSelectedOptions] = React.useState(new Set(["all"]));
  const startTransition = React.startTransition;
  const { data } = useMoviesCategories(page, itemsPerPage, [...category]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const limit = form.get("limit") ?? "4";
    const category = form.getAll("category");
    const arrCategory = category.map((v) => v.toString());
    startTransition(() => {
      setItemsPerPage(Number(limit));
      setCategory(new Set(arrCategory));
    });
  }

  function handleSelectedOptions(e: React.ChangeEvent<HTMLSelectElement>) {
    const options = [...e.target.selectedOptions];
    const values = options.map((option) => option.value);
    if (options.length === 0) {
      setSelectedOptions(() => {
        return new Set(["all"]);
      });
    } else {
      if (selectedOptions.has("all")) {
        setSelectedOptions((prev) => {
          return new Set([...prev, ...values].filter((x) => x !== "all"));
        });
      } else if (!selectedOptions.has("all") && values.includes("all")) {
        setSelectedOptions((prev) => {
          return new Set([...prev, ...values].filter((x) => x === "all"));
        });
      } else {
        setSelectedOptions(() => {
          return new Set([...values]);
        });
      }
    }
  }

  return (
    <>
      <form id="filters" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-wrap justify-center gap-11">
          <div className="flex flex-col gap-3">
            <label className="font-archivo" htmlFor="category-select">
              Filtrer par catégorie
            </label>
            <select
              multiple
              value={[...selectedOptions]}
              onChange={(e) => handleSelectedOptions(e)}
              className="shadow-neoB font-archivo rounded-lg border-2 border-black bg-[#3300FF] p-3 text-sm text-white"
              id="category-select"
              name="category">
              <option value="all">Toutes les catégories</option>
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
              // onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="shadow-neoB font-archivo rounded-lg border-2 border-black bg-[#3300FF] p-3 text-sm text-white"
              id="limit-select"
              name="limit">
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <button
              className="shadow-neoB font-archivo rounded-md border-2 border-black bg-[#3300FF] p-3 text-center text-white transition-shadow hover:scale-110 active:enabled:scale-90 disabled:cursor-not-allowed disabled:bg-[#ccc] disabled:text-black"
              type="submit">
              Rechercher
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
