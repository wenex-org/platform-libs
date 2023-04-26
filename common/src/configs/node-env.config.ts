export function NODE_ENV(env = 'development') {
  return {
    IS_TEST: (process.env.NODE_ENV ?? env).toLowerCase().startsWith('test'),
    IS_PRODUCTION: (process.env.NODE_ENV ?? env)
      .toLowerCase()
      .startsWith('prod'),
    IS_DEVELOPMENT: (process.env.NODE_ENV ?? env)
      .toLowerCase()
      .startsWith('dev'),
  };
}
