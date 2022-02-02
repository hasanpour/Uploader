import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { rename } from "fs";
import express from "express";
import formidable from "formidable";

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Static Files
app.use(express.static(join(__dirname, "public")));

// Main Page
app.get("/", function (req, res) {
  res.sendFile(join(__dirname, "views/index.html"));
});

// Listen for file upload
app.post("/fileupload", (req, res, next) => {
  const form = formidable({ multiples: true });

  // Move files to uploads foler
  form.on("file", function (field, file) {
    rename(
      file.filepath,
      join(__dirname, "uploads", file.originalFilename),
      (err) => {
        if (err) throw err;
      }
    );
  });

  // On finished
  form.on("end", function () {
    res.end("success");
  });

  form.parse(req);
});

app.listen(80);
