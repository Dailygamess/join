// Futbol-CL-Pasion - Custom JavaScript

// DOM Ready
$(document).ready(function() {
    // Initialize functions
    initializeAnimations();
    initializeCookiePopup();
    initializeNavbar();
    initializeContactForm();
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
                return false;
            }
        }
    });
});

// Initialize scroll animations
function initializeAnimations() {
    // Check if elements are in viewport
    function checkViewport() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }
    
    // Check on scroll and load
    $(window).on('scroll', checkViewport);
    checkViewport();
}

// Initialize navbar behavior
function initializeNavbar() {
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
    
    // Close mobile menu when link is clicked
    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });
}

// Cookie Popup Functions
function initializeCookiePopup() {
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Show cookie popup after 2 seconds
        setTimeout(function() {
            $('#cookiePopup').addClass('show');
        }, 2000);
    }
}

function acceptCookies() {
    // Set localStorage flag
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Hide popup
    $('#cookiePopup').removeClass('show');
    
    // Optional: Set actual cookies here
    setCookie('site_cookies_accepted', 'true', 365);
}

// Cookie utility functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Form validation and submission (for contact forms)
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    // Email validation
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        }
    });
    
    return isValid;
}

// Loading animation for buttons
function showButtonLoading(buttonElement) {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Отправка...';
    buttonElement.disabled = true;
    
    return function() {
        buttonElement.innerHTML = originalText;
        buttonElement.disabled = false;
    };
}

// Scroll to top functionality
$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $('#scrollToTop').fadeIn();
    } else {
        $('#scrollToTop').fadeOut();
    }
});

function scrollToTop() {
    $('html, body').animate({scrollTop: 0}, 600);
}

// Image lazy loading
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize tooltips and popovers (Bootstrap)
$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
    $('[data-bs-toggle="popover"]').popover();
});

// Add scroll-to-top button to pages
$(document).ready(function() {
    $('body').append(`
        <button id="scrollToTop" class="btn btn-primary position-fixed" 
                style="bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px; display: none;"
                onclick="scrollToTop()" title="Наверх">
            <i class="fas fa-arrow-up"></i>
        </button>
    `);
});

// Contact Form Validation and Submission
$(document).ready(function() {
    // Form validation on input
    $('#contactForm input, #contactForm textarea').on('blur', function() {
        validateField(this);
    });

    // Real-time validation for better UX
    $('#contactForm input').on('input', function() {
        if ($(this).hasClass('is-invalid')) {
            validateField(this);
        }
    });

    // Form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            submitContactForm();
        }
    });
});

function validateField(field) {
    const $field = $(field);
    const value = $field.val().trim();
    const fieldName = $field.attr('name');
    let isValid = true;

    // Remove previous validation classes
    $field.removeClass('is-valid is-invalid');

    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            isValid = value.length >= 2 && /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
            break;

        case 'phone':
            isValid = /^[\+]?[0-9\s\-\(\)]{10,}$/.test(value);
            break;

        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;

        case 'consent':
            isValid = $field.is(':checked');
            break;

        default:
            isValid = true;
    }

    if ($field.prop('required') && !value && fieldName !== 'consent') {
        isValid = false;
    }

    $field.addClass(isValid ? 'is-valid' : 'is-invalid');
    return isValid;
}

function validateContactForm() {
    let isFormValid = true;
    
    // Validate all required fields
    $('#contactForm input[required], #contactForm textarea[required]').each(function() {
        if (!validateField(this)) {
            isFormValid = false;
        }
    });

    return isFormValid;
}

function submitContactForm() {
    const $submitBtn = $('#submitBtn');
    const $formMessage = $('#form-message');
    
    // Show loading state
    const originalText = $submitBtn.html();
    $submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Отправка...');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(function() {
        try {
            // Collect form data
            const formData = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                phone: $('#phone').val(),
                email: $('#email').val(),
                message: $('#message').val(),
                consent: $('#consent').is(':checked'),
                timestamp: new Date().toISOString()
            };
            
            // Here you would normally send data to your backend
            console.log('Form data:', formData);
            
            // Show success message briefly
            $formMessage
                .removeClass('alert-danger')
                .addClass('alert-success')
                .html('<i class="fas fa-check-circle me-2"></i>Спасибо! Ваша заявка отправлена успешно.')
                .show();
            
            // Redirect to thank you page after 1.5 seconds
            setTimeout(function() {
                window.location.href = 'thanks.html';
            }, 1500);
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show error message
            $formMessage
                .removeClass('alert-success')
                .addClass('alert-danger')
                .html('<i class="fas fa-exclamation-triangle me-2"></i>Произошла ошибка при отправке. Попробуйте еще раз.')
                .show();
            
            // Restore button
            $submitBtn.prop('disabled', false).html(originalText);
        }
    }, 2000); // Simulate network delay
}

