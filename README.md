# 허세원 · GitHub Pages 포트폴리오

이력서·경력기술서·포트폴리오 내용을 한 페이지로 통합한 정적 웹사이트입니다.
별도 설치나 빌드 과정 없이 사용할 수 있습니다.

## 내 PC에서 열기

이 폴더의 index.html을 브라우저로 열면 됩니다.
assets 폴더를 함께 유지하세요.

## GitHub Pages에 올리기

1. 본인 GitHub 계정에 heosewon.github.io 저장소를 만듭니다. 이미 있다면 기존 파일을 확인한 뒤 변경 사항을 반영하세요.
2. 이 폴더의 **내용물**을 저장소 최상위에 올립니다. index.html이 저장소 첫 화면에 보여야 합니다.
3. 저장소 Settings → Pages → Build and deployment에서 Source를 Deploy from a branch로 설정합니다.
4. Branch는 main, 폴더는 /(root)를 선택하고 Save를 누릅니다.
5. 배포가 끝나면 Pages 화면의 Visit site로 확인합니다.

heosewon 계정의 사용자 사이트로 설정할 경우 주소는 https://heosewon.github.io/ 입니다.
다른 계정이면 저장소 이름도 해당 계정명.github.io로 바꿔야 합니다.
게시 주소: https://heosewon.github.io/
저장소: https://github.com/heosewon/heosewon.github.io
실제 배포 상태는 저장소 Actions 또는 Settings → Pages에서 확인합니다.

공식 안내:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 파일 구성

- index.html: 한 페이지에 표시할 내용
- style.css: PC·태블릿·모바일 디자인, 기본 다크 테마, 인쇄 스타일
- script.js: 현재 섹션 표시, 코드 복사, 테마·언어 전환 및 설정 저장
- translations.js: 직접 검토한 영문 번역
- .nojekyll: Jekyll 처리 없이 정적 파일 게시
- assets/profile.jpg: 이력서에서 추출한 프로필 사진
- assets/pristontale-m.jpg: 제공한 프리스톤테일M 이미지 원본
- assets/currency-dashboard.jpg: 포트폴리오에서 추출한 대시보드 화면

## 내용 정리 기준

- 소개: 직무 방향과 간단한 자기소개
- 경력: 회사, 기간, 직무 및 이전 경력 설명
- 실무 프로젝트: 프리스톤테일M 담당 범위, 운영 문제 해결, 콘텐츠 DB 개발
- 개인 프로젝트: 게임 재화 ETL·대시보드와 이미지 병합 도구
- 학력·자격: 이력서의 학력 및 자격 정보
- 동일한 운영 사례를 여러 섹션에 반복하지 않고 관련 항목에 통합했습니다.
- 세부 SQL과 처리 규칙은 같은 페이지에서 펼쳐 볼 수 있습니다.
- 회사 실무와 개인 프로젝트의 구분, 구현 범위와 제약을 유지했습니다.
- 문서에 없는 성능 개선율이나 성과 수치는 추가하지 않았습니다.
- 생년월일과 PDF 이동 링크를 포함하지 않았습니다.

## 수정 방법

문구와 경력은 index.html에서 수정합니다.
사진을 교체하려면 같은 파일명을 유지하거나 index.html의 이미지 경로를 바꾸세요.
테마 색상은 style.css 맨 위의 --accent 값을 수정하면 됩니다.


모든 표시 내용은 제공된 문서 기준입니다. 재직 상태나 경력이 변경되면 해당 문구를 업데이트하세요.
외부 글꼴, 통계 수집기, 별도 서버 또는 외부 라이브러리 없이 동작합니다.


## 다크 리디자인 반영

- 상단은 프로필 사진과 이름·DBA 중심으로 재구성했습니다.
- 회사명은 경력 영역에만 표시하고 불필요한 연락 권유 문구를 제거했습니다.
- 전체 비트 연산 쿼리, 퀘스트 변경 조건 코드, JSON·트랜잭션 설명용 코드, Python 병합 코드를 추가했습니다.
- 코드의 원문 발췌와 설명용 재구성을 각각 명시했습니다. 재구성 코드는 원본 전체 프로시저 또는 즉시 실행용 스크립트가 아닙니다.
- 퀘스트 테이블·DB API, 점령전 UserDB/GameDB 처리 및 정산, ETL 계층 설계를 보강했습니다.

## 페이지 내 통합

- 이력서·경력기술서·포트폴리오 PDF 이동 링크를 모두 제거했습니다.
- 업로드용 파일 묶음에서는 PDF 사본을 제외했습니다.
- 재화 대시보드는 분석 기능, 하단 표는 적재 구조를 설명하도록 중복을 정리했습니다.
- 퀘스트 실제 반영 건수 검증 구문과 랭킹 시각의 의미, 이전 경력의 구체적인 구현 사례를 보강했습니다.

## 테마와 언어

- 상단의 달·해 버튼으로 어두운 테마와 밝은 테마를 선택합니다.
- EN / KR 버튼으로 영어와 한국어를 전환하며 선택한 테마와 언어는 해당 브라우저에 저장됩니다. 기본값은 한국어·다크입니다.
- 본문, 표, 설명, 접근성 레이블과 코드 주석을 번역했습니다. 실행 코드·식별자·원본 오류 문자열과 이미지 속 글자는 유지합니다.
- 한국어 문구 수정 시 translations.js의 대응 번역도 함께 갱신하세요.
- 페이지 끝에서도 학력·자격 메뉴의 선택 밑줄이 표시됩니다.
