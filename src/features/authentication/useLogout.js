import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: logout, isLoading: isLogingOut } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
            toast.success("User succesffuly loged out");
        },
        onError: (err) => toast.error(err.message)
    });

    return { logout, isLogingOut };
}