import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
export default function useBookings() {
    const [searchParams] = useSearchParams();
    // FILTER
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" };
    // SORT
    const sortValue = searchParams.get("sort") || "startDate-desc";
    const [field, direction] = sortValue.split("-");
    const sortBy = { field, direction };

    // PAGINATION
    const currentPage = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const { data: { data: bookings, count } = {}, isLoading } = useQuery({
        queryFn: () => getBookings({ filter, sortBy, currentPage }),
        queryKey: ["bookings", filter, sortBy, currentPage] // filter is used to enable prefetching when changing
    });

    // PRE-FETCHING
    const queryClient = useQueryClient();
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (currentPage < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, currentPage + 1],
            queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
        });
    if (currentPage > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, currentPage - 1],
            queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
        });
    return { bookings, isLoading, count };
}