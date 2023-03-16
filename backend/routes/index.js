const usersRouter = require('./userRouter');
const roadmapRouter = require('./roadmapRouter');
const featureRouter = require('./featureRouter');
const templateRouter = require('./templateRouter');
const shareRouter = require('./shareRouter');
const planRouter = require('./planRouter');
const jobRouter = require('./jobRouter');
const settingRouter = require('./settingRouter');
module.exports = {
  user: usersRouter,
  setting: settingRouter,
  roadmap: roadmapRouter,
  feature: featureRouter,
  template: templateRouter,
  share: shareRouter,
  plan: planRouter,
  job: jobRouter,
}