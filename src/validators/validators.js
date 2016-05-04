// This is the total list of available validators.
// Note: The list here is in logical order, if you are adding or moving validators around, check if the order makes sense.
export default {
  required: require('./requiredvalidator'),
  range: require('./rangevalidator'),
  regex: require('./regexvalidator'),
  minlength: require('./minlengthvalidator'),
  maxlength: require('./maxlengthvalidator'),
};
