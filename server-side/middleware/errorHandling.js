const constants = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  switch (statusCode) {
    case constants.OK: {
      res.json({
        title: "Success",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.CREATED: {
      res.json({
        title: "Created",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.ACCEPTED: {
      res.json({
        title: "Accepted",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.NO_CONTENT: {
      res.json({
        title: "No Content",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.FOUND: {
      res.json({
        title: "Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.NOT_MODIFIED: {
      res.json({
        title: "Not Modified",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.BAD_REQUEST: {
      res.json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.UNAUTHORIZED: {
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.FORBIDDEN: {
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.NOT_FOUND: {
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.SERVER_ERROR: {
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
    case constants.BAD_GATEWAY: {
      res.json({
        title: "Bad Gateway",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }

    default: {
      res.json({
        title: "Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    }
  }
};

module.exports = errorHandler;
