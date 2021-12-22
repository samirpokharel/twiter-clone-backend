/// Token Reponse
exports.tokenResponse = (user, statusCode, res) => {
  const token = user.token();
  res.status(statusCode).send({
    success: true,
    token: token,
  });
};
