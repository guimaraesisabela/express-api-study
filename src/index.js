require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const Film = mongoose.model("Film", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

app.get("/", async (req, res) => {
  try {
    const films = await Film.find();
    res.send(films);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar filmes" });
  }
});

app.post("/", async (req, res) => {
  try {
    const film = new Film({
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url,
    });

    await film.save();
    res.status(201).send(film);
  } catch (error) {
    res.status(500).send({ error: "Erro ao criar filme" });
  }
});

const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");

    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB:", err);
  });