# Frontend Project

## 📦 기술 스택
- **React 18**
- **Vite** (빌드 도구)
- **React Router v6** (라우팅)
- **@tanstack/react-query** (서버 상태 관리)
- **Zustand** (클라이언트 전역 상태 관리)
- **Tailwind CSS v4** (스타일링)
- **Ant Design v5** (UI 컴포넌트)
- **Axios** (API 통신, 토큰 리프레시 포함)

---

## 🚀 실행 방법

```bash
# 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build
```

---

## 📦 폴더구조
```
src/
  api/               # Axios 인스턴스, API 클라이언트
  assets/            # 폰트, 이미지 등 정적 파일
    fonts/
      Montserrat-VariableFont_wght.ttf
      NotoSansKR-VariableFont_wght.ttf
  components/        # 공용 UI 컴포넌트
    MainLayout.jsx
  hooks/             # 커스텀 훅
  pages/             # 페이지 컴포넌트
    login/Login.jsx
    Dashboard/Dashboard.jsx
    PageMap.jsx
    PageRender.jsx
  stores/            # Zustand store
  style/             # 글로벌 CSS (index.css, App.css 등)
  utils/             # 유틸 함수
  views/             # 뷰 단위 컴포넌트
  App.jsx            # 라우팅 정의
  main.jsx           # 엔트리 포인트

```
---

## ✅ 개발 규칙
> 서버 상태는 React Query

> 클라이언트 상태/UI 상태는 Zustand

> 컴포넌트 스타일은 Tailwind + Ant Design 조합

> 페이지 라우팅은 pageComponentMap에 등록 후 <Routes> 자동 반영

---



