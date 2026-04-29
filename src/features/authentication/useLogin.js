import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogin() {
    const queryClient = useQueryClient();
    const { mutate: login, isLoading: isLogingIn } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user); // to prevent prefetching user
            toast.success("User succesffuly loged in");
        },
        onError: (err) => toast.error(err.message)
    });

    return { login, isLogingIn };
}