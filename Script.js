 
        // Initialisation d'EmailJS
        (function() {
            emailjs.init("YOUR_PUBLIC_KEY"); // Remplacez par votre clé publique EmailJS
        })();

        // Navigation mobile
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Fermer le menu mobile en cliquant sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                document.querySelector('.nav-links').classList.remove('active');
            });
        });

        // Smooth scroll pour les liens d'ancrage
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Gestion du formulaire de contact avec EmailJS
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const formMessage = document.getElementById('form-message');
            
            // Désactiver le bouton pendant l'envoi
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            
            // Masquer les messages précédents
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
            
            // Récupérer les données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Envoyer l'email via EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Afficher le message de succès
                    formMessage.textContent = 'Merci ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.';
                    formMessage.classList.add('success');
                    formMessage.style.display = 'block';
                    
                    // Réinitialiser le formulaire
                    document.getElementById('contactForm').reset();
                    
                    // Réactiver le bouton
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Envoyer mon message';
                    
                    // Faire défiler jusqu'au message de succès
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Afficher le message d'erreur
                    formMessage.textContent = 'Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer ou me contacter directement par email.';
                    formMessage.classList.add('error');
                    formMessage.style.display = 'block';
                    
                    // Réactiver le bouton
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Envoyer mon message';
                    
                    // Faire défiler jusqu'au message d'erreur
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
        });

        // Animation des barres de compétences au défilement
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (isElementInViewport(bar)) {
                    bar.style.width = width + '%';
                }
            });
        }

        // Vérifier si un élément est dans la vue
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // Animation des cartes de projet
        function animateProjectCards() {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                if (isElementInViewport(card)) {
                    card.classList.add('visible');
                }
            });
        }

        // Header qui change au scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(0, 0, 0, 0.9)';
            }
            
            animateSkills();
            animateProjectCards();
        });

        // Initialiser les animations au chargement
        window.addEventListener('load', function() {
            animateSkills();
            animateProjectCards();
        });
    