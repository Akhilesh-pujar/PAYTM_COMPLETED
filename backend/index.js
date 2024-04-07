const express = require("express");
const router = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at port ${port}`));
