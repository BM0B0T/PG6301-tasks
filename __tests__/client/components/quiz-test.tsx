/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Quiz from "../../../src/client/components/quiz";

test("testing if quiz returns true", async () => {
  const quiz = {
    question: "what is absolute zero?",
    answers: ["-300 Celsius", "0 Kelvin", "0 Fahrenheit", "0 Celsius"],
    correct: 1,
  };
  let state: boolean;
  const onClick = (x: boolean) => {
    state = x;
  };

  render(<Quiz quiz={quiz} handleClick={onClick} />);
  screen.getByText("Question: " + quiz.question);
  screen.getByText("A: " + quiz.answers[0]);
  screen.getByText("B: " + quiz.answers[1]);
  screen.getByText("C: " + quiz.answers[2]);
  screen.getByText("D: " + quiz.answers[3]);
  await fireEvent.click(screen.getByText("B: " + quiz.answers[1]));
  // @ts-ignore
  expect(state).toBe(true);
});

test("testing if quiz returns false", async () => {
  const quiz = {
    question: "what is absolute zero?",
    answers: ["-300 Celsius", "0 Kelvin", "0 Fahrenheit", "0 Celsius"],
    correct: 1,
  };
  let state;
  const onClick = (x: boolean) => {
    state = x;
  };

  render(<Quiz quiz={quiz} handleClick={onClick} />);
  screen.getByText("Question: " + quiz.question);
  screen.getByText("A: " + quiz.answers[0]);
  screen.getByText("B: " + quiz.answers[1]);
  screen.getByText("C: " + quiz.answers[2]);
  screen.getByText("D: " + quiz.answers[3]);
  await fireEvent.click(screen.getByText("A: " + quiz.answers[0]));
  expect(state).toBe(false);
});
