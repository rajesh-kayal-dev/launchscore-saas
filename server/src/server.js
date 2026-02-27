import dotenv from 'dotenv'
import app from './app.js'
import prisma from '../src/config/prisma.js'

dotenv.config();

const PORT = process.env.PORT || 5000;

const startHeartbeat = () => {
  console.log('Heartbeat started: Keeping database warm...');

  setInterval(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      const time = new Date().toLocaleTimeString();
      console.log(`✅ [${time}] Database Heartbeat: Neon is active`);
    } catch (err) {
      console.error('❌ Heartbeat failed. Database might be sleeping:', err.message);
    }
  }, 4 * 60 * 1000); 
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

  if (process.env.DATABASE_URL) {
    startHeartbeat();
  }
})