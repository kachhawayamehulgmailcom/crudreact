export const validateEmail = email => {
  var pattern = new RegExp(
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return pattern.test(String(email).toLowerCase());
};

export const validateContact = (c) => {
  // ***** ContactNumber can't start with zero and between 7-15 digits and can't contains character or special symbols  
  //let CONTACT_REGEXP = /^[+-]?[1-9]{1}[0-9]{7,14}$/;
  c = c.replace(/^0+/, '');
  let CONTACT_REGEXP = /^[0-9]{1}[0-9]{7,14}$/;
  return CONTACT_REGEXP.test(c) ? true : false
}