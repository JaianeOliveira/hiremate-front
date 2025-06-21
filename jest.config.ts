// jest.config.ts
import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const customConfig = {
  // carrega configurações globais após o ambiente ser inicializado
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // mock de CSS e aliases de módulo do Next.js
  moduleNameMapper: {
    // "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(customConfig);
