// SBI証券口座開設ガイド - JavaScript機能

document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロール機能
    initSmoothScroll();
    
    // ステップアニメーション
    initStepAnimations();
    
    // 目次のアクティブ状態管理
    initActiveNavigation();
    
    // トップへ戻るボタン
    initBackToTop();
});

// スムーススクロール機能
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = 80; // ヘッダーの高さを考慮
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ステップアニメーション
function initStepAnimations() {
    const steps = document.querySelectorAll('.step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(step);
    });
}

// 目次のアクティブ状態管理
function initActiveNavigation() {
    const tocLinks = document.querySelectorAll('.toc a');
    const sections = document.querySelectorAll('.content-section');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // 初回実行
}

// トップへ戻るボタン
function initBackToTop() {
    // ボタンを動的に作成
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // スクロール時の表示/非表示
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // クリックでトップへ戻る
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ホバー効果
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
    });
}

// 画像の遅延読み込み（将来の画像追加用）
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // IntersectionObserver非対応の場合のフォールバック
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// フォームバリデーション（将来のフォーム追加用）
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// プログレスバー（将来の機能拡張用）
function updateProgress(currentStep, totalSteps) {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const percentage = (currentStep / totalSteps) * 100;
        progressBar.style.width = percentage + '%';
    }
}

// ローカルストレージを使った読書進捗保存（将来の機能拡張用）
function saveReadingProgress(sectionId) {
    const progress = JSON.parse(localStorage.getItem('sbi-guide-progress') || '{}');
    progress[sectionId] = true;
    localStorage.setItem('sbi-guide-progress', JSON.stringify(progress));
}

function loadReadingProgress() {
    const progress = JSON.parse(localStorage.getItem('sbi-guide-progress') || '{}');
    
    Object.keys(progress).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('completed');
        }
    });
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // 本番環境では適切なエラー報告システムに送信
});

// パフォーマンス測定（開発用）
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page Load Time:', loadTime + 'ms');
    }
});