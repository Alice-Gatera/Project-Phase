import models from '../models';

const isUserExist = (data) => {
  const user = models.user.findOne({ where: { email: data } });
  return user;
};
export default isUserExist;
