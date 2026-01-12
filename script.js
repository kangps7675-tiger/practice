// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 스크롤 시 요소 나타나기 효과
  observeElements();
  // 스크롤 이벤트 리스너
  window.addEventListener('scroll', checkElements);
  // 초기 체크
  checkElements();
});

// Intersection Observer를 이용한 스크롤 애니메이션
function observeElements() {
  // 테이블, 이미지, 단락, 제목 등에 초기 클래스 적용
  document.querySelectorAll('table, img, p, h2, .plan-container').forEach(element => {
    element.classList.add('fade-out');
  });
}

// 스크롤 시 요소 체크
function checkElements() {
  const elements = document.querySelectorAll('.fade-out');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    
    // 요소가 화면에 보일 때 (위쪽에 들어올 때)
    if (elementTop < windowHeight && elementBottom > 0) {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    } else {
      // 스크롤 올렸을 때 다시 숨기기 (선택사항)
      // element.classList.remove('fade-in');
      // element.classList.add('fade-out');
    }
  });
}

// 페이지 전체 클릭 시 오디오 재생 (브라우저 정책 우회)
document.addEventListener('click', function() {
  const audio = document.querySelector('.audio-container audio');
  if (audio && audio.paused) {
    audio.play().catch(error => {
      console.log('재생 오류:', error);
    });
  }
});

// 테이블 행에 마우스 호버 효과 추가
document.addEventListener('DOMContentLoaded', function() {
  const rows = document.querySelectorAll('table tbody tr');
  rows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#1e1e1e';
      this.style.transition = 'background-color 0.3s ease';
    });
    row.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'transparent';
    });
  });
});