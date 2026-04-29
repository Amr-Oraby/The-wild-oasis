import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin as editCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
    const queryClient = useQueryClient();
    const { isLoading: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ cabin, editId }) => editCabinApi(cabin, editId),
        onSuccess: () => {
            toast.success("Cabin succesffuly edited");
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isEditing, editCabin };
} 