import { ThunkDispatch } from "@reduxjs/toolkit";

import companiesSlice, { fetchData, fetchSingleCompanyData } from "./features/companiesSlice";

export type CompanyType = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string | null;
  name: string,
  company: null,
  blog: string | null,
  location: string,
  email: null,
  twitter_username: null,
  is_verified: boolean,
  has_organization_projects: boolean,
  has_repository_projects: boolean,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
  html_url: string,
  created_at: string,
  updated_at: string,
  archived_at: null,
  type: string,
};
  
export type IntitialStatesType = {
  items: CompanyType[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  singleCompany: CompanyType | null;
};

export type RootState = {
  companies: ReturnType<typeof companiesSlice>;
};

type searchCompanyAction = {
  type: 'companies/searchCompany';
  payload: string;
};

type sortCompaniesAction = {
  type: 'companies/sortCompanies';
  payload: string;
};

type FetchDataPendingAction = ReturnType<typeof fetchData.pending>;
type FetchDataFulfilledAction = ReturnType<typeof fetchData.fulfilled>;
type FetchDataRejectedAction = ReturnType<typeof fetchData.rejected>;

type FetchSingleCompanyDataPendingAction = ReturnType<typeof fetchSingleCompanyData.pending>;
type FetchSingleCompanyDataFulfilledAction = ReturnType<typeof fetchSingleCompanyData.fulfilled>;
type FetchSingleCompanyDataRejectedAction = ReturnType<typeof fetchSingleCompanyData.rejected>;

export type FetchDataAction = 
FetchDataPendingAction 
| FetchDataFulfilledAction 
| FetchDataRejectedAction 
| FetchSingleCompanyDataPendingAction 
| FetchSingleCompanyDataFulfilledAction 
| FetchSingleCompanyDataRejectedAction 
| searchCompanyAction 
| sortCompaniesAction;

export type FetchDataDispatch = ThunkDispatch<RootState, void, FetchDataAction>;