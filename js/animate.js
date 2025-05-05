// Animate skill bars on scroll
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillPercentElements = document.querySelectorAll('.skill-percent');
    
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            const targetPercent = skillPercentElements[index].getAttribute('data-percent');
            
            let currentWidth = 0;
            let currentPercent = 0;
            
            const animationInterval = setInterval(() => {
                if (currentWidth >= parseInt(targetWidth)) {
                    clearInterval(animationInterval);
                } else {
                    currentWidth++;
                    currentPercent++;
                    bar.style.width = currentWidth + '%';
                    skillPercentElements[index].textContent = currentPercent + '%';
                }
            }, 20);
        });
    }
    
    // Animate when skills section is in view
    const skillsSection = document.querySelector('.skills');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Text animation
    const animateTextElements = document.querySelectorAll('.animate-text');
    animateTextElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                element.textContent += text[i];
            }, 100 * i);
        }
    });
});
