import app from '.';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`📸 pi-cture API listening on port ${port}`);
});
