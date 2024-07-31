import * as React from "react";
import { MovieList } from "./components/movies/MoviesList";
import { Navbar } from "./components/Navbar";
import { Pagination } from "./components/Pagination";
import { Search } from "./components/Search";

function App() {
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(4);
  const [category, setCategory] = React.useState("all");
  return (
    <>
      <Navbar />
      <main>
        <section className="mx-auto w-4/5">
          <div className="mt-5">
            <Search
              page={page}
              itemsPerPage={itemsPerPage}
              setCategory={setCategory}
              category={category}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
          <div className="mt-5 flex w-full flex-wrap gap-4">
            <MovieList page={page} itemsPerPage={itemsPerPage} category={category} />
          </div>
          <div className="mt-10 flex flex-row items-center justify-center gap-5">
            <Pagination setPage={setPage} itemsPerPage={itemsPerPage} page={page} category={category} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
