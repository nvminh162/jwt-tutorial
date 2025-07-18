import express from "express";
import "dotenv/config";
import initDatabase from "config/seed";
import apiRoutes from "routes/api";
import cors from "cors";

const PORT = process.env.PORT || 8080;
const app = express();

//config cors
app.use(cors({
  origin: ["http://localhost:5173"]
}));

//middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api routes
apiRoutes(app);

initDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
