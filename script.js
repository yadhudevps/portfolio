// Retro-Cyber Portfolio Engine Refined (v2.7 - Simple Theme Edition)

document.addEventListener('DOMContentLoaded', () => {
    // 0. Hero Typing Animation
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const fullText = "HELLO WORLD\nI AM YADHUDEV";
        heroTitle.innerHTML = "";
        let i = 0;
        function typeWriter() {
            if (i < fullText.length) {
                if (fullText.charAt(i) === '\n') {
                    heroTitle.innerHTML += "<br>";
                } else {
                    heroTitle.innerHTML += fullText.charAt(i);
                }
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1000); // Start after 1s
    }

    // 1. Live Clock for Nav (Optional detail)
    const navTime = document.getElementById('nav-time');
    if (navTime) {
        setInterval(() => {
            const now = new Date();
            navTime.textContent = now.toTimeString().split(' ')[0];
        }, 1000);
    }

    // 2. Interactive Terminal Engine
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    const typingText = document.getElementById('typing-text');
    
    const commands = {
        'help': 'Available commands: about, skills, projects, mca, contact, clear, whoami, date, github, linkedin',
        'about': 'YADHUDEV: MCA graduate & AI/ML Specialist. Focus: Industrial Transparency & Scalable Intelligence.',
        'skills': 'CORE: Python, PyTorch, TensorFlow | DATA: Pandas, SQL, ETL | TECH: Computer Vision, NLP.',
        'projects': 'ACTIVE_ARCHIVES: Canvas.OS, Monitoring.SYS, Vaccine.WEB. Scroll for visual data.',
        'mca': 'DEGREE: Master of Computer Applications | FOCUS: Advanced Algorithms & AI Architectures.',
        'contact': 'COMM_CHANNELS: yadhudev522@gmail.com | LinkedIn: /in/yadhudev',
        'github': 'ACCESSING_REPOS: Opening GitHub profile...',
        'linkedin': 'ACCESSING_LINKEDIN: Opening LinkedIn profile...',
        'whoami': 'A curious explorer searching for patterns in the neural data-grid.',
        'date': () => `SYSTEM_TIME: ${new Date().toLocaleString()}`,
        'clear': () => { terminalHistory.innerHTML = ''; return ''; }
    };

    function addHistory(text, type = 'response') {
        const line = document.createElement('div');
        line.className = `terminal-history-item ${type}`;
        line.textContent = text;
        terminalHistory.appendChild(line);
        if (terminalHistory.parentElement) {
            terminalHistory.parentElement.scrollTop = terminalHistory.parentElement.scrollHeight;
        }
    }

    const bootSequence = [
        "Initializing BIOS v2.0...",
        "Checking System...",
        "System Check: 100% SECURE",
        "WELCOME TO YADHUDEV_OS. Type 'help' to begin."
    ];

    let bootIndex = 0;
    function runBoot() {
        if (bootIndex < bootSequence.length) {
            addHistory(bootSequence[bootIndex], 'response');
            bootIndex++;
            setTimeout(runBoot, 400);
        } else {
            if (typingText) typingText.textContent = '>';
        }
    }

    function processCommand(cmd) {
        const cleanCmd = cmd.toLowerCase().trim();
        addHistory(`$ ${cmd}`, 'command');

        if (commands[cleanCmd]) {
            const output = typeof commands[cleanCmd] === 'function' ? commands[cleanCmd]() : commands[cleanCmd];
            if (output) addHistory(output, 'response');
            
            if (cleanCmd === 'github') {
                window.open('https://github.com/yadhudevps', '_blank');
            }
            if (cleanCmd === 'linkedin') {
                window.open('https://www.linkedin.com/in/yadhudevps', '_blank');
            }
        } else if (cleanCmd !== '') {
            addHistory(`Command not found: ${cleanCmd}. Type 'help' for options.`, 'response');
        }
    }

    if (terminalInput) {
        runBoot();
        const terminalBox = document.getElementById('interactive-terminal');
        if (terminalBox) {
            terminalBox.addEventListener('click', () => terminalInput.focus());
        }

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                processCommand(terminalInput.value);
                terminalInput.value = '';
            }
        });
    }

    // 3. Window Controls
    document.querySelectorAll('.retro-window').forEach(window => {
        const redDot = window.querySelector('.dot.red');
        const yellowDot = window.querySelector('.dot.yellow');
        const greenDot = window.querySelector('.dot.green');

        if (redDot) redDot.onclick = () => window.classList.add('closed');
        if (yellowDot) yellowDot.onclick = () => window.classList.toggle('minimized');
        if (greenDot) greenDot.onclick = () => window.classList.toggle('maximized');
    });

    // 4. Scroll Spy
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 5. Refined Scroll Reveal
    const reveals = document.querySelectorAll('section, .retro-window, .stagger-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // 6. Smooth Scroll Refined
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
