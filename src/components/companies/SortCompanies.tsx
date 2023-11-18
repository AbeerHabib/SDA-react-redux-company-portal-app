import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { sortCompanies } from "../../features/companiesSlice";

const SortCompanies = () => {
  const dispatch = useDispatch();

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let searchTerm = event.target.value;
    dispatch(sortCompanies(searchTerm));
  };

  return (
    <div className="sort-div">
      <label htmlFor="sort">Sort by:</label>

      <select name="sort" id="sort" onChange={handleOptionChange}>
        <option value="id">id</option>
        <option value="login">login</option>
      </select>
    </div>
  );
};

export default SortCompanies;