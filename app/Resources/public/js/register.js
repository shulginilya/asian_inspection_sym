var Registration, registration, data_collector, fdc_res_data, r_data, username_regex, email_regex, mid_error, i, reg_error_msg, registration_call;

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
    $("#regi_fname").inputmask("a{*}");
    $("#regi_lname").inputmask("a{*}");
    $(".register_form_wr .form-control").bind("keyup", function(e) {
      if($(this).parent().hasClass('has-error')) {
        $(this).parent().removeClass('has-error');
      }
    });
  };

  Registration._formDataCollector = function() {
    username_regex = /[a-z0-9]/i;
    email_regex = /^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i;
    r_data = {
      fname: $.trim($("#regi_fname").val()),
      lname: $.trim($("#regi_lname").val()),
      company: $.trim($("#regi_company").val()),
      email: $("#regi_email").val(),
      country: $("#regi_country > option:selected").val(),
      phone: $.trim($("#regi_phone").val()),
      username: $("#regi_username").val(),
      psw: $.trim($("#regi_psw").val())
    };
    fdc_res_data = {
      'errors': [],
      'data': r_data
    };
    if(r_data.fname === '') {
      mid_error = {
        'id': 'regi_fname',
        'msg': 'First Name can not be empty'
      };
      fdc_res_data.errors.push(mid_error);
    }
    if(r_data.lname === '') {
      mid_error = {
        'id': 'regi_lname',
        'msg': 'Last Name can not be empty'
      };
      fdc_res_data.errors.push(mid_error);
    }
    if(r_data.company === '') {
      mid_error = {
        'id': 'regi_company',
        'msg': 'Company can not be empty'
      };
      fdc_res_data.errors.push(mid_error);
    }
    if(!email_regex.test(r_data.email)) {
      mid_error = {
        'id': 'regi_email',
        'msg': 'Invalid email'
      };
      fdc_res_data.errors.push(mid_error);
    }
    if(r_data.phone === '') {
      mid_error = {
        'id': 'regi_phone',
        'msg': 'Phone can not be empty'
      };
      fdc_res_data.errors.push(mid_error);
    }
    if(!username_regex.test(r_data.username)) {
      mid_error = {
        'id': 'regi_username',
        'msg': 'Invalid username'
      };
      fdc_res_data.errors.push(mid_error);
    }
    if(r_data.psw === '') {
      mid_error = {
        'id': 'regi_psw',
        'msg': 'Password can not be empty'
      };
      fdc_res_data.errors.push(mid_error);
    }
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
    $(".swipe_form .form-group").removeClass('has-error');
    data_collector = Registration._formDataCollector();
    if(data_collector.errors.length > 0) {
      reg_error_msg = "";
      for(i = 0; i < data_collector.errors.length; i++) {
        reg_error_msg += "<p>" + data_collector.errors[i].msg + "</p>";
        $("#" + data_collector.errors[i].id).parent().addClass('has-error');
      }
      toastr.error(reg_error_msg);
    } else {
      registration_call = $.post("/register/user", data_collector.data, 'json');
      registration_call.done(function(response_data) {
        if(response_data.status) {
          toastr.success("<p>" + response_data.msg + "</p>");
          setTimeout("location.reload()", 3000);
        } else {
          toastr.error("<p>" + response_data.msg + "</p>");
        }
      });
    }
    return false;
  };

  return Registration;

})();

registration = new Registration;
