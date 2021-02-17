<img src="internal/images/banner.jpg" width="100%" />

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]

</div>
<br/>

GitHub Client application built with React using the GitHub [GraphQL API](https://docs.github.com/en/free-pro-team@latest/graphql)

NodeJS App in `api/` is deployed to [Heroku](http://oauth-gh.herokuapp.com/)

Authorization Token is retreived from `/authenticate/:code`

## Install

Clone the repo and install dependencies:

```bash
$ git clone https://github.com/pasanjg/GitDesk.git
$ cd GitDesk
$ npm install
```

## Starting Development

```bash
npm start
```

## Screenshots

- ##### Login
![](internal/images/login.PNG)
- ##### Dashboard
![](internal/images/dashboard.PNG)
- ##### Repositories
![](internal/images/repositories.PNG)
- ##### Profile
![](internal/images/profile.PNG)


## License

[MIT][license-url]


[github-actions-status]: https://github.com/pasanjg/GitHub-Desktop/workflows/CI/badge.svg
[github-actions-url]: https://github.com/pasanjg/GitHub-Desktop/actions
[github-tag-image]: https://img.shields.io/github/tag/pasanjg/GitHub-Desktop.svg?label=version
[github-tag-url]: https://github.com/pasanjg/GitHub-Desktop/releases/latest
[license-url]: https://github.com/pasanjg/GitHub-Desktop/blob/master/LICENSE
