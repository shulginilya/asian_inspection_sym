var Payments, registration;

Registration = (function() {
  function Registration(options) {
    var me;
    if (options == null) {
      options = {};
    }
    me = this;
    this.options = options;
    me._eventsBinding();
  }

  Registration.prototype._eventsBinding = function() {

  };

  Registration.prototype._formDataCollector = function() {

  };

  Registration._nextRegistrationStep = function(e) {
    $(".swipe_forms_wr").addClass('step2_active');
    return false;
  };

  Registration._previousRegistrationStep = function(e) {
    $(".swipe_forms_wr").removeClass('step2_active');
  };

  Registration._finalRegistrationStep = function(e) {
    console.log('final registration step');
    return false;
  };

  return Registration;

})();

registration = new Registration;
