// ===== 페이지 로드 시 초기화 =====
document.addEventListener('DOMContentLoaded', function() {
  // 타이핑 효과 적용
  initTypingEffect();
  
  // 스크롤 시 요소 나타나기 효과
  observeElements();
  
  // 스크롤 이벤트 리스너
  window.addEventListener('scroll', checkElements);
  
  // 초기 체크
  checkElements();
  
  // 테이블 호버 효과
  initTableHover();
  
  // 음악 재생 시 시각 효과
  initAudioVisualEffect();
  
  // 마우스 따라다니는 효과
  initMouseTrail();
  
  // 랜덤 명언 표시
  initRandomQuote();
});

// ===== 타이핑 효과 =====
function initTypingEffect() {
  const h1 = document.querySelector('h1');
  if (!h1) return;
  
  const originalText = h1.textContent;
  h1.textContent = '';
  h1.style.borderRight = '3px solid #00d9ff';
  
  let i = 0;
  const typingInterval = setInterval(() => {
    if (i < originalText.length) {
      h1.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      // 타이핑 완료 후 커서 깜빡임
      setInterval(() => {
        h1.style.borderRight = h1.style.borderRight === 'none' ? '3px solid #00d9ff' : 'none';
      }, 500);
    }
  }, 150);
}

// ===== Intersection Observer를 이용한 스크롤 애니메이션 =====
function observeElements() {
  document.querySelectorAll('table, img, p, h3, .plan-container, ul, .contact-box, hr').forEach((element, index) => {
    element.classList.add('fade-out');
    element.style.transitionDelay = `${index * 0.05}s`; // 순차적 등장 효과
  });
}

// ===== 스크롤 시 요소 체크 =====
function checkElements() {
  const elements = document.querySelectorAll('.fade-out');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    }
  });
  
  // 스크롤 진행률 표시
  updateScrollProgress();
}

