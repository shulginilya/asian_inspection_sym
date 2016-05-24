var Registration, registration, data_collector, fdc_res_data, r_data;

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
    $("#regi_show_psw").bind("change", function(e) {
      if($(this).is(":checked")) {
        $('#regi_psw').showPassword();
      } else {
        $('#regi_psw').hidePassword();
      }
    });
    $("select.selectit_enabled").selectBoxIt({
      theme: 'bootstrap'
    });
  };

  Registration._formDataCollector = function() {
    r_data = {
      fname: $("#regi_fname").val(),
      lname: $("#regi_lname").val(),
      company: $("#regi_company").val(),
      email: $("#regi_email").val(),
      country: $("#regi_country > option:selected").val(),
      phone: $("#regi_phone").val(),
      username: $("#regi_username").val(),
      psw: $("#regi_psw").val()
    };
    fdc_res_data = {
      'status': false,
      'errors': [],
      'data': r_data
    };
    // TODO: validate incoming data
    return fdc_res_data;
  };

  Registration._nextRegistrationStep = function(e) {
    $(".swipe_forms_wr").addClass('step2_active');
    return false;
  };

  Registration._previousRegistrationStep = function(e) {
    $(".swipe_forms_wr").removeClass('step2_active');
  };

  Registration._finalRegistrationStep = function(e) {
    data_collector = Registration._formDataCollector();
    console.log("data_collector: ", data_collector);
    // TODO: submit finally validated data to server or show toastr with errors
    return false;
  };

  return Registration;

})();

registration = new Registration;
