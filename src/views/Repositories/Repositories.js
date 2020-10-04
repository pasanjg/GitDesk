import React, { Component } from "react";
import {useDebounce} from "use-debounce";
import {useQuery} from "@apollo/react-hooks";
import {FETCH_REPOSITORIES} from "./queries"
import "./Repositories.scss";
import Loader from "../../components/loader/loader";
import ErrorPage from "../../components/error_page/error_page";

const Repositories = ({token}) =>{
	const {data, loading, error} = useQuery(FETCH_REPOSITORIES);
	console.log(token)
	if(loading)
		return <Loader/>;
	else if(error)
		return <ErrorPage error={error}/>;
	else {
		console.log(data)
		return <div>Repositories</div>
	}
}
export default Repositories;