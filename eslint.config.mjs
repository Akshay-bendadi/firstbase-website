import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const disabledReactRules = Object.fromEntries(
  [...nextVitals, ...nextTypescript]
    .flatMap((config) => Object.keys(config.rules ?? {}))
    .filter((rule) => rule.startsWith("react/"))
    .map((rule) => [rule, "off"]),
);

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      ...disabledReactRules,
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    ignores: [".next/**", "build/**", "coverage/**", "dist/**", "node_modules/**", "out/**"],
  },
];

export default eslintConfig;
