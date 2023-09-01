'use strict';


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* Config Object contains all common valiadtion and error massges that are used to display on HTML page
 *
 * To use this intitalize object with Congig.init() in other js Module
 *  
 * */
var IcoUtils = {

    Trim(TRIM_VALUE) {
        var self = this;
        if (TRIM_VALUE.length < 1)
            return "";
        TRIM_VALUE = self.LTrim(TRIM_VALUE);
        TRIM_VALUE = self.RTrim(TRIM_VALUE);
        if (TRIM_VALUE == "")
            return "";
        else
            return TRIM_VALUE;

    },
    LTrim(VALUE) {
        var w_space = String.fromCharCode(32);
        var w_enter = String.fromCharCode(10);
        if (v_length < 1)
            return"";
        var v_length = VALUE.length;
        var strTemp = "";
        var iTemp = 0;
        while (iTemp < v_length) {
            if (VALUE.charAt(iTemp) == w_space || VALUE.charAt(iTemp) == w_enter)
                iTemp = iTemp + 1;
            else {
                break;
            }
        }
        strTemp = VALUE.substring(iTemp, v_length);
        return strTemp;
    },
    RTrim(VALUE) {
        var w_space = String.fromCharCode(32);
        var w_enter = String.fromCharCode(10);
        var v_length = VALUE.length;
        var strTemp = "";
        if (v_length < 0)
            return"";
        var iTemp = v_length - 1;
        while (iTemp > -1) {
            if (VALUE.charAt(iTemp) == w_space || VALUE.charAt(iTemp) == w_enter)
                iTemp = iTemp - 1;
            else {
                break;
            }
        }
        strTemp = VALUE.substring(0, iTemp + 1);
        return strTemp;


    },

    isempty(elename) {
        var self = this;
        var trimvalue = self.Trim(document.getElementById(elename).value);
        return (trimvalue === null || trimvalue === '');
    },
    isemptyvalue(value) {
        var self = this;
        var trimvalue = self.Trim(value);
        return (trimvalue === null || trimvalue === '');
    }
    , scrollTop() {
        $('#profileLoader').animate({
            scrollTop: $("#profileLoader").offset()
        }, 900);
    }
};


var FormChanges = {
    getHasChanges(formId) {
        var hasChanges = false;

        $("#" + formId + " :input:not(:button):not([type=hidden])").each(function () {
            if ((this.type == "text" || this.type == "textarea" || this.type == "hidden") && this.defaultValue != this.value) {
                hasChanges = true;
                return false;
            } else {
                if ((this.type == "radio" || this.type == "checkbox") && this.defaultChecked != this.checked) {
                    hasChanges = true;
                    return false;
                } else {
                    if ((this.type == "select-one" || this.type == "select-multiple")) {
                        for (var x = 1; x < this.length; x++) {
                            if (this.options[x].selected !== this.options[x].defaultSelected) {
                                hasChanges = true;
                                return false;
                            }
                        }
                    }
                }
            }
        });

        return hasChanges;
    },

    acceptChanges(formId) {
        $("#" + formId + " :input:not(:button):not([type=hidden])").each(function () {
            if (this.type == "text" || this.type == "textarea" || this.type == "hidden") {
                this.defaultValue = this.value;
            }
            if (this.type == "radio" || this.type == "checkbox") {
                this.defaultChecked = this.checked;
            }
            if (this.type == "select-one" || this.type == "select-multiple") {
                for (var x = 1; x < this.length; x++) {
                    this.options[x].defaultSelected = this.options[x].selected;
                }
            }
        });
    }


};


var Loader = {
    startLoader(divId) {
        NProgress.configure({parent: '#' + divId, showSpinner: false, speed: 500});
        NProgress.start();
    },
    stopLoader() {
        NProgress.done();
    }
};

var CustomAlert = {
    show(msg, callback, btnText = 'Apply') {
        swal({
            title: 'Are you sure?',
            text: msg,
            type: 'warning',
            animation: true,
            customClass: 'animated pulse',
            showCancelButton: true,
            confirmButtonClass: "btn-primary btn red-haze",
            cancelButtonClass: "btn btn-outline",
            confirmButtonText: btnText,
            reverseButtons: true
        }, callback, function () {
            alert('hi');
        });

    }
};

