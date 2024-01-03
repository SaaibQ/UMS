const mongoose = require("mongoose");
const app = require("./app.js");

const PORT = 5000 || process.env.PORT;
const MONGO_URI = process.env.DATABASE.replace(
  "<password>",
  process.env.password
);

const init = async function () {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening from port ${PORT}`);
    });
  } catch (err) {
    console.log(`ERROR 🛑: ${err}`);
  }
};

init();
