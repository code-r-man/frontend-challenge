
$(document).ready(() => {
    const products = []; 

    // Update total number of items in cart
    function updateCart(_id,_target) {
        products.push(_id);

        const totalNumber = products.length;

        if (totalNumber > 0 && !$(_target).prop('disabled')) {
            $('.js-cart-bubble').addClass('in').text(totalNumber)
        }

        const itemsDeconst = [...items];

        // Get the index of the added item
        const targetIndex = itemsDeconst.findIndex(item => {
            return item.id === _id;
        });


        // Append the cart list with the product details
        $('#cart').append(`<li>${items[targetIndex].copy}</li>`);

        // Inform the user that the item has been added
        const initialText = $(_target).text();
        const flashText = 'Item added';

        $(_target).text(flashText).addClass('confirm').prop( "disabled", true );

        setTimeout(() => { 
             $(_target).prop('disabled',false).removeClass('confirm').text(initialText); 
        }, 1000);
    }

    // 'Add to Cart' handler
    $( document ).on( 'click', '.js-item-add', function() {
        // Get the item id and push it
        updateCart($(this).parents('.card').data('item'), $(this));                    
    });
});


$(window).on('scroll touchmove', () => {
    // Toggle header on window scroll
    if ($(document).scrollTop() > 20) {
       $('header').addClass('in');
      
    } else {
        $('header').removeClass('in');
    }
 }).scroll();


// Generate content for each item (body)
const createItem = (codeId, img, imgHD, copy, altText) => {
    return `
        <li>
            <div class="card" data-item="${codeId}">
                <div class="card__img">
                    <picture>
                        <source media="(min-width: 640px), (min-resolution: 120dpi)" srcset="${imgHD}">
                        <img class="img-responsive" src="${img}" alt="${altText}">
                    </picture> 
                    <div class="card__overlay">
                        <button class="btn card__btn js-item-add" type="button">Add to Cart</button>
                    </div>
                </div>
                <p class="card__copy">
                    ${copy}
                </p>
            </div>
        </li>

    `;
}

// Define all the products
const items = [
    {
        id: 1001,
        img: ['img/h38ss-dtbl-sel-201603.png','img/h38ss-dtbl-sel-201603@2x.png'],
        copy: '42mm Space Gray Aluminum Case with Black Woven Nylon',
        altText: 'watch',
    },
    {
        id: 1002,
        img: ['img/s42gd-nsgb-sel-201603.png','img/s42gd-nsgb-sel-201603@2x.png'],
        copy: '42mm Gold Aluminum Case with Gold/Royal Blue Woven Nylon',
        altText: 'watch',
    },
    {
        id: 1003,
        img: ['img/s42rg-nsdb-sel-201603.png','img/s42rg-nsdb-sel-201603@2x.png'],
        copy: '42mm Rose Gold Aluminum Case with Royal Blue Woven Nylon',
        altText: 'watch',
    },
    {
        id: 1004,
        img: ['img/s42si-nssb-sel-201603.png','img/s42si-nssb-sel-201603@2x.png'],
        copy: '42mm Silver Aluminum Case with Scuba Blue Woven Nylon',
        altText: 'watch',
    },
    {
        id: 1005,
        img: ['img/h38ss-dtgr-sel-201603.png','img/h38ss-dtgr-sel-201603@2x.png'],
        copy: 'Double Tour, 38mm Stainless Steel Case with Etain Leather Band',
        altText: 'watch',
    },
    {
        id: 1006,
        img: ['img/h38ss-dtrd-sel-201603.png','img/h38ss-dtrd-sel-201603@2x.png'],
        copy: 'Double Tour, 38mm Stainless Steel Case with Capucine Leather Band',
        altText: 'watch',
    },
    {
        id: 1007,
        img: ['img/h38ss-dtbl-sel-201603.png','img/h38ss-dtbl-sel-201603@2x.png'],
        copy: 'Double Tour, 38mm Stainless Steel Case with Bleu Jean Leather Band',
        altText: 'watch',
    },
    {
        id: 1008,
        img: ['img/h42ss-stbk-sel-201603.png','img/h42ss-stbk-sel-201603@2x.png'],
        copy: 'Double Tour, 38mm Stainless Steel Case with Bleu Jean Leather Band',
        altText: 'watch',
    },
];

const itemsList = [];

// Initialize the products
const itemsLen = items.length;

for(let i=0; i < itemsLen; i++) {
    const entry = createItem(items[i].id, items[i].img[0], items[i].img[1], items[i].copy, items[i].altText );
    itemsList.push(entry);
}


// Render all the products to page
$('#app').append([...itemsList]);


