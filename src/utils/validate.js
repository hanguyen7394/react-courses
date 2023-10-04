import { REGREX } from "../constant/common";

export const validate = (rules, values) => {
  let errorObject = {};

  for (const key in rules) {
    for (const rule of rules[key]) {
      if (rule.required) {
        if (!!!values[key]) {
          errorObject[key] = rule.message;
          break;
        }
      }

      if (rule.regrex && !!values[key]) {
        let pattern = '';

        if (rule.regrex in REGREX) {
          pattern = REGREX[rule.regrex];
        } else if (rule instanceof RegExp) {
          pattern = rule.regrex;
        } else {
          pattern = new RegExp(rule.regrex, "gi");
        }

        if(!pattern.test(values[key])) {
          errorObject[key] = rule.message;
          break;
        }
      }

      if (typeof rule === 'function' && !!values[key]) {
        const message = rule(values[key], values);
        if (message) {
          errorObject[key] = message;
          break;
        }
      }
    }
  }

  return errorObject;
}

export const requireRule = (message) => {
  return {
    required: true,
    message,
  };
};

export const regrexRule = (regrex, message) => {
  return {
    regrex,
    message,
  };
};
