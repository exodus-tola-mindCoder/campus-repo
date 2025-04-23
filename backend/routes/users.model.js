import express from 'express';



const router = express.Router();

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/updatepassword', updatePassword);

// admin only routes

router.use(protect, authorize('admin'));

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;