// Gestion interactive du formulaire de contact avec effet "Wow"
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toastNotification');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animation de confirmation (Toast)
    toast.classList.add('show');
    
    // Réinitialisation du formulaire
    contactForm.reset();

    // Masquer la notification après 4 secondes
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
});

// Effet de transparence de la navbar au défilement
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 25, 47, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        header.style.background = 'rgba(10, 25, 47, 0.85)';
        header.style.boxShadow = 'none';
    }
});
