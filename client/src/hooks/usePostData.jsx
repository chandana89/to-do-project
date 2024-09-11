import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostData = (
  mutationFn,
  queryKey,
  invalidate = true
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      if (invalidate) {
        queryClient.invalidateQueries(queryKey);
      }
    },
  });

  return mutation;
};