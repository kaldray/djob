import type { Movie } from "#src/data.ts";
import { moviesOptions } from "#src/features/movies/queries.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import * as React from "react";

export function Film({ category, dislikes, likes, title, id }: Movie) {
  const [isLiked, setIsLiked] = React.useState(true);
  const queryClient = useQueryClient();
  const dislikes_percent = (dislikes / (dislikes + likes)) * 100;
  const likes_percent = (likes / (dislikes + likes)) * 100;

  const mutation = useMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: moviesOptions(1).queryKey });
      const previous = queryClient.getQueryData(moviesOptions(1).queryKey);
      if (previous === undefined) {
        throw new Error("Cache is empty");
      }
      const newTodo = previous.filter((d) => d.id !== data);
      queryClient.setQueryData(moviesOptions(1).queryKey, () => [...newTodo]);
    },
    mutationFn: async (id: string) => {
      const res = queryClient.getQueryData(moviesOptions(1).queryKey);
      if (res === undefined) {
        throw new Error("Cache is empty");
      }
      return res.filter((d) => d.id !== id);
    },
  });

  function toggleIsLiked() {
    setIsLiked(!isLiked);
  }

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
              onClick={() => toggleIsLiked()}
              strokeWidth={"1"}
              fill={isLiked ? "#000" : "transparent"}
            />
          </button>
          <button>
            <ThumbsDown
              className="hover:cursor-pointer"
              aria-label="Dislike icon"
              onClick={() => toggleIsLiked()}
              strokeWidth={"1"}
              fill={!isLiked ? undefined : "transparent"}
            />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <span
            style={{
              ["--dislikes" as any]: `${dislikes_percent}px`,
            }}
            className={`inline-block h-1 w-[var(--dislikes)] bg-red-700`}></span>
          <span
            style={{
              ["--likes" as any]: `${likes_percent}px`,
            }}
            className={`inline-block h-1 w-[var(--likes)] bg-green-700`}></span>
        </div>
        <div className="flex justify-end">
          <button>
            <Trash2 className="hover:cursor-pointer" size={20} onClick={() => deleteMovie()} />
          </button>
        </div>
      </div>
    </>
  );
}
