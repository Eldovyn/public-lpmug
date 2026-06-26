/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */

"use strict";


// Custome menu dan mnu dropdown active
var path = location.pathname.split('/')
var url = location.origin + '/' + path[1]
// var url = location.origin + '/' + path[1] + '/' + path[2]

$('ul.sidebar-menu li a').each(function() {
    if($(this).attr('href').indexOf(url) !== -1){
       $(this).parent().addClass('active').parent().parent('li').addClass('active') 
    }
})

// Datatables
$(document).ready( function () {
    if ($('#table1').length) {
        $('#table1').DataTable();
    }
} );

// modal confirmation
function submitDel(id) {
    $('#del-'+id).submit()
}

//modal logout
function returnLogout() {
    var link = $('#logout').attr('href')
    $(location).attr('href', link)
}

// modal image
document.addEventListener("click", function (e){
    if(e.target.classList.contains("gambar-item")){
        const src = e.target.getAttribute("src");
        document.querySelector(".modal-img").src = src;
        const myModal = new bootstrap.Modal(document.getElementById('gambar-popup'));
        myModal.show();
    }
})

// modal form
document.addEventListener("click", function (e){
    if(e.target.classList.contains("show-item")){
        const value = e.target.getAttribute("value");
        document.querySelector(".show-input").value = value;
        const myModal = new bootstrap.Modal(document.getElementById('show-popup'));
        myModal.show();
    }
})

// modal detail pesan
$(document).ready(function() {
    $(document).on('click', '#detail_pesan', function(){
        var pesanname = $(this).data('pesanname');
        var email = $(this).data('email');
        var phone = $(this).data('phone');
        var subject = $(this).data('subject');
        var pesan = $(this).data('pesan');
        $('#pesan_name').text(pesanname);
        $('#email').text(email);
        $('#phone').text(phone);
        $('#subject').text(subject);
        $('#pesan').text(pesan);
    })
})

// modal detail lihat proposal
$(document).ready(function() {
    $(document).on('click', '#detail_proposal', function(){
        var pesanname = $(this).data('pesanname');
        var email = $(this).data('email');
        var phone = $(this).data('phone');
        var subject = $(this).data('subject');
        var pesan = $(this).data('pesan');
        $('#pesan_name').text(pesanname);
        $('#email').text(email);
        $('#phone').text(phone);
        $('#subject').text(subject);
        $('#pesan').text(pesan);
    })
})

$(document).ready(function() {
    $('#anggota_id').select2();
});


function toggleDiv() {
    let value1 = document.getElementById("verifikasi").value;
    let div1 = document.getElementById("boxrevisi");
 
    if (value1 === "2") {
        div1.style.visibility = "visible";
    }
    else {
        div1.style.visibility = "hidden";
    }
 
}

$(document).ready(function() {
    if ($('#table-1').length) {
        var table = $('#table-1').DataTable( {
             'serverSide': false,
             'processing': false,
             
             // 'ajax' : url,
             dom: 'Bfrtip',
             buttons: [
                 {
                     extend: 'pdf',
                     text: 'Download PDF',
                     className: 'btn btn-dark', 
                     // orientation: 'landscape',
                     orientation: 'potrait',
                     pageSize: 'Legal',
                     title: 'Data Rekapan Abdimas',
                     download: 'open',
                     exportOptions: {
                         columns: [0, 1, 2, 3, 4, 5, 6]
                     }
                 },
                 {
                     extend: 'excel', 
                     text: 'Download Excel',
                     className: 'btn btn-success', 
                     customize: function( xlsx ) {
                         var sheet = xlsx.xl.worksheets['sheet1.xml'];
                         $('row c', sheet).attr( 's', '55' );	// set cell style: Wrapped text
                         $('row:first c', sheet).attr( 's', '2' ); // first row is bold
                     },
                     exportOptions: {
                         columns: function(idx, data, node) {
                             return $("#example").DataTable().column(idx).visible();
                         },
                         format: {
                               body: function(data, row, column, node) {
                                   if (typeof data === 'string' || data instanceof String) {
                                       data = data.replace( /<br\s*\/?>/ig, "\n"); //convert <br> tag to newline 
                                       data = data.replace(/[ \t]+/g, ' '); //remove unwanted tabs
                                       data = data.split(/\r?\n/); //split by newline
                                       data = data.map(s => s.trim()); // trim all string in array
                                       data = data.filter(item => item); //remove empty array string
                                       data = data.join('\n'); //recreate clean string
                                   }
                                   data = $('<p>' + data + '</p>').text();
                                   return data;
                               }
                         },
                         columns: [0, 1, 2, 3, 4, 5, 6]
                     },
                 },
             ]
         } );
    }
} );

// Global AJAX Setup for CSRF Token
$(document).ajaxSend(function(e, xhr, options) {
    if (/^(POST|PUT|DELETE|PATCH)$/i.test(options.type)) {
        var csrfHeaderName = 'X-CSRF-TOKEN';
        var csrfToken = $('meta[name="X-CSRF-TOKEN"]').attr('content');
        if (csrfToken) {
            xhr.setRequestHeader(csrfHeaderName, csrfToken);
        }
    }
});