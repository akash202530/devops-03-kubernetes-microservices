const express = require('express');
const redis   = require('redis');
const app     = express();
app.use(express.json());
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
});
redisClient.connect().catch(console.error);
app.get('/health', (req, res) => res.json({ status: 'healthy' }));
app.get('/api/visits', async (req, res) => {
  const visits = await redisClient.incr('visit_count');
  res.json({ visits, hostname: require('os').hostname() });
});
app.listen(3000);