![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=MOGAZOA%204-18&fontSize=80)


# MOGAZOA 4기 18팀

## 🔥 프로젝트 소개 - MOGAZOA
음악, 식당, 영화, 강의, 여행지, 전자기기, 호텔, 와인, 옷, 앱 등 다양한 분야의 상품을 리뷰하는 플랫폼

### 🌐 배포 : 

---
## 💼 팀원 소개

|<img src="https://avatars.githubusercontent.com/u/155597214?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/110177217?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/54311686?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/103150252?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/155204900?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|:-:|
|한진희<br/>[@hanjinhe](https://github.com/hanjinhe)|권민서<br/>[@min3eo](https://github.com/min3eo)|최희문<br/>[@ChoiHeeMoon99](https://github.com/ChoiHeeMoon99)|최민혁<br/>[@ChoiMHMH](https://github.com/ChoiMHMH)|강나리<br/>[@nali-kang](https://github.com/nali-kang)|
|Navigation Bar<br/>프로필 화면<br/>팀장|Input Component<br/>로그인/회원가입 화면<br/>발표|Button Component<br/>홈 화면|Modal<br/>공통API<br/>상품상세 화면|Dropdown<br/>비교하기 화면<br/>배포/README|

---
## ⭐️ 프로젝트 소개

### - 프로젝트 기간 : 2024. 05. 17. ~ 2024. 06. 25.
### - 프로젝트 설명
- 리뷰할 상품을 등록하고 상품의 내용을 확인할 수 있습니다.
- 상품의 내용을 확인하고 좋아요,리뷰,공유 할 수 있습니다.
- 마음에 드는 상품 두개의 좋야요 수, 리뷰 수, 평점을 비교할 수 있습니다.
- 카테고리별 인기 상품을 확인할 수 있습니다.
- 리뷰어의 랭킹을 확인할 수 있고 해당 유저의 프로필을 조회할 수 있습니다.
- 원하는 유저를 팔로우 할 수 있습니다.
- 기본적인 회원가입을 제공하며 카카오/구글 로그인을 통해 회원가입 및 로그인이 가능합니다.
- 내 프로필의 이미지, 닉네임, 설명을 등록하고 수정할 수 있습니다.


---
## ⭐️ 프로젝트 구성

1. 기술 스택
<div align=left>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/>
</div>  
<br />

2. 디렉토리 구조

```
📦src
 ┣ 📂Apis
 ┃ ┣ 📂Auth
 ┃ ┣ 📂Category
 ┃ ┣ 📂Follow
 ┃ ┣ 📂Image
 ┃ ┣ 📂Oauth
 ┃ ┣ 📂Product
 ┃ ┣ 📂Review
 ┃ ┣ 📂User
 ┣ 📂Components
 ┃ ┣ 📂Auth
 ┃ ┣ 📂Commons
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┣ 📂Cards
 ┃ ┃ ┣ 📂Chip
 ┃ ┃ ┣ 📂Dropdown
 ┃ ┃ ┣ 📂Icon
 ┃ ┃ ┣ 📂Input
 ┃ ┃ ┣ 📂ModalContainer
 ┃ ┃ ┣ 📂NavigationBar
 ┃ ┃ ┗ 📂Profile
 ┃ ┣ 📂Compare
 ┃ ┗ 📂HomeComponents
 ┣ 📂Constant
 ┣ 📂Context
 ┣ 📂Hooks
 ┣ 📂Types
 ┣ 📂Utils
 ┗ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┣ 📂compare
 ┃ ┣ 📂input
 ┃ ┣ 📂login
 ┃ ┣ 📂signup
 ┃ ┣ 📂userprofile
 ┃ ┃ ┗ 📂[userprofileId]
 ┃ ┣ 📜Providers.tsx
 ┃ ┣ 📜SearchContext.tsx
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
```
