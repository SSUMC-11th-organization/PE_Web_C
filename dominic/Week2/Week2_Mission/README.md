# Week 2 Mission — UMCine

React와 TypeScript로 영화 목록 화면을 구성하며 컴포넌트, props, 목록 렌더링, 상태 업데이트를 연습합니다.

## 실행

```bash
pnpm install
pnpm dev
```

## 구현 기록

- `Movie` 인터페이스와 영화 데이터 10개를 분리했습니다.
- `MovieCard`에 영화 데이터를 props로 전달해 카드 목록을 렌더링합니다.
- 북마크는 상위 컴포넌트에서 관리하고, `map`과 스프레드 문법으로 불변 업데이트합니다.
- 제목 검색, 장르 필터, 보관함 필터로 조건부 렌더링을 확인할 수 있습니다.
- 데스크톱·태블릿·모바일 화면에 맞춰 카드 그리드를 조정했습니다.

## 확인

```bash
pnpm fix
pnpm check
pnpm typecheck
pnpm build
```
