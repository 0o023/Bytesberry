const validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  };
  
  /*
  const validateParams = (schema) => {
    return (req, res, next) => {
    
      const { error } = schema.validate({
        ...req.params,
        user_id: req.body.user_id // Add user_id from req.body to the params for validation
      })

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  };
  */

  const validateParams = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.params);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  };
  
  
  module.exports = {
    validate,
    validateParams,
  };
  