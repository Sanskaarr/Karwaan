/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



'use strict';

var IconicusValidator = {

    getCurrentDocumentPosition(top = true) {
        return top ? window.scrollY : window.scrollY + window.innerHeight;
    },

    getPosition(el, top = true) {
        let curTop = 0;
        const originalEl = el;
        if (el.offsetParent) {
            do {
                curTop += el.offsetTop;
            } while (el = el.offsetParent);
        }
        if (!top) {
            curTop += originalEl.offsetHeight;
        }
        return curTop;
    },

    isInViewport(el, offset = 0, top = false) {
        const docPos = this.getCurrentDocumentPosition(top);
        const elPos = this.getPosition(el, top);
        return elPos + offset <= docPos;
    },

    scrollToIfNeeded(target, viewportOffset = 0, viewportTop = false, duration = 500, scrollOffset = 0) {
        if (!this.isInViewport(target, viewportOffset, viewportTop)) {
            this.scrollTo(target, duration, scrollOffset);
    }
    },

    scrollTo(target, duration = 500, offset = 0) {
        return new Promise(onAnimationEnd => {

            let element;
            if (typeof target === 'string') {
                element = document.querySelector(target);
            } else if (typeof target === 'object') {
                element = target;
            } else {
                element = null;
            }

            if (element !== null && element.offsetParent === null) {
                element = element.parentNode;
            }

            const start = window.pageYOffset;
            let distance = 0;
            if (element !== null) {
                distance = element.getBoundingClientRect().top;
            } else {
                distance = target;
            }
            distance = distance + offset - element.getBoundingClientRect().height;

            if (typeof duration === 'function') {
                duration = duration(distance);
            }

            let timeStart = 0;
            let timeElapsed = 0;

            requestAnimationFrame(time => {
                timeStart = time;
                loop(time);
            });

            function loop(time) {
                timeElapsed = time - timeStart;
                window.scrollTo(0, easeInOutQuad(timeElapsed, start, distance, duration));
                if (timeElapsed < duration) {
                    requestAnimationFrame(loop);
                } else {
                    end();
                }
            }

            function end() {
                window.scrollTo(0, start + distance);
                onAnimationEnd();
            }

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1)
                    return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
        });
    },

    hide(element) {
        return new Promise(resolve => {
            element.style.opacity = 0;
            element.style.overflow = 'hidden';
            const steps = 40;
            const step_delay_ms = 10;
            const height = element.offsetHeight;
            const height_per_step = Math.round(height / steps);
            element._originalHeight = height;
            for (let k = 1; k <= steps; k++) {
                if (k === steps) {
                    setTimeout(() => {
                        element.style.display = 'none';
                        element.style.height = '0px';
                        resolve();
                    }, step_delay_ms * k)
                } else {
                    setTimeout(() => {
                        element.style.height = height_per_step * (steps - k) + 'px';
                    }, step_delay_ms * k);
                }
            }
        });
    },

    show(element) {
        if (element._originalHeight === undefined) {
            throw new Error('element._originalHeight is undefined. Save original height when hiding element or use IconicusValidator.hide()');
        }
        return new Promise(resolve => {
            element.style.display = '';
            const steps = 40;
            const step_delay_ms = 10;
            const height = element._originalHeight;
            const height_per_step = Math.round(height / steps);
            delete element._originalHeight;
            for (let k = 1; k <= steps; k++) {
                if (k === steps) {
                    setTimeout(() => {
                        element.style.opacity = 1;
                        element.style.height = '';
                        element.style.overflow = '';
                        resolve();
                    }, step_delay_ms * k)
                } else {
                    setTimeout(() => {
                        element.style.height = height_per_step * k + 'px';
                    }, step_delay_ms * k);
                }
            }
        });
    },
    remove(element) {
        element.parentNode.removeChild(element);
    }

};

class ValidationUI {

    constructor(themeType) {
        this.themeType = themeType;
        if (themeType === "ADMIN")
            this.config = formAdminInputClassConfig.init();
        else
            this.config = formInputClassConfig.init();
    }

    toggleErrorClass(inputGroup) {
        inputGroup.classList.toggle(this.config.classInputGroupError);
    }

