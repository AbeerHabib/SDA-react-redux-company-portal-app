import { BrowserRouter, Routes, Route } from "react-router-dom";

import Companies from "./components/companies/Companies";
import SingleCompany from "./components/companies/SingleCompany";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Companies />} />
        <Route path="/:id" element={<SingleCompany />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;