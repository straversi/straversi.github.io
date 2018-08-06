function resizeSkews() {
  let width = $(window).width();

  let itemZeroHeight = $("#header > div:nth-child(2)").height();

  let itemOneHeight = $("#item-braintree > div:nth-child(2)").height();
  let itemTwoHeight = $("#item-lecturer > div:nth-child(2)").height();
  let itemThreeHeight = $("#item-ugsi > div:nth-child(2)").height();
  let itemFourHeight = $("#item-volunteer > div:nth-child(2)").height();
  let itemFiveHeight = $("#footer > div:nth-child(2)").height();

  let itemTwoInitialLeft = width * 0.6;

  let adjustmentOne = itemOneHeight / Math.tan(80 * Math.PI / 180);
  let adjustmentTwo = itemTwoHeight / Math.tan(80 * Math.PI / 180);
  let itemTwoSkewLeft = itemTwoInitialLeft - (adjustmentOne / 2) - (adjustmentTwo / 2);

  $("#item-lecturer > div:nth-child(2)").css("left", itemTwoSkewLeft.toString() + "px");

  let itemThreeInitialLeft = width * 0.6;

  let adjustumentThree = itemThreeHeight / Math.tan(80 * Math.PI / 180);
  let itemThreeSkewLeft = itemThreeInitialLeft - (adjustmentOne / 2) - (adjustmentTwo) - (adjustumentThree / 2);

  $("#item-ugsi > div:nth-child(2)").css("left", itemThreeSkewLeft.toString() + "px");

  let itemFourInitialLeft = width * 0.6;

  let adjustmentFour = itemFourHeight / Math.tan(80 * Math.PI / 180);
  let itemFourSkewLeft = itemFourInitialLeft - (adjustmentOne / 2) - (adjustmentTwo) - (adjustumentThree) + (adjustmentFour / 2);

  $("#item-volunteer > div:nth-child(2)").css("left", itemFourSkewLeft.toString() + "px");

  let itemFiveInitialLeft = width * 0.6;

  let adjustmentFive = itemFiveHeight / Math.tan(80 * Math.PI / 180);
  let itemFiveSkewLeft = itemFiveInitialLeft - (adjustmentOne / 2) - (adjustmentTwo) - (adjustumentThree) + (adjustmentFour) + (adjustmentFive / 2);

  $("#footer > div:nth-child(2)").css("left", itemFiveSkewLeft.toString() + "px");

  let itemZeroInitialLeft = width * 0.6;
  let adjustmentZero = itemZeroHeight / Math.tan(80 * Math.PI / 180);
  let itemZeroSkewLeft = itemZeroInitialLeft + (adjustmentZero / 2) + (adjustmentOne / 2);

  $("#header > div:nth-child(2)").css("left", itemZeroSkewLeft.toString() + "px");

}

$(document).ready(function() {
  resizeSkews();
});
$(window).resize(function() {
  resizeSkews();
});
