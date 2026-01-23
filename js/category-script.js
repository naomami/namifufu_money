// カテゴリー別記事データ
const articleData = {
    nisa: {
        title: "NISA",
        description: "NISA制度を活用した非課税投資について詳しく解説。新NISA制度の変更点や活用方法をご紹介します。",
        icon: "",
        articles: [
            {
                id: 1,
                title: "【画像で分かる】初心者でも安心🚀 SBI証券デビュー 口座開設はじめ方ガイド",
                image: "https://page.gensparksite.com/v1/base64_upload/88553b43ffd8f24787fa94ed3d12ae0d",
                date: "2025年9月22日",
                category: "NISA",
                link: "sbi-securities.html",
                published: true  // 公開状態: true=公開, false=非公開(下書き)
            }
        ]
    },

    crowdfunding: {
        title: "クラファン",
        description: "不動産投資型クラウドファンディングやソーシャルレンディングについて詳しく解説します。",
        icon: "",
        articles: [
            {
                id: 13,
                title: "【メディアタイアップ限定】CAPIMAで最大3,000円分GET！ほったらかし資産運用の始め方",
                image: "https://www.genspark.ai/api/files/s/cPxFrgLe",
                date: "2025年11月2日",
                category: "クラファン",
                link: "capima-guide.html",
                published: true  // 公開状態: true=公開, false=非公開(下書き)
            },
            {
                id: 12,
                title: "かんたん！3ステップ🚀 COZUCHIデビュー✨ 始め方ガイド",
                image: "https://page.gensparksite.com/v1/base64_upload/54c87cee6896017b6abea72c35715168",
                date: "2025年10月9日",
                category: "クラファン",
                link: "cozuchi-guide.html",
                published: true  // 公開状態: true=公開, false=非公開(下書き)
            }
        ]
    }
};

// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', function() {
    // URLパラメータから現在のカテゴリを取得
    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = urlParams.get('cat') || 'nisa';
    
    // カテゴリに応じてページを初期化
    initializeCategoryPage(currentCategory);
    
    // ナビゲーションのアクティブ状態を更新
    updateActiveNavigation(currentCategory);
});

// カテゴリページの初期化
function initializeCategoryPage(category) {
    const categoryInfo = articleData[category];
    
    if (!categoryInfo) {
        // カテゴリが存在しない場合はNISAを表示
        initializeCategoryPage('nisa');
        return;
    }
    
    // ページタイトルとメタ情報を更新
    updatePageInfo(categoryInfo);
    
    // 公開済み記事のみをフィルタリング
    const publishedArticles = categoryInfo.articles.filter(article => article.published !== false);
    
    // カテゴリヘッダーを更新（公開済み記事数を反映）
    updateCategoryHeader(categoryInfo, publishedArticles.length);
    
    // 公開済み記事一覧を表示
    displayArticles(publishedArticles, category);
}

// ページ情報の更新
function updatePageInfo(categoryInfo) {
    document.getElementById('pageTitle').textContent = `${categoryInfo.title} - namifufu blog`;
    document.querySelector('meta[name="description"]').setAttribute('content', 
        `${categoryInfo.title}に関する記事一覧。${categoryInfo.description}`);
}

// カテゴリヘッダーの更新
function updateCategoryHeader(categoryInfo, publishedCount) {
    document.getElementById('categoryBreadcrumb').textContent = categoryInfo.title;
    document.getElementById('categoryTitle').innerHTML = `${categoryInfo.icon} ${categoryInfo.title}`;
    document.getElementById('categoryDescription').textContent = categoryInfo.description;
    // 公開済み記事数のみを表示
    document.getElementById('articleCount').textContent = publishedCount;
}

// 記事一覧の表示
function displayArticles(articles, category) {
    const articlesContainer = document.getElementById('articlesContainer');
    const noArticlesMessage = document.getElementById('noArticlesMessage');
    
    if (articles.length === 0) {
        articlesContainer.style.display = 'none';
        noArticlesMessage.style.display = 'block';
        return;
    }
    
    articlesContainer.innerHTML = '';
    noArticlesMessage.style.display = 'none';
    
    // NISAカテゴリの場合はnisa-gridクラスを追加
    if (category === 'nisa') {
        articlesContainer.classList.add('nisa-grid');
    } else {
        articlesContainer.classList.remove('nisa-grid');
    }
    
    articles.forEach((article, index) => {
        const articleCard = createArticleCard(article, index === 0);
        articlesContainer.appendChild(articleCard);
    });
    
    // 記事カードが追加された後にクリック機能を初期化
    initArticleCardClickForCategory();
}

// 記事カードの作成
function createArticleCard(article, isFeatured = false) {
    const cardElement = document.createElement('article');
    cardElement.className = `article-card simple-card ${isFeatured ? 'featured' : ''}`;
    
    // カード全体をクリッカブルにする
    cardElement.style.cursor = 'pointer';
    cardElement.addEventListener('click', function(e) {
        window.location.href = article.link;
    });
    
    cardElement.innerHTML = `
        <div class="card-image">
            <img src="${article.image}" alt="${article.title}" loading="lazy">
            <span class="card-category">${article.category}</span>
        </div>
        <div class="card-content">
            <h3 class="card-title">${article.title}</h3>
            <div class="card-date">${article.date}</div>
        </div>
    `;
    
    return cardElement;
}

// ナビゲーションのアクティブ状態更新
function updateActiveNavigation(currentCategory) {
    // メインナビゲーションの更新
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href.includes(`cat=${currentCategory}`)) {
            link.classList.add('active');
        }
    });
    
    // モバイルメニューの更新
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href.includes(`cat=${currentCategory}`)) {
            link.classList.add('active');
        }
    });
}

// カテゴリマッピング（メニューとデータの対応）
const categoryMapping = {
    'crowdfunding': 'crowdfunding',
    'nisa': 'nisa'
};

// カテゴリリンクのクリック処理
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href*="category.html"]');
    if (target) {
        const href = target.getAttribute('href');
        const urlParams = new URLSearchParams(href.split('?')[1]);
        const category = urlParams.get('cat');
        
        if (category && categoryMapping[category]) {
            // 同じページ内でのカテゴリ変更の場合は動的更新
            if (window.location.pathname.includes('category.html')) {
                e.preventDefault();
                history.pushState(null, '', href);
                initializeCategoryPage(category);
                updateActiveNavigation(category);
                
                // ページトップにスクロール
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }
});

// ブラウザの戻る/進むボタン対応
window.addEventListener('popstate', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'nisa';
    initializeCategoryPage(category);
    updateActiveNavigation(category);
});

// 記事カード全体をクリック可能にする機能（カテゴリページ用）
function initArticleCardClickForCategory() {
    // シンプルカードではcreateArticleCard内で既にクリック機能が設定されているため、
    // 追加の処理は不要
}