var userdateformat = {"dateformat": 'dd-mm-yyyy', "delimiter": "-"};
var dateIntializer = {
    init(elemet, orientation, startdate, today) {
        var config = {};
        config.format = "dd-mm-yyyy";
        config.autoclose = true;
        config.orientation = "bottom auto";
        config.todayHighlight = true;

        var format = $("#" + elemet).data('dateFormat');
        if (format !== undefined && IcoUtils.Trim(format) !== "") {
            config.format = format;
        } else if (userdateformat) {
            config.format = userdateformat.dateformat;
        }

        if (orientation) {
            config.orientation = orientation;
        }
        if (startdate)
        {
            config.startDate = startdate;
        }
        $('#' + elemet).datepicker(config);
        if (today) {
            $('#' + elemet).datepicker().datepicker('setDate', today);
        }
    },
    calculateDays(fromdate, todate) {
        var self = this;
        if (fromdate && todate) {
            var date1 = self.stringToDate(fromdate, userdateformat.dateformat, userdateformat.delimiter);
            var date2 = self.stringToDate(todate, userdateformat.dateformat, userdateformat.delimiter);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return diffDays;
        } else {
            return 0;
        }
    },

    comparedates(firstdate, enddate) {
        if (enddate.getTime() < firstdate.getTime()) {
            return false;
        }
        return true;
    },

    stringToDate(_date, _format = userdateformat.dateformat, _delimiter = userdateformat.delimiter)
    {
        if (_date !== null && _date !== '') {
            var formatLowerCase = _format.toLowerCase();
            var formatItems = formatLowerCase.split(_delimiter);
            var dateItems = _date.split(_delimiter);
            var monthIndex = formatItems.indexOf("mm");
            var dayIndex = formatItems.indexOf("dd");
            var yearIndex = formatItems.indexOf("yyyy");
            var month = parseInt(dateItems[monthIndex]);
            month -= 1;
            var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
            return formatedDate;
        } else {
            return null;
    }
    },
    calcBusinessDaysExcludeSunday(fromdate, todate) {
        var self = this;
        if (fromdate && todate) {
            var dDate1 = self.stringToDate(fromdate, userdateformat.dateformat, userdateformat.delimiter);
            var dDate2 = self.stringToDate(todate, userdateformat.dateformat, userdateformat.delimiter);
//            var holidays = ['23-11-2017', '2016-05-05'];
            var startDate = dDate1;
            var endDate = dDate2;
            if (endDate < startDate) {
                return 0;
            }
            // Calculate days between dates
            var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
            startDate.setHours(0, 0, 0, 1);  // Start just after midnight
            endDate.setHours(23, 59, 59, 999);  // End just before midnight
            var diff = endDate - startDate;  // Milliseconds between datetime objects    
            var days = Math.ceil(diff / millisecondsPerDay);

            // Subtract two weekend days for every week in between
            var weeks = Math.floor(days / 7);
            days -= weeks * 1;
            var startDay = startDate.getDay();
            var endDay = endDate.getDay();
            if (startDay - endDay > 1) {
                days -= 1;
            }
            if (startDay == 0 && endDay != 6) {
                days--;
            }

            /* Here is the code */
//            for (var i in holidays) {
//                var holiday = self.stringToDate(holidays[i], userdateformat.dateformat, userdateformat.delimiter);
//                if ((holiday >= dDate1) && (holiday <= dDate2)) {
//                    days--;
//                }
//            }
            return days;
        }
    },
    calcBusinessDaysExcludeWeekends(fromdate, todate) {
        var self = this;// input given as Date objects
        if (fromdate && todate) {
            var dDate1 = self.stringToDate(fromdate, userdateformat.dateformat, userdateformat.delimiter);
            var dDate2 = self.stringToDate(todate, userdateformat.dateformat, userdateformat.delimiter);
//            var holidays = ['23-11-2017', '2016-05-05'];
            var startDate = dDate1;
            var endDate = dDate2;
            if (endDate < startDate) {
                return 0;
            }
            // Calculate days between dates
            var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
            startDate.setHours(0, 0, 0, 1);  // Start just after midnight
            endDate.setHours(23, 59, 59, 999);  // End just before midnight
            var diff = endDate - startDate;  // Milliseconds between datetime objects    
            var days = Math.ceil(diff / millisecondsPerDay);

            // Subtract two weekend days for every week in between
            var weeks = Math.floor(days / 7);
            days -= weeks * 2;

            // Handle special cases
            var startDay = startDate.getDay();
            var endDay = endDate.getDay();
            // Remove weekend not previously removed.   
            if (startDay - endDay > 1) {
                days -= 2;
            }
            // Remove start day if span starts on Sunday but ends before Saturday
            if (startDay == 0 && endDay != 6) {
                days--;
            }
            // Remove end day if span ends on Saturday but starts after Sunday
            if (endDay == 6 && startDay != 0) {
                days--;
            }
//            for (var i in holidays) {
//                var holiday = self.stringToDate(holidays[i], userdateformat.dateformat, userdateformat.delimiter);
//                if ((holiday >= dDate1) && (holiday <= dDate2)) {
//                    days--;
//                }
//            }
            return days;
        }
    },
    addWorkDaysExcludestsun(startDate, days) {
        // Get the day of the week as a number (0 = Sunday, 1 = Monday, .... 6 = Saturday)
        var dow = startDate.getDay();
        var daysToAdd = days;
        // If the current day is Sunday add one day
        if (dow == 0)
            daysToAdd++;
        // If the start date plus the additional days falls on or after the closest Saturday calculate weekends
        if (dow + daysToAdd >= 6) {
            //Subtract days in current working week from work days
            var remainingWorkDays = daysToAdd - (5 - dow);
            //Add current working week's weekend
            daysToAdd += 2;
            if (remainingWorkDays > 5) {
                //Add two days for each working week by calculating how many weeks are included
                daysToAdd += 2 * Math.floor(remainingWorkDays / 5);
                //Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
                if (remainingWorkDays % 5 == 0)
                    daysToAdd -= 2;
            }
        }
        startDate.setDate(startDate.getDate() + daysToAdd);
        return startDate;
    },
    addWorkDaysexcludesunday(startDate, days) {
        var self = this;
        var startDate = self.stringToDate(startDate, userdateformat.dateformat, userdateformat.delimiter);
        var dow = startDate.getDay();
        var daysToAdd = days;
        // If the start date plus the additional days falls on or after the closest Saturday calculate weekends
        if (dow + daysToAdd > 6) {
            //Subtract days in current working week from work days
            var remainingWorkDays = daysToAdd - (7 - dow);
            if (remainingWorkDays === 0) {
                daysToAdd -= 1;
            }
            if (remainingWorkDays >= 6) {
                daysToAdd += 1 * Math.floor(remainingWorkDays / 6);
                //Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
                if (remainingWorkDays % 6 == 0)
                    daysToAdd -= 1;
            }
        }
        startDate.setDate(startDate.getDate() + daysToAdd);
        return startDate;
    },
    getAge(fromdate, todate)
    {
        var self = this;
        if (fromdate && todate) {
            var date1_UTC = self.stringToDate(fromdate, userdateformat.dateformat, userdateformat.delimiter);
            var date2_UTC = self.stringToDate(todate, userdateformat.dateformat, userdateformat.delimiter);
            var yAppendix, mAppendix, dAppendix;
//--------------------------------------------------------------
            var days = date2_UTC.getDate() - date1_UTC.getDate();

            var timeDiff = Math.abs(date2_UTC.getTime() - date1_UTC.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (days < 0)
            {
                date2_UTC.setMonth(date2_UTC.getMonth() - 1);
                days += self.DaysInMonth(date2_UTC);
            }
//--------------------------------------------------------------
            var months = date2_UTC.getMonth() - date1_UTC.getMonth();
            if (months < 0)
            {
                date2_UTC.setFullYear(date2_UTC.getFullYear() - 1);
                months += 12;
            }
//--------------------------------------------------------------
            var years = date2_UTC.getFullYear() - date1_UTC.getFullYear();

            if (years > 1)
                yAppendix = " years";
            else
                yAppendix = " year";
            if (months > 1)
                mAppendix = " months";
            else
                mAppendix = " month";
            if (days > 1)
                dAppendix = " days";
            else
                dAppendix = " day";
            return {"days": diffDays, "formated": years + yAppendix + ", " + months + mAppendix + ", and " + days + dAppendix + ""};
        }
    },

    DaysInMonth(date2_UTC)
    {
        var monthStart = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth(), 1);
        var monthEnd = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth() + 1, 1);
        var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
        return monthLength;
    },

    changedate(elemet, formobject) {
        $('#' + elemet).datepicker()
                .on("changeDate", function (e) {
                    formobject.resetSingleInput(document.getElementById(elemet));
                });
    }
};


