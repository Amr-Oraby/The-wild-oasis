import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
    const queryClient = useQueryClient();
    const { isLoading: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createCabinApi,
        onSuccess: () => {
            toast.success("Cabin succesffuly created");
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isCreating, createCabin };
} 