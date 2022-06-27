const port = {
    server: process.env.PORT || 3000,
    
    
}

const url = {
    rabbitmq: process.env.RABBITMQ_URL || "amqp://localhost:5672",
    cockroach: process.env.COCKROACH_URL || "postgresql://root@localhost:26257/defaultdb?sslmode=disable",
}
module.exports.url = url;
module.exports.port = port;