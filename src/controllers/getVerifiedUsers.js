import findVerifiedUser from '../services/findVerifiedUsers';
import NotFoundRequestError from '../utils/notFoundRequestError';

const verifiedUser = async (req, res) => {
  const { page } = req.query;
  console.log(`${page} page number`);
  const verifiedUsers = await findVerifiedUser(page);
  if (!verifiedUsers) throw new NotFoundRequestError('No verified users found', 404);
  return res.status(200).json({
    status: 200, message: 'verified users', page, verifiedUsers
  });
};
export default verifiedUser;