// Phone number formatting
$('#phone').on('input', function() {
    let value = $(this).val().replace(/\D/g, '');
    
    if (value.startsWith('7')) {
        value = '+7 ' + value.substring(1);
    } else if (value.startsWith('8')) {
        value = '+7 ' + value.substring(1);
    } else if (!value.startsWith('+7')) {
        value = '+7 ' + value;
    }
    
    // Format as +7 (XXX) XXX-XX-XX
    if (value.length > 3) {
        value = value.substring(0, 2) + ' (' + value.substring(2, 5) + ')' + value.substring(5, 8) + '-' + value.substring(8, 10) + '-' + value.substring(10, 12);
    }
    
    $(this).val(value);
});

// Cookie Popup Management
function showCookiePopup() {
  const cookiePopup = document.getElementById('cookiePopup');
  const cookieAccepted = localStorage.getItem('cookieAccepted');
  
  if (!cookieAccepted && cookiePopup) {
    setTimeout(() => {
      cookiePopup.classList.add('show');
    }, 2000);
  }
}

function acceptCookies() {
  const cookiePopup = document.getElementById('cookiePopup');
  localStorage.setItem('cookieAccepted', 'true');
  
  if (cookiePopup) {
    cookiePopup.classList.remove('show');
  }
}

// Smooth Scrolling for Navigation
document.addEventListener('DOMContentLoaded', function() {
  // Show cookie popup
  showCookiePopup();
  
  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Video play button functionality
  const playButtons = document.querySelectorAll('.play-button');
  
  playButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Add your video play logic here
      console.log('Video play button clicked');
    });
  });
  
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe feature cards and learning items
  const animateElements = document.querySelectorAll('.feature-card, .learning-item');
  animateElements.forEach(el => {
    observer.observe(el);
  });
});

// Form validation helper
function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      isValid = false;
    } else {
      input.classList.remove('is-invalid');
    }
  });
  
  return isValid;
}

// Phone number formatting
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.startsWith('7')) {
    value = '+7 ' + value.slice(1, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 9) + ' ' + value.slice(9, 11);
  } else if (value.length > 0) {
    value = '+7 ' + value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
  }
  
  input.value = value;
}

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Loading animation
function showLoading(element) {
  element.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Отправка...';
  element.disabled = true;
}

function hideLoading(element, originalText) {
  element.innerHTML = originalText;
  element.disabled = false;
}

// Success message
function showSuccessMessage(message) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
  alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

// Initialize Contact Form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            submitContactForm();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous validation states
    field.classList.remove('is-valid', 'is-invalid');
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio.я';
    }
    
    // Specific field validations
    if (value && field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, introduce una dirección de correo electrónico válida';
        }
    }
    
    if (value && field.type === 'tel') {
        const phoneRegex = /^\+?[0-9\s()-]+$/; // Simple check for digits, spaces, parens, dash, plus
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 7) {
            isValid = false;
            errorMessage = 'Por favor, introduce un número de teléfono válido';
        }
    }
    
    if (value && (field.id === 'firstName' || field.id === 'lastName')) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Mínimo 2 caracteres'; 
        }
    }
    
    // Apply validation state
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        if (feedback && errorMessage) {
            feedback.textContent = errorMessage;
        }
    }
    
    return isValid;
}

// Validate entire contact form
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Submit contact form
function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.classList.add('d-none');
    btnLoading.classList.remove('d-none');
    submitBtn.disabled = true;
    
    // Simulate form submission delay
    setTimeout(() => {
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Store submission data in localStorage for thank you page
        localStorage.setItem('lastSubmission', JSON.stringify({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            timestamp: new Date().toISOString()
        }));
        
        // Redirect to thank you page
        window.location.href = 'thanks.html';
        
    }, 2000); // 2 second delay to show loading state
} 