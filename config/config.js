const port = {
    server: process.env.PORT_SERVER || 3000,
    bot: process.env.PORT_BOT|| 3001,
}

const url = {
    rabbitmq: process.env.RABBITMQ_URL || "amqp://localhost:5672",
    cockroach: process.env.COCKROACH_URL || "postgresql://root@localhost:26257/defaultdb?sslmode=disable",
}
module.exports.url = url;
module.exports.port = port;