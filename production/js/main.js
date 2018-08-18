
$(document).ready(function() {
    const products = []; // Add the product to the total products array
    function addProduct(_id) {
        products.push(_id);
        updateCart()
    } 
    // Update total number of items in cart
    function updateCart() {
        const totalNumber = products.length;
        console.log(totalNumber);
        if (totalNumber > 0) {
            $('.js-cart-bubble').css({
                display: 'flex'
            }).text(totalNumber)
        }
    } 
    // Add the itme when user clicks on the 'add cart button'
    $('.js-item-add').click(function(event) { // Get the item id and push it
        addProduct($(this).parents('.card').data('item'))
    })
});