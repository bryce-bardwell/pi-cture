import app from '.';

const port = 3001;

app.listen(port, '0.0.0.0', () => {
  console.log(`📸 pi-cture API listening on port ${port}`);
});
