import type { Movie } from "#src/data.ts";
import { moviesOptions } from "#src/features/movies/queries.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import * as React from "react";

type State = {
  like: boolean;
  dislike: boolean;
};

type Action = {
  type: "like" | "dislike";
};

type FilmProps = Movie & {
  page: number;
  itemsPerPage: number;
  selectCategory: string;
};

function reducer(state: State, action: Action) {
  if (action.type === "like") {
    return {
      like: !state.like,
      dislike: false,
    };
  }
  if (action.type === "dislike") {
    return {
      dislike: !state.dislike,
      like: false,
    };
  }
  throw Error("Unknown action.");
}

export function Film({ category, dislikes, likes, title, id, page, itemsPerPage, selectCategory }: FilmProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    like: false,
    dislike: false,
  });
  const queryClient = useQueryClient();
  const dislikes_percent = (dislikes / (dislikes + likes)) * 100;
  const likes_percent = (likes / (dislikes + likes)) * 100;

  const mutation = useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: moviesOptions(page, itemsPerPage, selectCategory).queryKey });
      const previous = queryClient.getQueryData(moviesOptions(page, itemsPerPage, selectCategory).queryKey);
      if (previous === undefined) {
        throw new Error("Cache is empty");
      }
      const newData = previous.paginatedData.filter((d) => d.id !== data);
      queryClient.setQueryData(moviesOptions(page, itemsPerPage, selectCategory).queryKey, {
        ...previous,
        paginatedData: newData,
      });
    },
    mutationFn: async (id: string) => {
      const res = queryClient.getQueryData(moviesOptions(page, itemsPerPage, selectCategory).queryKey);
      if (res === undefined) {
        throw new Error("Cache is empty");
      }
      return res.paginatedData.filter((d) => d.id !== id);
    },
  });

  function deleteMovie() {
    mutation.mutate(id);
  }

  return (
    <>
      <div className="shadow-neoB min-w-[300px] max-w-[600px] flex-shrink flex-grow rounded-md border-2 border-black bg-white p-3 md:basis-[49%]">
        <div className="flex flex-row items-center justify-between gap-5">
          <h2 className="text-bold font-archivo text-xl tracking-wider">{title}</h2>
          <span className="font-archivo text-sm">{category}</span>
        </div>
        <div className="my-3 flex items-center justify-center gap-3">
          <button>
            <ThumbsUp
              className="transition-fill duration-500 hover:cursor-pointer active:scale-90"
              aria-label="Like icon"
              onClick={() => dispatch({ type: "like" })}
              strokeWidth={"1"}
              fill={state.like ? "#000" : "transparent"}
            />
          </button>
          <button>
            <ThumbsDown
              className="transition-fill duration-500 hover:cursor-pointer active:scale-90"
              aria-label="Dislike icon"
              onClick={() => dispatch({ type: "dislike" })}
              strokeWidth={"1"}
              fill={state.dislike ? "#000" : "transparent"}
            />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <span
            style={{
              ["--dislikes" as string]: `${dislikes_percent}px`,
            }}
            className={`inline-block h-1 w-[var(--dislikes)] bg-red-700`}></span>
          <span
            style={{
              ["--likes" as string]: `${likes_percent}px`,
            }}
            className={`inline-block h-1 w-[var(--likes)] bg-green-700`}></span>
        </div>
        <div className="flex justify-end">
          <button>
            <Trash2
              aria-label="Trash icon"
              className="duration-100 hover:scale-110 hover:cursor-pointer active:scale-90"
              size={20}
              onClick={() => deleteMovie()}
            />
          </button>
        </div>
      </div>
    </>
  );
}
