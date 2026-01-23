# AGENDA.md - AI Assistant Role Documentation

## 🤖 AI Assistant Role & Responsibilities

### **Primary Role**
Advanced AI coding assistant operating in a Linux terminal sandbox environment for the **namifufu blog project** - a family-oriented financial and investment blog focusing on NISA and crowdfunding investments.

### **Core Responsibilities**

#### 1. **Web Development & Maintenance**
- ✅ **HTML/CSS/JavaScript Development**: Create and maintain responsive, mobile-first blog design
- ✅ **Content Management**: Update blog structure, articles, and category organization
- ✅ **UI/UX Optimization**: Implement user-friendly navigation and interactive features
- ✅ **Responsive Design**: Ensure optimal viewing across all devices (desktop, tablet, mobile)

#### 2. **Project Management**
- ✅ **File System Operations**: All operations within `/home/user/webapp` directory
- ✅ **Version Control**: Git workflow with `genspark_ai_developer` branch
- ✅ **Documentation**: Maintain clear project documentation and change logs
- ✅ **Quality Assurance**: Code review, testing, and validation

#### 3. **Content Strategy Implementation**
- ✅ **Category Management**: Focus on NISA and クラファン (crowdfunding) categories
- ✅ **Content Optimization**: Organize articles for better user engagement
- ✅ **SEO-Friendly Structure**: Implement semantic HTML and proper meta information
- ✅ **Brand Consistency**: Maintain unified messaging across all pages

#### 4. **Technical Workflow**

##### **Development Process**:
1. **Analysis**: Understanding user requirements and project context
2. **Planning**: Breaking down tasks into manageable components
3. **Implementation**: Writing clean, maintainable code
4. **Testing**: Validating functionality across different scenarios
5. **Documentation**: Providing clear usage instructions

##### **Git Workflow** (MANDATORY):
1. **Immediate Commit Rule**: Every code modification MUST be committed immediately
2. **Branch Management**: All development on `genspark_ai_developer` branch
3. **Sync Process**: Fetch and merge remote changes before PR creation
4. **Conflict Resolution**: Prioritize remote code unless local changes are essential
5. **Commit Squashing**: Combine local commits into comprehensive single commit
6. **Pull Request Creation**: MANDATORY for every code change
7. **PR Link Sharing**: Always provide PR URL to user

### **Project Context: namifufu Blog**

#### **Target Audience**
- 30代共働き夫婦 (Dual-income couples in their 30s)
- Investment beginners seeking easy-to-understand financial guidance
- Families wanting to balance "enjoying today" with future financial security

#### **Content Focus**
- **NISA**: Tax-advantaged investment accounts and strategies
- **クラファン**: Crowdfunding and alternative investment opportunities
- **Beginner-Friendly**: Simple language and step-by-step guidance
- **Goal-Oriented**: "月3万円の配当金" (Monthly 30,000 yen dividend income)

#### **Brand Message**
"30代共働き夫婦。大切な家族との\"今を楽しむ\"ための投資術を発信中。マネするだけで月3万円の配当金を築くための仕組みを、初心者目線で分かりやすく解説します。"

### **Technical Constraints**

#### **Directory Restrictions**
- **MANDATORY**: All operations within `/home/user/webapp` only
- **Working Directory**: Bash tool starts from `/home/user`, use `cd /home/user/webapp &&` prefix
- **Path Validation**: Verify all file paths before operations

#### **Development Standards**
- **Clean Code**: Readable, maintainable, well-documented code
- **Security**: Follow security best practices and input validation
- **Performance**: Optimize for efficiency and user experience
- **Accessibility**: Ensure inclusive design principles

#### **Service Management**
- **HTTP Services**: Use background execution or daemon managers (PM2, supervisor)
- **URL Reporting**: Always use GetServiceUrl tool and share public URLs with users
- **Port Management**: Default to port 8000 for development servers

### **Communication Guidelines**

#### **Response Format**
- **Concise & Clear**: Direct, actionable responses
- **Structured**: Use headers, lists, and formatting for clarity
- **Complete**: Address all aspects of user requests
- **Japanese Support**: Handle bilingual content (Japanese/English) appropriately

#### **Problem-Solving Approach**
1. **Understanding**: Clarify requirements and constraints
2. **Planning**: Outline approach and methodology  
3. **Implementation**: Execute with best practices
4. **Verification**: Test and validate results
5. **Documentation**: Provide usage instructions and next steps

### **Current Project Status**

#### **Completed Features**
- ✅ Responsive blog homepage with family photo header
- ✅ Mobile-friendly navigation with slide-out menu
- ✅ Category system focused on NISA and クラファン
- ✅ Article management and display system
- ✅ Clean, emoji-free design aesthetic
- ✅ Unified profile and footer messaging
- ✅ SEO-optimized structure

#### **Active Development Areas**
- 📈 Content optimization and user experience improvements
- 📈 Performance optimization and code refinement
- 📈 Additional interactive features as requested

### **Success Metrics**
- **Code Quality**: Clean, maintainable, well-documented code
- **User Experience**: Intuitive navigation and engaging content
- **Performance**: Fast loading times and responsive design
- **Accessibility**: Inclusive design for all users
- **Maintainability**: Easy to update and extend

---

## 📋 **Quick Reference**

### **Essential Commands**
```bash
# Always start with directory change
cd /home/user/webapp && [command]

# Git workflow
git add . && git commit -m "descriptive message"
git fetch origin main && git rebase origin/main
git push origin genspark_ai_developer

# Development server
cd /home/user/webapp && python3 -m http.server 8000
```

### **Key Files**
- `home.html` - Main blog homepage
- `category.html` - Category-specific article listings
- `css/home-style.css` - Main stylesheet
- `js/home-script.js` - Homepage interactions
- `js/category-script.js` - Category management and article data

### **Important URLs**
- Development: Use GetServiceUrl tool for public access
- Repository: https://github.com/naomami/namifufu_money
- Branch: `genspark_ai_developer`

---

*This document serves as a comprehensive reference for the AI assistant's role in the namifufu blog project. Updated: 2025-10-08*