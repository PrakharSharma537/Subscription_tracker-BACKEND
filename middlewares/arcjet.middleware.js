import rateLimit from 'express-rate-limit';

const blockedIPs = new Set();

const apiLimiter = rateLimit({
  windowMs: 10 * 1000, 
  max: 2, 
  message: 'Too many requests from this IP, please try again later.'
});

const detectSpam = (req) => {
  const suspiciousPatterns = [/http[s]?:\/\//i, /<script>/i];
  const values = Object.values(req.body);
  return values.some(
    (value) => typeof value === 'string' && suspiciousPatterns.some((p) => p.test(value))
  );
};

const securityMiddleware = async (req, res, next) => {
  if (blockedIPs.has(req.ip)) {
    return res.status(403).json({ message: 'Forbidden: IP blocked' });
  }

  apiLimiter(req, res, () => {
    if (detectSpam(req)) {
      blockedIPs.add(req.ip); 
      return res.status(400).json({ message: 'Spam detected' });
    }
    next(); 
  });
};

export default securityMiddleware;
