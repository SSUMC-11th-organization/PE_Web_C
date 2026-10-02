# UMCine 영화 목록

Figma의 UMCine `영화 목록` 프레임을 React + TypeScript + CSS로 퍼블리싱한 프로젝트예요.

## 시작하기

```bash
pnpm install
pnpm dev
```

## 실제 이미지/아이콘 에셋 적용하기

지금은 `public/images/movies/` 안에 **플레이스홀더 이미지**(그라데이션 배경 + 영화 제목)가 미리 생성되어 있어서, 별도 설정 없이 바로 화면을 확인할 수 있어요.

실제 과제용 이미지로 교체하려면:

1. `umcine-images.zip`을 내려받아 압축을 풀고, 그 안의 `images` 폴더를 이 프로젝트의 `public/` 아래에 그대로 덮어써요. (파일 이름은 `src/data/movies.ts`의 `posterPath`/`backdropPath`와 정확히 일치해야 해요)
2. `movie-icons.zip`을 내려받아 압축을 풀고, 아이콘들을 `public/icons/`에 넣어요.
3. 필요하다면 `src/components/movie-card.tsx`의 북마크 아이콘(`BookmarkIcon`)을 `public/icons`의 실제 아이콘으로 교체해요. 지금은 인라인 SVG로 임시 구현되어 있어요.

## 폴더 구조

```
src/
  types/movie.ts       # Movie 타입 정의
  data/movies.ts        # 영화 10편 더미 데이터
  components/
    header.tsx           # 상단 헤더 (로고, 내비게이션, 로그인 버튼)
    movie-card.tsx        # 영화 카드 (포스터, 북마크 버튼, 제목, 개봉일)
    movie-grid.tsx         # 영화 카드 그리드 (5열 레이아웃)
    pagination.tsx          # 페이지네이션 UI
  App.tsx                    # useState로 북마크 상태 관리, 컴포넌트 조립
```

## 빌드 확인

```bash
pnpm build
```

타입 에러와 콘솔 에러가 없는지 확인한 뒤 제출하세요.
