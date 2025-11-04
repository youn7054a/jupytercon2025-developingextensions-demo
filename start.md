# JupyterCon 2025 Extension Workshop - 시작 가이드

이 문서는 JupyterLab 확장 프로그램을 venv 환경에서 설정하고 실행하는 방법을 안내합니다.

## 프로젝트 개요

- **프로젝트명**: jupytercon2025-extension-workshop
- **설명**: 랜덤 이미지와 캡션을 표시하는 JupyterLab 확장 프로그램
- **Frontend**: TypeScript/JavaScript (NPM 패키지)
- **Backend**: Python (서버 확장)
- **JupyterLab 버전**: 4.4.10

## 요구사항

- Python >= 3.9 (현재 시스템: Python 3.9.6)
- Node.js (현재 시스템: v23.11.0)
- JupyterLab >= 4.0.0

## 초기 설정 (최초 1회)

### 1. 가상환경 생성

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Python 의존성 설치

```bash
pip install --upgrade pip
pip install --editable ".[dev,test]"
```

### 3. Node.js 의존성 설치

```bash
jlpm install
```

### 4. 확장 프로그램 빌드

```bash
jlpm build
```

### 5. JupyterLab 확장 개발 모드로 설치

```bash
jupyter labextension develop . --overwrite
```

### 6. 서버 확장 활성화

```bash
jupyter server extension enable jupytercon2025_extension_workshop
```

### 7. 설치 확인

```bash
# Frontend 확장 확인
jupyter labextension list

# Backend 확장 확인
jupyter server extension list
```

**예상 출력:**
```
JupyterLab v4.4.10
/Users/.../share/jupyter/labextensions
        jupytercon2025-extension-workshop v0.1.0 enabled OK

jupytercon2025_extension_workshop enabled
- Validating jupytercon2025_extension_workshop...
  jupytercon2025_extension_workshop 0.1.0 OK
```

## JupyterLab 실행

### 기본 실행

```bash
source .venv/bin/activate
jupyter lab
```

브라우저에서 자동으로 JupyterLab이 열립니다.

### 확장 프로그램 사용

1. JupyterLab 실행 후 왼쪽 Launcher 패널에서 확장 프로그램 아이콘 찾기
2. 또는 Command Palette (Cmd+Shift+C / Ctrl+Shift+C)에서 확장 기능 검색

## 개발 워크플로우

### 방법 1: 수동 빌드 (TypeScript 수정 시)

```bash
source .venv/bin/activate
jlpm build
# 브라우저에서 새로고침 (Cmd+R / Ctrl+R)
```

### 방법 2: 자동 빌드 모드 (권장)

터미널을 2개 사용합니다:

**터미널 1 - 자동 빌드:**
```bash
source .venv/bin/activate
jlpm watch
```

**터미널 2 - JupyterLab 실행:**
```bash
source .venv/bin/activate
jupyter lab
```

`jlpm watch`가 실행 중이면 TypeScript 파일을 수정할 때마다 자동으로 재빌드됩니다. 브라우저만 새로고침하면 변경사항이 반영됩니다.

### Python 코드 수정 시

Python 파일 (`jupytercon2025_extension_workshop/` 디렉토리)을 수정한 경우:

1. JupyterLab 서버 중지 (터미널에서 Ctrl+C)
2. 서버 재시작: `jupyter lab`

빌드는 필요 없습니다.

## 프로젝트 구조

```
jupytercon2025-developingextensions-demo/
├── .venv/                          # Python 가상환경
├── src/                            # TypeScript 소스 코드
│   ├── index.ts                    # 메인 플러그인 파일
│   ├── widget.tsx                  # 위젯 컴포넌트
│   └── ...
├── style/                          # CSS 스타일
│   └── index.css
├── jupytercon2025_extension_workshop/  # Python 패키지
│   ├── __init__.py
│   ├── routes.py                   # 서버 API 엔드포인트
│   └── labextension/               # 빌드된 frontend 코드
├── package.json                    # NPM 의존성 및 스크립트
├── pyproject.toml                  # Python 패키지 설정
├── tsconfig.json                   # TypeScript 설정
└── README.md
```

## 유용한 명령어

