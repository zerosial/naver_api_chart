# 제출자 정보

- 지원자 성명 : 백승훈
- 빌드 방법 명시 : 하단부 시작하기 (npm)
- 프로젝트 설명 : 테크랩스 Frontend 과제

# 사용 기술

1. react
2. redux-toolkit
3. redux-persist
4. D3.js
5. Axios
6. ANT Design
7. day.js
8. typescript

# 시작 하기

npm i
npm start

# 필수 구현

- [x] 쇼핑인사이트의 API 중 키워드 연령별 트렌드 조회 활용
- [x] 연령별 트렌드 조회의 **파라미터** (startDate, endDate, timeUnit, category, keyword, device, gender, ages)**를 사용자가 입력 할 수 있는 페이지**를 제작한다.
- [x] 발급받은 API KEY들은 **.env** 파일에 저장한 후 import 하여 사용하고 gitignore 파일에 .env를 저장한다
- [x] Naver Open API 활용 시 발생하는 **CORS 이슈**에 대한 해결방법을 [README.md](http://README.md) 파일에 간단히 작성한다.
- [x] Chart Library(recharts.js 등)를 활용하여 **조회 결과에 대한 데이터를 그래프로** 보여준다.
- [x] 연령별 트렌드 조회의 파라미터 **ages** 를 **다중 선택**할 수 있도록 구현한다.

# 선택 구현

- [x] Antd를 활용하여 화면을 꾸민다. (디자인은 자유)
- [x] Redux-Persist를 활용하여 새로고침 시, 연령별 트렌드 조회의 파라미터가 유지되도록 구성한다.
- [x] 상태관리는 Redux-thunk를 사용하였습니다.
