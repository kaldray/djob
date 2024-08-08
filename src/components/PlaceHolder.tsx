export function MoviePlaceholder() {
  return (
    <>
      {Array(4)
        .fill(4)
        .map((k, i) => (
          <div
            key={i}
            className="h-[120px] w-[500px] animate-pulse rounded-md border-2 border-black bg-white p-3 shadow-neoB"></div>
        ))}
    </>
  );
}

export function PaginationPlaceholder() {
  return (
    <>
      {Array(2)
        .fill(2)
        .map((k, i) => (
          <button
            key={i}
            className="h-[52px] w-[150px] animate-pulse rounded-md border-2 border-black bg-[#3300FF] p-3 text-center font-archivo text-white shadow-neoB transition-shadow active:enabled:scale-90 disabled:cursor-not-allowed disabled:bg-[#ccc] disabled:text-black"></button>
        ))}
    </>
  );
}

export function SearchPlaceholder() {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-11">
        {Array(2)
          .fill(2)
          .map((k, i) => (
            <div
              key={i}
              className="flex h-[90px] w-[200px] animate-pulse flex-col gap-3 rounded-lg border-2 border-black bg-[#3300FF] shadow-neoB"></div>
          ))}
      </div>
    </>
  );
}
