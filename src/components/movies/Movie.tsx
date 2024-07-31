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

export function Film({
  category,
  dislikes,
  likes,
  title,
  id,
  page,
  itemsPerPage,
}: Movie & {
  page: number;
  itemsPerPage: number;
}) {
  const [state, dispatch] = React.useReducer(reducer, {
    like: false,
    dislike: false,
  });
  const queryClient = useQueryClient();
  const dislikes_percent = (dislikes / (dislikes + likes)) * 100;
  const likes_percent = (likes / (dislikes + likes)) * 100;

  const mutation = useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: moviesOptions(page, itemsPerPage).queryKey });
      const previous = queryClient.getQueryData(moviesOptions(page, itemsPerPage).queryKey);
      if (previous === undefined) {
        throw new Error("Cache is empty");
      }
      const newTodo = previous.paginatedData.filter((d) => d.id !== data);
      queryClient.setQueryData(moviesOptions(page, itemsPerPage).queryKey, {
        ...previous,
        paginatedData: newTodo,
      });
    },
    mutationFn: async (id: string) => {
      const res = queryClient.getQueryData(moviesOptions(page, itemsPerPage).queryKey);
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
      <div className="flex-shrink flex-grow-0 basis-[330px] bg-blue-300 p-3">
        <div className="flex flex-row items-center justify-between gap-5">
          <h2 className="text-bold text-xl">{title}</h2>
          <span className="text-sm">{category}</span>
        </div>
        <div className="my-3 flex items-center justify-center gap-3">
          <button>
            <ThumbsUp
              className="hover:cursor-pointer"
              aria-label="Like icon"
              onClick={() => dispatch({ type: "like" })}
              strokeWidth={"1"}
              fill={state.like ? "#000" : "transparent"}
            />
          </button>
          <button>
            <ThumbsDown
              className="hover:cursor-pointer"
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
            <Trash2 aria-label="Trash icon" className="hover:cursor-pointer" size={20} onClick={() => deleteMovie()} />
          </button>
        </div>
      </div>
    </>
  );
}
