import app from '.';

const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = Number(process.env.PORT) || 3001;

app.listen(port, hostname, () => {
  console.log(`📸 pi-cture API listening on ${hostname}:${port}`);
});