var globalErrorMsg = {
    globalMsg: "Internal server Error. ",
    globalJavaScriptMsg: "Internal Error. "
};
var globalSuccMsg = {
    OtpSendSuc: "Otp Send Successfully"
};


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* Config Object contains all common valiadtion and error massges that are used to display on HTML page
 *
 * To use this intitalize object with Congig.init() in other js Module
 *  
 * */
var messageConfig = function () {
    var messages = {
        validationMsg: {
            required: "Please enter value for {0} ",
            matches: 'The {0} field does not match the {field} field.',
            default: 'The {0} field is still set to default, please change.',
            email: 'The {0} field must contain a valid email address.',
            emails: 'The {0} field must contain all valid email addresses.',
            exact_length: 'The {0} field must be exactly {} characters in length.',
            minlength: "{0} must be at least {minlength} character(s).",
            maxlen: "{0} must be less than {maxlen} characters.",
            min: "{0} must be at least {1}.",
            max: "{0} must be at most {1}.",
            greater_than: 'The {0} field must contain a number greater than %s.',
            less_than: 'The {0} field must contain a number less than %s.',
            pattern: "{0} is invalid.",
            url: "{0} must be a valid URL.",
            number: "{0} must be a number.",
            unknown: "{0} is invalid.",
            validationTitle: 'There are some validation errors',
            passwordMatch: "These passwords don't match.",
            tel: "Please enter a valid Mobile Number",
            alpha: 'The {0} field must only contain alphabetical characters.',
            alpha_numeric: 'The {0} field must only contain alpha-numeric characters.',
            alpha_dash: 'The {0} field must only contain alpha-numeric characters, underscores, and dashes.',
            numeric: 'The {0} field must contain only numbers.',
            integer: 'The {0} field must contain an integer.',
            decimal: 'The {0} field must contain a decimal number.',
            is_natural: 'The {0} field must contain only positive numbers.',
            is_natural_no_zero: 'The {0} field must contain a number greater than zero.',
            valid_ip: 'The {0} field must contain a valid IP.',
            valid_base64: 'The {0} field must contain a base64 string.',
            valid_credit_card: 'The {0} field must contain a valid credit card number.',
            is_file_type: 'The {0} field must contain only {1} files.',
            valid_url: 'The {0} field must contain a valid URL.',
            greater_than_date: 'The {0} field must contain a more recent date than {1}.',
            less_than_date: 'The {0} field must contain an older date than {1}.',
            greater_than_or_equal_date: 'The {0} field must contain a date that\'s at least as recent as {1}.',
            less_than_or_equal_date: 'The {0} field must contain a date that\'s {1} or older.',
            numberonly: "{0} must be a number.",
            confirmation: "{0} is not equal to {originalLabel}"
        },
        homeMsg: {
            1: "Locate Me",
            2: "Download The App"
        },
        serverError: {
            error: "404 not found"
        },
        errorMsg: {
            common: "Error in javascript"
        }
    };
    return {
        //main function to initiate the module
        init: function init() {
            return messages;
        }
    };
}();

