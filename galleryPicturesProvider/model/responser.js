
const responser = (req, res, provider) => {

    const image = provider(req.params.id);

    res.setHeader('Content-Type', image.type);
    res.setHeader('Picture-Id', req.params.id);

    res.send(image.data);
}

module.exports = responser;