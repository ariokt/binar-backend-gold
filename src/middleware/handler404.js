const handler404 = (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    errors: 'Not Found',
  });
}

module.exports = handler404;