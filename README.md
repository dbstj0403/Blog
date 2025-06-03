### 💚 디지털 하나로 블로그 과제

- 기술 스택에 대한 이야기를 자유롭게 나눌 수 있는 블로그(게시판) 프로젝트입니다.

### 👩🏻‍💻 Commit Convention

- [유다시티 컨벤션](https://udacity.github.io/git-styleguide/)

```
feat: 새로운 기능 구현
add: 기능구현까지는 아니지만 새로운 파일이 추가된 경우
del: 기존 코드를 삭제한 경우
fix: 버그, 오류 해결
docs: README나 WIKI 등의 문서 작업
style: 코드가 아닌 스타일 변경을 하는 경우
refactor: 리팩토링 작업
test: 테스트 코드 추가, 테스트 코드 리팩토링
chore: 코드 수정, 내부 파일 수정
```

### ⚙️ 테스트 계정
- **관리자**
	- `Email` : admin@gmail.com
	- `Password` : 12345678

- **나머지 테스트 계정**
	- `Email` : test1@naver.com
	- `Password` : 12345678
	- 이외의 테스트 계정들도 test2@naver.com, test3@naver.com... 비밀번호 모두 12345678로 동일합니다.
- **관리자 페이지 URL**
	- `localhost:3000/admin`

### 👏🏻 실행 방법
- 해당 레포 클론 혹은 압축 폴더의 압축을 풀어줍니다.
- `mysql dump` 파일을 실행하여 로컬 데이터베이스를 만듭니다. 
- 풀텍스트 인덱스 쿼리를 위해 검색 가능한 최소 토큰 수를 확인합니다. 해당 토큰값을 2로 수정해줍니다.
- dump 되어있던 user_stopword 테이블이 전역 불용어 테이블로 설정되었는지 확인하고, 되지 않았을 경우 직접 설정해줍니다. (`SET GLOBAL innodb_ft_server_stopword_table = 'hanarodb.user_stopword';`)
- 불용어 테이블로 잘 설정되었는지 확인해 주세요. (`SHOW VARIABLES LIKE 'innodb_ft_server_stopword_table';`)
- 터미널에서 `yarn install` 을 실행하여 프로젝트 실행에 필요한 의존성을 설치합니다. 필요한 경우 `npx prisma generate` 또한 함께 실행합니다.
- 이후, `yarn dev` 를 입력하여 로컬호스트에서 프로젝트를 실행합니다. 

### 💭 주요 기능 및 화면 소개
- **메인 화면**
	- 카테고리별로 올라온 최신글들과 좋아요 개수가 많은 인기글을 가져와 보여줍니다. 사용자는 포스트 컴포넌트들을 클릭한 후 포스트 상세 페이지로 진입해 포스트의 자세한 내용을 읽어볼 수 있습니다. 관리자의 경우 헤더 부분에 포스트 작성 버튼이 뜹니다.

	<br/>

	<img width="1170" alt="Image" src="https://github.com/user-attachments/assets/33088cdb-7dbb-4999-b97b-22c5072948c3" />

	<br/>
	<br/>

	- 로그인하지 않은 사용자의 경우 헤더 부분에 로그인/회원가입 버튼과 검색 버튼만 확인이 가능합니다.

	<br/>
	<br/>

	<img width="1168" alt="Image" src="https://github.com/user-attachments/assets/582d8b01-a47c-4690-bc9c-350c19cd6af6" />

    <br/>
	<br/>

	- 로그인한 사용자의 경우 로그인/회원가입 버튼이 사라지고, 검색 버튼과 마이페이지로 진입할 수 있는 프로필 아이콘이 보입니다.

	<br/>

	<img width="1168" alt="Image" src="https://github.com/user-attachments/assets/d5c9a8cd-7a99-418a-ad92-776c7b45cf62" />


	<br/>
	<br/>


	- 카테고리 탭에서 원하는 주제의 포스트만 필터링하여 볼 수 있습니다. 한 포스트에 카테고리가 2개 이상 들어갈 수도 있습니다.
	
	<br/>

	<img width="756" alt="Image" src="https://github.com/user-attachments/assets/d9d718ae-bbb9-43ed-9582-c1d760d17aec" />


- **회원가입 화면**
	- 닉네임과 이메일, 비밀번호 및 비밀번호 확인을 입력해 서비스에 회원가입할 수 있습니다. 이메일에는 반드시 '@'가 포함되어야 하며, 비밀번호는 8자 이상 입력해야 합니다. (닉네임 10자 제한) 비밀번호는 해시 암호화를 통해 데이터베이스에 저장됩니다.

	<br/>

	<img width="575" alt="Image" src="https://github.com/user-attachments/assets/2f4b7501-eaa7-4521-87b5-a721a8fd642b" />
	

- **로그인 화면**
	- 회원가입한 이메일, 비밀번호를 통해 로그인할 수 있습니다. 또한, Github 계정을 통해 간편하게 로그인할 수 있습니다.

	<br/>

	<img width="529" alt="Image" src="https://github.com/user-attachments/assets/3a659e17-85f7-4942-a610-cf985f2cd9d3" />


	<br/>

	- 이미 가입한 이메일과 같은 이메일을 사용하는 Github 계정으로 로그인을 시도할 경우, 계정을 통합할 수 있습니다. 같은 이메일 Github 계정으로 로그인하면 모달과 함께 연동 안내를 띄워줍니다.
	
	<br/>

	<img width="884" alt="Image" src="https://github.com/user-attachments/assets/6298c2ee-ed16-4189-9cf3-4a4fe589e000" />

- **마이페이지 화면**
	- 로그인한 사용자의 경우 이용할 수 있는 페이지입니다. 닉네임 변경, 로그아웃, 서비스 탈퇴 기능을 제공합니다. 관리자의 경우 해당 페이지에서 관리자 페이지로 진입할 수 있습니다. 
	- 관리자 페이지는 일반 유저가 주소창 조작을 통해서 진입할 경우, 혹은 로그인하지 않은 사용자가 접근할 경우 메인 화면으로 리다이렉트합니다. 
	- 깃허브 로그인 사용자는 깃허브 프로필을 띄워주고, 이메일 로그인 사용자는 기본 프로필 이미지를 렌더링합니다.

	<br/>

	<img width="804" alt="Image" src="https://github.com/user-attachments/assets/d522aa8c-43fd-4dbe-9658-b2fcb9342cce" />

	<img width="806" alt="Image" src="https://github.com/user-attachments/assets/b4858218-2461-4dd1-a351-626d6339ccec" />

	<img width="789" alt="Image" src="https://github.com/user-attachments/assets/186586ea-7990-4f3c-b69b-f9507a7196a1" />

- **포스트 상세 화면**
	- 메인 화면에서 각각의 포스트를 클릭할 경우 포스트 내용을 확인할 수 있는 화면으로 이동합니다. 관리자의 경우 제목 오른쪽에 수정/삭제 버튼이 뜨고, 일반 사용자의 경우 아무것도 뜨지 않습니다. 
	- 포스트의 카테고리를 태그 형식으로 보여주고, 작성자와 작성일, 마지막 수정일을 표시합니다.
	- 좋아요와 싫어요를 유저당 1번씩 누를 수 있으며, 좋아요와 싫어요를 동시에 누른 상태일 수는 없습니다. (좋아요 1개 혹은 싫어요 1개) 버튼은 토글 형식으로 재차 클릭하게 되면 상태가 반전됩니다.
	
	<br/>

	<img width="1171" alt="Image" src="https://github.com/user-attachments/assets/e31250c4-dcc9-4088-a022-0f89dbaa5a4d" />

- **카테고리 화면**
	- 포스트 상세 화면에서 해당 포스트의 카테고리가 아닌 다른 카테고리를 클릭하면 클릭한 카테고리의 포스트 목록을 보여줍니다. 사용자는 자유롭게 카테고리를 이동하며 포스트를 확인할 수 있습니다.
	
	<br/>

	<img width="1163" alt="Image" src="https://github.com/user-attachments/assets/e7f35b48-f12f-4eaf-8466-a1cf8c2f9ec4" />


- **포스트 작성 화면**
	- 관리자 권한을 가진 사용자만 접근할 수 있는 페이지입니다. 포스트의 제목과 내용, 카테고리를 입력하여 등록할 수 있습니다. 
	- 카테고리는 여러 개 등록할 수 있으며, 공백 또는 쉼표로 구분해 입력합니다.

	<br/>

	<img width="831" alt="Image" src="https://github.com/user-attachments/assets/722f0591-f1e6-4704-a1da-f20706c41489" />


- **포스트 수정 화면**
	- 포스트의 제목, 카테고리, 내용을 수정할 수 있습니다. 마찬가지로 카테고리는 공백, 쉼표로 구분하여 수정할 수 있습니다.

	<br/>

	<img width="1163" alt="Image" src="https://github.com/user-attachments/assets/190c6411-a235-429a-ad4e-19cff734632d" />


- **검색 화면**
	- Fulltext Index를 이용한 Boolean 모드 쿼리를 통해 제목이나 내용에 검색어가 들어간 포스트 목록을 보여줍니다.

	<br/>

	<img width="653" alt="Image" src="https://github.com/user-attachments/assets/e86de869-ad41-429d-840d-85673464ba47" />


- **회원 관리 화면**
	- 관리자만 접근할 수 있는 페이지입니다. 회원 목록을 테이블로 보여주고, 회원 정보 확인, 검색과 함께 회원 삭제도 가능합니다. 자기 자신의 계정을 삭제할 경우 계정이 탈퇴되고 메인화면으로 이동합니다.
	
	<br/>

	<img width="1148" alt="Image" src="https://github.com/user-attachments/assets/9ad0bdc0-e939-42f2-a057-8964fafad0d4" />


### ☕️ ERD

![Image](https://github.com/user-attachments/assets/b03e669a-72cc-4a65-8fdf-75d576d61ea1)

- Next Auth 사용으로 생성된 Account, Session, VerificationToken 제외 (jwt 토큰 방식을 사용해 세션 테이블은 비어 있는 상태가 맞습니다.)

### 👀 Points

- `Styling`
	- Tailwind CSS를 이용해 스타일링함과 동시에 shadcn ui를 이용해 일관적이고 깔끔한 UI 구현
	- shadcn ui는 공통 컴포넌트 파일 아래 ui 폴더 내부 위치
	- 페이지별 컴포넌트는 라우팅에 영향을 주지 않기 위해 _components 폴더에 정리
	- 자주 사용되는 모달 컴포넌트를 재사용하여 코드의 중복성 해소

- `예외 처리`
	- error.tsx 와 not-found.tsx 를 통해 의도하지 않은 루트의 서비스 사용을 막고 일관적인 UI 유지
	- 자주 사용하는 이메일과 깃허브 계정 이메일이 겹칠 경우를 고려해 계정 통합 기능 제공

- `데이터 패칭 로직`
	- 크게 서버 액션, 커스텀 훅, fetch()를 사용하여 경우에 따라 다르게 사용
		- 서버 액션 : 서버 컴포넌트에서 데이터를 가져와 자식 컴포넌트에게 props를 내려줌으로써 SSR 적용, 패칭 로직 간소화를 위해 사용
		- 커스텀 훅 : 클라이언트 컴포넌트 내부에서 복잡한 상태(useState 점철화), 로직을 캡슐화하고 재사용하기 위해 사용
		- fetch() : 사용자의 행동에 맞추어 데이터를 반영하거나 가져와야 할 때 사용

- `FullText Index & 불용어 테이블`
	- 검색에 불필요한 그리고, 저, 그와 같은 용어들은 인덱스 적용 대상에서 제외하고, 2글자 이상의 검색어를 받아 와일드카드 접두사(*) 를 붙여 검색어 뒤에 어떤 단어가 붙든 검색 결과로 반환
	