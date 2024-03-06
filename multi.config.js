/*
 * Bot for WhatsApp
 * Copyright (C) 2023 Pikzy
 */

module.exports = {
  name: 'WhatsApp-Multi',
  script: 'node',
  args: 'multi.js',
  restart_delay: 5000,

  env_production: {
    NODE_ENV: 'production'
  },
  env_development: {
    NODE_ENV: 'development'
  }
}