import * as Joi from 'joi';

export const configuration = () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  mq: {
    host: process.env.MQ_HOST,
    port: process.env.MQ_PORT
  },
  cache: {
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT,
    ttl: process.env.CACHE_TTL,
  }
});

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  MQ_HOST: Joi.string().required(),
  MQ_PORT: Joi.number().required(),
  CACHE_HOST: Joi.string().required(),
  CACHE_PORT: Joi.number().required(),
  CACHE_TTL: Joi.number().required(),
})
