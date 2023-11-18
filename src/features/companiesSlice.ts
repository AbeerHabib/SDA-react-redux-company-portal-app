import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { IntitialStatesType } from "../types";

const initialState: IntitialStatesType= {
  items: [],
  loading: false,
  error: null,
  searchTerm: '',
  singleCompany: null,
};

export const fetchData = createAsyncThunk('companies/fetchData', async () => {
  const response = await fetch('https://api.github.com/organizations');
  if(!response.ok) {
    throw new Error('Network Error');
  }
  const data = await response.json();
  return data;
}); 

export const fetchSingleCompanyData = createAsyncThunk('companies/fetchSingleCompanyData', async (id: number) => {
  const response = await fetch(`https://api.github.com/orgs/${id}`);
  if(!response.ok) {
    throw new Error('Network Error');
  }
  const data = await response.json();
  return data;
});

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    searchCompany: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortCompanies: (state, action) => {
      const sortMethod = action.payload;
      if(sortMethod == 'id') {
        state.items.sort((a,b) => a.id - b.id); // Sort the IDs of the companies in ascending order
      }
      else if(sortMethod == 'login') {
        state.items.sort((a,b) => a.login.localeCompare(b.login)); // Sort the names of the companies in ascending order
      }
    },
  },
  extraReducers: (builder) => {
    builder
    // Companies
    .addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    })
    .addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "ERROR!";
    })
    // Single Company
    .addCase(fetchSingleCompanyData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSingleCompanyData.fulfilled, (state, action) => {
      state.singleCompany = action.payload;
      state.loading = false;
    })
    .addCase(fetchSingleCompanyData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "ERROR!";
    })
  },
});

export const { searchCompany, sortCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;