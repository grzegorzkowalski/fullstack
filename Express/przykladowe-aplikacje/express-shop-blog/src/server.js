import dotenv from 'dotenv';

dotenv.config(); // musi być wywołane przed importem app.js, żeby process.env był gotowy

const { default: app } = await import('./app.js');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
