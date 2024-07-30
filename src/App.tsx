import * as React from "react";
import { MovieList } from "./components/movies/MoviesList";
import { Navbar } from "./components/Navbar";
import { Search } from "./components/Search";

function App() {
  const [page] = React.useState(1);
  return (
    <>
      <Navbar />
      <main>
        <section className="mx-auto w-4/5">
          <div className="mt-5">
            <Search page={page} />
          </div>
          <div className="mt-5 flex w-full flex-wrap gap-4">
            <MovieList page={page} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
