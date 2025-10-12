import type { PageProps } from "fresh";
import { HttpError } from "fresh";

export default function ErrorPage(props: PageProps) {
  const error = props.error; // Contains the thrown Error or HTTPError

  if (error instanceof HttpError) {
    const status = error.status; // HTTP status code

    // Render a 404 not found page
    if (status === 404) {
      return (
        <>
          <head>
            <title>404 - Page not found</title>
          </head>
          <div class="px-4 py-8 mx-auto bg-[#86efac]">
            <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
              <h1 class="text-4xl font-bold">404 - Page not found</h1>
              <p class="my-4">
                The page you were looking for doesn't exist.
              </p>
              <a href="/" class="underline">Go back home</a>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <head>
        <title>Oh no...</title>
      </head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">Oh no...</h1>
          <p class="my-4">
            Something went wrong.
          </p>
          <a href="/" class="underline">Go back home</a>
        </div>
      </div>
    </>
  );
}
