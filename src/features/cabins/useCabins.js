import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
export default function useCabins() {
    const [searchParams] = useSearchParams();
    const { data: cabins, isLoading } = useQuery({
        queryFn: getCabins,
        queryKey: ["cabins"]
    });

    // 1) FILTER
    const filterValue = searchParams.get("discount") || "all";
    let filteredCabins;
    if (filterValue === "with-discount") filteredCabins = cabins?.filter(cabin => cabin.discount !== 0);
    if (filterValue === "no-discount") filteredCabins = cabins?.filter(cabin => cabin.discount == 0);
    if (filterValue === "all") filteredCabins = cabins;

    // 2) SORT
    const sortValue = searchParams.get('sort') || "startDate-asc";
    const [field, direction] = sortValue.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins?.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );
    const currentCabins = sortedCabins;
    return { numCabins: cabins?.length, currentCabins, isLoading };
}