export const trackClick = (req, res, next) => {
    console.log("Request path:", req.path);
    console.log("IP:", req.ip);
    console.log("User-Agent:", req.headers['user-agent']);
    next();
};