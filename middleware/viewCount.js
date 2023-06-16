let count = 0;

const viewCount = (req, res, next) => {
    count++;
    console.log(count);
    // res.send('tools count')
    next();
}

module.exports = viewCount;