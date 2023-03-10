const usersRouter = require('./userRouter');
const roadmapRouter = require('./roadmapRouter');
const featureRouter = require('./featureRouter');
const templateRouter = require('./templateRouter');
const shareRouter = require('./shareRouter');
const planRouter = require('./planRouter');
const jobRouter = require('./jobRouter');
module.exports = {
  user: usersRouter,
  roadmap: roadmapRouter,
  feature: featureRouter,
  template: templateRouter,
  share: shareRouter,
  plan: planRouter,
  job: jobRouter,
}