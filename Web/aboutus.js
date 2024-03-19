window.addEventListener('scroll', function() {
    changeNavbarTextColor();
    changeNavbarBackgroundColor();
});

function changeNavbarBackgroundColor() {
    var navbar = document.getElementById('navbar');
    var logo = document.querySelector('.logo');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var backgroundColor = getComputedStyle(navbar).backgroundColor;

    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
        if (backgroundColor === 'rgb(255, 255, 255)') {
            logo.style.color = '#000'; // Change to black if background is white
        } else {
            logo.style.color = '#fff'; // Change to white if background is not white
        }
    } else {
        navbar.classList.remove('scrolled');
        if (backgroundColor === 'rgb(255, 255, 255)') {
            logo.style.color = '#fff'; // Change to white if background is white
        } else {
            logo.style.color = '#000'; // Change to black if background is not white
        }
    }

    // Check contrast and adjust logo color if necessary
    var contrast = getContrastRatio(hexToRgb(backgroundColor), hexToRgb(getComputedStyle(logo).color));
    if (contrast < 4.5) {
        if (backgroundColor === 'rgb(255, 255, 255)') {
            logo.style.color = '#000'; // Change to black if contrast is low on white background
        } else {
            logo.style.color = '#fff'; // Change to white if contrast is low on non-white background
        }
    }
}

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getContrastRatio(color1, color2) {
    var lum1 = luminance(color1.r, color1.g, color1.b);
    var lum2 = luminance(color2.r, color2.g, color2.b);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

function luminance(r, g, b) {
    var a = [r, g, b].map(function(v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
