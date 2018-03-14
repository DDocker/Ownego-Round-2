//get random color of cirlce
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//convert rgb color to hex color
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
//get darker color of cirlce
function ColorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}

$(document).ready(function() {
    var width = $(".wrapper").width();
    $(".contentBottom").css("width",width);
  $("circle").css("fill", getRandomColor());
  var isColor = $("circle").css("fill");
  var colorString = isColor;
  var colorsOnly = colorString.split(")");
  var colorsOnly = colorString.split("(");
  var colorsOnly = colorsOnly[1].split(",");
  var red = parseInt(colorsOnly[0]);
  var green = parseInt(colorsOnly[1]);
  var blue = parseInt(colorsOnly[2]);

  var hex = rgbToHex(red, green, blue);
  var lum = 0,
    count = 0;
  var c;
  $(".result").html("<p>First color of circle is: " + hex + "</p>");
  $(".count").html("<p>Clicks: " + count + "</p>");
  $("circle").click(function() {
    count++;
    if (count < 9) {
      lum -= 0.1;
      c = ColorLuminance(hex, lum);
      $("circle").css("fill", c);
      $(".result").html("<p>Current color is: " + c + "</p>");
      $(".count").html("<p>Clicks: " + count + "</p>");
    } else {
      lum = -1;
      c = ColorLuminance(hex, lum);
      $("circle").css("fill", c);
      $(".result").html("<p>Current color of circle is: " + c + "</p>");
      $(".result").append("<b>Color of circle is black!</b>");
      $(".count").html("<p>Clicks: " + count + "</p>");
    }
  });
});
