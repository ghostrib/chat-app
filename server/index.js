const express = require('express');
const path = require('path');
const port = process.env.PORT || 4444;
const app = express();

// app.use(express.json());


// app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


