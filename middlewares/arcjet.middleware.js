import rateLimit from 'express-rate-limit';

// Blocked IPs store
const blockedIPs = new Set();

// 1️⃣ Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 10 * 1000, // 15 min
  max: 2, // har IP max 100 requests
  message: 'Too many requests from this IP, please try again later.'
});

// 2️⃣ Spam detection
const detectSpam = (req) => {
  const suspiciousPatterns = [/http[s]?:\/\//i, /<script>/i];
  const values = Object.values(req.body);
  return values.some(
    (value) => typeof value === 'string' && suspiciousPatterns.some((p) => p.test(value))
  );
};

// 4️⃣ Security Middleware
const securityMiddleware = async (req, res, next) => {
  // IP blocking
  if (blockedIPs.has(req.ip)) {
    return res.status(403).json({ message: 'Forbidden: IP blocked' });
  }

  // Rate limiting
  apiLimiter(req, res, () => {
  

    // Spam detection
    if (detectSpam(req)) {
      blockedIPs.add(req.ip); // optional: temporary block
      return res.status(400).json({ message: 'Spam detected' });
    }

    next(); // All good, proceed
  });
};

export default securityMiddleware;