// ===== 스크롤 진행률 바 =====
function updateScrollProgress() {
  let progressBar = document.getElementById('scroll-progress');
  
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, #00d9ff, #ff00aa);
      z-index: 9999;
      transition: width 0.1s ease;
      box-shadow: 0 0 10px #00d9ff;
    `;
    document.body.appendChild(progressBar);
  }
  
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
}

// ===== 테이블 행에 마우스 호버 효과 =====
function initTableHover() {
  const rows = document.querySelectorAll('table tr');
  rows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#1a2a3a';
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'all 0.3s ease';
      this.style.boxShadow = '0 0 15px rgba(0, 217, 255, 0.3)';
    });
    row.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'transparent';
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
  });
}

// ===== 음악 재생 시 시각 효과 =====
function initAudioVisualEffect() {
  const audio = document.querySelector('audio');
  if (!audio) return;
  
  // 음악 컨트롤러 스타일링
  audio.style.cssText = `
    border-radius: 30px;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    padding: 5px;
    box-shadow: 0 0 20px rgba(0, 217, 255, 0.2);
  `;
  
  audio.addEventListener('play', function() {
    document.body.classList.add('music-playing');
    createMusicParticles();
  });
  
  audio.addEventListener('pause', function() {
    document.body.classList.remove('music-playing');
  });
  
  audio.addEventListener('ended', function() {
    document.body.classList.remove('music-playing');
  });
}

// ===== 음악 재생 시 파티클 효과 =====
function createMusicParticles() {
  const container = document.createElement('div');
  container.id = 'music-particles';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  document.body.appendChild(container);
  
  const colors = ['#00d9ff', '#ff00aa', '#ffcc00', '#00ff88'];
  
  const particleInterval = setInterval(() => {
    if (!document.body.classList.contains('music-playing')) {
      clearInterval(particleInterval);
      container.remove();
      return;
    }
    
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      bottom: -20px;
      opacity: 0.8;
      box-shadow: 0 0 ${size * 2}px ${color};
      animation: floatUp ${3 + Math.random() * 2}s ease-out forwards;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => particle.remove(), 5000);
  }, 200);
}

// ===== 마우스 따라다니는 효과 =====
function initMouseTrail() {
  const trail = document.createElement('div');
  trail.id = 'mouse-trail';
  trail.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 217, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.1s ease, opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(trail);
  
  document.addEventListener('mousemove', (e) => {
    trail.style.opacity = '1';
    trail.style.left = e.clientX - 10 + 'px';
    trail.style.top = e.clientY - 10 + 'px';
  });
  
  document.addEventListener('mouseleave', () => {
    trail.style.opacity = '0';
  });
  
  // 클릭 시 파동 효과
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 0;
      height: 0;
      border: 2px solid #00d9ff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9997;
      animation: rippleEffect 0.6s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// ===== 랜덤 명언 =====
function initRandomQuote() {
  const quotes = [
    "🔥 코딩은 마라톤이다, 스프린트가 아니다!",
    "💪 오늘의 버그는 내일의 기능이다!",
    "🚀 시작이 반이다, 나머지 반은 디버깅이다!",
    "🎯 완벽한 코드는 없다, 더 나은 코드만 있을 뿐!",
    "⚡ 타이거 전차처럼 전진하라!",
    "🌟 1%의 영감, 99%의 Stack Overflow!",
    "🔧 에러 메시지는 친구다, 무시하지 마라!",
    "💡 어제의 나보다 한 줄 더!"
  ];
  
  const lastP = document.querySelector('.main-container > p:last-of-type');
  if (lastP && lastP.textContent.includes('타이거')) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // 명언 박스 생성
    const quoteBox = document.createElement('div');
    quoteBox.style.cssText = `
      margin-top: 20px;
      padding: 15px 25px;
      background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(255, 0, 170, 0.1));
      border: 1px solid rgba(0, 217, 255, 0.3);
      border-radius: 10px;
      font-style: italic;
      color: #00d9ff;
      animation: pulse 2s infinite;
    `;
    quoteBox.textContent = randomQuote;
    lastP.parentNode.insertBefore(quoteBox, lastP.nextSibling);
  }
}

// ===== CSS 애니메이션 추가 =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.8;
    }
    100% {
      transform: translateY(-100vh) rotate(720deg);
      opacity: 0;
    }
  }
  
  @keyframes rippleEffect {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      width: 100px;
      height: 100px;
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 5px rgba(0, 217, 255, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 217, 255, 0.6);
    }
  }
  
  .music-playing {
    animation: backgroundPulse 2s ease-in-out infinite;
  }
  
  @keyframes backgroundPulse {
    0%, 100% {
      background-color: #0b0d0e;
    }
    50% {
      background-color: #0d1015;
    }
  }
  
  /* 링크 호버 효과 */
  a {
    position: relative;
    color: #00d9ff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #00d9ff, #ff00aa);
    transition: width 0.3s ease;
  }
  
  a:hover::after {
    width: 100%;
  }
  
  a:hover {
    color: #ff00aa;
    text-shadow: 0 0 10px rgba(255, 0, 170, 0.5);
  }
  
  /* 버튼 효과 */
  button {
    background: linear-gradient(135deg, #00d9ff, #0099cc);
    border: none;
    padding: 10px 20px;
    color: white;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 217, 255, 0.4);
    background: linear-gradient(135deg, #ff00aa, #cc0088);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  /* 이미지 호버 효과 */
  img {
    transition: all 0.4s ease;
  }
  
  img:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 20px 40px rgba(0, 217, 255, 0.3);
  }
  
  /* 리스트 아이템 효과 */
  li {
    transition: all 0.3s ease;
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  li:hover {
    background: rgba(0, 217, 255, 0.1);
    transform: translateX(10px);
    color: #00d9ff;
  }
`;
document.head.appendChild(styleSheet);

// ===== 콘솔 이스터에그 =====
console.log('%c🐯 타이거 전차처럼 전진! 🐯', 
  'font-size: 24px; color: #00d9ff; text-shadow: 0 0 10px #00d9ff;');
console.log('%c개발자 도구를 열어보셨군요! 호기심이 개발자의 첫 번째 덕목입니다! 💪', 
  'font-size: 14px; color: #ff00aa;');
