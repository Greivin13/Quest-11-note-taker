const express =  require('express');
const path = require("path");
const apiRoutes= require("./routes/apiRoutes/apiRoutes");
const htmlRoutes= require("./routes/htmlRoutes/htmlRoutes");

const app = express()
const PORT  = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


//use routes
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });