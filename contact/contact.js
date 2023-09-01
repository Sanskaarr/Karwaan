/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global jQueryAjax */

Contact = {
    contactusform: 'contactusform',
    contactusformObject: initializeValidation.getObject(),
    init() {
        var self = this;
        self.contactusformObject.init(self.contactusform, ['blur'], 'input', true);
        $('.navbar-brand').click(function () {
            $("#layer2-menu").attr("style", "");
        });
        $('#mySidenav').click(function () {
            $("#layer2-menu").attr("style", "background:black");
        });


    },
    saveContactUs() {
        var self = this;
        if (self.contactusformObject.validateForm()) {
            $('#contactsave').attr('disabled', 'disabled');
            var form = document.contactusform;
            var param = getalldata(form);
            let response = ContactService.saveContactUs(param);
            response.done(function (data) {
                $('#contactspan').html('Thank you for connecting with karwaan. Our team will get back to you soon.');
                self.contactusformObject.newForm();
                $('#contactsave').removeAttr('disabled');
            }).fail(function (errorResponse) {
                $('#contactsave').removeAttr('disabled');
                console.log(errorResponse);
//                commonfunctions.showErrorMessage(errorResponse, 'Error while saving Lead Management', 'toaster', ' ', null);
            });
        }
    }
};
ContactService = {
    saveContactUs(data) {
        return jQueryAjax.post('contact/save.json', data, 'json', 'application/x-www-form-urlencoded');
    }
};
jQuery(document).ready(function () {
    Contact.init();
});