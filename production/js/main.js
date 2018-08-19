
$(document).ready(() => {
    const products = []; 

    // Add the product to the total products array
    function addProduct(_id,_target) {
        products.push(_id);
        updateCart(_target);
    }

    // Update total number of items in cart
    function updateCart(_target) {
        const totalNumber = products.length;

        if (totalNumber > 0 && !$(_target).prop('disabled')) {
            $('.js-cart-bubble').addClass('in').text(totalNumber)
        }

        // Inform the user that the item has been added
        const initialText = $(_target).text();
        const flashText = 'Item added';

        $(_target).text(flashText).addClass('confirm').prop( "disabled", true );

        setTimeout(() => { 
             $(_target).prop('disabled',false).removeClass('confirm').text(initialText); 
        }, 1000);
    }

    // Add the item when user clicks on the 'add cart button'
    $('.js-item-add').click((event) => {

        // Get the item id and push it
        addProduct($(this).parents('.card').data('item'), event.target);            
    })
});

$(window).on('scroll touchmove', () => {
    if ($(document).scrollTop() > 20) {
       $('header').addClass('in');
      
    } else {
        $('header').removeClass('in');
    }
 }).scroll();
