// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', function() {
    // スムーズスクロール機能
    initSmoothScroll();
    
    // メニューボタンの機能
    initMobileMenu();
    
    // 検索機能
    initSearch();
    
    // アニメーション機能
    initScrollAnimations();
    
    // ナビゲーションのアクティブ状態管理
    initNavigation();
    
    // 記事カードクリック機能
    initArticleCardClick();
});

// スムーズスクロール機能
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = 120; // 固定ヘッダーの高さ
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// モバイルメニュー機能
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (menuBtn && mobileMenu && mobileMenuOverlay) {
        // メニューを開く
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            menuBtn.classList.add('active');
            document.body.style.overflow = 'hidden'; // スクロール無効化
        });
        
        // メニューを閉じる関数
        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = ''; // スクロール有効化
        }
        
        // 閉じるボタンのイベント
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }
        
        // オーバーレイクリックで閉じる
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        
        // メニュー内のリンククリック時に閉じる
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // 外部リンクでない場合は閉じる
                const href = this.getAttribute('href');
                if (!href.startsWith('http') && !href.includes('category.html')) {
                    closeMobileMenu();
                }
            });
        });
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // 画面サイズ変更時の処理
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

// 検索機能
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // 簡単な検索モーダルを表示（実装例）
            const searchTerm = prompt('検索キーワードを入力してください：');
            if (searchTerm) {
                // 実際の検索処理はここに実装
                console.log('検索キーワード:', searchTerm);
                alert(`「${searchTerm}」の検索結果を表示します。`);
            }
        });
    }
}

// スクロールアニメーション
function initScrollAnimations() {
    // Intersection Observer APIを使用してスクロール時のアニメーションを制御
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を設定
    const animateElements = document.querySelectorAll('.article-card, .category-card, .sidebar-widget');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ナビゲーションのアクティブ状態管理
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // セクションの位置を監視してナビゲーションのアクティブ状態を更新
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 150;
        
        // 各セクションの位置をチェック
        const sections = ['hero', 'articles', 'categories'];
        let currentSection = 'home';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            }
        });
        
        // ナビゲーションのアクティブ状態を更新
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if ((currentSection === 'hero' && href === '#') || 
                (href === '#' + currentSection)) {
                link.classList.add('active');
            }
        });
    });
}

// 記事カード全体をクリック可能にする機能
function initArticleCardClick() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        // カード内のリンクを取得
        const cardLink = card.querySelector('.card-link');
        
        if (cardLink) {
            const linkUrl = cardLink.getAttribute('href');
            
            // カード全体をクリック可能にする
            card.addEventListener('click', function(e) {
                // リンク自体がクリックされた場合は何もしない（重複を避ける）
                if (e.target.closest('.card-link')) {
                    return;
                }
                
                // リンクが有効な場合のみ遷移
                if (linkUrl && linkUrl !== '#') {
                    window.location.href = linkUrl;
                }
            });
            
            // カーソルポインターを設定
            card.style.cursor = 'pointer';
        }
    });
}

// カードホバー効果の強化
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.article-card, .category-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// トップに戻るボタン機能
function initBackToTop() {
    // トップに戻るボタンを動的に作成
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.setAttribute('aria-label', 'トップに戻る');
    
    // スタイルを設定
    Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        opacity: '0',
        transition: 'all 0.3s ease',
        zIndex: '1000',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    });
    
    document.body.appendChild(backToTopBtn);
    
    // スクロール時の表示制御
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(10px)';
        }
    });
    
    // クリック時の処理
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ホバー効果
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#a08866';
        this.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.transform = window.scrollY > 300 ? 'translateY(0) scale(1)' : 'translateY(10px) scale(1)';
    });
}

// ページ読み込み時にトップに戻るボタンを初期化
document.addEventListener('DOMContentLoaded', initBackToTop);

// パフォーマンス最適化: 画像の遅延読み込み
function initLazyLoading() {
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
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', initLazyLoading);