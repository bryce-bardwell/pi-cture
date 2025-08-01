import app from '.';

const port = 3001;

app.listen(port, '192.168.0.110', () => {
  console.log(`📸 pi-cture API listening on port ${port}`);
});
