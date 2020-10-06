import React, {useState} from "react";
// import {useDebounce} from "use-debounce";
import {useQuery} from "@apollo/react-hooks";
import {FETCH_REPOSITORIES} from "./queries"
import "./Repositories.scss";
import Loader from "../../components/loader/loader";
import ErrorPage from "../../components/error_page/error_page";
import parse from 'html-react-parser';
import ReactTooltip from "react-tooltip";
import Dropdown from 'react-dropdown';

const Repositories = ({token}) => {

    // const [keyword,setKeyword] = useState('');

    const dropDownOptions = [
        {value: 'CREATED_AT', label: 'Created At'},
        {value: 'UPDATED_AT', label: 'Updated At'},
        {value: 'PUSHED_AT', label: 'Pushed At'},
        {value: 'NAME', label: 'Name'},
        {value: 'STARGAZERS', label: 'Stargazers'},
    ];
    const dropDownDirection = [
        {value: 'ASC', label: 'Ascending'},
        {value: 'DESC', label: 'Descending'},
    ];
    const [selectedOption,setDropdownOption] = useState(dropDownOptions[0],'');
    const [selectedDirection,setDirection] = useState(dropDownDirection[1],'');

    const {data, loading, error} = useQuery(FETCH_REPOSITORIES(selectedOption.value,selectedDirection.value),
    );



    if (loading)
        return <Loader/>;
    else if (error)
        return <ErrorPage error={error}/>;
    else {
        const repositories = data.viewer.repositories;
        const totalCount = repositories.totalCount;
        console.log(repositories);
        return <div className="repository-content content-padding">
            {/*<input onChange={event => setKeyword(event.target.value)}/>*/}
            <div className="row m-0">
                <div className="col-12 col-md-6 align-items-center justify-content-center mt-2">
                    Repositories ({totalCount})
                </div>
                <div className="col-12 col-md-3">
                    <Dropdown options={dropDownOptions} onChange={select => setDropdownOption(select)} value={selectedOption.label} placeholder="Select an option" />
                </div>
                <div className="col-12 col-md-3 mt-2 mt-md-0">
                    <Dropdown options={dropDownDirection} onChange={select => setDirection(select)} value={selectedDirection.label} placeholder="Select an Direction" />
                </div>
            </div>

            <div className="repo-list mt-2">
                {
                    repositories.nodes.map((repo, index) => {
                        return (<div key={index}>
                            <div className="card repository-card mb-3">
                                <div className="repository-card-header card-header">
                                    <div className="row no-gutters">
                                        <div className="col-10">
                                            <div>
                                                <span className="h5">{repo.name}</span>
                                                <span
                                                    className="rounded-pill repository-pill col-1 ml-3 pl-3 pr-3 pt-1 pb-1">{repo.isPrivate ? "Private" : "Public"}</span>
                                            </div>
                                            <a
                                                href={repo.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-decoration-none text-muted">{repo.nameWithOwner}</a>
                                        </div>
                                        <div className="col-2 card-icon">
                                            {repo.isFork ? <i className="fas fa-code-branch mr-2"
                                                              data-tip="Fork"
                                                              data-for="fork"
                                            /> : ""}
                                            {repo.isArchived ? <i className="fas fa-archive"
                                                                  data-tip="Archive"
                                                                  data-for="archive"
                                            /> : ""}</div>
                                        <ReactTooltip
                                            id="fork"
                                            place="right"
                                            type="dark"
                                            effect="solid"
                                        />
                                        <ReactTooltip
                                            id="archive"
                                            place="right"
                                            type="dark"
                                            effect="solid"
                                        />
                                    </div>
                                </div>
                                <div className="card-body repository-card-body">
                                    {repo.languages.nodes.map((language, index) => {
                                        return (
                                            <span key={index} className="badge"
                                                  style={{color: language.color}}>{language.name}</span>
                                        )
                                    })}
                                    <div>{parse(repo.descriptionHTML === "<div></div>" ? "<div>No description</div>" : repo.descriptionHTML)}</div>
                                </div>
                                <div className="card-footer repository-card-footer">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-2 d-flex justify-content-center">
                                            Forks
                                        <div className="ml-3 d-md-none">{repo.forks.totalCount}</div>
                                        </div>
                                        <div className="col-sm-12 col-md-2 d-flex justify-content-center">
                                            Watchers
                                            <div className="ml-3 d-md-none">{repo.watchers.totalCount}</div>
                                        </div>
                                        <div className="col-sm-12 col-md-2 d-flex justify-content-center">
                                            Stargazers
                                            <div className="ml-3 d-md-none">{repo.stargazers.totalCount}</div>

                                        </div>
                                        <div className="col-sm-12 col-md-2 d-flex justify-content-center">Issues
                                            ({repo.issues.totalCount})
                                            <div className="ml-3 d-md-none">{repo.openIssues.totalCount}</div>
                                        </div>
                                        <div className="col-xs-12 col-md-2  d-flex justify-content-center">Pull Requests
                                            ({repo.pullRequests.totalCount})
                                            <div className="ml-3 d-md-none">{repo.openPullRequest.totalCount}</div>
                                        </div>
                                    </div>
                                    <div className="row d-none d-md-flex">
                                        <div
                                            className="col-xs-12 col-md-2 d-flex justify-content-center">{repo.forks.totalCount}</div>
                                        <div
                                            className="col-xs-12 col-md-2 d-flex justify-content-center">{repo.watchers.totalCount}</div>
                                        <div
                                            className="col-xs-12 col-md-2 d-flex justify-content-center">{repo.stargazers.totalCount}</div>
                                        <div
                                            className="col-xs-12 col-md-2 d-flex justify-content-center">{repo.openIssues.totalCount}</div>
                                        <div
                                            className="col-xs-12 col-md-2 d-flex justify-content-center">{repo.openPullRequest.totalCount}</div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    }
}
export default Repositories;