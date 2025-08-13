# 🎵 GliderBot Music Website

A modern, responsive website for GliderBot - The Ultimate Discord Music Bot. Built with Next.js 14, TypeScript, and Tailwind CSS.

![GliderBot Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4)

## ✨ Features

### 🎨 **Modern Design**
- Sleek, dark-themed UI optimized for Discord users
- Responsive design that works on all devices
- Smooth animations with Framer Motion
- Professional gradients and glassmorphism effects

### 🚀 **Performance**
- Server-side rendering with Next.js 14
- Optimized build size (< 150KB per page)
- Fast loading times and smooth interactions
- SEO optimized with proper meta tags

### 📱 **User Experience**
- Interactive music player preview
- Command search with keyboard shortcuts (Ctrl+K)
- Copy-to-clipboard functionality for commands
- Mobile-first responsive design
- Accessible navigation with ARIA labels

### 🎵 **Content Sections**
- **Home**: Hero section with animated stats and testimonials
- **Commands**: Interactive command browser with search and filters
- **Premium**: Pricing plans and feature comparisons

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14.2.16 (App Router)
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: Framer Motion
- **Icons**: Lucide React

### **UI Components**
- **Design System**: Radix UI primitives
- **Components**: Custom shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **Theme**: Next Themes for dark mode support

### **Development Tools**
- **Linting**: ESLint with Next.js rules
- **Type Checking**: TypeScript strict mode
- **Package Manager**: npm
- **Build Tool**: Next.js built-in bundler

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohanad8t/music-bot-website.git
   cd music-bot-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server (port 5031)
npm run lint     # Run ESLint checks
```

## 📁 Project Structure

```
music-bot-website/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── commands/          # Commands page
│   │   ├── page.tsx       # Commands listing with search
│   │   └── loading.tsx    # Loading component
│   └── premium/           # Premium page
│       └── page.tsx       # Pricing and features
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Theme context
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
├── public/               # Static assets
├── styles/               # Additional styles
└── hooks/                # Custom React hooks
```

## 🎯 Key Features Explained

### **Interactive Command Browser**
- Real-time search functionality
- Category-based filtering
- Copy commands with one click
- Premium feature indicators
- Keyboard navigation support

### **Animated Music Player**
- Live progress bar animation
- Discord-like interface preview
- Responsive design elements
- Hover effects and transitions

### **Premium Section**
- Feature comparison tables
- Pricing cards with CTAs
- Testimonials with ratings
- FAQ section with accordion

### **Performance Optimizations**
- Image optimization with Next.js
- Code splitting and lazy loading
- Optimized bundle sizes
- Fast refresh in development

## 🔧 Configuration

### **Tailwind CSS**
Custom design system with:
- Extended color palette for dark theme
- Custom animations and transitions
- Responsive breakpoints
- Component utilities

### **TypeScript**
Strict configuration with:
- Type checking enabled
- Path aliases for clean imports
- Component prop validation
- Build error prevention

### **Next.js**
Optimized settings:
- TypeScript build error handling
- Image optimization enabled
- Static page generation
- Production optimizations

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel --prod
```

### **Manual Deployment**
```bash
npm run build
npm start
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Use conventional commit messages
- Ensure responsive design
- Test on multiple devices
- Maintain accessibility standards

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 150KB per page

## 🎨 Design System

### **Colors**
- **Primary**: Green (#22c55e)
- **Secondary**: Gray (#374151)
- **Accent**: Yellow (#eab308)
- **Background**: Dark gradients

### **Typography**
- **Headings**: Inter Bold
- **Body**: Inter Regular
- **Code**: JetBrains Mono

### **Spacing**
- Consistent 8px grid system
- Responsive spacing scales
- Component-specific spacing

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Website**: [Your Website URL]
- **Discord Server**: [Support Server Invite]
- **Documentation**: [Docs URL]
- **Bot Invite**: [Discord OAuth URL]

## 📞 Support

- **Email**: support@gliderbot.com
- **Discord**: Join our support server
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

---

<div align="center">
  <p>Made with ❤️ for Discord communities</p>
  <p>© 2025 GliderBot. All rights reserved.</p>
</div>
