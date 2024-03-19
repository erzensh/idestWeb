document.addEventListener("DOMContentLoaded", function() {
    // Text to be typed
    var welcomeText = "Welcome to Id Est";
    var description = "We are your premier destination for cutting-edge content creation and social media management.";
    var speed = 70; // Typing speed in milliseconds (faster speed)

    // Typing animation function
    function typeWriter(text, element, index, callback) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(function() {
                typeWriter(text, element, index, callback);
            }, speed);
        } else {
            callback();
        }
    }

    // Cursor animation function
    function cursorBlink() {
        var cursor = document.querySelector('.cursor');
        cursor.style.visibility = 'visible'; // Show the cursor
        setInterval(function() {
            cursor.style.visibility = (cursor.style.visibility === 'visible' ? 'hidden' : 'visible');
        }, 500); // Cursor blink interval in milliseconds
    }

    // Call the typing animation function for welcome text
    typeWriter(welcomeText, document.querySelector('.welcome-text h1 .id-est'), 0, function() {
        // Call the typing animation function for description after welcome text animation completes
        typeWriter(description, document.querySelector('.welcome-text p'), 0, function() {
            // Start cursor blinking after both animations complete
            cursorBlink();
        });
    });
});
