import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export default function useSignup() {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success("User succesffuly signed up");
        },
        onError: (err) => toast.error(err.message)
    });

    return { signup, isLoading };
}