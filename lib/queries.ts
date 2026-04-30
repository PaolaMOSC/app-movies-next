import { queryOptions } from "@tanstack/react-query";
import { fetchMovies } from "@/lib/actions";

export function moviesQueryOptions(query: string, genre?: string) {
  return queryOptions({
    queryKey: ["movies", query, genre ?? ""] as const,
    queryFn: () => fetchMovies(query, genre),
    staleTime: 5 * 60 * 1000,
  });
}
