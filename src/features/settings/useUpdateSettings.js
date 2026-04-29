import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSettings() {
    const queryClient = useQueryClient();
    const { mutate: update, isLoading: isUpdating } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success("Settings successfully updated");
            queryClient.invalidateQueries({
                queryKey: ["settings"]
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { update, isUpdating };
}