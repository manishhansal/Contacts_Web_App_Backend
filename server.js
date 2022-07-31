const http = require("http");
const app = require("./Routes/contacts");
const connectToDB = require("./DBConnection/mongoDB");
const PORT = process.env.PORT || 9211;

http.createServer(app).listen(PORT, () => {
  new connectToDB();

  console.log(`Server is running on port no ${PORT}`);
});
