import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });
            toast.success("User succesffuly updated");
        },
        onError: (err) => toast.error(err.message)
    });

    return { updateUser, isUpdating };
}