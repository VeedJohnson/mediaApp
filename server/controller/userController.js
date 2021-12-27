exports.getUserProfile = (req, res, next) => {
  req.user.password = undefined;
  res.status(200).json({
    status: 'success',
    data: req.user,
  });
};
