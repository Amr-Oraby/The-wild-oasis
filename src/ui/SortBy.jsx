import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || options[0].value;
  function handleChange(e) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      onChange={handleChange}
      options={options}
      value={sortBy}
      type="white"
    />
  );
}

export default SortBy;
