document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate graph bars if this is the hero/problem section
                if (entry.target.id === 'problem') {
                    const bars = entry.target.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        const targetHeight = bar.getAttribute('data-height');
                        bar.style.height = targetHeight;
                    });
                }

                // Animate trust metric bars
                if (entry.target.id === 'trust') {
                    const fills = entry.target.querySelectorAll('.metric-bar-fill');
                    fills.forEach(fill => {
                        const targetWidth = fill.getAttribute('data-width');
                        fill.style.width = targetWidth;
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Interactive Trust Comparison Hover
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.background = 'rgba(255, 255, 255, 0.05)';
        });
        row.addEventListener('mouseleave', () => {
            row.style.background = 'rgba(255, 255, 255, 0.02)';
        });
    });

    // Animation for hero visual on mouse move
    const heroVisual = document.querySelector('.hero-visual img');
    if (heroVisual) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            heroVisual.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // Trust Mode Toggle
    const modeToggle = document.getElementById('mode-toggle');
    const viewOthers = document.getElementById('view-others');
    const viewHushh = document.getElementById('view-hushh');
    const labelOthers = document.getElementById('label-others');
    const labelHushh = document.getElementById('label-hushh');

    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            const isSwitched = modeToggle.classList.toggle('switched');
            if (isSwitched) {
                viewOthers.classList.remove('active');
                viewHushh.classList.add('active');
                labelOthers.classList.remove('active');
                labelHushh.classList.add('active');
            } else {
                viewOthers.classList.add('active');
                viewHushh.classList.remove('active');
                labelOthers.classList.add('active');
                labelHushh.classList.remove('active');
            }
        });
    }
});
