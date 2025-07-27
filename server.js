const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const path = require("path");

const app = express();
const PORT = 5000;

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Save points
app.post("/savePoints", async (req, res) => {
  const { address, username, email, points } = req.body;

  if (!address || !username || !email || typeof points !== "number") {
    return res.status(400).json({ error: "Missing or wrong data" });
  }

  try {
    await db.collection("users").doc(address).set({
      username,
      email,
      points,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    res.json({ success: true, message: "Saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save" });
  }
});

// Get points
app.get("/getPoints/:address", async (req, res) => {
  const address = req.params.address;

  try {
    const doc = await db.collection("users").doc(address).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    const data = doc.data();
    res.json({ points: data.points || 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch points" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});