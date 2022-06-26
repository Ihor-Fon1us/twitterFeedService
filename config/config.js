const port = {
    server: process.env.PORT || 3000,
    cockroach: process.env.COCKROACH_PORT || 26257,
    rabbitmq: process.env.RABBITMQ_PORT || 5672,
}

module.exports.port = port;