### 코드 품질 검사

```bash
# TypeScript 타입 체크
npx tsc --noEmit

# ESLint 실행
jlpm lint

# Prettier 포맷팅
jlpm prettier

# Python 구문 체크
python -m py_compile jupytercon2025_extension_workshop/__init__.py
```

### 테스트

```bash
# Python 테스트
pytest -vv -r ap --cov jupytercon2025_extension_workshop

# JavaScript 테스트
jlpm test
```

### 클린 빌드

```bash
# 빌드 아티팩트 정리
jlpm clean:all

# 재빌드
jlpm install
jlpm build

# 확장 재설치
pip install -e ".[dev,test]"
jupyter labextension develop . --overwrite
jupyter server extension enable jupytercon2025_extension_workshop
```

## 문제 해결

### 확장이 JupyterLab에 나타나지 않는 경우

1. **설치 확인:**
   ```bash
   jupyter labextension list
   jupyter server extension list
   ```

2. **재빌드 및 재설치:**
   ```bash
   jlpm clean:all
   jlpm install
   jlpm build
   jupyter labextension develop . --overwrite
   ```

3. **JupyterLab 서버 재시작:**
   - Ctrl+C로 서버 중지
   - `jupyter lab`으로 재시작

4. **브라우저 캐시 삭제:**
   - 하드 새로고침: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows/Linux)

### Python 가상환경 관련

**환경 활성화 확인:**
```bash
which python
# 출력: /Users/.../jupytercon2025-developingextensions-demo/.venv/bin/python
```

**가상환경이 활성화되지 않은 경우:**
```bash
source .venv/bin/activate
```

### Node.js 의존성 문제

peer dependency 경고는 대부분 무시해도 됩니다. 실제 오류가 발생하면:

```bash
jlpm install --force
```

## 추가 리소스

- **JupyterLab Extension Developer Guide**: https://jupyterlab.readthedocs.io/en/stable/extension/extension_dev.html
- **JupyterLab API Reference**: https://jupyterlab.readthedocs.io/en/latest/api/index.html
- **Extension Examples**: https://github.com/jupyterlab/extension-examples
- **Project README**: README.md
- **Coding Standards**: CLAUDE.md (AI 코딩 어시스턴트용 가이드라인)

## 개발 팁

### 1. 환경 활성화 자동화

`.bashrc` 또는 `.zshrc`에 추가:
```bash
alias activate-jupyter='cd ~/path/to/jupytercon2025-developingextensions-demo && source .venv/bin/activate'
```

### 2. 개발 시 터미널 구성

- 터미널 1: `jlpm watch` (자동 빌드)
- 터미널 2: `jupyter lab` (서버 실행)
- 터미널 3: 일반 작업용 (git, 파일 편집 등)

### 3. 빠른 피드백 루프

1. TypeScript 파일 수정
2. `jlpm watch`가 자동으로 빌드 (1-2초)
3. 브라우저 새로고침 (Cmd+R)
4. 변경사항 확인

### 4. 디버깅

**브라우저 콘솔 확인:**
- F12 또는 Cmd+Option+I로 개발자 도구 열기
- Console 탭에서 JavaScript 오류 확인
- Network 탭에서 API 요청 확인

**서버 로그 확인:**
- `jupyter lab`을 실행한 터미널에서 Python 에러 및 API 요청 로그 확인

## 주의사항

- ❌ `.venv` 폴더를 git에 커밋하지 마세요 (이미 `.gitignore`에 포함됨)
- ❌ `node_modules` 폴더를 git에 커밋하지 마세요
- ✅ 모든 명령어는 가상환경 활성화 후 실행하세요
- ✅ TypeScript 수정 후 빌드 또는 watch 모드 사용
- ✅ Python 수정 후 서버 재시작

## 다음 단계

1. `src/index.ts` 파일을 열어 확장 프로그램 구조 이해하기
2. `src/widget.tsx`에서 위젯 컴포넌트 수정해보기
3. `jupytercon2025_extension_workshop/routes.py`에서 API 엔드포인트 확인하기
4. CLAUDE.md 파일에서 코딩 표준 및 모범 사례 학습하기

Happy coding! 🚀
