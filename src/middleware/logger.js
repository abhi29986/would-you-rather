//Middleware function for logging action and state
const logger = store => {
  return next => {
    return action => {
      console.log("[MiddleWare] Dispatching", action);
      const result = next(action);
      console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

export default logger;
