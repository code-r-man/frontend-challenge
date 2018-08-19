'use strict';$(document).ready(function(){var products=[];// Add the product to the total products array
function addProduct(_id,_target){products.push(_id);updateCart(_target)}// Update total number of items in cart
function updateCart(_target){var totalNumber=products.length;if(totalNumber>0&&!$(_target).prop('disabled')){$('.js-cart-bubble').addClass('in').text(totalNumber)}// Inform the user that the item has been added
var initialText=$(_target).text();var flashText='Item added';$(_target).text(flashText).addClass('confirm').prop('disabled',true);setTimeout(function(){$(_target).prop('disabled',false).removeClass('confirm').text(initialText)},1000)}// Add the item when user clicks on the 'add cart button'
$('.js-item-add').click(function(event){// Get the item id and push it
addProduct($(undefined).parents('.card').data('item'),event.target)})});$(window).on('scroll touchmove',function(){if($(document).scrollTop()>0){$('header').addClass('in')}else{$('header').removeClass('in')}}).scroll();
