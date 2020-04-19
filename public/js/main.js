// Hover effect on megamenu
$(document).ready(function(){
    // Hover effect on megamenu
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, false, true).slideDown("1000");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, false, true).slideUp("1000");
            $(this).toggleClass('open');       
        }
    );

    // Change navbar background when page is scrolled
    $(window).scroll(function() {
        if($(window).scrollTop() > 200) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });

    var current_url = document.location.href;
    document.querySelectorAll(".navbar .nav-item .nav-link").forEach(function(e){
        if(current_url == e.href) {
            e.classList.toggle('active');
        }
        else if(current_url.indexOf(e.href) != -1 && current_url != e.href){
            e.classList.toggle('active');
            document.querySelectorAll(".navbar .nav-item .nav-link")[0].classList.remove('active');
            
        }
    });

    var carts = document.querySelectorAll('.btn-add-cart');
    for(var i = 0; i <= carts.length - 1; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers();
        });
    }
});

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function cartNumbers() {
    if(getCookie('sessionId')) {
        document.querySelector('.cart span.num').textContent = parseInt(getCookie('totalCart')) + 1;
    } else {
        document.querySelector('.cart span.num').textContent = 0;
    }
}

function onLoadCartNumbers() {
    if(parseInt(getCookie('totalCart')) == 0) {
        document.querySelector('.circle').style.display = 'none';
        document.querySelector('.nav-link.cart').classList.add('disabled');
    } else {
        document.querySelector('.cart span.num').textContent = parseInt(getCookie('totalCart'));
    }
    
}

onLoadCartNumbers();