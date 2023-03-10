# backend-dev
Repo for the Backend API service.

Please develop on the master branch for the devleopment environment. A commit to the master branch will trigger a build pipeline which will deploy to the frontend website.

Other branches are named accordingly based on Enironments.

We should also plan to use tag's and versions as this will help to rollback to a particular version when needed.

Use command to start single server
NODE_ENV=dev node server.js
NODE_ENV=production node server.js
NODE_ENV=staging node server.js
