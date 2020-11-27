/* global $ */
/* this is an example for validation and change events */
$.fn.numericInputExample = function () {
    'use strict';
    var element = $(this),
        footer = element.find('tfoot tr'),
        dataRows = element.find('tbody tr'),
        initialTotal = function () {
            var column, total;
            for (column = 1; column < footer.children().size(); column++) {
                //if((footer.children().size()-1) == column || column == 1){
                //footer.children().eq(column).text("");
                //}else{
                total = 0;
                dataRows.each(function () {
                    var row = $(this);
                    total += parseFloat(
                        row.children().eq(column).text() == '' ||
                        row.children().eq(column).text() == null ? 0 : row.children().eq(column).text());
                });
                footer.children().eq(column).text(total);
                //}
            }
            ;
        };
    element.find('td').on('change', function (evt) {
        var cell = $(this),
            column = cell.index(),
            total = 0;
        var count = (cell.parent().find('td').size()) - 1;
        if (count == column) {
            return;
        }
        if (column === 0) {
            return;
        }
        element.find('tbody tr').each(function () {
            var row = $(this);
            total += parseFloat(row.children().eq(column).text());
        });
        //累计值
        //if (column === 1 && total > 5000000000000000000000000) {
        //$('.alert').show();
        //return false; // changes can be rejected
        //} else {
        //$('.alert').hide();
        footer.children().eq(column).text(total);
        //}
    }).on('validate', function (evt, value) {
        var cell = $(this),
            column = cell.index();
        var count = (cell.parent().find('td').size()) - 1;
        if ($(this).attr('class') == "edit" && value != null & value != '') {
            return true;
        } else if ($(this).attr('class') == "date") {
            var regTime = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
            if (regTime.test(value)) {
                return true;
            }
            return false;
        } else if ($(this).attr('class') == "account") {
            var reg = /^(-|+)?d+(.d+)?$/;
            if (reg.test(value)) {
                return true;
            }
            return false;
        } else if ($(this).attr('class') == "amount") {
            var reg = /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/;
            if (reg.test(value)) {
                return true;
            }
            return false;
        } else if ($(this).attr('class') == "postalcode") {
            var reg = /^[1-9][0-9]{5}$/;
            if (reg.test(value)) {
                return true;
            }
            return false;
        } else if ($(this).attr('class') == "tele") {
            var pattern = /^1[34578]\d{9}$/;
            if (reg.test(value)) {
                return true;
            }
            return false;
        } else if ($(this).attr('class') == "fax") {
            var regTelephone = new RegExp(/^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/);
            if (regTelephone.test(value)) {
                return true;
            }
            return false;
        } else if ($(this).attr('class') == "email") {
            var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (reg.test(value)) {
                return true;
            }
            return false;
        }
        if (column === 0) {
            return !!value && value.trim().length > 0;
            //} else if(count == column) {
            //	return true;
        } else if ($(this).attr('class') == "ellipsis") {
            return !!value && value.trim().length > 0;
        }
        if ($(this).attr('class') == "whether") {
            if (value == "是") {
                return !!value && value.trim().length > 0;
            } else if (value == "否") {
                return !!value && value.trim().length > 0;
            } else {
                return false;
            }
        } else {
            if ($(this).attr('class') == "null") {

            } else {
                return !isNaN(parseFloat(value)) && isFinite(value);
            }
        }
    });
    initialTotal();
    return this;
};
