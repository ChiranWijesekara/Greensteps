require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully with Mongoose"))
.catch(err => console.log("MongoDB connection error:", err));

app.get('/', (req, res) => {
    res.send("Backend running with Mongoose!");
});

const actionsRouter = require('./routes/actions');
app.use('/api/actions', actionsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));