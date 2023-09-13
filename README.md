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
 ┣ 📂 components  컴포넌트 분리
 ┃ ┣ 📂 common
 ┃ ┃ ┗ 📄 Button.tsx
 ┃ ┣ 📄 FilterBar.tsx
 ┃ ┗ 📄 Graph.tsx
 ┣ 📂 data       데이터
 ┃ ┣ 📄 id.ts
 ┃ ┗ 📄 mock.ts
 ┣ 📂 pages       페이지 분리
 ┃ ┗ 📄 Home.tsx
 ┣ 📂 router      라우팅
 ┃ ┗ 📄 Router.tsx
 ┣ 📂 types       타입 정의
 ┗ ┗ 📄 index.ts

```

### 기술 스택 및 사용한 라이브러리

- Create React App (+ typescript)
- react-router-dom : client-side routing용
- styled-components : 컴포넌트 기반 css 처리
- chart.js(+ react-chartjs-2): 자바스크립트 Chart

<br>

## 🎉 Preview

![Sep-13-2023 21-45-28](https://github.com/llbllhllk/wanted-pre-onboarding-chart/assets/33623123/f4edb37e-fbaa-44d7-b98f-b0601bd898cf)

<br />

## 📝 구현 내용

### ✅ Assignment 1

> - 시계열 차트 만들기
>   - 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요
>   - 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요
>   - Area 그래프의 기준값은 `value_area` 값을 이용해주세요
>   - Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요
>   - 차트의 Y축에 대략적인 수치를 표현해주세요(예시 이미지 참고)

- Chart.js의 Chart 컴포넌트를 통해 복합 그래프를 구현.
- 각 Area와 Bar에 `value_area`와 `value_bar`를 dataset에 설정.
- 각 Area와 Bar의 scales에 yAxisID를 통한 수치 표현 및 position에 따른 위치 조정.

```javscript
export const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      fill: true,
      label: 'value_area',
      data: dataArray.map(item => item.value_area),
      yAxisID: 'y',
      backgroundColor: 'rgba(255, 120, 105, 0.5)',
    },
    {
      type: 'bar' as const,
      fill: true,
      label: 'value_bar',
      data: dataArray.map(item => item.value_bar),
      yAxisID: 'y1',
      backgroundColor: 'rgba(0, 196, 250, 0.5)',
      position: 'right',
    },
  ],
};
```

<br>

### ✅ Assignment 2

> - 호버 기능 구현
>   - 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공해주세요

- tooltip의 callbacks를 통해 특정 데이터 구역에 마우스 호버시 `id`, `value_area`, `value_bar` 데이터셋과 mock에서 추출하고 return하여 출력.

```javscript
export const options: ChartOptions = {
  tooltip: {
    enabled: true,
    callbacks: {
      label: context => {
        const datasetLabel = context.dataset.label || '';
        const label = context.label || '';
        const value_area = mock.response[label]?.value_area;
        const value_bar = mock.response[label]?.value_bar;
        const id = mock.response[label]?.id || '';
        return `${datasetLabel}: ID: ${id}, value_area: ${value_area}, value_bar: ${value_bar}`;
      },
    },
  }
}
```

<br />

### ✅ Assignment 3

> - 필터링 기능 구현
>   - 필터링 기능을 구현해주세요, 필터링은 특정 데이터 구역을 하이라이트 하는 방식으로 구현해주세요
>   - 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용해주세요
>   - 필터링 시 **버튼**에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리를 해주세요
>   - 특정 데이터 **구역**을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트해주세요

- plugin 설정을 통해 특정 데이터 영역을 클릭 시 `handleBarClick`를 호출.
- 클릭한 영역의 `id`값을 `selectedID` state에 할당.
- `selectedID`값 변경에 따른 useEffect hook을 통해 bar타입을 가지는 그래프의 `id`와 `selectedID`가 같은 지를 판별하여 backgroundColor를 조정 후 update.

```javascript
useEffect(() => {
    const updatedData = {
      ...data,
      datasets: data.datasets.map((dataset: any) => {
        if (selectedID && dataset.type === 'bar') {
          const updatedBackgroundColor = dataset.data.map((item: any, index: number) => {
            const matchingData = dataArray[index];
            return matchingData && matchingData.id === selectedID
              ? 'rgba(248, 69, 69, 0.6)'
              : 'rgba(0, 102, 204, 0.6)';
          });

          return {
            ...dataset,
            backgroundColor: updatedBackgroundColor,
          };
        } else if (!selectedID && dataset.type === 'bar') {
          return {
            ...dataset,
            backgroundColor: new Array(dataset.data.length).fill('rgba(0, 102, 204, 0.6)'),
          };
        } else {
          return dataset;
        }
      }),
    };

    chartRef.current.data = updatedData;
    chartRef.current.update();
  }, [selectedID]);
```

<br />

## 추가 정보

### 배포

- 해당 프로젝트는 netlify를 통해 배포되었습니다. [배포링크]()
