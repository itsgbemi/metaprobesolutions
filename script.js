document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.getElementById('mobileMenu');
  
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    const sectionsToLazyLoad = document.querySelectorAll('.lazy-section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.classList.add('active'); 
                observer.unobserve(section); 
            }
        });
    });
    sectionsToLazyLoad.forEach(section => observer.observe(section)); 

    const animateNumber = (stat) => {
        const target = +stat.dataset.value; 
        const start = +stat.dataset.start || 0; 
        const speed = 100;
        const increment = Math.ceil((target - start) / speed); 

        let current = start; 

        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.innerText = current + '+'; 
                setTimeout(updateNumber, 75); 
            } else {
                stat.innerText = target + '+'; 
            }
        };

        updateNumber();
    };

    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        animateNumber(stat); 
    });

    const form = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        clearErrors();

        if (validateForm()) {
            submitForm(); 
        }
    });

    function validateForm() {
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!name.value.trim()) {
            displayError('nameError', 'Please enter your name.');
            valid = false;
        }

        if (!validateEmail(email.value.trim())) {
            displayError('emailError', 'Please enter a valid email address.');
            valid = false;
        }

        if (!message.value.trim()) {
            displayError('messageError', 'Please enter a message.');
            valid = false;
        }

        return valid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function displayError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    function submitForm() {
        const formData = new FormData(form);

        fetch('https://script.google.com/macros/s/AKfycbwarIg5kbpdSzNYkpEeTWzE_HR96VZaCpnwCYncv5MDJpzL4PWdYrGv0dH4TTSJGjRE/exec', { 
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            formResponse.textContent = 'Message sent successfully!';
            formResponse.classList.remove('error');
            formResponse.classList.add('success');
            form.reset(); 
        })
        .catch(error => {
            formResponse.textContent = 'There was an error submitting your message.';
            formResponse.classList.remove('success');
            formResponse.classList.add('error');
        });
    }

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');

            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});
