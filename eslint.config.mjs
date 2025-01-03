import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended' // Prettier와 통합
  ),
  {
    rules: {
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint에서 에러로 표시
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'react/react-in-jsx-scope': 'off', // Next.js 프로젝트에서는 React를 import할 필요 없음
    },
  },
];

export default eslintConfig;
