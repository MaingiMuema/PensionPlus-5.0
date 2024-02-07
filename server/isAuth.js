export default async (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.send({ message: "Not authenticated" });
  }
};
