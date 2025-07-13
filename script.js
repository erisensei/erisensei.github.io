// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .testimonial-card, .approach-item');
    animateElements.forEach(el => observer.observe(el));
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const level = formData.get('level');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !level || !message) {
            e.preventDefault();
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Form will submit to Formspree automatically
        // Reset form after a short delay
        setTimeout(() => {
            this.reset();
        }, 1000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title .japanese-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                // Skip animation for the flags
                if (stat.hasAttribute('data-flags')) {
                    return; // Don't animate flags
                }
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonials data with both English and Japanese versions
const testimonials = [
    {
        english: "I'm truly grateful to have found Eri as my Japanese tutor. She is incredibly accommodating, patient, and thorough in her teaching. Her preparation for each lesson is impressive, and she always takes the time to understand my level and pace.",
        japanese: "Eriさんを日本語の tutor として見つけられて本当に感謝しています。彼女は非常に柔軟で、忍耐強く、教え方が徹底しています。",
        author: "Santhia",
        level: "Preply Student"
    },
    {
        english: "Eri is quite patient and engaging with her teaching methods, she definitely made me feel more confident in Japanese as a beginner, would fully recommend her!",
        japanese: "エリはとても忍耐強く、魅力的な教え方をしています。彼女のおかげで、初心者として日本語に自信を持てるようになりました。彼女を完全に推薦します！",
        author: "Yusuke",
        level: "Preply Student"
    },
    {
        english: "Very friendly, Eri has a unique way of teaching a new language to a complete beginner, looking forward to more learning sessions!",
        japanese: "とてもフレンドリーで、エリは完全な初心者に新しい言語を教える独自の方法を持っています。これからの学習セッションを楽しみにしています！",
        author: "Saurav",
        level: "Preply Student"
    },
    {
        english: "Eri was quite attentive to my needs. She is super friendly and answered all my queries. Would recommend her.",
        japanese: "エリは私のニーズに非常に注意を払ってくれました。彼女はとてもフレンドリーで、私の質問にすべて答えてくれました。ここをお勧めします。",
        author: "Patricia",
        level: "Preply Student"
    },
    {
        english: "Eri helped me structure a plan catered to my learning needs, she is quite engaging.",
        japanese: "エリは私の学習ニーズに合わせた計画を構築するのを手伝ってくれました。彼女はとても魅力的です。",
        author: "Maurice",
        level: "Preply Student"
    },
    {
        english: "Eri is nice and helps me with Japanese. Would fully recommend her.",
        japanese: "エリは素敵で、日本語を手伝ってくれます。彼女を完全に推薦します。",
        author: "Leo",
        level: "Preply Student"
    }
];

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to load random testimonials
function loadRandomTestimonials() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) return;

    // Shuffle testimonials and take first 3
    const shuffledTestimonials = shuffleArray([...testimonials]).slice(0, 3);
    
    testimonialsGrid.innerHTML = '';
    
    shuffledTestimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <p class="testimonial-english">"${testimonial.english}"</p>
                <p class="testimonial-japanese">"${testimonial.japanese}"</p>
            </div>
            <div class="testimonial-author">
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <span>${testimonial.level}</span>
                </div>
            </div>
        `;
        
        // Add hover effects
        testimonialCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        testimonialCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
        
        testimonialsGrid.appendChild(testimonialCard);
    });
}

// Flag animation functions
function initializeFlagAnimation() {
    const flags = document.querySelectorAll('.flag');
    flags.forEach((flag, index) => {
        flag.style.setProperty('--flag-index', index);
    });
}

function startFlagLoop() {
    const flags = document.querySelectorAll('.flag');
    flags.forEach(flag => {
        flag.classList.add('loop');
    });
}

// Load testimonials when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadRandomTestimonials();
    initializeFlagAnimation();
    
    // Fetch live stats from Preply
    fetchPreplyStats();
    
    // Refresh stats every hour to keep them current
    setInterval(fetchPreplyStats, 60 * 60 * 1000); // 1 hour
    
    // Start flag loop after initial animation
    setTimeout(() => {
        startFlagLoop();
    }, 2000); // Wait for initial pop animation to complete
    
    // Also load testimonials when testimonials section comes into view
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        const testimonialsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadRandomTestimonials();
                    testimonialsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        testimonialsObserver.observe(testimonialsSection);
    }
    
    // Start flag animation when about section comes into view
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeFlagAnimation();
                    setTimeout(() => {
                        startFlagLoop();
                    }, 2000);
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        aboutObserver.observe(aboutSection);
    }
});

// Add CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    .loaded .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Function to fetch live lesson count from Preply profile
async function fetchPreplyStats() {
    try {
        // Use a CORS proxy to fetch the Preply profile
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const preplyUrl = 'https://preply.com/en/tutor/6337467';
        
        const response = await fetch(proxyUrl + encodeURIComponent(preplyUrl));
        const html = await response.text();
        
        // Parse the HTML to extract lesson count
        // Looking for specific patterns in the Preply profile
        // Pattern 1: "50 lessons" in the stats section
        const lessonMatch = html.match(/(\d+)\s*lessons?/i);
        
        // Pattern 2: Look for the specific stats section that shows lesson count
        const statsMatch = html.match(/lessons?.*?(\d+)/i);
        
        // Pattern 3: Look for the profile stats section
        const profileStatsMatch = html.match(/profile.*?(\d+).*?lessons?/i);
        
        let lessonCount = null;
        
        if (lessonMatch) {
            lessonCount = parseInt(lessonMatch[1]);
        } else if (statsMatch) {
            lessonCount = parseInt(statsMatch[1]);
        } else if (profileStatsMatch) {
            lessonCount = parseInt(profileStatsMatch[1]);
        }
        
        if (lessonCount && lessonCount > 0) {
            updateLessonCount(lessonCount);
            console.log('Updated lesson count to:', lessonCount);
        } else {
            // Fallback to the current known value from the profile
            updateLessonCount(50);
            console.log('Using fallback lesson count: 50');
        }
        
        // Also try to extract review count
        const reviewMatch = html.match(/(\d+)\s*reviews?/i);
        if (reviewMatch) {
            const reviewCount = parseInt(reviewMatch[1]);
            updateReviewCount(reviewCount);
            console.log('Found review count:', reviewCount);
        }
        
        return Promise.resolve();
        
    } catch (error) {
        console.log('Could not fetch live stats from Preply:', error);
        // Fallback to current default values
        updateLessonCount(50); // Current value from the profile
        return Promise.reject(error);
    }
}

// Function to update lesson count in the stats section
function updateLessonCount(count) {
    const lessonStat = document.getElementById('lessonCount');
    const syncIndicator = document.querySelector('.sync-indicator');
    
    if (lessonStat) {
        // Add a subtle animation to show the update
        lessonStat.style.transition = 'all 0.3s ease';
        lessonStat.style.transform = 'scale(1.1)';
        lessonStat.style.color = '#e74c3c';
        
        setTimeout(() => {
            lessonStat.textContent = count + '+';
            lessonStat.style.transform = 'scale(1)';
            lessonStat.style.color = '';
            
            // Show sync indicator if this is a live update
            if (syncIndicator && count > 50) {
                syncIndicator.style.display = 'block';
                syncIndicator.style.animation = 'fadeIn 0.5s ease-in';
                
                // Hide indicator after 3 seconds
                setTimeout(() => {
                    syncIndicator.style.animation = 'fadeOut 0.5s ease-out';
                    setTimeout(() => {
                        syncIndicator.style.display = 'none';
                    }, 500);
                }, 3000);
            }
        }, 150);
        
        // Re-trigger counter animation if stats section is visible
        if (lessonStat.closest('.about-stats').classList.contains('fade-in-up')) {
            animateCounter(lessonStat, count);
        }
    }
}

// Function to update review count (if we want to show it)
function updateReviewCount(count) {
    // This could be used to update review count if we add it to the stats
    console.log('Live review count:', count);
}

// Flashcard Game Functionality
const kanjiData = [
    { kanji: '人', meaning: 'Person', pronunciation: 'ひと (hito)' },
    { kanji: '水', meaning: 'Water', pronunciation: 'みず (mizu)' },
    { kanji: '火', meaning: 'Fire', pronunciation: 'ひ (hi)' },
    { kanji: '山', meaning: 'Mountain', pronunciation: 'やま (yama)' },
    { kanji: '川', meaning: 'River', pronunciation: 'かわ (kawa)' },
    { kanji: '木', meaning: 'Tree', pronunciation: 'き (ki)' },
    { kanji: '日', meaning: 'Sun/Day', pronunciation: 'ひ (hi)' },
    { kanji: '月', meaning: 'Moon', pronunciation: 'つき (tsuki)' },
    { kanji: '大', meaning: 'Big', pronunciation: 'おお (oo)' },
    { kanji: '小', meaning: 'Small', pronunciation: 'ちい (chii)' },
    { kanji: '上', meaning: 'Up/Above', pronunciation: 'うえ (ue)' },
    { kanji: '下', meaning: 'Down/Below', pronunciation: 'した (shita)' },
    { kanji: '中', meaning: 'Middle/Center', pronunciation: 'なか (naka)' },
    { kanji: '外', meaning: 'Outside', pronunciation: 'そと (soto)' },
    { kanji: '内', meaning: 'Inside', pronunciation: 'うち (uchi)' },
    { kanji: '前', meaning: 'Front/Before', pronunciation: 'まえ (mae)' },
    { kanji: '後', meaning: 'Back/After', pronunciation: 'うしろ (ushiro)' },
    { kanji: '左', meaning: 'Left', pronunciation: 'ひだり (hidari)' },
    { kanji: '右', meaning: 'Right', pronunciation: 'みぎ (migi)' },
    { kanji: '東', meaning: 'East', pronunciation: 'ひがし (higashi)' },
    { kanji: '西', meaning: 'West', pronunciation: 'にし (nishi)' },
    { kanji: '南', meaning: 'South', pronunciation: 'みなみ (minami)' },
    { kanji: '北', meaning: 'North', pronunciation: 'きた (kita)' },
    { kanji: '車', meaning: 'Car', pronunciation: 'くるま (kuruma)' },
    { kanji: '電', meaning: 'Electricity', pronunciation: 'でん (den)' },
    { kanji: '話', meaning: 'Talk/Speak', pronunciation: 'はな (hana)' },
    { kanji: '見', meaning: 'See/Look', pronunciation: 'み (mi)' },
    { kanji: '聞', meaning: 'Hear/Listen', pronunciation: 'き (ki)' },
    { kanji: '書', meaning: 'Write', pronunciation: 'か (ka)' },
    { kanji: '読', meaning: 'Read', pronunciation: 'よ (yo)' },
    { kanji: '食', meaning: 'Eat', pronunciation: 'た (ta)' },
    { kanji: '飲', meaning: 'Drink', pronunciation: 'の (no)' },
    { kanji: '買', meaning: 'Buy', pronunciation: 'か (ka)' },
    { kanji: '売', meaning: 'Sell', pronunciation: 'う (u)' },
    { kanji: '来', meaning: 'Come', pronunciation: 'く (ku)' },
    { kanji: '行', meaning: 'Go', pronunciation: 'い (i)' },
    { kanji: '出', meaning: 'Go Out', pronunciation: 'で (de)' },
    { kanji: '入', meaning: 'Enter', pronunciation: 'はい (hai)' },
    { kanji: '開', meaning: 'Open', pronunciation: 'ひら (hira)' },
    { kanji: '閉', meaning: 'Close', pronunciation: 'し (shi)' },
    { kanji: '新', meaning: 'New', pronunciation: 'あたら (atarashi)' },
    { kanji: '古', meaning: 'Old', pronunciation: 'ふる (furu)' },
    { kanji: '高', meaning: 'High/Expensive', pronunciation: 'たか (taka)' },
    { kanji: '安', meaning: 'Cheap/Safe', pronunciation: 'やす (yasu)' },
    { kanji: '長', meaning: 'Long', pronunciation: 'なが (naga)' },
    { kanji: '短', meaning: 'Short', pronunciation: 'みじか (mijika)' },
    { kanji: '強', meaning: 'Strong', pronunciation: 'つよ (tsuyo)' },
    { kanji: '弱', meaning: 'Weak', pronunciation: 'よわ (yowa)' },
    { kanji: '好', meaning: 'Like', pronunciation: 'す (su)' },
    { kanji: '悪', meaning: 'Bad', pronunciation: 'わる (waru)' },
    { kanji: '美', meaning: 'Beautiful', pronunciation: 'うつく (utsukushi)' },
    { kanji: '醜', meaning: 'Ugly', pronunciation: 'みにく (miniku)' },
    { kanji: '早', meaning: 'Early', pronunciation: 'はや (haya)' },
    { kanji: '遅', meaning: 'Late', pronunciation: 'おそ (oso)' },
    { kanji: '多', meaning: 'Many', pronunciation: 'おお (oo)' },
    { kanji: '少', meaning: 'Few', pronunciation: 'すこ (suko)' },
    { kanji: '男', meaning: 'Man', pronunciation: 'おとこ (otoko)' },
    { kanji: '女', meaning: 'Woman', pronunciation: 'おんな (onna)' },
    { kanji: '子', meaning: 'Child', pronunciation: 'こ (ko)' },
    { kanji: '父', meaning: 'Father', pronunciation: 'ちち (chichi)' },
    { kanji: '母', meaning: 'Mother', pronunciation: 'はは (haha)' },
    { kanji: '兄', meaning: 'Older Brother', pronunciation: 'あに (ani)' },
    { kanji: '弟', meaning: 'Younger Brother', pronunciation: 'おとうと (otouto)' },
    { kanji: '姉', meaning: 'Older Sister', pronunciation: 'あね (ane)' },
    { kanji: '妹', meaning: 'Younger Sister', pronunciation: 'いもうと (imouto)' },
    { kanji: '友', meaning: 'Friend', pronunciation: 'とも (tomo)' },
    { kanji: '先', meaning: 'Previous/First', pronunciation: 'さき (saki)' },
    { kanji: '生', meaning: 'Life/Live', pronunciation: 'い (i)' },
    { kanji: '死', meaning: 'Death', pronunciation: 'し (shi)' },
    { kanji: '学', meaning: 'Study/Learn', pronunciation: 'まな (mana)' },
    { kanji: '校', meaning: 'School', pronunciation: 'こう (kou)' }
];

const hiraganaData = [
    { character: 'あ', meaning: 'A', pronunciation: 'a' },
    { character: 'い', meaning: 'I', pronunciation: 'i' },
    { character: 'う', meaning: 'U', pronunciation: 'u' },
    { character: 'え', meaning: 'E', pronunciation: 'e' },
    { character: 'お', meaning: 'O', pronunciation: 'o' },
    { character: 'か', meaning: 'KA', pronunciation: 'ka' },
    { character: 'き', meaning: 'KI', pronunciation: 'ki' },
    { character: 'く', meaning: 'KU', pronunciation: 'ku' },
    { character: 'け', meaning: 'KE', pronunciation: 'ke' },
    { character: 'こ', meaning: 'KO', pronunciation: 'ko' },
    { character: 'さ', meaning: 'SA', pronunciation: 'sa' },
    { character: 'し', meaning: 'SHI', pronunciation: 'shi' },
    { character: 'す', meaning: 'SU', pronunciation: 'su' },
    { character: 'せ', meaning: 'SE', pronunciation: 'se' },
    { character: 'そ', meaning: 'SO', pronunciation: 'so' },
    { character: 'た', meaning: 'TA', pronunciation: 'ta' },
    { character: 'ち', meaning: 'CHI', pronunciation: 'chi' },
    { character: 'つ', meaning: 'TSU', pronunciation: 'tsu' },
    { character: 'て', meaning: 'TE', pronunciation: 'te' },
    { character: 'と', meaning: 'TO', pronunciation: 'to' },
    { character: 'な', meaning: 'NA', pronunciation: 'na' },
    { character: 'に', meaning: 'NI', pronunciation: 'ni' },
    { character: 'ぬ', meaning: 'NU', pronunciation: 'nu' },
    { character: 'ね', meaning: 'NE', pronunciation: 'ne' },
    { character: 'の', meaning: 'NO', pronunciation: 'no' },
    { character: 'は', meaning: 'HA', pronunciation: 'ha' },
    { character: 'ひ', meaning: 'HI', pronunciation: 'hi' },
    { character: 'ふ', meaning: 'FU', pronunciation: 'fu' },
    { character: 'へ', meaning: 'HE', pronunciation: 'he' },
    { character: 'ほ', meaning: 'HO', pronunciation: 'ho' },
    { character: 'ま', meaning: 'MA', pronunciation: 'ma' },
    { character: 'み', meaning: 'MI', pronunciation: 'mi' },
    { character: 'む', meaning: 'MU', pronunciation: 'mu' },
    { character: 'め', meaning: 'ME', pronunciation: 'me' },
    { character: 'も', meaning: 'MO', pronunciation: 'mo' },
    { character: 'や', meaning: 'YA', pronunciation: 'ya' },
    { character: 'ゆ', meaning: 'YU', pronunciation: 'yu' },
    { character: 'よ', meaning: 'YO', pronunciation: 'yo' },
    { character: 'ら', meaning: 'RA', pronunciation: 'ra' },
    { character: 'り', meaning: 'RI', pronunciation: 'ri' },
    { character: 'る', meaning: 'RU', pronunciation: 'ru' },
    { character: 'れ', meaning: 'RE', pronunciation: 're' },
    { character: 'ろ', meaning: 'RO', pronunciation: 'ro' },
    { character: 'わ', meaning: 'WA', pronunciation: 'wa' },
    { character: 'を', meaning: 'WO', pronunciation: 'wo' },
    { character: 'ん', meaning: 'N', pronunciation: 'n' }
];

const katakanaData = [
    { character: 'ア', meaning: 'A', pronunciation: 'a' },
    { character: 'イ', meaning: 'I', pronunciation: 'i' },
    { character: 'ウ', meaning: 'U', pronunciation: 'u' },
    { character: 'エ', meaning: 'E', pronunciation: 'e' },
    { character: 'オ', meaning: 'O', pronunciation: 'o' },
    { character: 'カ', meaning: 'KA', pronunciation: 'ka' },
    { character: 'キ', meaning: 'KI', pronunciation: 'ki' },
    { character: 'ク', meaning: 'KU', pronunciation: 'ku' },
    { character: 'ケ', meaning: 'KE', pronunciation: 'ke' },
    { character: 'コ', meaning: 'KO', pronunciation: 'ko' },
    { character: 'サ', meaning: 'SA', pronunciation: 'sa' },
    { character: 'シ', meaning: 'SHI', pronunciation: 'shi' },
    { character: 'ス', meaning: 'SU', pronunciation: 'su' },
    { character: 'セ', meaning: 'SE', pronunciation: 'se' },
    { character: 'ソ', meaning: 'SO', pronunciation: 'so' },
    { character: 'タ', meaning: 'TA', pronunciation: 'ta' },
    { character: 'チ', meaning: 'CHI', pronunciation: 'chi' },
    { character: 'ツ', meaning: 'TSU', pronunciation: 'tsu' },
    { character: 'テ', meaning: 'TE', pronunciation: 'te' },
    { character: 'ト', meaning: 'TO', pronunciation: 'to' },
    { character: 'ナ', meaning: 'NA', pronunciation: 'na' },
    { character: 'ニ', meaning: 'NI', pronunciation: 'ni' },
    { character: 'ヌ', meaning: 'NU', pronunciation: 'nu' },
    { character: 'ネ', meaning: 'NE', pronunciation: 'ne' },
    { character: 'ノ', meaning: 'NO', pronunciation: 'no' },
    { character: 'ハ', meaning: 'HA', pronunciation: 'ha' },
    { character: 'ヒ', meaning: 'HI', pronunciation: 'hi' },
    { character: 'フ', meaning: 'FU', pronunciation: 'fu' },
    { character: 'ヘ', meaning: 'HE', pronunciation: 'he' },
    { character: 'ホ', meaning: 'HO', pronunciation: 'ho' },
    { character: 'マ', meaning: 'MA', pronunciation: 'ma' },
    { character: 'ミ', meaning: 'MI', pronunciation: 'mi' },
    { character: 'ム', meaning: 'MU', pronunciation: 'mu' },
    { character: 'メ', meaning: 'ME', pronunciation: 'me' },
    { character: 'モ', meaning: 'MO', pronunciation: 'mo' },
    { character: 'ヤ', meaning: 'YA', pronunciation: 'ya' },
    { character: 'ユ', meaning: 'YU', pronunciation: 'yu' },
    { character: 'ヨ', meaning: 'YO', pronunciation: 'yo' },
    { character: 'ラ', meaning: 'RA', pronunciation: 'ra' },
    { character: 'リ', meaning: 'RI', pronunciation: 'ri' },
    { character: 'ル', meaning: 'RU', pronunciation: 'ru' },
    { character: 'レ', meaning: 'RE', pronunciation: 're' },
    { character: 'ロ', meaning: 'RO', pronunciation: 'ro' },
    { character: 'ワ', meaning: 'WA', pronunciation: 'wa' },
    { character: 'ヲ', meaning: 'WO', pronunciation: 'wo' },
    { character: 'ン', meaning: 'N', pronunciation: 'n' }
];

let currentScript = 'kanji'; // 'kanji', 'hiragana', or 'katakana'
let currentCardIndex = 0;
let correctAnswers = 0;
let currentAnswer = '';
let selectedOption = null;
let gameCards = [];
let currentGameCards = [];
let gameInProgress = false;

function initializeFlashcardGame() {
    console.log('Initializing flashcard game...');
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    console.log('Is mobile device:', isMobile);
    
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        const flashcard = document.getElementById('flashcard');
        const nextButton = document.getElementById('next-card');
        const multipleChoiceOptions = document.getElementById('multiple-choice-options');
        const answerFeedback = document.getElementById('answer-feedback');
        
        console.log('Elements found:', {
            flashcard: !!flashcard,
            nextButton: !!nextButton,
            multipleChoiceOptions: !!multipleChoiceOptions,
            answerFeedback: !!answerFeedback
        });
        
        if (!flashcard || !nextButton || !multipleChoiceOptions) {
            console.error('Missing required elements for game initialization');
            return;
        }
        
        // Initialize script toggle buttons
        initializeScriptToggles();
        
        // Initialize game
        console.log('About to start new game...');
        startNewGame();
        console.log('Game initialization complete');
        
        // Next card functionality
        const handleNextCard = () => {
            if (currentCardIndex < 9) {
                // Move to next card
                currentCardIndex++;
                loadCard(currentCardIndex);
                resetCardState();
            } else {
                // Game finished
                finishGame();
            }
        };
        
        // Clear all existing event listeners by cloning the button
        const newNextButton = nextButton.cloneNode(true);
        nextButton.parentNode.replaceChild(newNextButton, nextButton);
        
        // Add event listener to the new button
        newNextButton.addEventListener('click', handleNextCard);
        
        // Click on card to flip (for viewing answer)
        const handleCardFlip = () => {
            flashcard.classList.toggle('flipped');
        };
        
        flashcard.addEventListener('click', handleCardFlip);
        flashcard.addEventListener('touchend', handleCardFlip);
        
        // Mobile-specific optimizations
        if (isMobile) {
            console.log('Applying mobile optimizations...');
            
            // Ensure flashcard is visible
            flashcard.style.display = 'block';
            flashcard.style.visibility = 'visible';
            flashcard.style.opacity = '1';
            
            // Ensure multiple choice options are visible
            if (multipleChoiceOptions) {
                multipleChoiceOptions.style.display = 'flex';
                multipleChoiceOptions.style.visibility = 'visible';
                multipleChoiceOptions.style.opacity = '1';
            }
            
            // Add mobile-specific touch handling (prevent double triggering)
            newNextButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                // Remove the click event temporarily to prevent double triggering
                newNextButton.removeEventListener('click', handleNextCard);
                handleNextCard();
                // Re-add the click event after a short delay
                setTimeout(() => {
                    newNextButton.addEventListener('click', handleNextCard);
                }, 100);
            });
        }
    }, isMobile ? 500 : 100);
}

function initializeScriptToggles() {
    const scriptToggleContainer = document.getElementById('script-toggles');
    if (!scriptToggleContainer) {
        console.error('Script toggle container not found');
        return;
    }
    
    // Create toggle buttons
    const scripts = [
        { id: 'kanji', name: 'Kanji', icon: '漢字' },
        { id: 'hiragana', name: 'Hiragana', icon: 'あ' },
        { id: 'katakana', name: 'Katakana', icon: 'ア' }
    ];
    
    scriptToggleContainer.innerHTML = '';
    
    scripts.forEach(script => {
        const button = document.createElement('button');
        button.className = `script-toggle-btn ${script.id === currentScript ? 'active' : ''}`;
        button.innerHTML = `
            <span class="script-icon">${script.icon}</span>
            <span class="script-name">${script.name}</span>
        `;
        button.dataset.script = script.id;
        
        button.addEventListener('click', () => {
            switchScript(script.id);
        });
        
        scriptToggleContainer.appendChild(button);
    });
}

function switchScript(scriptId) {
    if (scriptId === currentScript) return;
    
    // Update current script
    currentScript = scriptId;
    
    // Update active button
    const buttons = document.querySelectorAll('.script-toggle-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.script === scriptId) {
            btn.classList.add('active');
        }
    });
    
    // Update game title to generic text
    const gameTitle = document.querySelector('.section-title');
    if (gameTitle) {
        gameTitle.textContent = 'Test your Japanese knowledge!';
    }
    
    // Update hint text
    const hintElement = document.querySelector('.flashcard-hint');
    if (hintElement) {
        switch(scriptId) {
            case 'hiragana':
                hintElement.textContent = 'What does this hiragana character mean?';
                break;
            case 'katakana':
                hintElement.textContent = 'What does this katakana character mean?';
                break;
            default:
                hintElement.textContent = 'What does this kanji mean?';
                break;
        }
    }
    
    // Start new game with new script
    startNewGame();
}

function startNewGame() {
    let currentData;
    let dataName;
    
    // Select data based on current script
    switch(currentScript) {
        case 'hiragana':
            currentData = hiraganaData;
            dataName = 'hiraganaData';
            break;
        case 'katakana':
            currentData = katakanaData;
            dataName = 'katakanaData';
            break;
        default:
            currentData = kanjiData;
            dataName = 'kanjiData';
            break;
    }
    
    console.log(dataName + ' length:', currentData.length);
    
    // Check if data is available
    if (!currentData || currentData.length === 0) {
        console.error(dataName + ' is not available');
        return;
    }
    
    // Shuffle and select 10 random cards
    currentGameCards = shuffleArray([...currentData]).slice(0, 10);
    currentCardIndex = 0;
    correctAnswers = 0;
    gameInProgress = true;
    
    console.log('Starting new game with', currentGameCards.length, 'cards');
    console.log('First card:', currentGameCards[0]);
    
    // Load first card
    loadCard(0);
    resetCardState();
    updateStats();
}

function finishGame() {
    gameInProgress = false;
    const accuracy = Math.round((correctAnswers / 10) * 100);
    
    // Show final results
    showFeedback(`Game Complete! Your score: ${correctAnswers}/10 (${accuracy}%)`, 'correct');
    
    // Reset game after 3 seconds
    setTimeout(() => {
        startNewGame();
    }, 3000);
}

function loadCard(index) {
    console.log('Loading card at index:', index);
    
    const characterElement = document.getElementById('kanji-character');
    const answerElement = document.getElementById('answer-text');
    const pronunciationElement = document.getElementById('pronunciation');
    const multipleChoiceOptions = document.getElementById('multiple-choice-options');
    
    console.log('Elements found:', {
        characterElement: !!characterElement,
        answerElement: !!answerElement,
        pronunciationElement: !!pronunciationElement,
        multipleChoiceOptions: !!multipleChoiceOptions
    });
    
    if (characterElement && answerElement && pronunciationElement && multipleChoiceOptions) {
        const card = currentGameCards[index];
        console.log('Card data:', card);
        
        // Ensure elements are visible
        characterElement.style.display = 'block';
        characterElement.style.visibility = 'visible';
        characterElement.style.opacity = '1';
        
        answerElement.style.display = 'block';
        answerElement.style.visibility = 'visible';
        answerElement.style.opacity = '1';
        
        pronunciationElement.style.display = 'block';
        pronunciationElement.style.visibility = 'visible';
        pronunciationElement.style.opacity = '1';
        
        multipleChoiceOptions.style.display = 'flex';
        multipleChoiceOptions.style.visibility = 'visible';
        multipleChoiceOptions.style.opacity = '1';
        
        // Set character based on script type
        if (currentScript === 'kanji') {
            characterElement.textContent = card.kanji;
        } else {
            characterElement.textContent = card.character;
        }
        
        answerElement.textContent = card.meaning;
        pronunciationElement.textContent = card.pronunciation;
        currentAnswer = card.meaning;
        
        // Generate multiple choice options
        generateMultipleChoiceOptions(card, multipleChoiceOptions);
        
        console.log('Card loaded successfully:', {
            character: currentScript === 'kanji' ? card.kanji : card.character,
            meaning: card.meaning,
            pronunciation: card.pronunciation
        });
    } else {
        console.error('Missing required elements for card loading');
    }
}

function generateMultipleChoiceOptions(correctCard, container) {
    console.log('Generating options for card:', correctCard);
    console.log('Container element:', container);
    console.log('Container innerHTML before:', container.innerHTML);
    
    // Get current data based on script
    let currentData;
    switch(currentScript) {
        case 'hiragana':
            currentData = hiraganaData;
            break;
        case 'katakana':
            currentData = katakanaData;
            break;
        default:
            currentData = kanjiData;
            break;
    }
    
    // Get 2 random wrong answers from other cards
    const otherCards = currentData.filter(card => card.meaning !== correctCard.meaning);
    const shuffledOthers = shuffleArray([...otherCards]);
    const wrongOptions = shuffledOthers.slice(0, 2).map(card => card.meaning);
    
    // Combine correct and wrong options, then shuffle
    const allOptions = [correctCard.meaning, ...wrongOptions];
    const shuffledOptions = shuffleArray([...allOptions]);
    
    console.log('Options:', shuffledOptions);
    
    // Clear container
    container.innerHTML = '';
    console.log('Container innerHTML after clearing:', container.innerHTML);
    
    // Create option buttons
    shuffledOptions.forEach((option, index) => {
        const optionButton = document.createElement('div');
        optionButton.className = 'multiple-choice-option';
        optionButton.textContent = option;
        optionButton.dataset.option = option;

        
        // Handle both click and touch events for better mobile support
        const handleSelection = () => {
            if (!gameInProgress) return;
            
            // Remove previous selection
            container.querySelectorAll('.multiple-choice-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Select this option
            optionButton.classList.add('selected');
            selectedOption = option;
            
            // Check answer
            checkMultipleChoiceAnswer(option, correctCard.meaning);
        };
        
        optionButton.addEventListener('click', handleSelection);
        optionButton.addEventListener('touchend', handleSelection);
        
        container.appendChild(optionButton);
        console.log('Added option button:', option);
    });
    
    console.log('Container innerHTML after adding buttons:', container.innerHTML);
    console.log('Created', shuffledOptions.length, 'option buttons');
}

function checkMultipleChoiceAnswer(selectedAnswer, correctAnswer) {
    const multipleChoiceOptions = document.getElementById('multiple-choice-options');
    const options = multipleChoiceOptions.querySelectorAll('.multiple-choice-option');
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    if (selectedAnswer === correctAnswer) {
        // Correct answer
        correctAnswers++;
        options.forEach(option => {
            if (option.dataset.option === selectedAnswer) {
                option.classList.add('correct');
            }
        });
        showFeedback('Correct! 🎉', 'correct');
    } else {
        // Wrong answer
        options.forEach(option => {
            if (option.dataset.option === selectedAnswer) {
                option.classList.add('incorrect');
            } else if (option.dataset.option === correctAnswer) {
                option.classList.add('correct');
            }
        });
        showFeedback(`Incorrect. The correct answer is: ${correctAnswer}`, 'incorrect');
    }
    
    updateStats();
}

function resetCardState() {
    const flashcard = document.getElementById('flashcard');
    const multipleChoiceOptions = document.getElementById('multiple-choice-options');
    const answerFeedback = document.getElementById('answer-feedback');
    
    // Reset flashcard
    flashcard.classList.remove('flipped');
    
    // Reset options
    if (multipleChoiceOptions) {
        multipleChoiceOptions.querySelectorAll('.multiple-choice-option').forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
    }
    
    // Clear feedback
    hideFeedback();
    
    // Add animation to kanji character
    const kanjiElement = document.getElementById('kanji-character');
    if (kanjiElement) {
        kanjiElement.style.animation = 'none';
        setTimeout(() => {
            kanjiElement.style.animation = 'kanjiPop 0.5s ease-out';
        }, 10);
    }
}



function updateStats() {
    const currentCardElement = document.getElementById('current-card');
    const correctAnswersElement = document.getElementById('correct-answers');
    const accuracyElement = document.getElementById('accuracy');
    
    if (currentCardElement && correctAnswersElement && accuracyElement) {
        currentCardElement.textContent = currentCardIndex + 1;
        correctAnswersElement.textContent = correctAnswers;
        
        const accuracy = Math.round((correctAnswers / (currentCardIndex + 1)) * 100);
        accuracyElement.textContent = accuracy + '%';
    }
}



function showFeedback(message, type) {
    const feedback = document.getElementById('answer-feedback');
    if (feedback) {
        feedback.textContent = message;
        // Add spelling-warning class for correct answers with spelling errors
        const hasSpellingWarning = type === 'correct' && message.includes('check your spelling');
        feedback.className = `answer-feedback show ${type}${hasSpellingWarning ? ' spelling-warning' : ''}`;
    }
}

function hideFeedback() {
    const feedback = document.getElementById('answer-feedback');
    if (feedback) {
        feedback.className = 'answer-feedback';
    }
}

// Initialize flashcard game when DOM is loaded
let gameInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing games...');
    
    // Add mobile detection
    const isMobile = window.innerWidth <= 768;
    console.log('Is mobile device:', isMobile);
    
    // Initialize with a slight delay to ensure all elements are ready
    setTimeout(() => {
        if (!gameInitialized) {
            initializeFlashcardGame();
            gameInitialized = true;
        }
    }, 500);
    
    // Also initialize on window load for mobile devices (but only if not already initialized)
    window.addEventListener('load', () => {
        console.log('Window loaded, checking games...');
        if (!gameInitialized) {
            setTimeout(() => {
                initializeFlashcardGame();
                gameInitialized = true;
            }, 1000);
        }
    });
    
    // Initialize Preply stats sync
    initializePreplyStatsSync();
});

// Function to initialize Preply stats synchronization
function initializePreplyStatsSync() {
    console.log('Initializing Preply stats sync...');
    
    // Fetch stats immediately when page loads
    fetchPreplyStats();
    
    // Set up periodic sync every 30 minutes (1800000 ms)
    setInterval(() => {
        console.log('Syncing Preply stats...');
        fetchPreplyStats();
    }, 1800000); // 30 minutes
    
    // Also sync when the page becomes visible again
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            console.log('Page became visible, syncing stats...');
            fetchPreplyStats();
        }
    });
}

// Manual sync function for testing and user control
function manualSync() {
    console.log('Manual sync requested...');
    
    const syncBtn = document.querySelector('.sync-btn');
    if (syncBtn) {
        // Add loading animation
        syncBtn.style.animation = 'spin 1s linear infinite';
        syncBtn.textContent = '⏳';
        
        // Fetch stats
        fetchPreplyStats().then(() => {
            // Reset button after sync
            setTimeout(() => {
                syncBtn.style.animation = 'none';
                syncBtn.textContent = '✅';
                
                setTimeout(() => {
                    syncBtn.textContent = '🔄';
                }, 2000);
            }, 1000);
        }).catch(() => {
            // Show error state
            setTimeout(() => {
                syncBtn.style.animation = 'none';
                syncBtn.textContent = '❌';
                
                setTimeout(() => {
                    syncBtn.textContent = '🔄';
                }, 2000);
            }, 1000);
        });
    }
} 



 