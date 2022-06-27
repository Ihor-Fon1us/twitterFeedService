const twittSchema = {
    type: "object",
    properties: {
      nickname: {type: "string"},
      text: {type: "string"}
    },
    required: ["nickname", "text"],
    additionalProperties: false
  }

module.exports.twittSchema = twittSchema;