# ---- Base Build Stage ----
    FROM node:18-alpine AS builder

    # 작업 디렉토리 설정
    WORKDIR /app
    
    # package.json과 package-lock.json 복사
    COPY package.json package-lock.json ./
    
    # 패키지 설치 (캐시를 활용하기 위해 --omit=dev 사용)
    RUN npm ci --omit=dev
    
    # 소스 코드 복사
    COPY . .
    
    # Next.js 빌드 (next build 실행)
    RUN npm run build
    
    # ---- Production Stage ----
    FROM node:18-alpine AS runner
    
    # 작업 디렉토리 설정
    WORKDIR /app
    
    # production 환경 설정
    ENV NODE_ENV=production
    
    # Azure Web App에서 할당하는 포트 사용
    ENV PORT=3000
    EXPOSE 3000
    
    # 빌드된 파일 복사
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/node_modules ./node_modules
    
    # Next.js 서버 실행
    CMD ["npm", "start"]
    