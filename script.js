// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form fields
    const fields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message'),
        terms: document.getElementById('terms')
    };
    
    // Error message elements
    const errors = {
        firstName: document.getElementById('firstNameError'),
        lastName: document.getElementById('lastNameError'),
        email: document.getElementById('emailError'),
        phone: document.getElementById('phoneError'),
        subject: document.getElementById('subjectError'),
        message: document.getElementById('messageError'),
        terms: document.getElementById('termsError')
    };
    
    // Validation rules
    const validators = {
        firstName: (value) => {
            if (!value.trim()) return 'El nombre es requerido';
            if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El nombre solo puede contener letras';
            return '';
        },
        
        lastName: (value) => {
            if (!value.trim()) return 'El apellido es requerido';
            if (value.trim().length < 2) return 'El apellido debe tener al menos 2 caracteres';
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El apellido solo puede contener letras';
            return '';
        },
        
        email: (value) => {
            if (!value.trim()) return 'El correo electrónico es requerido';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Ingresa un correo electrónico válido';
            return '';
        },
        
        phone: (value) => {
            if (!value.trim()) return 'El teléfono es requerido';
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) return 'Ingresa un número de teléfono válido';
            if (value.replace(/\D/g, '').length < 8) return 'El teléfono debe tener al menos 8 dígitos';
            return '';
        },
        
        subject: (value) => {
            if (!value) return 'Por favor selecciona un asunto';
            return '';
        },
        
        message: (value) => {
            if (!value.trim()) return 'El mensaje es requerido';
            if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
            return '';
        },
        
        terms: (checked) => {
            if (!checked) return 'Debes aceptar los términos y condiciones';
            return '';
        }
    };
    
    // Validate single field
    function validateField(fieldName) {
        const field = fields[fieldName];
        const errorElement = errors[fieldName];
        const value = fieldName === 'terms' ? field.checked : field.value;
        const errorMessage = validators[fieldName](value);
        
        if (errorMessage) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            return false;
        } else {
            field.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    }
    
    // Add real-time validation
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        
        // Validate on blur
        field.addEventListener('blur', () => {
            validateField(fieldName);
        });
        
        // Clear error on input
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(fieldName);
            }
        });
        
        // For checkbox, validate on change
        if (fieldName === 'terms') {
            field.addEventListener('change', () => {
                validateField(fieldName);
            });
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="button-text">Enviando...</span>';
            
            // Simulate API call
            setTimeout(() => {
                // Hide form and show success message
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Log form data (in production, this would be sent to a server)
                const formData = {
                    firstName: fields.firstName.value,
                    lastName: fields.lastName.value,
                    email: fields.email.value,
                    phone: fields.phone.value,
                    subject: fields.subject.value,
                    message: fields.message.value
                };
                console.log('Form submitted:', formData);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.classList.remove('show');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span class="button-text">Enviar Mensaje</span><span class="button-icon">→</span>';
                }, 3000);
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
    
    // Add smooth animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe form groups for animation
    document.querySelectorAll('.form-group').forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(group);
    });
});