    createErrorNode() {
        const el = document.createElement(this.config.tagNameError);

        el.classList.add(this.config.classError);

        return el;
    }

    getErrorNode(inputGroup) {
        return inputGroup.getElementsByClassName(this.config.classError)[0] || false;
    }

    getErroServerNode(inputGroup) {
        return inputGroup.getElementsByClassName(this.config.classServerError)[0] || false;
    }

    removeErrorNode(inputGroup) {
        const el = this.getErrorNode(inputGroup);

        if (el) {
            if (this.themeType === 'ADMIN')
                inputGroup.classList.add('has-info');

            el.parentNode.removeChild(el);
            this.toggleErrorClass(inputGroup);
        }
    }
    setErrorMessage(input, inputGroup, message, spanId, tooltip = false) {
        let errorNode = this.getErrorNode(inputGroup);
        if (errorNode === false) {
            errorNode = this.createErrorNode();
            if (tooltip) {
                var tooltipHTML = "<span id ={nodeid} class='glyphicon glyphicon-exclamation-sign validation-icons error-tooltip {idclass}' data-placement='bottom'  text-algin='right' title='{tooltipMsg}'></span>";
                tooltipHTML = tooltipHTML.replace('{idclass}', spanId);
                tooltipHTML = tooltipHTML.replace('{nodeid}', spanId);
                tooltipHTML = tooltipHTML.replace('{tooltipMsg}', message);
                errorNode.innerHTML = tooltipHTML;
                this.toggleErrorClass(inputGroup);
                inputGroup.appendChild(errorNode);
                $('.' + spanId).tooltip('show');
            } else {
                if (inputGroup.hasAttribute('error-offset'))
                {
                    var val = inputGroup.getAttribute('error-offset');
                    var offset = "col-md-offset-" + val;
                    var col = 12 - val;
                    errorNode.classList.add("col-md-" + col);
                    errorNode.classList.add(offset);
                }

                inputGroup.classList.remove('has-info');
                errorNode.setAttribute('id', spanId);
                errorNode.textContent = message;
                this.toggleErrorClass(inputGroup);
                inputGroup.appendChild(errorNode);
            }
        } else {
            if (tooltip) {
                var tooltipNode = document.getElementById(spanId);
                tooltipNode.setAttribute('data-original-title', message);
                $('.' + spanId).tooltip('show');
            } else {
                errorNode.textContent = message;
            }
    }
    }

    setInputValid(inputGroup) {
        inputGroup.classList.add(this.config.classInputGroupSuccess);
    }

    getInput(inputGroup) {
        return inputGroup.querySelector(this.config.selectorInput) || false;
    }
    getInputGroup(input) {
        let el = input;
        while ((el = el.parentNode) && !el.classList.contains(this.config.classInputGroup))
            ;
        return el;
    }
    getInputsInSection(node, resolving = false) {
        const inputGroups = this.getInputGroupsInSection(node);
        let inputs;
        if (resolving) {
            inputs = {
                inputs: {},
                invalidInputs: {},
                length: 0,
                unresolvedLength: 0,
                invalidLength: 0
            };
        } else {
            inputs = [];
        }
        for (let k = 0; k < inputGroups.length; k++) {
            const input = this.getInput(inputGroups[k]);
            if (input === false) {
                continue;
            }
            if (resolving) {
                inputs.inputs[k] = {
                    input: input,
                    isValid: null,
                    invalidaMsg: null
                };
                inputs.length++;
                inputs.unresolvedLength++;
            } else {
                inputs.push(input);
            }
        }
        return inputs;
    }
    getValidatoeSection(node) {
        const inputGroups = this.getInputGroupsInSection(node);
        let validators = {};
        for (let k = 0; k < inputGroups.length; k++) {
            const input = this.getInput(inputGroups[k]);
            if (input === false) {
                continue;
            }
            var datarulesproperty = {};
            if (input.dataset.rules) {
                var validatorNames = input.dataset.rules.split('|');
                for (var i = 0, rulesLength = validatorNames.length; i < rulesLength; i++) {

                    datarulesproperty[validatorNames[i]] = input.getAttribute(validatorNames[i]);
                }
            }
            validators[input.name] = {
                input: input,
                datarules: input.dataset.rules,
                datarulesproperty: datarulesproperty
            };

        }
        return validators;
    }
    getLabel(inputGroup) {
        return inputGroup.getElementsByTagName('label')[0] || false;
    }

