const usersRouter = require('./userRouter');
const settingRouter = require('./settingRouter');
module.exports = {
  user: usersRouter,
  setting: settingRouter,
}