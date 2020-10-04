import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USER } from "./Queries";

import "./Profile.scss";
import Loader from "../../components/loader/loader";
import ErrorPage from "../../components/error_page/error_page";


const Profile = ({ token }) => {
	const { data, loading, error } = useQuery(FETCH_USER);
	console.log(token)
	if (loading)
		return <Loader />;
	else if (error)
		return <ErrorPage error={error} />;
	else {
		console.log(data)
		return <div className="profile-content">
				asaas
		</div>
	}
}
export default Profile;