    getInputGroupsInSection(node) {
        return node.getElementsByClassName(this.config.classInputGroup);
    }
}

class Validators {

    constructor() {
        this.regex = regexConfig.init();
        this.validationUI = new ValidationUI();
    }
    required(input) {
        var value = IcoUtils.Trim(input.value);
        if ((input.type === 'checkbox') || (input.type === 'radio')) {
            return (input.checked === true);
        }
        return (value !== null && value !== '');
    }
    gstin(input) {
        if (input.value.length > 0)
            return this.regex.gstin.test(input.value);
        else
            return true;
    }
    otp(input) {
        if (input.hasAttribute('required')) {
            var value = input.value;
            return (value !== null && value !== '');
        } else {
            return true;
        }
    }
    termsAndConditon(input) {
        if (input.hasAttribute('required')) {
            var value = input.value;
            if ((input.type === 'checkbox') || (input.type === 'radio')) {
                return (input.checked === true);
            }
            return (value !== null && value !== '');
        } else {
            return true;
        }
    }
    email(input) {
        if (input.value.length > 0 && input.getAttribute('type') === 'email')
            return this.regex.emailRegex.test(input.value);
        else
            return true;
    }
    emails(input) {
        var result = input.value.split(/\s*,\s*/g);
        for (var i = 0, resultLength = result.length; i < resultLength; i++) {
            if (!this.regex.emailRegex.test(result[i])) {
                return false;
            }
        }
        return true;
    }
    maxlen(input, value) {
        if (value === null) {
            return false;
        }
        if (value !== null && input.value.length > value) {
            return {maxlen: value};
        }
        return true;
    }
    minlength(input) {
        if (input.getAttribute('minlength') !== null && input.value.length < input.getAttribute('minlength')) {
            return {minlength: input.getAttribute('minlength')};
        }
        return true;
    }
    tel(input) {
        if (input.value.length > 0 && input.getAttribute('type') === 'text') {
            return this.regex.telRegex.test(input.value);
        }
        return true;
    }
    numeric(input) {
        if (input.value.length > 0) {
            return this.regex.numericRegex.test(input.value);
        }
        return true;
    }
    integer(input) {
        if (input.value.length > 0 && input.getAttribute('type') === 'integer') {
            return this.regex.integerRegex.test(input.value);
        }
        return true;
    }
    decimal(input) {
        if (input.value.length > 0) {
            return this.regex.decimalRegex.test(input.value);
        }
        return true;
    }
    confirmation(input) {
        if (input.name.indexOf('_confirmation') > -1) {
            const originalInputId = input.name.substr(0, input.name.length - 13);
            const originalInput = document.getElementById(originalInputId);
            if (originalInput && originalInput.value === input.value) {
                return true;
            } else {
                return({originalLabel: this.validationUI.getLabel(this.validationUI.getInputGroup(originalInput)).textContent});
            }
        } else {
            return true;
        }
    }
}

var initializeValidation = function () {
    return {
        getObject: function (themeType) {
            return  new Validation(themeType);
        }
    };
}();

class Validation {

    constructor(themeType) {
        this.validationUI = new ValidationUI(themeType);
        this.validators = new Validators();
        this.messages = messageConfig.init();
        this.lang = this.messages.validationMsg;
    }

    init(formNameorNode, showErrorsEvent, removeErrorEvent, inline = true) {
        this.formNode = this._formByNameOrNode(formNameorNode);
        this.formNode.setAttribute('novalidate', '');
        this.putEvents(showErrorsEvent, removeErrorEvent, inline);
        this.formdata = this.validationUI.getInputsInSection(this.formNode);
        this.validatorrules = this.validationUI.getValidatoeSection(this.formNode);
    }

    _formByNameOrNode(formNameOrNode) {
        return (typeof formNameOrNode === 'object') ? formNameOrNode : document.forms[formNameOrNode];
    }

