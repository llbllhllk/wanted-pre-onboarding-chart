# Chart

주어진 데이터를 기반으로 시계열 차트를 알려주는 페이지입니다.

🗓️ 진행 기간: 약 2일 (2023.09.10 ~ 2023.09.13)

💡 개발 인원 : 1인 [@강병현](https://github.com/llbllhllk)

※ 본 과제는 [원티드 프리온보딩 인턴십 8월](https://www.wanted.co.kr/events/pre_ob_fe_12)를 바탕으로 진행되었습니다.

<br>

## 🧑🏻‍💻 프로젝트 정보

### 실행 방법

- [배포링크]()

- 링크가 실행되지 않는 경우 아래 명령어를 순차적으로 입력하여 실행해주세요.

  ```jsx
  git clone https://github.com/llbllhllk/wanted-pre-onboarding-chart.git

  npm install

  npm start
  ```

  - 실행하기 위해서는 Node.js가 설치된 환경이 필요합니다.

### 프로젝트 구조

```jsx
src
 ┣ 📂 api         네트워크 api 호출관련 로직
 ┃ ┣ 📄 cache.ts
 ┃ ┣ 📄 http.ts
 ┃ ┗ 📄 sick.tsx
 ┣ 📂 components  컴포넌트 분리
 ┃ ┣ 📂 common
 ┃ ┃ ┣ 📄 SearchBar.tsx
 ┃ ┃ ┗ 📄 SearchButton.tsx
 ┃ ┗ 📄 SearchSuggestion.tsx
 ┣ 📂 hooks       커스텀 훅
 ┃ ┣ 📄 useClickOutside.ts
 ┃ ┣ 📄 useDebounce.ts
 ┃ ┗ 📄 useKeyDown.ts
 ┣ 📂 pages       페이지 분리
 ┃ ┗ 📄 Home.tsx
 ┣ 📂 routes      라우팅
 ┃ ┗ 📄 Router.tsx
 ┣ 📂 types       타입 정의
 ┣ 📂 utils       공통 함수
 ┗ ┗ 📄 useKeyDown.tsx

```

### 기술 스택 및 사용한 라이브러리

- Create React App (+ typescript)
- react-router-dom : client-side routing용
- styled-components : 컴포넌트 기반 css 처리
- axios: 통신 라이브러리

<br>

## 🎉 Preview

![project]()

<br />

## 📝 구현 내용

### ✅ Assignment 1

> - 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
>   - 검색어가 없을 시 “검색어 없음” 표출

### api 호출

- axios class를 사용해 정의.
- 해당 class의 매개변수로 storage를 받아 api 호출을 할때 해당 storage에 저장.

### 출력

- 사용자 입력 시 api 호출 후 map으로 순회하여 Suggestion들을 출력.

<br>

### ✅ Assignment 2

> - API 호출별로 로컬 캐싱 구현
>   - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
>   - 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
>   - expire time을 구현할 경우 가산점 (extra)

### cacheStorage로 저장

- api 호출 전 get을 통해 캐시가 존재하는지 확인.
- 존재하면 캐시를 리턴하고 없을 경우 api 호출 후 set을 통해 캐시에 저장.

### expire time 구현

- header에 FETCH_DATE를 저장.
- 캐시에 접근 시 `현재시간 - FETCH_DATE > EXPIRE_TIME`으로 캐시 만료 여부를 판단하고 만료되었으면 삭제.

<br />

### ✅ Assignment 3

> - 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
>   - README에 전략에 대한 설명 기술
>   - API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

### debounce 전략

- API 요청에 500ms의 debounce를 적용.
- 사용자의 입력마다 API 호출 하는것이 아닌 사용자의 입력이 해당 시간동안 없을 때만 호출하게 하여 횟수를 줄임.
- default로 10개의 추천 검색어를 출력하도록 지정.

<br />

### ✅ Assignment 4

> - 키보드만으로 추천 검색어들로 이동 가능하도록 구현
>   - 사용법 README에 기술

- 키보드 이벤트와 관련한 useKeyDown 커스텀 훅으로 분리.
- input의 onKeyDown 핸들러와 연결후 인덱스 상태 확인.
- 키에 따라 인덱스 상태를 변경하고 그에 따른 스타일링을 지정.

<br />

## 추가 정보

### 배포

- 해당 프로젝트는 netlify를 통해 배포되었습니다. [배포링크](https://master--crinical-finder.netlify.app/)
