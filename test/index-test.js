"use strict";
import TextLintTester from "textlint-tester";
const tester = new TextLintTester();
import rule from "../src/index";

const errorMessage = "发现重复空格。";

tester.run("rule", rule, {
  valid: [
    "Apple Pen",
    "Pen Pineapple Apple Pen",
  ],
  invalid: [
    {
      text: "Apple  pen",
      errors: [
        {
          message: errorMessage,
          line: 1,
          column: 6
        },
      ]
    },
    {
      text: "Pen   Pineapple",
      errors: [
        {
          message: errorMessage,
          line: 1,
          column: 4
        },
      ]
    },
    {
      text: "Pen  Pineapple   Apple  Pen",
      errors: [
        {
          message: errorMessage,
          line: 1,
          column: 4
        },
        {
          message: errorMessage,
          line: 1,
          column: 15
        },
        {
          message: errorMessage,
          line: 1,
          column: 23
        },
      ]
    },
    {
      text: "Pen  Pineapple   Apple  Pen",
      options: {
        allow: ["Pineapple   Apple"],
      },
      errors: [
        {
          message: errorMessage,
          line: 1,
          column: 4
        },
        {
          message: errorMessage,
          line: 1,
          column: 23
        },
      ]
    },
  ]
});
