import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostData = (
  mutationFn,
  queryKey,
  postActions = () => {},
  invalidate = true
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      if (invalidate) {
        // Invalidate and refetch the query associated with the provided queryKey
        queryClient.invalidateQueries(queryKey);
      }
      // postActions is used to handle the actions after the useMutation run successfully. Ex: re-navigating, clearing forms
      postActions();
    },
  });

  // Return the entire mutation object to allow access to all its properties and methods
  return mutation;
};