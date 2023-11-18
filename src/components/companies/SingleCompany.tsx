import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState, FetchDataDispatch } from "../../types";
import { fetchSingleCompanyData } from "../../features/companiesSlice";

const SingleCompany = () => {
  const {id} = useParams();
  
  const { singleCompany, loading, error } = useSelector((state: RootState) => state.companies);
  const dispatch: FetchDataDispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchSingleCompanyData(Number(id)));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading the data...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="single-company-container">
      {singleCompany &&
      <article className="single-company">
        <img src={singleCompany.avatar_url} alt={singleCompany.login} />
        <div className="single-company-info">
          <p><b>Name:</b> {singleCompany.login}</p>
          <p><b>Id:</b> {singleCompany.id}</p>
          <p><b>Description:</b> {singleCompany.description}</p>
          <p><b>Company:</b> {singleCompany.company}</p>
          <p><b>Blog:</b> {singleCompany.blog}</p>
          <p><b>Location:</b> {singleCompany.location}</p>
          <p><b>Email:</b> {singleCompany.email}</p>    
          <p><b>Twitter:</b> {singleCompany.twitter_username}</p>
          <p><b>Verification Status:</b> {singleCompany.is_verified}</p>
          <p><b>Organization Projects:</b> {singleCompany.has_organization_projects}</p>
          <p><b>Public Repos:</b> {singleCompany.public_repos}</p>
          <p><b>Public Gists:</b> {singleCompany.public_gists}</p>
          <p><b>Followers:</b> {singleCompany.followers}</p>
          <p><b>Following:</b> {singleCompany.following}</p>
          <p><b>URL:</b> {singleCompany.html_url}</p>
          <p><b>Created At:</b> {singleCompany.created_at}</p>
          <p><b>Updated At:</b> {singleCompany.updated_at}</p>
          <p><b>Archived At:</b> {singleCompany.archived_at}</p>
          <p><b>Type:</b> {singleCompany.type}</p>
        </div>
      </article>
      }
    </div>
  );
};

export default SingleCompany;