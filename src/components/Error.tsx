import { QueryErrorResetBoundary } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function Error({ children }: PropsWithChildren) {
  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => {
              return (
                <>
                  <div className="mt-10 text-center">
                    <p className="my-5 font-archivo">Une erreur est survenue !</p>
                    <button
                      className="rounded-md border-2 border-black bg-blue-800 p-3 font-archivo text-white active:scale-90"
                      onClick={() => resetErrorBoundary()}>
                      Veuilliez réessayez !
                    </button>
                  </div>
                </>
              );
            }}>
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
}