    putEvents(errorShowEvents, errorRemoveEvent, inline) {
        if (inline) {
            const inputs = this.validationUI.getInputsInSection(this.formNode);

            for (var i = 0, eventength = errorShowEvents.length; i < eventength; i++) {
                var event = errorShowEvents[i];
                if (!event) {
                    console.warn('common.validation.function.js: The following event is being skipped due to a misconfiguration:');
                    console.warn(event);
                    console.warn('Check to ensure you have properly configured a name and rules for this field');
                    continue;
                }

                inputs.forEach(input => {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.addEventListener('change', () => {
                            this.checkInput(input, false);
                        });
                    }
                    input.addEventListener(event, () => {
                        this.checkInput(input, false);
                    });
                });
            }
            if (errorRemoveEvent !== "")
                inputs.forEach(input => {
                    input.addEventListener(errorRemoveEvent, () => {
                        const inputGroup = this.validationUI.getInputGroup(input);
                        this.validationUI.removeErrorNode(inputGroup);
                        inputGroup.classList.add('has-info');
                    });
                });
        }
    }
    focusInput(input) {
        input.focus();
        let inputgroup1 = this.validationUI.getInputGroup(input);
        if (inputgroup1.getAttribute('data-tabcustom'))
        {
            let tabName = inputgroup1.getAttribute('data-tabcustom') + 'Id';
            document.getElementById(tabName).click();
        }
        IconicusValidator.scrollTo(inputgroup1);
    }
    removeErrorFromElement() {
        var node = this.formNode;
        var resolvingInputs = this.validationUI.getInputsInSection(node, true);
        for (var i = 0; i < resolvingInputs.length; i++) {
            var input = resolvingInputs.inputs[i].input;
            var _inputGroup = this.validationUI.getInputGroup(input);
            this.validationUI.removeErrorNode(_inputGroup);
            this.validationUI.setInputValid(_inputGroup);
        }
    }

    resetForm() {
        this.formdata.forEach(input => {
            this.formNode.reset();
            const inputGroup = this.validationUI.getInputGroup(input);
            this.validationUI.removeErrorNode(inputGroup);
        });
        return 0;

    }

    newForm() {
        this.formdata.forEach(input => {
            if (input.type !== 'checkbox')
                input.value = '';
            input.checked = false;
            const inputGroup = this.validationUI.getInputGroup(input);
            this.validationUI.removeErrorNode(inputGroup);
        });
        return 0;
    }

    resetSingleInput(input) {
        const inputGroup = this.validationUI.getInputGroup(input);
        this.validationUI.removeErrorNode(inputGroup);
    }
    setSingleErrorInput(input, inputgroup, message, spanid) {
        this.validationUI.setErrorMessage(input, inputgroup, message, spanid);
    }

    resetSingleInputwithValue(input) {
        input.value = "";
        const inputGroup = this.validationUI.getInputGroup(input);
        this.validationUI.removeErrorNode(inputGroup);
    }

    validateForm() {
        var node = this.formNode;
        if (node.__validation_state === undefined) {
            node.__validation_state = true;
        } else {
            throw new Error('Iconicus Validation: validation already in progress.');
        }
        const resolvingInputs = this.validationUI.getInputsInSection(node, true);

        if (resolvingInputs.length === 0) {
            return this._endSectionValidation(node, resolvingInputs);
        } else {

            for (let i = 0; i < resolvingInputs.length; i++) {

                const input = resolvingInputs.inputs[i].input;

                var responsejson = this.checkInput(input, false);
                if (responsejson.valid === false)
                {
                    this._addInvalidInput(resolvingInputs, input, responsejson.msg);
                    if (resolvingInputs.unresolvedLength === 0) {
                        return this._endSectionValidation(node, resolvingInputs);
                    }
                } else {
                    this._addValidInput(resolvingInputs, input);
                    if (resolvingInputs.unresolvedLength === 0) {
                        return this._endSectionValidation(node, resolvingInputs);
                    }
                }
            }
        }

    }
    checkInput(input, manual, rules) {
        var validator = void 0;
        var data_rules = void 0;
        if (manual) {
            validator = rules;
            data_rules = validator[input.name].datarules;
        } else {
            validator = this.validatorrules;
            data_rules = validator[input.name].datarules;
        }

        if (data_rules === undefined) {
            return true;
        }
        var validatorNames = data_rules.split('|');

        var input_valid = true;

        for (var i = 0, rulesLength = validatorNames.length; i < rulesLength; i++) {
            if (this.validators[validatorNames[i]] === undefined) {
                console.warn('Iconicus Validate error: validator "' + validatorNames[i] + '" not found.');
                return {valid: true};
            }
            var validator_Result = this.validators[validatorNames[i]](input, validator[input.name].datarulesproperty[validatorNames[i]]);
            var valid = false;
            var validator_data = {
            };
            var input_valid = true;

            if (typeof validator_Result !== 'boolean') {
                for (var k in validator_Result) {
                    valid = false;
                    validator_data[k] = validator_Result[k];
                }
            } else {
                valid = validator_Result;
            }
            const inputGroup = this.validationUI.getInputGroup(input);
            if (inputGroup.style.display === "none") {
                valid = true;
            }

            var errorMessage = "";
            if (!valid) {
                const label = this.validationUI.getLabel(inputGroup);
                errorMessage = this._getErrorMessage(validatorNames[i], input, label, validator_data);
                this.validationUI.setErrorMessage(input, inputGroup, errorMessage, input.name + 'Span');
                input_valid = false;
                break;
            }
        }
        if (valid) {
            const inputGroup = this.validationUI.getInputGroup(input);
            this.validationUI.removeErrorNode(inputGroup);
            this.validationUI.setInputValid(inputGroup);
        }

        return {
            valid: input_valid, msg: errorMessage
        };
    }
    _addValidInput(resolvingInputs, input)
    {
        resolvingInputs.unresolvedLength--;
        for (let k in resolvingInputs.inputs) {
            if (input === resolvingInputs.inputs[k].input) {
                resolvingInputs.inputs[k].isValid = true;
                break;
            }
        }
    }
    _addInvalidInput(resolvingInputs, input, msg) {
        resolvingInputs.unresolvedLength--;
        resolvingInputs.invalidLength++;
        for (let k in resolvingInputs.inputs) {
            if (input === resolvingInputs.inputs[k].input) {
                resolvingInputs.inputs[k].isValid = false;
                resolvingInputs.inputs[k].invalidaMsg = msg;
                resolvingInputs.invalidInputs[k] = input;
                break;
            }
        }
    }
    _endSectionValidation(node, resolvingInputs, resolve) {
        delete node.__validation_state;

        if (resolvingInputs.invalidLength === 0) {
            return true;
        } else {
            var invalidInputs = [];
            for (var k in resolvingInputs.invalidInputs) {
                invalidInputs.push(resolvingInputs.invalidInputs[k]);
            }
            this.focusInput(invalidInputs[0]);
            return false;
        }
    }
    _getErrorMessage(validatorName, input, label, data) {
        let message = '';
        if (typeof data === 'string') {
            message = data;
        } else {
            if (this.lang[validatorName] === undefined) {
                throw new Error('Iconicus Validation: Error message not found for validator: ' + validatorName);
            }
            message = this.lang[validatorName];
        }
        var custommsg = input.dataset.icomessage;
        if (custommsg !== undefined && IcoUtils.Trim(custommsg) != "") {
            message = custommsg;
        } else if (label !== false && label.textContent !== '') {
            message = message.replace('{0}', label.textContent);
            message = message.replace('*', '');
        } else if (input.placeholder && input.placeholder !== '') {
            message = message.replace('{0}', input.placeholder);
        } else {
            message = message.replace('{0}', 'This field');
        }
        for (let paramName in data) {
            message = message.replace('{' + paramName + '}', data[paramName]);
        }
        return message;
    }

    getvalidationForsingle(input) {
        var validator = {};
        var datarulesproperty = {};
        if (input.dataset.rules) {
            var validatorNames = input.dataset.rules.split('|');
            for (var i = 0, rulesLength = validatorNames.length; i < rulesLength; i++) {

                datarulesproperty[validatorNames[i]] = input.getAttribute(validatorNames[i]);
            }
        }
        validator[input.name] = {
            input: input,
            datarules: input.dataset.rules,
            datarulesproperty: datarulesproperty
        };
        return validator;
    }
}
