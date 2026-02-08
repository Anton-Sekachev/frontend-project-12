const rollbarConfig = {

  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN || 'your_token_here',
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default rollbarConfig;
