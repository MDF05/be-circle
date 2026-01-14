import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.redis_url;

if (!redisUrl) {
  throw new Error("Redis URL is not defined in environment variables");
}

/* 
   Since the user provided "127.0.0.1:6379" as redis_url, 
   we might need to parse it or just pass it if ioredis supports that format directly in constructor 
   when prefixed with 'redis://'.
   However, let's play it safe and parse host/port or just standard connection string.
   
   If redis_url is just "127.0.0.1:6379", ioredis expectation for string is usually a full Connection String.
   Let's check if we need to split.
*/

// Basic parsing if needed, but ioredis handles "redis://host:port" well.
// If the user's env is literally "127.0.0.1:6379", we might want to ensure it has protocol or split it.
// Let's assume we can use it directly or fix the env string. 
// For safety, let's construct a proper connection.

let redisClient: Redis;

if (redisUrl.includes("://")) {
  redisClient = new Redis(redisUrl);
} else {
  // If it's just host:port like "127.0.0.1:6379"
  const [host, port] = redisUrl.split(":");
  redisClient = new Redis({
    host: host || "127.0.0.1",
    port: port ? parseInt(port) : 6379,
  });
}

redisClient.on("connect", () => {
  console.log("Redis connected successfully");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redisClient;