var regexConfig = function () {
    var regex = {
        ruleRegex: /^(.+?)\[(.+)\]$/,
        numericRegex: /^[0-9]+$/,
        integerRegex: /^\-?[0-9]+$/,
        decimalRegex: /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        alphaRegex: /^[a-z]+$/i,
        alphaNumericRegex: /^[a-z0-9]+$/i,
        alphaDashRegex: /^[a-z0-9_\-]+$/i,
        naturalRegex: /^[0-9]+$/i,
        naturalNoZeroRegex: /^[1-9][0-9]*$/i,
        ipRegex: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex: /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex: /^[\d\-\s]+$/,
        urlRegex: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        dateRegex: /\d{4}-\d{1,2}-\d{1,2}/,
        telRegex: /^\d+$/

    };
    return {
        //main function to initiate the module
        init: function init() {
            return regex;
        }
    };
}();

var formInputClassConfig = function () {
    var formInputClass = {
        // div/node class name selector which contains one label, one input, one help text etc.
        classInputGroup: 'form-group',
        // class to be applied on input group node if it has invalid input
        classInputGroupError: 'has-error',
        // class to be applied on input group node if it input passed validation (is valid)
        classInputGroupSuccess: 'has-info',
        // label to pick textContent from to insert field name into error message
        classLabel: 'form-control-label',
        // error message tag name
        tagNameError: 'span',
        // error message class
        classError: 'help-block-error-custom',
        // query selector to search inputs within input groups to validate
        selectorInput: '[name]',

        classServerError: 'help-error-server'

    };

    return {
        //main function to initiate the module
        init: function init() {
            return formInputClass;
        }
    };
}();