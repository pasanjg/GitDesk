import React, { Component } from "react";
import {useDebounce} from "use-debounce";
import {useQuery} from "@apollo/react-hooks";
import {FETCH_REPOSITORIES} from "./queries"
import "./Repositories.scss";


const Repositories = ({token}) =>{
	const {data, loading, error} = useQuery(FETCH_REPOSITORIES);
	console.log(token)
	if(loading)
		return <div>Loading</div>;
	else if(error)
		return <div>{error}</div>;
	else {
		console.log(data)
		return <div>Repositories</div>
	}
}
export default Repositories;
// export class Repositories extends Component {
// 	state = {data: null,
// 		loading: true,
// 		error: null}
// 	constructor(props) {
// 		super(props);
//
// 		this.state = {
// 			data: null,
// 			loading: true,
// 			error: null
// 		}
// 	}
// 	componentDidMount() {
// 		 const {data, loading, error} = useQuery(FETCH_REPOSITORIES);
// 	}
//
// 	render() {
// 		if(this.props.loading)
// 			return <div>Loading</div>;
// 		else if(this.props.error)
// 			return <div>error</div>;
// 		else return <div>Repositories</div>;
// 	}
// }
//
// export default Repositories;
