import dotenv from "dotenv";
dotenv.config();

const handleError = (error, req, res, next) => {
  const statuscode = error.status || 500;
   console.log("Error called",error);
  res.status(statuscode).json({
    message: `${
      process.env.NODE_ENV === "dev" ? error.message : "Internal Server Error."
    }`,
  });
};

export { handleError };
