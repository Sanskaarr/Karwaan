/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global NProgress */

var varProblem = '<div><b>Some problem arise.</b></div>';
function getData_sync(dataSource, divID, param, flag) {
    var XMLHttpRequestObject = false;
    if (window.XMLHttpRequest) {
        XMLHttpRequestObject = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (XMLHttpRequestObject) {
        var obj = document.getElementById(divID);
        NProgress.start();
        XMLHttpRequestObject.open("POST", dataSource, flag);
        XMLHttpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XMLHttpRequestObject.send(param);

        if (XMLHttpRequestObject.readyState === 4) {
            NProgress.done();
            obj.innerHTML = XMLHttpRequestObject.responseText;
        }
    }
}
function getDataValid(dataSource, param)
{
    var XMLHttpRequestObject = false;
    if (window.XMLHttpRequest)
    {
        XMLHttpRequestObject = new XMLHttpRequest();
    } else if (window.ActiveXObject)
    {
        XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (XMLHttpRequestObject)
    {
        NProgress.start();
        XMLHttpRequestObject.open("POST", dataSource, false);
        XMLHttpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XMLHttpRequestObject.send(param);

        if (XMLHttpRequestObject.readyState === 4)
        {
            NProgress.done();
            var t = XMLHttpRequestObject.responseText;
            return Trim(t);
        }
    }
}

function getData(dataSource, divID, param) {

    var XMLHttpRequestObject = false;
    if (window.XMLHttpRequest) {
        XMLHttpRequestObject = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (XMLHttpRequestObject) {
        var obj = document.getElementById(divID);
        NProgress.start();
        XMLHttpRequestObject.open("POST", dataSource);
        XMLHttpRequestObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XMLHttpRequestObject.onreadystatechange = function () {
            if (XMLHttpRequestObject.readyState === 4 && XMLHttpRequestObject.status === 200) {
                NProgress.done();
                obj.innerHTML = XMLHttpRequestObject.responseText;
            }
        };
        XMLHttpRequestObject.send(param);
    }
}




function getalldata(oForm) {
    var aParams = new Array();
    var sParam = '';
    for (var i = 0; i < oForm.elements.length; i++) {
        if (oForm.elements[i].tagName === "SELECT")
        {
            for (var j = 0; j < oForm.elements[i].options.length; j++)
            {
                if (oForm.elements[i].options[j].selected)
                {
                    sParam = encodeURIComponent(oForm.elements[i].name);
                    sParam += "=";
                    sParam += encodeURIComponent(oForm.elements[i][j].value);
                    aParams.push(sParam);
                }
            }
        }
        if (oForm.elements[i].type === "textarea")
        {
            sParam = encodeURIComponent(oForm.elements[i].name);
            sParam += "=";
            sParam += encodeURIComponent(oForm.elements[i].value);
            aParams.push(sParam);
        }

        if (oForm.elements[i].type === "checkbox" && oForm.elements[i].checked === true)
        {
            sParam = encodeURIComponent(oForm.elements[i].name);
            sParam += "=";
            sParam += encodeURIComponent(oForm.elements[i].value);
            aParams.push(sParam);
        }

        if (oForm.elements[i].type === "radio" && oForm.elements[i].checked === true)
        {
            sParam = encodeURIComponent(oForm.elements[i].name);
            sParam += "=";
            sParam += encodeURIComponent(oForm.elements[i].value);
            aParams.push(sParam);
        }

        if (oForm.elements[i].tagName === "INPUT" && oForm.elements[i].type === "text")
        {
            sParam = encodeURIComponent(oForm.elements[i].name);
            sParam += "=";
            sParam += encodeURIComponent(oForm.elements[i].value);
            aParams.push(sParam);
        }
        if (oForm.elements[i].tagName === "INPUT" && oForm.elements[i].type === "hidden")
        {
            sParam = encodeURIComponent(oForm.elements[i].name);
            sParam += "=";
            sParam += encodeURIComponent(oForm.elements[i].value);
            aParams.push(sParam);
        }
        if (oForm.elements[i].tagName === "INPUT" && oForm.elements[i].type === "password")
        {
            sParam = encodeURIComponent(oForm.elements[i].name);
            sParam += "=";
            sParam += encodeURIComponent(oForm.elements[i].value);
            aParams.push(sParam);
        }
        if (oForm.elements[i].tagName === "INPUT" && oForm.elements[i].type === "email")
        {
            sParam = encodeURIComponent(oForm.elements[i].name);
            sParam += "=";
            sParam += encodeURIComponent(oForm.elements[i].value);
            aParams.push(sParam);
        }
        if (oForm.elements[i].tagName === "INPUT" && oForm.elements[i].type === "file")
        {
            sParam = encodeURIComponent(oForm.elements[i].name);
            sParam += "=";
            sParam += encodeURIComponent(oForm.elements[i].value);
            aParams.push(sParam);
        }
    }
    return aParams.join("&");
}
